import { COURSE } from './course-data.js';

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const app = $('#app');
const toastEl = $('#toast');
const modalRoot = $('#modal-root');
const API = '/.netlify/functions/api';
const LOCAL_KEY = 'dbQuestRideLabProgressV2';
const AUTH_KEY = 'dbQuestRideLabSessionV2';

const lessonMap = new Map();
const chapterMap = new Map();
COURSE.chapters.forEach(ch => { chapterMap.set(ch.id, ch); ch.lessons.forEach(l => lessonMap.set(l.id, {...l, chapterId:ch.id})); });
const coreIds = Object.entries(COURSE.tasks).filter(([,t])=>!t.bonus).map(([id])=>id);
const bonusIds = Object.entries(COURSE.tasks).filter(([,t])=>t.bonus).map(([id])=>id);

const defaultProgress = () => ({
  version:2, _generation:1, completed:{}, lessonRead:{}, revealed:{}, unlocked:[], selectedTheme:'', selectedAvatar:'🙂', selectedPet:'', lastActive:null, streak:0, createdAt:new Date().toISOString()
});

let state = {
  progress: loadLocalProgress(),
  sessionToken: localStorage.getItem(AUTH_KEY) || '',
  user: null,
  teacherData: null,
  answers:{},
  classifySelections:{},
  saving:false
};

function loadLocalProgress(){
  try { return {...defaultProgress(), ...JSON.parse(localStorage.getItem(LOCAL_KEY)||'{}')}; } catch { return defaultProgress(); }
}
function saveLocalProgress(){ localStorage.setItem(LOCAL_KEY, JSON.stringify(state.progress)); }
function completedCount(){ return coreIds.filter(id=>state.progress.completed?.[id]).length; }
function bonusCount(){ return bonusIds.filter(id=>state.progress.completed?.[id]).length; }
function calcXP(){
  let xp=0;
  for(const id of Object.keys(state.progress.completed||{})) if(COURSE.tasks[id]) xp += COURSE.tasks[id].xp||0;
  xp += Object.keys(state.progress.lessonRead||{}).length * 5;
  return xp;
}
function progressPct(){ return Math.round(completedCount()/COURSE.coreTaskCount*100); }
function chapterStats(ch){
  const ids=ch.lessons.flatMap(l=>l.tasks);
  const done=ids.filter(id=>state.progress.completed[id]).length;
  return {done,total:ids.length,pct:Math.round(done/ids.length*100)};
}
function lessonDone(lesson){ return lesson.tasks.every(id=>state.progress.completed[id]); }
function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function parseNum(v){ if(v==null) return NaN; let s=String(v).trim().replace(/\s/g,'').replace(/[^0-9+\-.,]/g,''); const hasC=s.includes(','),hasD=s.includes('.'); if(hasC&&hasD){ if(s.lastIndexOf(',')>s.lastIndexOf('.')) s=s.replace(/\./g,'').replace(',','.'); else s=s.replace(/,/g,''); } else if(hasC){ s=s.replace(',','.'); } else if(hasD){ const parts=s.split('.'); if(parts.length===2 && parts[1].length===3 && parts[0].replace(/[+\-]/g,'').length>=1) s=parts.join(''); } return Number(s); }
function eqNum(a,b,t=.01){ return Number.isFinite(a) && Math.abs(a-b) <= (t??.01); }
function fmtNum(n){ return new Intl.NumberFormat('de-DE',{maximumFractionDigits:2}).format(n); }
function todayKey(){ return new Date().toISOString().slice(0,10); }
function updateStreak(){
  const today=todayKey(); const last=state.progress.lastActive;
  if(last===today) return;
  if(last){ const d1=new Date(last+'T00:00:00'); const d2=new Date(today+'T00:00:00'); const diff=Math.round((d2-d1)/86400000); state.progress.streak = diff===1 ? (state.progress.streak||0)+1 : 1; }
  else state.progress.streak=1;
  state.progress.lastActive=today; saveLocalProgress();
}
function mergeProgress(a,b){
  if((b?._generation||1) > (a?._generation||1)) return {...defaultProgress(),...b};
  const merged={...defaultProgress(),...a,...b};
  merged.completed={...(a?.completed||{}),...(b?.completed||{})};
  merged.lessonRead={...(a?.lessonRead||{}),...(b?.lessonRead||{})};
  merged.revealed={...(a?.revealed||{}),...(b?.revealed||{})};
  merged.unlocked=[...new Set([...(a?.unlocked||[]),...(b?.unlocked||[])])];
  merged.selectedTheme=b?.selectedTheme||a?.selectedTheme||'';
  merged.selectedAvatar=b?.selectedAvatar||a?.selectedAvatar||'🙂';
  merged.selectedPet=b?.selectedPet||a?.selectedPet||'';
  merged.streak=Math.max(a?.streak||0,b?.streak||0);
  merged.lastActive=[a?.lastActive,b?.lastActive].filter(Boolean).sort().at(-1)||null;
  return merged;
}

