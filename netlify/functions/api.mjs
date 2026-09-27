import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';

const users = getStore({name:'dbquest-users',region:'eu-central-1'});
const progressStore = getStore({name:'dbquest-progress',region:'eu-central-1'});
const sessions = getStore({name:'dbquest-sessions',region:'eu-central-1'});

const json = (status, data) => ({ statusCode: status, headers: {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}, body: JSON.stringify(data) });
const parseBody = (event) => { try { return JSON.parse(event.body||'{}'); } catch { return {}; } };
const classCode = v => String(v||'').trim().toUpperCase().replace(/[^A-Z0-9ÄÖÜ_-]/g,'').slice(0,24);
const nickNorm = v => String(v||'').trim().toLocaleLowerCase('de-DE').replace(/[^a-z0-9äöüß._-]/g,'').slice(0,24);
const cleanNick = v => String(v||'').trim().slice(0,24);
const userKey = (role, cls, nick) => `${role}/${classCode(cls)}/${nickNorm(nick)}`;
const progressKey = (cls,nick) => `student/${classCode(cls)}/${nickNorm(nick)}`;
const defaultProgress = generation => ({version:2,_generation:generation||1,completed:{},lessonRead:{},revealed:{},unlocked:[],selectedTheme:'',selectedAvatar:'🙂',selectedPet:'',lastActive:null,streak:0,xp:0,completedCount:0,resetAt:new Date().toISOString()});

function hashPassword(password, salt=crypto.randomBytes(16).toString('hex')){
  const hash=crypto.scryptSync(String(password),salt,64).toString('hex');
  return {salt,hash};
}
function passwordOK(password,user){
  try{const candidate=crypto.scryptSync(String(password),user.salt,64);const stored=Buffer.from(user.hash,'hex');return candidate.length===stored.length && crypto.timingSafeEqual(candidate,stored);}catch{return false;}
}
const tokenHash = token => crypto.createHash('sha256').update(token).digest('hex');
async function getJSON(store,key){ return await store.get(key,{type:'json'}); }
async function createSession(user,key){
  const token=crypto.randomBytes(32).toString('base64url');
  const session={userKey:key,role:user.role,classCode:user.classCode,nick:user.nick,authVersion:user.authVersion||1,expiresAt:Date.now()+1000*60*60*24*30};
  await sessions.setJSON(tokenHash(token),session);
  return token;
}
async function requireSession(event,role){
  const auth=event.headers.authorization||event.headers.Authorization||'';
  const token=auth.startsWith('Bearer ')?auth.slice(7):'';
  if(!token) throw Object.assign(new Error('Bitte melden Sie sich an.'),{status:401});
  const sk=tokenHash(token); const session=await getJSON(sessions,sk);
  if(!session || session.expiresAt<Date.now()){ if(session)await sessions.delete(sk); throw Object.assign(new Error('Sitzung abgelaufen.'),{status:401}); }
  const user=await getJSON(users,session.userKey);
  if(!user || (user.authVersion||1)!==session.authVersion) throw Object.assign(new Error('Sitzung ist nicht mehr gültig.'),{status:401});
  if(role && user.role!==role) throw Object.assign(new Error('Keine Berechtigung.'),{status:403});
  return {user,key:session.userKey,tokenKey:sk};
}
async function listKeys(store,prefix){ const page=await store.list({prefix}); return (page.blobs||[]).map(b=>b.key); }
function validateCredentials({nick,password,classCode:cls}){
  const n=cleanNick(nick), c=classCode(cls), p=String(password||'');
  if(n.length<3) throw Object.assign(new Error('Der Nickname muss mindestens 3 Zeichen haben.'),{status:400});
  if(c.length<2) throw Object.assign(new Error('Bitte geben Sie eine gültige Klasse an.'),{status:400});
  if(p.length<6||p.length>100) throw Object.assign(new Error('Das Passwort muss mindestens 6 Zeichen haben.'),{status:400});
  if(!nickNorm(n)) throw Object.assign(new Error('Der Nickname enthält keine zulässigen Zeichen.'),{status:400});
  return {nick:n,classCode:c,password:p};
}
function publicUser(u){ return {nick:u.nick,classCode:u.classCode,role:u.role,createdAt:u.createdAt}; }
function sanitizeProgress(p,currentGen){
  const x=(p&&typeof p==='object')?p:{};
  const completed=(x.completed&&typeof x.completed==='object')?x.completed:{};
  const lessonRead=(x.lessonRead&&typeof x.lessonRead==='object')?x.lessonRead:{};
  const revealed=(x.revealed&&typeof x.revealed==='object')?x.revealed:{};
  return {version:2,_generation:currentGen,completed,lessonRead,revealed,unlocked:Array.isArray(x.unlocked)?x.unlocked.slice(0,50):[],selectedTheme:String(x.selectedTheme||'').slice(0,40),selectedAvatar:String(x.selectedAvatar||'🙂').slice(0,8),selectedPet:String(x.selectedPet||'').slice(0,8),lastActive:x.lastActive||null,streak:Number(x.streak)||0,xp:Math.max(0,Number(x.xp)||0),completedCount:Object.keys(completed).length,updatedAt:new Date().toISOString()};
}

