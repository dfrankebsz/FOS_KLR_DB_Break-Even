import { COURSE } from '../public/course-data.js';
const errors=[];
const ids=[];
for(const ch of COURSE.chapters){
  if(ch.lessons.length<1) errors.push(`Kapitel ${ch.id} ohne Lektionen`);
  for(const l of ch.lessons){
    if(l.tasks.length<3) errors.push(`Lektion ${l.id}: zu wenige Aufgaben`);
    for(const id of l.tasks){ ids.push(id); if(!COURSE.tasks[id]) errors.push(`Fehlende Aufgabe ${id}`); }
  }
  if(ch.bonusTask && !COURSE.tasks[ch.bonusTask]) errors.push(`Fehlende Bonusaufgabe ${ch.bonusTask}`);
}
const core=ids.map(id=>COURSE.tasks[id]);
const counts={1:0,2:0,3:0}; core.forEach(t=>counts[t.afb]++);
const expected={1:core.length*.25,2:core.length*.5,3:core.length*.25};
for(const k of [1,2,3]) if(counts[k]!==expected[k]) errors.push(`AFB ${k}: ${counts[k]} statt ${expected[k]}`);
for(const [id,t] of Object.entries(COURSE.tasks)){
  if(!t.prompt||!t.solution) errors.push(`${id}: Prompt/Lösung fehlt`);
  if(t.bonus && ![2,3].includes(t.afb)) errors.push(`${id}: Bonus nicht AFB 2/3`);
}
console.log(`Kernaufgaben: ${core.length}`);
console.log(`Verteilung intern: AFB1=${counts[1]}, AFB2=${counts[2]}, AFB3=${counts[3]}`);
console.log(`Bonusaufgaben: ${Object.values(COURSE.tasks).filter(t=>t.bonus).length}`);
if(errors.length){ console.error(errors.join('\n')); process.exit(1); }
console.log('Inhaltsprüfung erfolgreich.');