function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(toast._t); toast._t=setTimeout(()=>toastEl.classList.remove('show'),2600); }
function modal({title,text,confirm='Bestätigen',cancel='Abbrechen',danger=false,onConfirm}){
  modalRoot.innerHTML=`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><div class="modal-actions"><button class="btn secondary" data-modal-cancel>${cancel}</button><button class="btn ${danger?'danger':'primary'}" data-modal-ok>${confirm}</button></div></div></div>`;
  $('[data-modal-cancel]',modalRoot).onclick=()=>modalRoot.innerHTML='';
  $('[data-modal-ok]',modalRoot).onclick=()=>{modalRoot.innerHTML='';onConfirm?.();};
}

async function api(action,{method='GET',body}={}){
  const headers={'Content-Type':'application/json'};
  if(state.sessionToken) headers.Authorization=`Bearer ${state.sessionToken}`;
  const r=await fetch(`${API}?action=${encodeURIComponent(action)}`,{method,headers,body:body?JSON.stringify(body):undefined});
  const data=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(data.error||'Serverfehler');
  return data;
}

async function syncProgress(){
  saveLocalProgress();
  if(!state.user || state.user.role!=='student' || !state.sessionToken) return;
  if(state.saving) { state.pendingSave=true; return; }
  state.saving=true;
  try { state.progress.xp=calcXP(); state.progress.completedCount=completedCount(); await api('saveProgress',{method:'POST',body:{progress:state.progress}}); }
  catch(e){ console.warn(e); toast('Fortschritt lokal gespeichert. Cloud-Synchronisierung derzeit nicht möglich.'); }
  finally { state.saving=false; if(state.pendingSave){state.pendingSave=false;syncProgress();} }
}