export const handler = async (event) => {
  try{
    const action=event.queryStringParameters?.action||'';
    const body=parseBody(event);

    if(action==='register' && event.httpMethod==='POST'){
      const role=body.role==='teacher'?'teacher':'student';
      const c=validateCredentials(body);
      if(role==='teacher'){
        const required=process.env.TEACHER_CODE;
        if(!required) return json(500,{error:'TEACHER_CODE ist in Netlify noch nicht eingerichtet.'});
        if(String(body.teacherCode||'')!==required) return json(403,{error:'Der Lehrer-Code ist nicht korrekt.'});
      }
      const key=userKey(role,c.classCode,c.nick);
      if(await getJSON(users,key)) return json(409,{error:'Dieser Nickname existiert in dieser Klasse und Rolle bereits.'});
      const {salt,hash}=hashPassword(c.password);
      const user={nick:c.nick,classCode:c.classCode,role,salt,hash,authVersion:1,createdAt:new Date().toISOString()};
      await users.setJSON(key,user);
      let progress=null;
      if(role==='student'){progress=defaultProgress(1);await progressStore.setJSON(progressKey(c.classCode,c.nick),progress);}
      const token=await createSession(user,key);
      return json(200,{token,user:publicUser(user),progress});
    }

    if(action==='login' && event.httpMethod==='POST'){
      const role=body.role==='teacher'?'teacher':'student';
      const c=validateCredentials(body); const key=userKey(role,c.classCode,c.nick); const user=await getJSON(users,key);
      if(!user||!passwordOK(c.password,user)) return json(401,{error:'Nickname, Klasse oder Passwort ist nicht korrekt.'});
      const token=await createSession(user,key);
      const progress=role==='student' ? (await getJSON(progressStore,progressKey(user.classCode,user.nick)) || defaultProgress(1)) : null;
      return json(200,{token,user:publicUser(user),progress});
    }

    if(action==='logout' && event.httpMethod==='POST'){
      const s=await requireSession(event); await sessions.delete(s.tokenKey); return json(200,{ok:true});
    }

    if(action==='me' && event.httpMethod==='GET'){
      const s=await requireSession(event); const progress=s.user.role==='student' ? (await getJSON(progressStore,progressKey(s.user.classCode,s.user.nick))||defaultProgress(1)) : null;
      return json(200,{user:publicUser(s.user),progress});
    }

    if(action==='saveProgress' && event.httpMethod==='POST'){
      const s=await requireSession(event,'student'); const key=progressKey(s.user.classCode,s.user.nick); const current=await getJSON(progressStore,key)||defaultProgress(1);
      const incomingGen=Number(body.progress?._generation||1);
      if(incomingGen!==Number(current._generation||1)) return json(409,{error:'Der Lernstand wurde von der Lehrkraft zurückgesetzt. Bitte laden Sie die Seite neu.',progress:current});
      const clean=sanitizeProgress(body.progress,current._generation||1); await progressStore.setJSON(key,clean); return json(200,{ok:true,progress:clean});
    }

    if(action==='teacherClass' && event.httpMethod==='GET'){
      const s=await requireSession(event,'teacher'); const prefix=`student/${s.user.classCode}/`; const keys=await listKeys(users,prefix); const students=[];
      for(const key of keys){ const u=await getJSON(users,key); if(!u)continue; const p=await getJSON(progressStore,progressKey(u.classCode,u.nick))||defaultProgress(1); students.push({nick:u.nick,completedCount:Object.keys(p.completed||{}).length,xp:p.xp||0,lastActive:p.lastActive||p.updatedAt||null}); }
      students.sort((a,b)=>a.nick.localeCompare(b.nick,'de'));
      return json(200,{students});
    }

    if(action==='resetStudentPassword' && event.httpMethod==='POST'){
      const s=await requireSession(event,'teacher'); const target=cleanNick(body.targetNick); const newPassword=String(body.newPassword||''); if(newPassword.length<6)return json(400,{error:'Das neue Passwort muss mindestens 6 Zeichen haben.'});
      const key=userKey('student',s.user.classCode,target); const u=await getJSON(users,key); if(!u)return json(404,{error:'Nutzer nicht gefunden.'}); const {salt,hash}=hashPassword(newPassword); u.salt=salt;u.hash=hash;u.authVersion=(u.authVersion||1)+1;u.passwordResetAt=new Date().toISOString();await users.setJSON(key,u);return json(200,{ok:true});
    }

    if(action==='deleteStudent' && event.httpMethod==='POST'){
      const s=await requireSession(event,'teacher'); const key=userKey('student',s.user.classCode,body.targetNick); const u=await getJSON(users,key); if(!u)return json(404,{error:'Nutzer nicht gefunden.'}); await users.delete(key);await progressStore.delete(progressKey(s.user.classCode,u.nick));return json(200,{ok:true});
    }

    if(action==='resetStudentProgress' && event.httpMethod==='POST'){
      const s=await requireSession(event,'teacher'); const key=userKey('student',s.user.classCode,body.targetNick); const u=await getJSON(users,key); if(!u)return json(404,{error:'Nutzer nicht gefunden.'}); const pk=progressKey(s.user.classCode,u.nick); const cur=await getJSON(progressStore,pk)||defaultProgress(1); await progressStore.setJSON(pk,defaultProgress((cur._generation||1)+1)); return json(200,{ok:true});
    }

    if(action==='resetClassProgress' && event.httpMethod==='POST'){
      const s=await requireSession(event,'teacher'); const keys=await listKeys(users,`student/${s.user.classCode}/`); let count=0;
      for(const key of keys){const u=await getJSON(users,key);if(!u)continue;const pk=progressKey(u.classCode,u.nick);const cur=await getJSON(progressStore,pk)||defaultProgress(1);await progressStore.setJSON(pk,defaultProgress((cur._generation||1)+1));count++;}
      return json(200,{ok:true,count});
    }

    return json(404,{error:'Unbekannte Aktion.'});
  }catch(err){console.error(err);return json(err.status||500,{error:err.message||'Serverfehler'});}
};
