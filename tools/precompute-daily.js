// สร้าง hash คำตอบของปริศนาประจำวัน (เวลาไทย) ล่วงหน้า
const fs=require('fs'),crypto=require('crypto');
const html=fs.readFileSync(process.argv[2],'utf8');
const a=html.indexOf('/* ================== ข้อมูลประเภทซูโดกุ'),b=html.indexOf('/* ================== วาดหน้า');
const code=html.slice(a,b);
const E=new Function(code+'\nreturn {generatePuzzle,hashStr,TYPES,dailyCfg};')();
const start=new Date(process.argv[3]+'T00:00:00Z'),days=+process.argv[4];
const out={};const t0=Date.now();
for(let d=0;d<days;d++){
  const day=new Date(start.getTime()+d*864e5).toISOString().slice(0,10);
  const c=E.dailyCfg(day);
  const P=E.generatePuzzle(c.type,c.size,c.diff,E.hashStr('renma-daily|'+day),'h');if(process.env.SHOW)console.error(day,c.type,c.size,P.clues);
  const sol=Array.from(P.sol).join('');
  out[day]=crypto.createHash('sha256').update(day+'|'+sol).digest('hex').slice(0,40);
}
console.error('generated',days,'days in',Date.now()-t0,'ms');
process.stdout.write(JSON.stringify(out));