function currentRoute(){
  const raw=location.hash.replace(/^#/,'')||'home';
  const [page,param]=raw.split('=');
  return {page,param};
}
function go(route){ location.hash=route; }
function applyTheme(){
  document.body.classList.remove('theme-sunset','theme-forest','theme-night');
  if(state.progress.selectedTheme) document.body.classList.add(state.progress.selectedTheme);
}
function avatarIcon(){ return state.progress.selectedAvatar||'🙂'; }
function petIcon(){ return state.progress.selectedPet||''; }

function shell(content){
  const route=currentRoute(); const xp=calcXP(); const pct=progressPct();
  return `
    <header class="topbar">
      <div class="brand" role="button" tabindex="0" data-go="home"><div class="brand-mark">DB</div><div><h1>${COURSE.title}</h1><small>${COURSE.subtitle}</small></div></div>
      <div class="top-progress"><div class="progress-label"><span>Kursfortschritt</span><span>${completedCount()}/${COURSE.coreTaskCount} · ${pct}%</span></div><div class="progress-track"><span style="width:${pct}%"></span></div></div>
      <div class="user-chip" data-go="account"><div class="avatar-mini">${avatarIcon()}</div><div class="meta"><strong>${state.user?escapeHtml(state.user.nick):'Gastmodus'}</strong><small>${state.user?escapeHtml(state.user.classCode):'lokal gespeichert'} · ${xp} XP</small></div>${petIcon()?`<div class="pet-mini">${petIcon()}</div>`:''}</div>
    </header>
    <div class="layout">
      <aside class="sidebar">${sidebar(route)}</aside>
      <main class="main"><div class="content-wrap">${content}</div></main>
    </div>
    <nav class="mobile-nav">${mobileNav(route)}</nav>`;
}
function sidebar(route){
  let html=`<div class="nav-title">Navigation</div>
    ${navBtn('home','🏠','Start',route.page==='home')}
    ${navBtn('shop','🎁','XP-Galerie',route.page==='shop')}
    ${navBtn('account','👤','Konto',route.page==='account')}
    ${state.user?.role==='teacher'?navBtn('teacher','📋','Lehrerbereich',route.page==='teacher'):''}
    <div class="chapter-nav"><div class="nav-title">Lernpfad</div>`;
  COURSE.chapters.forEach(ch=>{
    const st=chapterStats(ch); html+=`<div class="chapter-head"><span>${ch.icon} ${escapeHtml(ch.title)}</span><small>${st.done}/${st.total}</small></div>`;
    ch.lessons.forEach(l=>html+=`<button class="nav-item lesson-link ${route.param===l.id?'active':''} ${lessonDone(l)?'done':''}" data-go="lesson=${l.id}"><span>${escapeHtml(l.title)}</span></button>`);
  });
  html+=`</div><div class="sidebar-footer"><b>${calcXP()} XP</b><br><span class="streak">${state.progress.streak||1} Tage Lernserie</span><br>${bonusCount()} Bonusmissionen geschafft</div>`;
  return html;
}
function navBtn(page,icon,label,active){ return `<button class="nav-item ${active?'active':''}" data-go="${page}"><span class="nicon">${icon}</span><span>${label}</span></button>`; }
function mobileNav(route){
  const items=[['home','🏠','Start'],['lesson=l1','📚','Lernen'],['shop','🎁','Galerie'],['account','👤','Konto']]; if(state.user?.role==='teacher')items.push(['teacher','📋','Klasse']); else items.push(['lesson=l11','🎯','BEP']);
  return items.map(([r,i,l])=>`<button class="${route.page===r.split('=')[0]&&(!r.includes('=')||route.param===r.split('=')[1])?'active':''}" data-go="${r}"><span>${i}</span>${l}</button>`).join('');
}

function render(){
  applyTheme();
  const {page,param}=currentRoute(); let content='';
  if(page==='home') content=renderHome();
  else if(page==='lesson' && lessonMap.has(param)) content=renderLesson(param);
  else if(page==='shop') content=renderShop();
  else if(page==='account') content=renderAccount();
  else if(page==='teacher') content=renderTeacher();
  else content=renderHome();
  app.innerHTML=shell(content); bindGlobal(); bindPage();
}
function bindGlobal(){
  $$('[data-go]').forEach(el=>el.onclick=()=>go(el.dataset.go));
  $$('.brand[data-go]').forEach(el=>el.onkeydown=e=>{if(e.key==='Enter')go(el.dataset.go)});
}

function renderHome(){
  const pct=progressPct(); const next=nextLesson();
  return `<section class="hero-grid">
    <article class="hero-card"><span class="kicker">🎮 Lernmission aktiv</span><h2>Kosten im Griff. Break-even im Blick.</h2>${COURSE.caseIntro}<div class="hero-actions"><button class="btn primary" data-go="lesson=${next.id}">${completedCount()?'Weiterlernen':'Mission starten'} →</button><button class="btn ghost" data-go="shop">XP-Galerie öffnen</button></div></article>
    <div class="stat-grid"><div class="stat"><div class="big">${calcXP()}</div><small>gesammelte XP</small></div><div class="stat"><div class="big">${pct}%</div><small>Kurs abgeschlossen</small></div><div class="stat"><div class="big">${completedCount()}</div><small>von ${COURSE.coreTaskCount} Kernaufgaben</small></div><div class="stat"><div class="big">${bonusCount()}</div><small>Bonusmissionen</small></div><div class="stat avatar-card"><div class="avatar-large">${avatarIcon()}${petIcon()?`<span class="pet-float">${petIcon()}</span>`:''}</div><div><strong>Ihr Kurs-Avatar</strong><br><small>Neue Looks und Begleiter werden mit XP freigeschaltet.</small></div></div></div>
  </section>
  ${!state.user?`<div class="guest-note" style="margin-top:18px"><strong>Sie arbeiten gerade ohne Anmeldung.</strong> Ihr Fortschritt bleibt auf diesem Gerät gespeichert. Mit einem Schülerkonto können Sie auf mehreren Geräten weiterarbeiten.</div>`:''}
  ${pct===100?`<div class="completion-banner" style="margin-top:18px"><strong>Kursziel erreicht.</strong> Sie haben alle Kernaufgaben abgeschlossen. Nutzen Sie die Bonusmissionen und wiederholen Sie gezielt schwierige Kapitel.</div>`:''}
  <div class="page-title" style="margin-top:28px"><div><h2>Ihr Lernpfad</h2><p>Jedes Kapitel enthält Erklärungen, Beispiele, Schaubilder und interaktive Aufgaben. Die Aufgaben bauen schrittweise aufeinander auf.</p></div></div>
  <section class="chapter-cards">${COURSE.chapters.map(ch=>{const s=chapterStats(ch);return `<article class="chapter-card" style="--c:${ch.color}"><h3>${ch.icon} ${escapeHtml(ch.title)}</h3><p>${escapeHtml(ch.description)}</p><div class="chapter-progress"><div class="progress-track"><span style="width:${s.pct}%"></span></div><small>${s.done}/${s.total}</small></div><div class="hero-actions">${ch.lessons.map(l=>`<button class="btn secondary small" data-go="lesson=${l.id}">${escapeHtml(l.title)}</button>`).join('')}</div></article>`}).join('')}</section>`;
}
function nextLesson(){
  for(const ch of COURSE.chapters) for(const l of ch.lessons) if(!lessonDone(l)) return l;
  return COURSE.chapters[0].lessons[0];
}

function renderLesson(id){
  const l=lessonMap.get(id); const ch=chapterMap.get(l.chapterId); const idx=COURSE.chapters.flatMap(c=>c.lessons).findIndex(x=>x.id===id)+1;
  const done=l.tasks.filter(t=>state.progress.completed[t]).length;
  return `<div class="lesson-hero"><div><span class="kicker">${ch.icon} ${escapeHtml(ch.title)}</span><div class="page-title" style="margin:8px 0 0"><div><h2>${escapeHtml(l.title)}</h2><p>${escapeHtml(l.intro)}</p></div></div></div><div class="lesson-badge">${l.icon}</div></div>
    <section class="lesson-content">${l.html}</section>
    <div class="hero-actions" style="margin:18px 0"><button class="btn ${state.progress.lessonRead[id]?'success':'secondary'}" data-read-lesson="${id}">${state.progress.lessonRead[id]?'✓ Erklärung gelesen':'Erklärung als gelesen markieren · +5 XP'}</button></div>
    <div class="practice-head"><div><h2 style="margin:0">Übungsarena</h2><small>${done}/${l.tasks.length} Aufgaben abgeschlossen</small></div><span class="kicker">Aufgaben ${idx}</span></div>
    <section class="task-list">${l.tasks.map((tid,i)=>renderTask(tid,i+1)).join('')}</section>
    ${ch.bonusTask && ch.lessons.at(-1).id===id?`<div class="practice-head"><div><h2 style="margin:0">Bonusmission</h2><small>Zusätzliche Transferaufgabe mit Extra-XP.</small></div><span class="kicker">💎 Bonus</span></div>${renderTask(ch.bonusTask,'★')}`:''}
    <div class="hero-actions" style="justify-content:space-between;margin-top:24px">${lessonNav(id)}</div>`;
}
function lessonNav(id){
  const all=COURSE.chapters.flatMap(c=>c.lessons); const i=all.findIndex(l=>l.id===id); const prev=all[i-1], next=all[i+1];
  return `${prev?`<button class="btn secondary" data-go="lesson=${prev.id}">← ${escapeHtml(prev.title)}</button>`:'<span></span>'}${next?`<button class="btn primary" data-go="lesson=${next.id}">${escapeHtml(next.title)} →</button>`:`<button class="btn primary" data-go="shop">Zur XP-Galerie →</button>`}`;
}

function renderTask(id,no){
  const t=COURSE.tasks[id]; const done=!!state.progress.completed[id];
  return `<article class="task-card ${done?'completed':''}" data-task="${id}"><div class="task-top"><span class="task-no">${no}</span><div><strong>${t.bonus?'Bonusmission':'Challenge'}</strong><div class="task-mini">${typeLabel(t.type)}</div></div><span class="xp">${done?'✓ ':''}+${t.xp} XP</span></div><div class="task-body"><div class="task-prompt">${escapeHtml(t.prompt)}</div>${taskInput(id,t)}<div class="task-actions">${t.type==='freeText'?`<button class="btn secondary" data-solution="${id}">Musterlösung ansehen</button>`:`<button class="btn primary" data-check="${id}">Antwort prüfen</button><button class="btn secondary" data-solution="${id}">Musterlösung ansehen</button>`}${done?`<span class="kicker">Erledigt</span>`:''}</div><div class="feedback-slot"></div>${state.progress.revealed[id]?solutionHtml(t):''}${t.type==='freeText'&&state.progress.revealed[id]?selfCheckHtml(id,done):''}</div></article>`;
}
function typeLabel(type){return ({single:'Single Choice',multi:'Multiple Choice',truefalse:'Richtig / Falsch',numeric:'Rechenaufgabe',multiNumeric:'Mehrschritt-Rechnung',matching:'Zuordnung',classify:'Drag & Drop / Zuordnung',freeText:'Freitext + Selbsteinschätzung',order:'Reihenfolge'}[type]||'Aufgabe');}
function taskInput(id,t){
  const a=state.answers[id];
  if(t.type==='single') return `<div class="options">${t.options.map((o,i)=>`<button class="option ${a===i?'selected':''}" data-single="${id}" data-v="${i}"><span>○</span>${escapeHtml(o)}</button>`).join('')}</div>`;
  if(t.type==='multi') { const arr=a||[]; return `<div class="options">${t.options.map((o,i)=>`<button class="option ${arr.includes(i)?'selected':''}" data-multi="${id}" data-v="${i}"><span>□</span>${escapeHtml(o)}</button>`).join('')}</div>`; }
  if(t.type==='truefalse') return `<div class="options"><button class="option ${a===true?'selected':''}" data-bool="${id}" data-v="true">Richtig</button><button class="option ${a===false?'selected':''}" data-bool="${id}" data-v="false">Falsch</button></div>`;
  if(t.type==='numeric') return `<div class="input-row"><input class="answer-input numeric-input" inputmode="decimal" data-num="${id}" value="${a??''}" placeholder="Zahl eingeben"><strong>${escapeHtml(t.unit||'')}</strong></div>`;
  if(t.type==='multiNumeric'){ const vals=a||{}; return `<div class="field-grid">${t.fields.map((f,i)=>`<div class="field-card"><label>${escapeHtml(f[0])}</label><div class="input-row"><input class="answer-input" inputmode="decimal" data-multinum="${id}" data-i="${i}" value="${vals[i]??''}" placeholder="Zahl"><span>${escapeHtml(f[2]||'')}</span></div></div>`).join('')}</div>`; }
  if(t.type==='matching'){ const vals=a||{}; const choices=[...new Set(t.pairs.map(p=>p[1]))]; return `<div>${t.pairs.map((p,i)=>`<div class="match-row"><strong>${escapeHtml(p[0])}</strong><select class="answer-input" data-match="${id}" data-i="${i}"><option value="">Bitte wählen</option>${choices.map(c=>`<option ${vals[i]===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}</select></div>`).join('')}</div>`; }
  if(t.type==='classify') return classifyHtml(id,t);
  if(t.type==='freeText') return `<textarea rows="5" class="answer-input" data-free="${id}" placeholder="${escapeHtml(t.placeholder||'Ihre Antwort eingeben')}">${escapeHtml(a||'')}</textarea><div class="task-mini">Die Antwort wird nicht automatisch bewertet. Vergleichen Sie anschließend selbst mit der Musterlösung.</div>`;
  if(t.type==='order'){ const arr=a||t.startOrder||t.items.map((_,i)=>i); return `<div class="order-list">${arr.map((idx,pos)=>`<div class="option"><span>${pos+1}.</span><span style="flex:1">${escapeHtml(t.items[idx])}</span><button class="btn small secondary" data-order-up="${id}" data-pos="${pos}">↑</button><button class="btn small secondary" data-order-down="${id}" data-pos="${pos}">↓</button></div>`).join('')}</div>`; }
  return '';
}
function classifyHtml(id,t){
  const vals=state.answers[id]||{}; const unplaced=t.items.filter((it,i)=>vals[i]==null);
  const chip=(it,i)=>`<button class="drag-chip ${state.classifySelections[id]===i?'selected':''}" draggable="true" data-chip="${id}" data-i="${i}">${escapeHtml(it[0])}</button>`;
  return `<div class="classify-layout"><div class="classify-bank"><strong style="width:100%">Noch zuordnen</strong>${unplaced.map(it=>{const i=t.items.indexOf(it);return chip(it,i)}).join('')||'<small>Alle Karten wurden zugeordnet.</small>'}</div>${t.categories.map(cat=>`<div class="drop-zone" data-zone="${id}" data-cat="${cat[0]}"><h4>${escapeHtml(cat[1])}</h4>${t.items.map((it,i)=>vals[i]===cat[0]?chip(it,i):'').join('')}</div>`).join('')}<div class="task-mini" style="grid-column:1/-1">Desktop: ziehen. Smartphone: Karte antippen, danach Zielbereich antippen.</div></div>`;
}
function solutionHtml(t){ return `<div class="solution-box"><strong>Musterlösung</strong><div>${escapeHtml(t.solution)}</div></div>`; }
function selfCheckHtml(id,done){ return `<div class="free-selfcheck"><button class="btn success" data-self-ok="${id}" ${done?'disabled':''}>Meine Antwort passt</button><button class="btn secondary" data-self-edit="${id}">Ich überarbeite noch</button></div>`; }

function bindPage(){
  $$('[data-read-lesson]').forEach(b=>b.onclick=()=>markLessonRead(b.dataset.readLesson));
  $$('[data-single]').forEach(b=>b.onclick=()=>{state.answers[b.dataset.single]=+b.dataset.v;render();});
  $$('[data-multi]').forEach(b=>b.onclick=()=>{const id=b.dataset.multi,i=+b.dataset.v,arr=state.answers[id]||[]; state.answers[id]=arr.includes(i)?arr.filter(x=>x!==i):[...arr,i];render();});
  $$('[data-bool]').forEach(b=>b.onclick=()=>{state.answers[b.dataset.bool]=b.dataset.v==='true';render();});
  $$('[data-num]').forEach(i=>i.oninput=()=>state.answers[i.dataset.num]=i.value);
  $$('[data-multinum]').forEach(i=>i.oninput=()=>{const id=i.dataset.multinum;state.answers[id]=state.answers[id]||{};state.answers[id][i.dataset.i]=i.value;});
  $$('[data-match]').forEach(s=>s.onchange=()=>{const id=s.dataset.match;state.answers[id]=state.answers[id]||{};state.answers[id][s.dataset.i]=s.value;});
  $$('[data-free]').forEach(t=>t.oninput=()=>state.answers[t.dataset.free]=t.value);
  $$('[data-check]').forEach(b=>b.onclick=()=>checkTask(b.dataset.check));
  $$('[data-solution]').forEach(b=>b.onclick=()=>askSolution(b.dataset.solution));
  $$('[data-self-ok]').forEach(b=>b.onclick=()=>completeTask(b.dataset.selfOk));
  $$('[data-self-edit]').forEach(b=>b.onclick=()=>{const t=$(`[data-free="${b.dataset.selfEdit}"]`);t?.focus();});
  bindClassify(); bindOrder(); bindAuth(); bindShop(); bindTeacher();
}
function bindClassify(){
  $$('[data-chip]').forEach(chip=>{
    chip.ondragstart=e=>{e.dataTransfer.setData('text/plain',JSON.stringify({id:chip.dataset.chip,i:+chip.dataset.i}));};
    chip.onclick=()=>{const id=chip.dataset.chip,i=+chip.dataset.i; state.classifySelections[id]=state.classifySelections[id]===i?null:i; render();};
  });
  $$('[data-zone]').forEach(z=>{
    z.ondragover=e=>{e.preventDefault();z.classList.add('over')}; z.ondragleave=()=>z.classList.remove('over');
    z.ondrop=e=>{e.preventDefault();z.classList.remove('over');try{const x=JSON.parse(e.dataTransfer.getData('text/plain'));placeClassify(x.id,x.i,z.dataset.cat);}catch{}};
    z.onclick=e=>{ if(e.target.closest('[data-chip]'))return; const id=z.dataset.zone,i=state.classifySelections[id]; if(i!=null)placeClassify(id,i,z.dataset.cat); };
  });
}
function placeClassify(id,i,cat){ state.answers[id]=state.answers[id]||{};state.answers[id][i]=cat;state.classifySelections[id]=null;render(); }
function bindOrder(){
  $$('[data-order-up]').forEach(b=>b.onclick=()=>moveOrder(b.dataset.order,+b.dataset.pos,-1));
  $$('[data-order-down]').forEach(b=>b.onclick=()=>moveOrder(b.dataset.order,+b.dataset.pos,1));
}
function moveOrder(id,pos,dir){ const t=COURSE.tasks[id],arr=state.answers[id]||[...(t.startOrder||t.items.map((_,i)=>i))],np=pos+dir;if(np<0||np>=arr.length)return;[arr[pos],arr[np]]=[arr[np],arr[pos]];state.answers[id]=arr;render(); }

function checkTask(id){
  const t=COURSE.tasks[id],a=state.answers[id]; let ok=false;
  if(t.type==='single'||t.type==='truefalse') ok=a===t.answer;
  else if(t.type==='multi') { const x=[...(a||[])].sort((x,y)=>x-y),y=[...t.answer].sort((x,y)=>x-y); ok=JSON.stringify(x)===JSON.stringify(y); }
  else if(t.type==='numeric') ok=eqNum(parseNum(a),t.answer,t.tolerance??.01);
  else if(t.type==='multiNumeric') ok=t.fields.every((f,i)=>eqNum(parseNum(a?.[i]),f[1],t.tolerance??.01));
  else if(t.type==='matching') ok=t.pairs.every((p,i)=>a?.[i]===p[1]);
  else if(t.type==='classify') ok=t.items.every((p,i)=>a?.[i]===p[1]);
  else if(t.type==='order') ok=(a||t.startOrder||t.items.map((_,i)=>i)).every((v,i)=>v===t.answer[i]);
  const card=$(`[data-task="${id}"]`); const slot=card?.querySelector('.feedback-slot');
  if(ok){ if(slot)slot.innerHTML='<div class="feedback good">Richtig. Sie haben den Zusammenhang sauber angewendet.</div>'; completeTask(id,false); }
  else if(slot) slot.innerHTML='<div class="feedback bad">Noch nicht ganz. Prüfen Sie Rechenweg, Einheit und Vorzeichen und versuchen Sie es erneut.</div>';
}
function completeTask(id,rerender=true){
  if(!state.progress.completed[id]){ state.progress.completed[id]=new Date().toISOString(); toast(`Geschafft: +${COURSE.tasks[id].xp} XP`); syncProgress(); }
  if(rerender)render(); else {saveLocalProgress();setTimeout(render,600);}
}
function markLessonRead(id){ if(!state.progress.lessonRead[id]){state.progress.lessonRead[id]=new Date().toISOString();toast('+5 XP für die Erklärung');syncProgress();render();} }
function askSolution(id){
  modal({title:'Musterlösung anzeigen?',text:'Sind Sie sicher oder möchten Sie es noch einmal selbst versuchen? Sie können Ihre Antwort auch nach dem Anzeigen weiter überarbeiten.',confirm:'Musterlösung anzeigen',cancel:'Noch einmal versuchen',onConfirm:()=>{state.progress.revealed[id]=true;syncProgress();render();}});
}

function renderShop(){
  const xp=calcXP(); const unlocked=new Set(state.progress.unlocked||[]); const badges=COURSE.badges.map(b=>({...b,ok:b.test({completedCount:completedCount(),bonusCount:bonusCount()})}));
  return `<div class="page-title"><div><h2>XP-Galerie</h2><p>Ihre XP schalten neue Designs, Avatare und Begleiter frei. XP werden dabei nicht verbraucht.</p></div><span class="kicker">${xp} XP</span></div>
  <section class="panel"><h3 style="margin-top:0">Freischaltungen</h3><div class="shop-grid">${COURSE.shop.map(item=>{const available=xp>=item.require,isUnlocked=unlocked.has(item.id),equipped=(item.kind==='theme'&&state.progress.selectedTheme===item.css)||(item.kind==='avatar'&&state.progress.selectedAvatar===item.icon)||(item.kind==='pet'&&state.progress.selectedPet===item.icon);return `<article class="shop-item ${available?'':'locked'} ${equipped?'equipped':''}"><div class="shop-icon">${item.icon}</div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><small>${item.require} XP erforderlich</small><div style="margin-top:12px">${!available?`<span class="kicker">Noch ${item.require-xp} XP</span>`:!isUnlocked?`<button class="btn primary small" data-unlock="${item.id}">Freischalten</button>`:`<button class="btn ${equipped?'success':'secondary'} small" data-equip="${item.id}">${equipped?'✓ Ausgewählt':'Auswählen'}</button>`}</div></article>`}).join('')}</div></section>
  <section class="panel" style="margin-top:18px"><h3 style="margin-top:0">Abzeichen</h3><div class="badge-row">${badges.map(b=>`<div class="badge ${b.ok?'':'locked'}">${b.icon} ${escapeHtml(b.name)}</div>`).join('')}</div></section>`;
}
function bindShop(){
  $$('[data-unlock]').forEach(b=>b.onclick=()=>{state.progress.unlocked=[...new Set([...(state.progress.unlocked||[]),b.dataset.unlock])];toast('Freigeschaltet.');syncProgress();render();});
  $$('[data-equip]').forEach(b=>b.onclick=()=>{const item=COURSE.shop.find(x=>x.id===b.dataset.equip);if(!item)return;if(item.kind==='theme')state.progress.selectedTheme=item.css;if(item.kind==='avatar')state.progress.selectedAvatar=item.icon;if(item.kind==='pet')state.progress.selectedPet=item.icon;syncProgress();render();});
}

function renderAccount(){
  if(state.user) return `<div class="page-title"><div><h2>Konto</h2><p>Ihr Lernstand ist mit diesem Konto verknüpft.</p></div></div><section class="auth-grid"><article class="auth-card"><h3>${state.user.role==='teacher'?'Lehrerkonto':'Schülerkonto'}</h3><p><strong>Nickname:</strong> ${escapeHtml(state.user.nick)}<br><strong>Klasse:</strong> ${escapeHtml(state.user.classCode)}<br><strong>Rolle:</strong> ${state.user.role==='teacher'?'Lehrkraft':'Schüler/in'}</p><button class="btn secondary" data-logout>Abmelden</button>${state.user.role==='teacher'?` <button class="btn primary" data-go="teacher">Lehrerbereich</button>`:''}</article><article class="auth-card"><h3>Fortschritt</h3><p>${completedCount()} von ${COURSE.coreTaskCount} Kernaufgaben · ${calcXP()} XP · Lernserie ${state.progress.streak||1}</p><p class="task-mini">Bei Schülerkonten wird der Fortschritt nach Änderungen automatisch mit Netlify Blobs synchronisiert.</p></article></section>`;
  return `<div class="page-title"><div><h2>Anmelden oder Konto anlegen</h2><p>Ohne Konto können Sie den Kurs vollständig bearbeiten. Ein Konto ermöglicht die geräteübergreifende Speicherung.</p></div></div><section class="auth-grid">
    <article class="auth-card"><h3>Anmelden</h3><form class="form-grid" data-login><label>Rolle<select name="role"><option value="student">Schüler/in</option><option value="teacher">Lehrkraft</option></select></label><label>Klasse<input name="classCode" required placeholder="z. B. FOS12A"></label><label>Nickname<input name="nick" required autocomplete="username" placeholder="Ihr Nickname"></label><label>Passwort<input type="password" name="password" required autocomplete="current-password"></label><button class="btn primary">Anmelden</button></form></article>
    <article class="auth-card"><h3>Neues Konto</h3><form class="form-grid" data-register><label>Rolle<select name="role" data-reg-role><option value="student">Schüler/in</option><option value="teacher">Lehrkraft</option></select></label><label>Klasse<input name="classCode" required placeholder="z. B. FOS12A"></label><label>Nickname<input name="nick" required autocomplete="username" placeholder="3–24 Zeichen"></label><label>Passwort<input type="password" name="password" required autocomplete="new-password" minlength="6"></label><label class="teacher-code" style="display:none">Lehrer-Code<input type="password" name="teacherCode" placeholder="Code aus Netlify"></label><button class="btn primary">Konto anlegen</button></form></article>
  </section>`;
}
function bindAuth(){
  const role=$('[data-reg-role]'); if(role) role.onchange=()=>{const el=$('.teacher-code');if(el)el.style.display=role.value==='teacher'?'block':'none';};
  const lf=$('[data-login]'); if(lf)lf.onsubmit=async e=>{e.preventDefault();const f=new FormData(lf);try{const d=await api('login',{method:'POST',body:Object.fromEntries(f)});await acceptAuth(d);toast('Anmeldung erfolgreich.');go(d.user.role==='teacher'?'teacher':'home');}catch(err){toast(err.message)}};
  const rf=$('[data-register]'); if(rf)rf.onsubmit=async e=>{e.preventDefault();const f=new FormData(rf);try{const d=await api('register',{method:'POST',body:Object.fromEntries(f)});await acceptAuth(d);toast('Konto angelegt.');go(d.user.role==='teacher'?'teacher':'home');}catch(err){toast(err.message)}};
  const lo=$('[data-logout]'); if(lo)lo.onclick=async()=>{try{await api('logout',{method:'POST'});}catch{} state.sessionToken='';state.user=null;localStorage.removeItem(AUTH_KEY);toast('Abgemeldet.');render();};
}
async function acceptAuth(d){
  state.sessionToken=d.token; localStorage.setItem(AUTH_KEY,d.token); state.user=d.user;
  if(d.user.role==='student'){ state.progress=mergeProgress(state.progress,d.progress||{}); updateStreak(); await syncProgress(); }
}
async function restoreSession(){
  if(!state.sessionToken)return;
  try{const d=await api('me');state.user=d.user;if(d.user.role==='student'&&d.progress)state.progress=mergeProgress(state.progress,d.progress);}
  catch{state.sessionToken='';state.user=null;localStorage.removeItem(AUTH_KEY);}
}

function renderTeacher(){
  if(!state.user || state.user.role!=='teacher') return `<div class="page-title"><div><h2>Lehrerbereich</h2><p>Bitte melden Sie sich mit einem Lehrerkonto an.</p></div></div><button class="btn primary" data-go="account">Zum Konto</button>`;
  const d=state.teacherData;
  return `<div class="page-title"><div><h2>Lehrerbereich · ${escapeHtml(state.user.classCode)}</h2><p>Sie sehen ausschließlich die Nutzerinnen und Nutzer Ihrer zugeordneten Klasse.</p></div><button class="btn secondary" data-teacher-refresh>Aktualisieren</button></div>
    <section class="panel"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><div><h3 style="margin:0">Klassenfortschritt</h3><small>${d?d.students.length:0} Schülerkonten</small></div><button class="btn danger" data-reset-class>Gesamten Klassenfortschritt zurücksetzen</button></div>
    ${!d?'<div class="empty">Daten werden geladen …</div>':teacherTable(d.students)}</section>`;
}
function teacherTable(students){ if(!students.length)return '<div class="empty">Noch keine Schülerkonten in dieser Klasse.</div>'; return `<div style="overflow:auto;margin-top:16px"><table class="teacher-table"><thead><tr><th>Nickname</th><th>Fortschritt</th><th>XP</th><th>Letzte Aktivität</th><th>Aktionen</th></tr></thead><tbody>${students.map(s=>`<tr><td><strong>${escapeHtml(s.nick)}</strong></td><td>${s.completedCount}/${COURSE.coreTaskCount}</td><td>${s.xp||0}</td><td>${escapeHtml(s.lastActive||'—')}</td><td><div class="teacher-actions"><button class="btn small secondary" data-reset-progress="${escapeHtml(s.nick)}">Fortschritt löschen</button><button class="btn small secondary" data-reset-password="${escapeHtml(s.nick)}">Passwort setzen</button><button class="btn small danger" data-delete-student="${escapeHtml(s.nick)}">Nutzer entfernen</button></div></td></tr>`).join('')}</tbody></table></div>`; }
function bindTeacher(){
  if(currentRoute().page==='teacher'&&state.user?.role==='teacher'&&!state.teacherData)loadTeacher();
  const r=$('[data-teacher-refresh]'); if(r)r.onclick=loadTeacher;
  $$('[data-reset-progress]').forEach(b=>b.onclick=()=>modal({title:'Fortschritt löschen?',text:`Der gesamte Kursfortschritt von ${b.dataset.resetProgress} wird gelöscht.`,danger:true,confirm:'Fortschritt löschen',onConfirm:()=>teacherAction('resetStudentProgress',{targetNick:b.dataset.resetProgress})}));
  $$('[data-delete-student]').forEach(b=>b.onclick=()=>modal({title:'Nutzer entfernen?',text:`Das Konto ${b.dataset.deleteStudent} und sein Fortschritt werden gelöscht.`,danger:true,confirm:'Nutzer löschen',onConfirm:()=>teacherAction('deleteStudent',{targetNick:b.dataset.deleteStudent})}));
  $$('[data-reset-password]').forEach(b=>b.onclick=()=>{const pw=prompt(`Neues Passwort für ${b.dataset.resetPassword} (mindestens 6 Zeichen):`);if(pw)teacherAction('resetStudentPassword',{targetNick:b.dataset.resetPassword,newPassword:pw});});
  const rc=$('[data-reset-class]'); if(rc)rc.onclick=()=>modal({title:'Gesamten Klassenfortschritt löschen?',text:'Alle gespeicherten Lernfortschritte dieser Klasse werden auf null gesetzt. Die Konten bleiben bestehen.',danger:true,confirm:'Klasse zurücksetzen',onConfirm:()=>teacherAction('resetClassProgress',{})});
}
async function loadTeacher(){ try{state.teacherData=await api('teacherClass');render();}catch(e){toast(e.message);} }
async function teacherAction(action,body){ try{await api(action,{method:'POST',body});toast('Änderung gespeichert.');state.teacherData=null;await loadTeacher();}catch(e){toast(e.message);} }

updateStreak();
await restoreSession();
render();
window.addEventListener('hashchange',render);
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/service-worker.js').catch(()=>{}));
