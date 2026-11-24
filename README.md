# SUDOKU RENMA · 数独練磨

เว็บแอปซูโดกุสำหรับครูและนักเรียน มี 2 เมนู

**遊 เล่นเกม** — เล่นซูโดกุบนเว็บได้ทันที ครั้งละ 1 กระดาน เลือกได้ 20 รูปแบบ (Classic, Alphabet, Thai Alphabet, Diagonal, Jigsaw, Asterisk, Center Dot, Girandola, Even-Odd, Consecutive, Alphabet Diagonal, Alphabet Jigsaw, Diagonal Jigsaw, Windoku, Killer, XV, Rossini, GreaterThan, Gattai Near 2) ขนาด 6x6 / 8x8 / 9x9 และ 3 ระดับความยาก มีจับเวลา จดโน้ต ย้อนกลับ คำใบ้ทีละขั้น (ชี้ช่อง → บอกตัวเลือก → เติมคำตอบ) ดูเฉลย และบันทึกประวัติการเล่นในเบราว์เซอร์

**今日 ปริศนาประจำวัน** — ทุกคนได้โจทย์เดียวกันในแต่ละวัน (เวลาไทย) ใส่ชื่อก่อนเล่น แล้วขึ้นตารางอันดับสาธารณะ เวลาจับจากเซิร์ฟเวอร์ ไม่มีคำใบ้ ถ้าออกจากหน้าจอกระดานจะถูกซ่อนและนับจำนวนครั้ง แชร์ผลลง Facebook / LINE / X หรือบันทึกเป็นรูปได้

**作 สร้างข้อสอบ** — สร้างชุดปริศนาตามแบบฟอร์มงานศิลปหัตถกรรมนักเรียน ระดับประถม และระดับมัธยม (ม.ต้น/ม.ปลาย) และโหมดแข่งขัน EduPLOYS (ซูโดกุโปร) พร้อมเฉลย บันทึกเป็น PDF และสั่งพิมพ์ได้ ทุกหน้าใน PDF พิมพ์รหัสชุดไว้มุมล่าง เพื่อจับคู่ข้อสอบกับเฉลย

ทุกกระดานตรวจแล้วว่ามีคำตอบเดียว

ใช้งาน: https://sudokurenma.mathaday.app/

พัฒนาโดย ครูอภิวัฒน์ ปาวงค์ · โรงเรียนบ้านหนองเอี่ยนดง "ราษฎร์สงเคราะห์" จังหวัดมุกดาหาร

---

### สำหรับผู้ดูแล: ตั้งค่าตารางอันดับ (Cloudflare Pages + D1)
1. Cloudflare Dashboard → Storage & Databases → D1 → Create database (เช่นชื่อ `renma`)
2. Workers & Pages → โปรเจกต์ `sudokurenma` → Settings → Bindings → Add → D1 database → Variable name: `DB` → เลือกฐานข้อมูลที่สร้าง
3. Deployments → Retry deployment (หรือ push ใหม่) — ตารางในฐานข้อมูลสร้างอัตโนมัติเมื่อมีคนเล่นครั้งแรก

ปริศนาประจำวันมีถึงต้นปี 2029 ถ้าต้องการเพิ่ม: `node tools/precompute-daily.js index.html <วันเริ่ม YYYY-MM-DD> <จำนวนวัน>` แล้วนำผลไปแทน `DAILY_HASH` ใน `functions/api/daily/[action].js`
