/* ========================================
   Week 15 - Thai Food Randomizer
   JavaScript
   ======================================== */

// ข้อมูลเมนูอาหารไทยอย่างน้อย 5 เมนู
const foodMenu = [
  {
    id: 1,
    name: 'ผัดไทยกุ้งสด',
    nameEn: 'Pad Thai Goong',
    description:
      'เส้นจีนผัดกับไข่ กุ้งสด ถั่วงอก กุยช่าย และถั่วลิสงคั่ว รสชาติเปรี้ยวหวานเค็มกลมกล่อม แบบต้นตำรับไทยแท้',
    price: '120',
    image: 'https://img.kapook.com/u/2015/surauch/cook2/PT1.jpg',
    tag: 'ยอดนิยม'
  },
  {
    id: 2,
    name: 'ต้มยำกุ้ง',
    nameEn: 'Tom Yum Goong',
    description:
      'ต้มยำน้ำข้นรสจัดจ้านกับกุ้งตัวโต เห็ดฟาง ตะไคร้ ใบมะกรูด และข่า ร้อนแรงถึงใจ เหมาะกับคนชอบรสเผ็ดเปรี้ยว',
    price: '150',
    image: 'https://www.jmthaifood.com/wp-content/uploads/2020/01/%E0%B8%95%E0%B9%89%E0%B8%A1%E0%B8%A2%E0%B8%B3%E0%B8%81%E0%B8%B8%E0%B9%89%E0%B8%87-1.jpg',
    tag: 'รสจัดจ้าน'
  },
  {
    id: 3,
    name: 'ส้มตำไทย',
    nameEn: 'Som Tum Thai',
    description:
      'มะละกอสับคลุกกับมะเขือเทศ ถั่วฝักยาว ถั่วลิสงคั่ว มะนาว และพริกสด รสเปรี้ยวเผ็ดหวาน เผ็ดร้อนถูกปากคนไทย',
    price: '60',
    image: 'https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/salads/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2/%E0%B8%AA%E0%B9%89%E0%B8%A1%E0%B8%95%E0%B8%B3%E0%B9%84%E0%B8%97%E0%B8%A2_header.jpg',
    tag: 'สไตล์อีสาน'
  },
  {
    id: 4,
    name: 'แกงเขียวหวานไก่',
    nameEn: 'Green Curry Chicken',
    description:
      'แกงเขียวหวานหอมกะทิกับเนื้อไก่นุ่ม มะเขือพวง ใบมะกรูด และพริกชี้ฟ้า หวานมันกลมกล่อม รับประทานกับข้าวสวยร้อนๆ',
    price: '110',
    image: 'https://www.ajinomoto.co.th/storage/photos/shares/Recipe/Menu/3-19Greencurry/61a8f3939f40f.jpeg',
    tag: 'แกงหอมมัน'
  },
  {
    id: 5,
    name: 'ผัดกะเพราไก่ไข่ดาว',
    nameEn: 'Basil Chicken with Fried Egg',
    description:
      'ผัดกะเพราไก่สับหอมๆ กับพริกสดและกระเพราแท้ ราดข้าวสวยร้อนๆ พร้อมไข่ดาวกรอบนอกนุ่มใน เมนูขวัญใจคนไทย',
    price: '95',
    image: 'https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/chicken-&-other-poultry-dishes/%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7/%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7_header.jpg',
    tag: 'ขวัญใจมหาชน'
  }
];

// ตัวแปรอ้างอิง DOM
const foodImageEl = document.getElementById('foodImage');
const imagePlaceholderEl = document.getElementById('imagePlaceholder');
const foodNameEl = document.getElementById('foodName');
const foodDescEl = document.getElementById('foodDesc');
const foodPriceEl = document.getElementById('foodPrice');
const foodTagEl = document.getElementById('foodTag');
const randomizeBtn = document.getElementById('randomizeBtn');
const foodCardEl = document.getElementById('foodCard');
const menuGridEl = document.getElementById('menuGrid');

let lastSelectedIndex = -1;

// ฟังก์ชันสุ่มเมนูอาหาร (ไม่ออกเมนูเดิมซ้ำติดกัน)
function getRandomFood() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * foodMenu.length);
  } while (foodMenu.length > 1 && randomIndex === lastSelectedIndex);

  lastSelectedIndex = randomIndex;
  return foodMenu[randomIndex];
}

// ฟังก์ชันอัปเดตข้อมูลอาหารทั้งหมดบนหน้าเว็บ
function updateFoodDisplay(food) {
  // เพิ่มเอฟเฟกต์ shake บนการ์ด
  foodCardEl.classList.remove('shake');
  void foodCardEl.offsetWidth; // trigger reflow
  foodCardEl.classList.add('shake');

  // รีเซ็ตสถานะรูปภาพก่อนโหลดใหม่ (แก้ปัญหารูปค้างจากครั้งก่อนที่ error)
  foodImageEl.classList.remove('loaded');
  foodImageEl.style.display = 'block';
  foodImageEl.style.opacity = '0';
  imagePlaceholderEl.style.display = 'flex';

  // ล้าง event handler เก่าเพื่อป้องกัน handler ค้างจากครั้งก่อน
  foodImageEl.onload = null;
  foodImageEl.onerror = null;

  // ตั้ง event handler ก่อนกำหนด src เพื่อให้แน่ใจว่า onload/onerror จะทำงาน
  // แม้รูปจะอยู่ใน cache หรือโหลดเร็วจน trigger ก่อนตั้ง handler
  foodImageEl.onload = () => {
    imagePlaceholderEl.style.display = 'none';
    foodImageEl.classList.add('loaded');
  };

  // กรณีรูปโหลดไม่สำเร็จ ให้แสดง placeholder แทน
  foodImageEl.onerror = () => {
    imagePlaceholderEl.innerHTML = `
      <div style="font-size: 3rem;">🍜</div>
      <div style="margin-top: 8px; font-size: 0.9rem;">ไม่สามารถโหลดรูปภาพได้</div>
    `;
    imagePlaceholderEl.style.display = 'flex';
    foodImageEl.style.display = 'none';
  };

  foodImageEl.src = food.image;
  foodImageEl.alt = `รูปภาพ ${food.name}`;

  // อัปเดตชื่อเมนู
  foodNameEl.textContent = food.name;

  // อัปเดตคำอธิบาย
  foodDescEl.textContent = food.description;

  // อัปเดตราคา
  foodPriceEl.textContent = `${food.price} บาท`;

  // อัปเดตป้ายกำกับ
  foodTagEl.textContent = food.tag;
}

// ฟังก์ชันสำหรับกดปุ่มสุ่ม
function handleRandomize() {
  // ปิดปุ่มชั่วขณะขณะสุ่มเพื่อป้องกันการกดรัว
  randomizeBtn.disabled = true;
  randomizeBtn.querySelector('.btn-text').textContent = 'กำลังสุ่ม...';

  setTimeout(() => {
    const food = getRandomFood();
    updateFoodDisplay(food);

    randomizeBtn.disabled = false;
    randomizeBtn.querySelector('.btn-text').textContent = 'สุ่มเมนูอาหาร';
  }, 600);
}

// ฟังก์ชันแสดงรายการเมนูทั้งหมด (สำหรับดูเมนูเต็ม)
function renderAllMenu() {
  menuGridEl.innerHTML = foodMenu.map((food) => `
    <div class="menu-item">
      <img src="${food.image}" alt="${food.name}" loading="lazy">
      <div class="menu-item-content">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="menu-item-price">${food.price} บาท</div>
      </div>
    </div>
  `).join('');
}

// ติดตั้ง event listener
randomizeBtn.addEventListener('click', handleRandomize);

// รองรับการกดปุ่ม Enter หรือ Space บนปุ่ม
randomizeBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleRandomize();
  }
});

// เริ่มต้น: แสดงเมนูแรกเมื่อโหลดหน้า และแสดงรายการเมนูทั้งหมด
document.addEventListener('DOMContentLoaded', () => {
  updateFoodDisplay(foodMenu[0]);
  renderAllMenu();

  // Navbar mobile toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span) => span.classList.toggle('active'));
  });

  // ปิดเมนูเมื่อคลิกลิงก์
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.querySelectorAll('.nav-toggle span').forEach((span) => {
        span.classList.remove('active');
      });
    });
  });
});
