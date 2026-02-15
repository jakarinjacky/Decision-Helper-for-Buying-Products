// Product Data is now loaded from products.json via fetch
let products = []; // Global variable
var currentFilteredProducts = [];
var currentPage = 1;
const itemsPerPage = 12;

// Filter/Pagination State
var currentCategory = 'all';
var currentSearchQuery = '';
var isLoading = false;
var isInfiniteScrolling = false;

// Fallback Data for local testing (file:// protocol) or fetch failure
const fallbackData = [
    { "name": "iPhone 15 Pro Max", "image": "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp", "category": "โทรศัพท์" },
    { "name": "Samsung Galaxy S24 Ultra", "image": "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp", "category": "โทรศัพท์" },
    { "name": "Google Pixel 8 Pro", "image": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Xiaomi 13T Pro", "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "OPPO Find N3 Flip", "image": "https://images.unsplash.com/photo-1621330387646-5a25e295d433?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Vivo X100 Pro", "image": "https://images.unsplash.com/photo-1605236453806-6ff36a86fa2e?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "OnePlus 12", "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Honor Magic 6 Pro", "image": "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Realme GT 5 Pro", "image": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Asus ROG Phone 8", "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Nothing Phone (2)", "image": "https://images.unsplash.com/photo-1689262071295-a040b2a7593c?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Sony Xperia 1 V", "image": "https://images.unsplash.com/photo-1686303254397-2a146e297893?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Motorola Razr 40 Ultra", "image": "https://images.unsplash.com/photo-1685970222046-fd7ee98d4380?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Nokia G42 5G", "image": "https://images.unsplash.com/photo-1580910051074-3eb6948d3ea0?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Poco F5 Pro", "image": "https://images.unsplash.com/photo-1596742578443-7682e525c489?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "Infinix Zero 30", "image": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=400&q=80", "category": "โทรศัพท์" },
    { "name": "MacBook Air M2", "image": "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp", "category": "โน้ตบุ๊ก" },
    { "name": "Dell XPS 13 Plus", "image": "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&w=400&q=80", "category": "โน้ตบุ๊ก" },
    { "name": "HP Spectre x360", "image": "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=400&q=80", "category": "โน้ตบุ๊ก" },
    { "name": "Lenovo ThinkPad X1 Carbon", "image": "https://images.unsplash.com/photo-1588872657578-a3d8919b9558?auto=format&fit=crop&w=400&q=80", "category": "โน้ตบุ๊ก" },
    { "name": "Asus Zenbook 14", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80", "category": "โน้ตบุ๊ก" },
    { "name": "Microsoft Surface Laptop 5", "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", "category": "โน้ตบุ๊ก" },
    { "name": "Sony A7 IV", "image": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Sony_Alpha_7_Mark_IV.jpg", "category": "กล้อง" },
    { "name": "Canon EOS R6 II", "image": "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?auto=format&fit=crop&w=400&q=80", "category": "กล้อง" },
    { "name": "Nikon Z8", "image": "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=400&q=80", "category": "กล้อง" },
    { "name": "Fujifilm X-T5", "image": "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=400&q=80", "category": "กล้อง" },
    { "name": "Samsung Neo QLED 8K", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Samsung_QLED_TV_8K_-_75_inches_-_2018-11-02.jpg/800px-Samsung_QLED_TV_8K_-_75_inches_-_2018-11-02.jpg", "category": "ทีวี" },
    { "name": "LG G3 OLED evo", "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80", "category": "ทีวี" },
    { "name": "Sony Bravia XR A95L", "image": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80", "category": "ทีวี" },
    { "name": "Nike Air Max 1", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80", "category": "รองเท้า" },
    { "name": "Adidas Samba", "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=400&q=80", "category": "รองเท้า" },
    { "name": "New Balance 9060", "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80", "category": "รองเท้า" },
    { "name": "Dior Addict Lip Glow", "image": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp", "category": "เครื่องสำอาง" },
    { "name": "Chanel N°5 Perfume", "image": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp", "category": "เครื่องสำอาง" },
    { "name": "Estee Lauder Advanced Night Repair", "image": "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp", "category": "เครื่องสำอาง" },
    { "name": "Apple Watch Ultra 2", "image": "https://upload.wikimedia.org/wikipedia/commons/2/22/Apple_Watch_Ultra_2.jpg", "category": "นาฬิกา" },
    { "name": "Garmin Fenix 7 Pro", "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80", "category": "นาฬิกา" },
    { "name": "Samsung Galaxy Watch 6", "image": "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=400&q=80", "category": "นาฬิกา" },
    { "name": "PlayStation 5 Slim", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/PlayStation_5_logo.svg/1200px-PlayStation_5_logo.svg.png", "category": "เกม & ของเล่น" },
    { "name": "Xbox Series X", "image": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Xbox_Series_X_and_Series_S.jpg", "category": "เกม & ของเล่น" },
    { "name": "Nintendo Switch OLED", "image": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Nintendo_Switch_OLED.png", "category": "เกม & ของเล่น" },
    { "name": "Levi's 501 Original", "image": "https://images.unsplash.com/photo-1542272617-08f086303294?auto=format&fit=crop&w=400&q=80", "category": "เสื้อผ้า" },
    { "name": "Uniqlo U Crew Neck", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80", "category": "เสื้อผ้า" },
    { "name": "Zara Oversized Blazer", "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80", "category": "เสื้อผ้า" }
];

const colors = ['black', 'white', 'grey', 'silver', 'gold', 'red', 'blue', 'green', 'pink', 'purple', 'yellow', 'orange'];
const stores = [
    { name: "Shopee", logo: "S", color: "#ee4d2d" },
    { name: "Lazada", logo: "L", color: "#0f146d" },
    { name: "Central", logo: "C", color: "#cd1223" },
    { name: "BananaIT", logo: "B", color: "#fff200", textColor: "#000" },
    { name: "PowerBuy", logo: "P", color: "#0055a6" }
];


function getSearchLink(storeName, productName) {
    const encodedName = encodeURIComponent(productName);
    switch (storeName) {
        case "Shopee": return `https://shopee.co.th/search?keyword=${encodedName}`;
        case "Lazada": return `https://www.lazada.co.th/catalog/?q=${encodedName}`;
        case "Central": return `https://www.central.co.th/th/search/${encodedName}`;
        case "PowerBuy": return `https://www.powerbuy.co.th/th/search/${encodedName}`;
        case "BananaIT": return `https://www.bnn.in.th/th/search?q=${encodedName}`;
        default: return "#";
    }
}

// Rewritten to accept db array
function generateProducts(db) {
    function getProsCons(category) {
        const prosMap = {
            'โทรศัพท์': ["จอสวยคมชัด", "ถ่ายรูปสวยมาก", "แบตเตอรี่อึด", "ชาร์จไว", "เล่นเกมลื่น"],
            'โน้ตบุ๊ก': ["น้ำหนักเบา พกพาง่าย", "ทำงานเร็ว", "คีย์บอร์ดพิมพ์สนุก", "จอสีตรง", "ดีไซน์หรู"],
            'กล้อง': ["ไฟล์ภาพคุณภาพสูง", "โฟกัสไว", "กันสั่นดีเยี่ยม", "ใช้งานง่าย", "สีสวยจบหลังกล้อง"],
            'ทีวี': ["ภาพคมชัด 4K", "สีสดสมจริง", "เสียงกระหึ่ม", "รองรับแอพเยอะ", "ดีไซน์ขอบบาง"],
            'เครื่องสำอาง': ["ติดทนนาน", "สีสวยชัด", "เนื้อสัมผัสดี", "แพ็คเกจสวย", "กลิ่นหอม"],
            'รองเท้า': ["ใส่สบายเท้า", "ระบายอากาศดี", "ดีไซน์ทันสมัย", "น้ำหนักเบา", "รับแรงกระแทกได้ดี"],
            'นาฬิกา': ["ดีไซน์หรูหรา", "วัสดุทนทาน", "วัดค่าสุขภาพแม่นยำ", "แบตเตอรี่นาน", "กันน้ำลึก"],
            'เกม & ของเล่น': ["สนุกเพลิดเพลิน", "วัสดุปลอดภัย", "เสริมสร้างจินตนาการ", "เล่นได้หลายคน", "คุณภาพดี"],
            'เสื้อผ้า': ["เนื้อผ้าดี", "ตัดเย็บประณีต", "ใส่สบายไม่ร้อน", "ทรงสวย", "สีไม่ตก"]
        };

        const consMap = {
            'โทรศัพท์': ["ราคาสูง", "ไม่มีหัวชาร์จแถม", "ตัวเครื่องร้อนง่าย", "น้ำหนักเยอะ"],
            'โน้ตบุ๊ก': ["พอร์ตเชื่อมต่อน้อย", "อัพเกรดสเปคยาก", "ราคาสูง", "พัดลมเสียงดัง"],
            'กล้อง': ["แบตเตอรี่หมดไว", "เมนูช้าบ้าง", "หน้าจอเล็ก", "ราคาเลนส์แพง"],
            'ทีวี': ["ขาตั้งใหญ่กินที่", "รีโมทปุ่มเล็ก", "เมนูหน่วงนิดหน่อย", "มุมมองภาพจำกัด"],
            'เครื่องสำอาง': ["ราคาแรง", "หาซื้อยาก", "สีอาจเพี้ยนบ้าง", "กลิ่นแรงไปนิด"],
            'รองเท้า': ["พื้นแข็งนิดหน่อย", "ขนาดเล็กกว่าปกติ", "เลอะง่าย", "ระบายอากาศปานกลาง"],
            'นาฬิกา': ["หน้าปัดใหญ่ไปนิด", "สายเปลี่ยนยาก", "เชื่อมต่อแอพยาก", "ราคาสูง"],
            'เกม & ของเล่น': ["ชิ้นส่วนเล็กระวังหาย", "ใช้ถ่านเยอะ", "เสียงดัง", "ราคาแพง"],
            'เสื้อผ้า': ["ยับง่าย", "ซักแล้วหดนิดหน่อย", "กระดุมหลุดง่าย", "สีตกในการซักครั้งแรก"]
        };

        const defaultPros = ["คุ้มค่าราคา", "วัสดุคุณภาพดี", "ได้รับความนิยมสูง", "บริการหลังการขายดี", "จัดส่งรวดเร็ว"];
        const defaultCons = ["ของมีจำนวนจำกัด", "สินค้าขายดีอาจหมดเร็ว", "ราคาอาจเปลี่ยนแปลงได้", "รุ่นนี้หาซื้อยาก"];

        const catPros = prosMap[category] || defaultPros;
        const catCons = consMap[category] || defaultCons;

        // Shuffle arrays to get random subsets
        const shuffledPros = catPros.sort(() => 0.5 - Math.random());
        const shuffledCons = catCons.sort(() => 0.5 - Math.random());

        return {
            pros: shuffledPros.slice(0, 3), // Top 3 random pros
            cons: shuffledCons.slice(0, 1)  // Top 1 random con
        };
    }

    let allProducts = [];
    let idCounter = 1;

    db.forEach(item => {
        // Assign random but realistic price based on category name
        let basePrice = 2500;
        if (item.category === 'โทรศัพท์' || item.category === 'โน้ตบุ๊ก') basePrice = 20000;
        else if (item.category === 'ทีวี' || item.category === 'กล้อง') basePrice = 15000;
        else if (item.category === 'นาฬิกา' || item.category === 'เกม & ของเล่น') basePrice = 8000;
        else if (item.category === 'เสื้อผ้า' || item.category === 'แฟชั่น') basePrice = 1500;

        const price = basePrice + Math.floor(Math.random() * 10000);

        // Random attributes
        const color = colors[Math.floor(Math.random() * colors.length)];
        // Use the specific image from the DB
        const sale = Math.random() > 0.7 ? `-${Math.floor(Math.random() * 50) + 10}%` : null;

        // Generate stores
        const productStores = [];
        const numStores = Math.floor(Math.random() * 3) + 2; // 2-5 stores
        for (let j = 0; j < numStores; j++) {
            const store = stores[j % stores.length];
            productStores.push({
                name: store.name,
                logo: store.logo,
                price: price + (Math.floor(Math.random() * 1000) - 500),
                link: getSearchLink(store.name, item.name),
                color: store.color,
                textColor: store.textColor
            });
        }

        // Shopee Badge Logic
        // Phones, Notebooks, Cameras usually Mall
        const isMallCandidate = ['โทรศัพท์', 'โน้ตบุ๊ก', 'กล้อง', 'ทีวี', 'เครื่องสำอาง', 'นาฬิกา'].includes(item.category);
        const isMall = isMallCandidate && Math.random() > 0.3; // 70% chance if candidate
        const isPreferred = !isMall && Math.random() > 0.4; // 60% chance if not Mall

        // Generate Rating and Reviews
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 - 5.0
        const reviews = Math.floor(Math.random() * 500) + 50; // 50 - 550

        // Generate Pros/Cons
        const { pros, cons } = getProsCons(item.category);

        allProducts.push({
            id: idCounter++,
            name: item.name,
            category: item.category,
            image: item.image,
            color: color,
            icon: "📦",
            iconColor: "#eeeeee",
            sale: sale,
            isMall: isMall,
            isPreferred: isPreferred,
            currentPrice: price,
            oldPrice: sale ? price * 1.2 : null,
            storeCount: numStores,
            rating: rating,
            reviews: reviews,
            pros: pros,
            cons: cons,
            suitability: "ทุกคน, ผู้ที่สนใจ " + item.category,
            stores: productStores.sort((a, b) => a.price - b.price)
        });
    });
    return allProducts;
}

// Global Error Handler
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error(`Error: ${msg}\nLine: ${lineNo}\nColumn: ${columnNo}`);
    return false;
};

document.addEventListener('DOMContentLoaded', async () => {
    // Pagination & filter state are declared at module top-level
    try {
        let db;
        // Check if file protocol (CORS limitation for fetch)
        if (window.location.protocol === 'file:') {
            console.warn('Running locally via file://. Using fallback data.');
            db = fallbackData;
        } else {
            try {
                // Try Fetch Mock API
                const response = await fetch('products.json');
                if (!response.ok) throw new Error('Failed to load products.json');
                db = await response.json();
            } catch (err) {
                console.warn('Fetch failed, using fallback data:', err);
                db = fallbackData;
            }
        }

        // Generate Enriched Data
        products = generateProducts(db);
        currentFilteredProducts = products;

        // console.log(`[Products Load] Success: ${products.length} items enriched.`);

        // Initial render
        renderPage(1);
    } catch (e) {
        console.error('Critical Error loading products:', e);
        const grid = document.getElementById('product-grid');
        if (grid) grid.innerHTML = `<p style="text-align:center; padding:20px; color:red;">เกิดข้อผิดพลาดในการโหลดสินค้า: ${e.message}</p>`;
    }


    // 7. Wishlist Logic
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    window.toggleWishlist = function (id) {
        const index = wishlist.indexOf(id);
        if (index === -1) {
            wishlist.push(id);
            // Optional: Animation or Toast
        } else {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Update UI if exists
        const btn = document.querySelector(`.wishlist-btn[data-id="${id}"]`);
        if (btn) btn.classList.toggle('active');
    };

    // 6. Sort and Price Filter Logic
    const sortSelect = document.getElementById('sort-select');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceBtn = document.getElementById('apply-price');

    let currentCategory = 'all';
    let currentSearchQuery = '';
    let isLoading = false;

    // Map data-cat slugs to actual product.category names (Thai)
    const categoryMap = {
        all: 'all',
        phone: 'โทรศัพท์',
        computer: 'โน้ตบุ๊ก',
        electronics: 'เครื่องใช้ไฟฟ้า',
        fashion: 'เสื้อผ้า',
        beauty: 'เครื่องสำอาง',
        gaming: 'เกม & ของเล่น',
        home: 'บ้าน & สวน',
        sports: 'กีฬา',
        camera: 'กล้อง',
        tv: 'ทีวี',
        shoes: 'รองเท้า',
        watch: 'นาฬิกา'
    };

    // Pagination State
    let isInfiniteScrolling = false;

    function applyFilters() {
        let filtered = products;

        // 1. Category Filter
        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === currentCategory);
        }

        // 2. Search Filter
        if (currentSearchQuery) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearchQuery));
        }

        // 3. Price Filter
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        if (minPriceInput && maxPriceInput) {
            const minPrice = parseInt(minPriceInput.value) || 0;
            const maxPrice = parseInt(maxPriceInput.value) || Infinity;
            filtered = filtered.filter(p => p.currentPrice >= minPrice && p.currentPrice <= maxPrice);
        }

        // 4. Sort
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            const sortValue = sortSelect.value;
            if (sortValue === 'price-asc') {
                filtered.sort((a, b) => a.currentPrice - b.currentPrice);
            } else if (sortValue === 'price-desc') {
                filtered.sort((a, b) => b.currentPrice - a.currentPrice);
            } else if (sortValue === 'rating') {
                filtered.sort((a, b) => b.rating - a.rating);
            }
        }

        currentFilteredProducts = filtered;
        currentPage = 1;
        console.debug('[applyFilters] category=', currentCategory, 'results=', currentFilteredProducts.length);
        renderPage(1);

        // Ensure user sees the product grid after filtering
        const gridEl = document.getElementById('product-grid');
        if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
    }

    function viewWishlistView(e) {
        if (e) e.preventDefault();

        // Reset other filters
        currentCategory = 'all';
        currentSearchQuery = '';
        minPriceInput.value = '';
        maxPriceInput.value = '';
        sortSelect.value = 'default';

        // Filter by Wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        // Force filter
        const allProds = typeof products !== 'undefined' ? products : [];
        const wishlistedProds = allProds.filter(p => wishlist.includes(p.id));

        currentFilteredProducts = wishlistedProds;
        currentPage = 1;
        renderPage(1);

        // Scroll to grid
        document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
    }
    // Expose to window for inline onclick
    window.toggleWishlistView = viewWishlistView;

    function renderPage(page) {
        const grid = document.getElementById('product-grid');
        if (!grid) return;

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = currentFilteredProducts.slice(start, end);

        if (page === 1) grid.innerHTML = ''; // Clear if page 1

        if (pageData.length === 0 && page === 1) {
            grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:20px;">ไม่พบสินค้าที่ค้นหา</p>';
            return;
        }

        renderProducts(pageData, page > 1);

        // Hide Load More (We use Infinite Scroll now)
        const loadMoreContainer = document.querySelector('.load-more-container');
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    }

    // Infinite Scroll
    window.addEventListener('scroll', () => {
        if (isInfiniteScrolling) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            // Near bottom
            const totalPages = Math.ceil(currentFilteredProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                isInfiniteScrolling = true;

                // Show Skeleton Loading at Bottom
                const grid = document.getElementById('product-grid');
                const loadingSku = `
                    <div class="product-card skeleton-card loading-indicator">
                        <div class="product-img skeleton"></div>
                        <div class="product-info">
                            <div class="product-title skeleton"></div>
                            <div class="product-price skeleton"></div>
                        </div>
                    </div>
                `.repeat(4); // Add 4 skeletons

                // create a temporary container for skeletons to easily remove them
                const tempDiv = document.createElement('div');
                tempDiv.id = 'infinite-loader';
                tempDiv.style.display = 'contents';
                tempDiv.innerHTML = loadingSku;
                grid.appendChild(tempDiv);

                setTimeout(() => {
                    // Remove skeletons
                    const loader = document.getElementById('infinite-loader');
                    if (loader) loader.remove();

                    currentPage++;
                    renderPage(currentPage);
                    isInfiniteScrolling = false;
                }, 800); // Increased delay to show skeleton
            }
        }
    });

    // Dark Mode Logic
    function toggleDarkMode(e) {
        if (e) e.preventDefault();
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';

        if (isDark) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            document.getElementById('theme-toggle').innerText = '🌙 Dark Mode';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            document.getElementById('theme-toggle').innerText = '☀️ Light Mode';
        }
    }
    window.toggleDarkMode = toggleDarkMode;

    // Init Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle').innerText = '☀️ Light Mode';
    }

    // Event Listeners
    sortSelect.addEventListener('change', applyFilters);
    applyPriceBtn.addEventListener('click', applyFilters);


    // Allow 'Enter' key in price inputs
    minPriceInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') applyFilters(); });
    maxPriceInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') applyFilters(); });

    // Update Category Logic to use applyFilters
    const categoryLinks = document.querySelectorAll('.cat-list a, .cat-item');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active from both nav lists
            document.querySelectorAll('.cat-list a').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.cat-item').forEach(ci => ci.classList.remove('active'));

            // Add active to clicked element for visual feedback
            link.classList.add('active');

            const slug = link.getAttribute('data-cat') || 'all';
            currentCategory = categoryMap[slug] || 'all';
            applyFilters();
        });
    });

    // Update Search Logic to use applyFilters
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentSearchQuery = searchInput.value.toLowerCase();
        applyFilters();
    });

    searchInput.addEventListener('input', (e) => {
        if (e.target.value === '') {
            currentSearchQuery = '';
            applyFilters();
        }
    });


    // 3. Smooth Scroll (Existing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Initialize Auth
    checkAuthStatus();

    // Bind Top Bar Links
    document.getElementById('login-link').addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('login');
    });

    document.getElementById('register-link').addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal('register');
    });

    document.getElementById('logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });

    // Render Function
    function renderProducts(productData, append = false) {
        const grid = document.getElementById('product-grid');
        if (!grid) return;
        if (!append) grid.innerHTML = ''; // Clear existing only if not appending

        if (!append && (!productData || productData.length === 0)) {
            grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:20px;">ไม่พบสินค้าที่ค้นหา</p>';
            return;
        }

        // Helper for star rating
        const getStarRating = (rating) => {
            return '★'.repeat(Math.round(rating)).padEnd(5, '☆');
        };

        // Get Wishlist
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        productData.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Helper for formatting price with commas
            const formatPrice = (price) => '฿' + price.toLocaleString();

            let badgeHtml = '';
            if (product.isMall) {
                badgeHtml = `<div class="badge-mall">Mall</div>`;
            } else if (product.isPreferred) {
                badgeHtml = `<div class="badge-preferred">แนะนำ</div>`;
            }

            const saleBadge = product.sale ? `<div class="badge-sale" style="${badgeHtml ? 'top:40px;' : ''}">${product.sale}</div>` : '';
            const oldPriceHtml = product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : '';

            // Wishlist State
            const isWishlisted = wishlist.includes(product.id);
            const heartClass = isWishlisted ? 'active' : '';

            let imageHtml;
            if (product.image) {
                imageHtml = `<img src="${product.image}" alt="${product.name}" class="product-img-real" onerror="this.onerror=null;this.src='https://placehold.co/400x400/eee/999?text=No+Image';">`;
            } else {
                imageHtml = `<div class="img-placeholder" style="background-color: ${product.iconColor};">${product.icon}</div>`;
            }

            card.innerHTML = `
            <button class="wishlist-btn ${heartClass}" data-id="${product.id}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                 ${isWishlisted ? '❤' : '🤍'}
            </button>
            <div class="product-img">
            ${badgeHtml}
            ${saleBadge}
            ${imageHtml}
        </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="rating-container">
                    <span class="stars">${getStarRating(product.rating)}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">${formatPrice(product.currentPrice)}</span>
                    ${oldPriceHtml}
                </div>
                <div class="compare-info">
                    <span class="store-count">เปรียบเทียบ ${product.storeCount} ร้านค้า</span>
                </div>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button class="btn-compare" style="flex:1;" onclick="openComparisonModal(${product.id}); trackCategoryView('${product.category}');">เช็คราคา</button>
                    <button class="btn-secondary" style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:30px; padding:0 10px; cursor:pointer;" onclick="toggleCompare(${product.id})">VS</button>
                </div>
            </div>
        `;
            grid.appendChild(card);
        });
    }

    // Bind Forms
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });

    // 4. Initialize Auth
    checkAuthStatus();
});

// --- GLOBAL FUNCTIONS ---

function applyFilters() {
    let filtered = products;

    // 1. Category Filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // 2. Search Filter
    if (currentSearchQuery) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearchQuery));
    }

    // 3. Price Filter
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    if (minPriceInput && maxPriceInput) {
        const minPrice = parseInt(minPriceInput.value) || 0;
        const maxPrice = parseInt(maxPriceInput.value) || Infinity;
        filtered = filtered.filter(p => p.currentPrice >= minPrice && p.currentPrice <= maxPrice);
    }

    // 4. Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        if (sortValue === 'price-asc') {
            filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        } else if (sortValue === 'price-desc') {
            filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        } else if (sortValue === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }
    }

    currentFilteredProducts = filtered;
    currentPage = 1;
    console.debug('[applyFilters] category=', currentCategory, 'results=', currentFilteredProducts.length);
    renderPage(1);

    // Ensure user sees the product grid after filtering
    const gridEl = document.getElementById('product-grid');
    if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
}

function renderPage(page) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = currentFilteredProducts.slice(start, end);

    if (page === 1) grid.innerHTML = ''; // Clear if page 1

    if (pageData.length === 0 && page === 1) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:20px;">ไม่พบสินค้าที่ค้นหา</p>';
        return;
    }

    renderProducts(pageData, page > 1);

    // Hide Load More (We use Infinite Scroll now)
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (loadMoreContainer) loadMoreContainer.style.display = 'none';
}

function renderProducts(productData, append = false) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    if (!append) grid.innerHTML = ''; // Clear existing only if not appending

    if (!append && (!productData || productData.length === 0)) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:20px;">ไม่พบสินค้าที่ค้นหา</p>';
        return;
    }

    // Helper for star rating
    const getStarRating = (rating) => {
        return '★'.repeat(Math.round(rating)).padEnd(5, '☆');
    };

    // Get Wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    productData.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Helper for formatting price with commas
        const formatPrice = (price) => '฿' + price.toLocaleString();

        let badgeHtml = '';
        if (product.isMall) {
            badgeHtml = `<div class="badge-mall">Mall</div>`;
        } else if (product.isPreferred) {
            badgeHtml = `<div class="badge-preferred">แนะนำ</div>`;
        }

        const saleBadge = product.sale ? `<div class="badge-sale" style="${badgeHtml ? 'top:40px;' : ''}">${product.sale}</div>` : '';
        const oldPriceHtml = product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : '';

        // Wishlist State
        const isWishlisted = wishlist.includes(product.id);
        const heartClass = isWishlisted ? 'active' : '';

        let imageHtml;
        if (product.image) {
            imageHtml = `<img src="${product.image}" alt="${product.name}" class="product-img-real" onerror="this.onerror=null;this.src='https://placehold.co/400x400/eee/999?text=No+Image';">`;
        } else {
            imageHtml = `<div class="img-placeholder" style="background-color: ${product.iconColor};">${product.icon}</div>`;
        }

        card.innerHTML = `
            <button class="wishlist-btn ${heartClass}" data-id="${product.id}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                 ${isWishlisted ? '❤' : '🤍'}
            </button>
            <div class="product-img">
            ${badgeHtml}
            ${saleBadge}
            ${imageHtml}
        </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="rating-container">
                    <span class="stars">${getStarRating(product.rating)}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">${formatPrice(product.currentPrice)}</span>
                    ${oldPriceHtml}
                </div>
                <div class="compare-info">
                    <span class="store-count">เปรียบเทียบ ${product.storeCount} ร้านค้า</span>
                </div>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button class="btn-compare" style="flex:1;" onclick="openComparisonModal(${product.id}); trackCategoryView('${product.category}');">เช็คราคา</button>
                    <button class="btn-secondary" style="background:var(--bg-color); border:1px solid var(--border-color); border-radius:30px; padding:0 10px; cursor:pointer;" onclick="toggleCompare(${product.id})">VS</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Modal Logic
// ... (Keep existing openComparisonModal and friends)

// Smart Voucher Logic
let categoryViews = {};
function trackCategoryView(category) {
    categoryViews[category] = (categoryViews[category] || 0) + 1;

    // Trigger voucher if viewed 3 times
    if (categoryViews[category] === 3) {
        showSmartVoucher(category);
    }
}

function showSmartVoucher(category) {
    // Simple alert for now, can be a nice modal
    const codes = {
        'โทรศัพท์': 'MOBILE500',
        'โน้ตบุ๊ก': 'NOTEBOOK1000',
        'กล้อง': 'CAMERA800',
        'default': 'WELCOME100'
    };
    const code = codes[category] || codes['default'];

    // Delayed slightly
    setTimeout(() => {
        const voucherHtml = `
            <div id="smart-voucher" style="position:fixed; bottom:20px; right:20px; background:white; padding:20px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.2); z-index:9999; border-left:5px solid var(--primary-color); animation: slideIn 0.5s ease-out;">
                <h4 style="margin:0 0 10px 0; color:var(--primary-color);">🎁 ดีลลับสำหรับคุณ!</h4>
                <p style="margin:0 0 10px 0; font-size:0.9rem;">เห็นคุณสนใจ ${category} บ่อยๆ เอาโค้ดนี้ไปลดเพิ่มเลย!</p>
                <div style="background:#f4f6f8; padding:10px; text-align:center; border:1px dashed #ccc; font-weight:bold; color:#333; letter-spacing:1px;">${code}</div>
                <button onclick="document.getElementById('smart-voucher').remove()" style="margin-top:10px; background:none; border:none; text-decoration:underline; cursor:pointer; font-size:0.8rem; color:#888;">ปิด</button>
            </div>
            <style>@keyframes slideIn { from {transform: translateX(100%); opacity:0;} to {transform: translateX(0); opacity:1;} }</style>
        `;
        document.body.insertAdjacentHTML('beforeend', voucherHtml);
    }, 2000);
}

// Side-by-Side Comparison Logic
let comparisonList = [];

function toggleCompare(id) {
    const index = comparisonList.indexOf(id);
    if (index === -1) {
        if (comparisonList.length >= 3) {
            alert('เปรียบเทียบได้สูงสุด 3 รายการ');
            return;
        }
        comparisonList.push(id);
    } else {
        comparisonList.splice(index, 1);
    }
    updateComparisonBar();
}

function updateComparisonBar() {
    let bar = document.getElementById('comparison-bar');
    if (comparisonList.length === 0) {
        if (bar) bar.remove();
        return;
    }

    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'comparison-bar';
        bar.className = 'glass';
        bar.style.cssText = `
            position: fixed; bottom: 0; left: 0; width: 100%;
            background: var(--white); border-top: 1px solid var(--border-color);
            padding: 15px; z-index: 1000; box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            display: flex; justify-content: center; align-items: center; gap: 20px;
        `;
        document.body.appendChild(bar);
    }

    const imgs = comparisonList.map(id => {
        const p = products.find(prod => prod.id === id);
        return `<img src="${p.image}" style="width:50px; height:50px; object-fit:contain; border-radius:8px; border:1px solid #ddd;">`;
    }).join('');

    bar.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center;">
            <span style="font-weight:600;">เปรียบเทียบสินค้า (${comparisonList.length}/3)</span>
            ${imgs}
        </div>
        <div>
            <button onclick="document.getElementById('comparison-bar').remove(); comparisonList=[];" style="padding:8px 16px; border:1px solid #ddd; background:none; border-radius:20px; cursor:pointer;">ยกเลิก</button>
            <button onclick="openComparisonTable()" style="padding:8px 24px; background:var(--primary-color); color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; margin-left:10px;">ดูตารางเปรียบเทียบ</button>
        </div>
    `;
}

function openComparisonTable() {
    // Basic implementation: Alert for now, or build a simple modal overlay
    const items = comparisonList.map(id => products.find(p => p.id === id));

    // Create Modal HTML
    const tableHtml = `
        <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left;">
                <tr>
                    <th style="padding:10px; border-bottom:1px solid #ddd;">สินค้า</th>
                    ${items.map(i => `<th style="padding:10px; border-bottom:1px solid #ddd; min-width:150px;">${i.name}</th>`).join('')}
                </tr>
                <tr>
                    <td style="padding:10px; border-bottom:1px solid #ddd;">ราคา</td>
                    ${items.map(i => `<td style="padding:10px; border-bottom:1px solid #ddd; color:var(--primary-color); font-weight:bold;">฿${i.currentPrice.toLocaleString()}</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding:10px; border-bottom:1px solid #ddd;">คะแนน</td>
                    ${items.map(i => `<td style="padding:10px; border-bottom:1px solid #ddd;">⭐ ${i.rating} (${i.reviews})</td>`).join('')}
                </tr>
                <tr>
                    <td style="padding:10px; border-bottom:1px solid #ddd;">จุดเด่น</td>
                    ${items.map(i => `<td style="padding:10px; border-bottom:1px solid #ddd; font-size:0.9rem;">${i.pros[0] || '-'}</td>`).join('')}
                </tr>
            </table>
        </div>
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(0,0,0,0.5); z-index:2000;
        display:flex; justify-content:center; align-items:center;
    `;
    modal.innerHTML = `
        <div class="glass" style="background:var(--white); padding:30px; border-radius:16px; max-width:900px; width:90%; max-height:90vh; overflow-y:auto; position:relative;">
            <button onclick="this.closest('div').parentElement.remove()" style="position:absolute; top:15px; right:15px; border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
            <h2 style="margin-bottom:20px;">ตารางเปรียบเทียบ</h2>
            ${tableHtml}
        </div>
    `;
    document.body.appendChild(modal);
}

// In renderProducts loop, make sure to add Compare Button logic if needed
// Or just let user rely on existing buttons
window.toggleCompare = toggleCompare;

// Remove Debug Alert Logic
if (document.getElementById('debug-alert')) document.getElementById('debug-alert').remove();


// Modal Logic
function openComparisonModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Helper for star rating (scoped or reusing if moved out, but here fine to duplicate or better move out)
    const getStarRating = (rating) => '★'.repeat(Math.round(rating)).padEnd(5, '☆');

    // Populate Modal Info
    document.getElementById('modal-product-name').innerHTML = `
        ${product.name}
        <div class="rating-container" style="justify-content: center; margin-top: 5px;">
            <span class="stars" style="font-size: 1.2rem;">${getStarRating(product.rating)}</span>
            <span class="review-count" style="font-size: 1rem;">${product.rating} (${product.reviews} รีวิว)</span>
        </div>
    `;

    const modalImgContainer = document.querySelector('.modal-product-img');
    if (product.image) {
        modalImgContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" class="product-img-real" onerror="this.onerror=null;this.src='https://placehold.co/400x400/eee/999?text=No+Image';">`;
    } else {
        modalImgContainer.innerHTML = `<div class="img-placeholder" style="color: ${product.iconColor}; font-size: 4rem;">${product.icon}</div>`;
    }

    document.getElementById('modal-best-price').innerText = '฿' + product.currentPrice.toLocaleString();

    // Populate Details
    const detailsContainer = document.getElementById('modal-details');
    let detailsHtml = '';

    if (product.suitability) {
        detailsHtml += `
            <div class="detail-group">
                <div class="detail-title">👤 เหมาะสำหรับ</div>
                <div>${product.suitability.split(',').map(tag => `<span class="suitability-tag">${tag.trim()}</span>`).join('')}</div>
            </div>
        `;
    }

    if (product.pros && product.pros.length > 0) {
        detailsHtml += `
            <div class="detail-group">
                <div class="detail-title" style="color: #2e7d32; font-weight:bold;">จุดเด่น (Pros)</div>
                <ul class="pros-list">
                    ${product.pros.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    if (product.cons && product.cons.length > 0) {
        detailsHtml += `
            <div class="detail-group">
                <div class="detail-title" style="color: #c62828; font-weight:bold;">ข้อสังเกต (Cons)</div>
                <ul class="cons-list">
                    ${product.cons.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Horoscope Section (Mu-Te-Lu)
    if (product.color) {
        detailsHtml += `
            <div class="detail-group">
                <div class="detail-title" style="color: #673ab7;">🔮 มูเตลู Check (เช็คดวงสีถูกโฉลก)</div>
                <div class="horoscope-box">
                    <p class="product-color-info">สินค้านี้สี: <b>${getColorNameThai(product.color)}</b></p>
                    <div class="horoscope-selector">
                        <label>เลือกวันเกิดของคุณ:</label>
                        <select id="birth-day-select" onchange="checkHoroscope('${product.color}')">
                            <option value="">-- เลือกวัน --</option>
                            <option value="sunday">วันอาทิตย์</option>
                            <option value="monday">วันจันทร์</option>
                            <option value="tuesday">วันอังคาร</option>
                            <option value="wednesday">วันพุธ (กลางวัน)</option>
                            <option value="wednesday_night">วันพุธ (กลางคืน)</option>
                            <option value="thursday">วันพฤหัสบดี</option>
                            <option value="friday">วันศุกร์</option>
                            <option value="saturday">วันเสาร์</option>
                        </select>
                    </div>
                    <div id="horoscope-result"></div>
                </div>
            </div>
        `;
    }

    // Price History Section (Chart.js)
    detailsHtml += `
        <div class="price-history-section">
            <div class="detail-title">📉 กราฟราคา (ย้อนหลัง 3 เดือน)</div>
            <div style="position: relative; height:200px; width:100%">
                <canvas id="priceChart"></canvas>
            </div>
            
            <div class="price-alert-box" style="margin-top: 15px;">
                <label style="font-size: 0.9rem; color: #666;">แจ้งเตือนเมื่อราคาลดลง:</label>
                <div style="display: flex; gap: 10px; margin-top: 5px;">
                    <input type="email" id="alert-email" placeholder="กรอกอีเมลของคุณ" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px;">
                    <button class="price-alert-btn" style="margin-top: 0; width: auto;" onclick="setupPriceAlert()">
                        🔔 ติดตาม
                    </button>
                </div>
            </div>
        </div>
    `;

    detailsContainer.innerHTML = detailsHtml;

    // Populate Store List
    const storeList = document.getElementById('modal-store-list');
    storeList.innerHTML = '';

    product.stores.sort((a, b) => a.price - b.price).forEach(store => {
        const item = document.createElement('div');
        item.className = 'store-item';

        // Use brand color for logo background
        const logoStyle = `background-color: ${store.color || '#eee'}; color: ${store.textColor || '#fff'}`;

        item.innerHTML = `
            <div class="store-info">
                <div class="store-logo" style="${logoStyle}">${store.logo}</div>
                <div class="store-name">${store.name}</div>
            </div>
            <div class="store-price-action">
                <span class="store-price">฿${store.price.toLocaleString()}</span>
                <a href="${store.link}" target="_blank" rel="noopener noreferrer" class="btn-visit">ไปที่ร้าน</a>
            </div>
        `;
        storeList.appendChild(item);
    });

    // Show Modal
    const modal = document.getElementById('price-modal');
    modal.classList.add('active');

    // Initialize Chart.js after modal is visible (needed for canvas context)
    requestAnimationFrame(() => {
        const ctx = document.getElementById('priceChart').getContext('2d');

        // Mock Data for 3 Months (approx 12 weeks or just 3 points)
        // Let's do 3 months: Last Month, This Month, Next Month (Trend)? Or just 3 past months
        const labels = ['2 เดือนที่แล้ว', 'เดือนที่แล้ว', 'ปัจจุบัน'];
        const current = product.currentPrice;
        const prices = [
            Math.round(current * (1 + (Math.random() * 0.1))), // Higher
            Math.round(current * (1 + (Math.random() * 0.05))), // Slightly higher
            current
        ];

        if (window.myPriceChart) {
            window.myPriceChart.destroy();
        }

        window.myPriceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'ราคา (บาท)',
                    data: prices,
                    borderColor: '#2e7d32',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2e7d32',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { display: false } // Hide grid lines
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    });

    // Close on click outside
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    }
}

function setupPriceAlert() {
    const email = document.getElementById('alert-email').value;
    if (!email || !email.includes('@')) {
        alert('กรุณากรอกอีเมลให้ถูกต้อง');
        return;
    }
    alert(`ระบบจะส่งการแจ้งเตือนไปที่ ${email} เมื่อราคาลดลง!`);
}

function closeModal() {
    document.getElementById('price-modal').classList.remove('active');
}

// Auth Logic
function openAuthModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('active');
    switchAuthTab(tab);

    modal.onclick = (e) => {
        if (e.target === modal) closeAuthModal();
    }
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

function switchAuthTab(tab) {
    // Update Tabs
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');

    // Update Forms
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(`${tab}-form`).classList.add('active');
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    // Simplify: Just mock login with the name from email
    const name = email.split('@')[0];

    // Save to localStorage
    const user = { name: name, email: email };
    localStorage.setItem('user', JSON.stringify(user));

    alert('เข้าสู่ระบบสำเร็จ');
    closeAuthModal();
    checkAuthStatus();
}

function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm-password').value;

    if (password !== confirm) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }

    // Save to localStorage
    const user = { name: name, email: email };
    localStorage.setItem('user', JSON.stringify(user));

    alert('สมัครสมาชิกสำเร็จ');
    closeAuthModal();
    checkAuthStatus();
}

function logout() {
    localStorage.removeItem('user');
    checkAuthStatus();
}

function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authLinks = document.getElementById('auth-links');
    const userProfile = document.getElementById('user-profile');
    const userNameDisplay = document.getElementById('user-name');

    if (user) {
        authLinks.style.display = 'none';
        userProfile.style.display = 'flex'; // Use flex to match top-auth
        userNameDisplay.textContent = user.name;
    } else {
        authLinks.style.display = 'flex'; // Use flex to match top-auth
        userProfile.style.display = 'none';
    }
}

// AI Chat Widget Logic
document.addEventListener('DOMContentLoaded', () => {
    // Only init if elements exist (safe check)
    if (!document.getElementById('chat-fab')) return;

    const chatFab = document.getElementById('chat-fab');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    let isChatOpen = false;
    let hasGreeted = false;

    // Toggle Chat
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.add('active');
            if (!hasGreeted) {
                sendBotInternalMessageWithDelay();
                hasGreeted = true;
            }
            // Focus input
            setTimeout(() => chatInput.focus(), 300);
        } else {
            chatWindow.classList.remove('active');
        }
    }

    chatFab.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // Handle User Message
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user');
        chatInput.value = '';

        // Simulate Bot Response
        showTyping();

        // Mock simple response logic
        setTimeout(() => {
            removeTyping();
            const response = generateMockResponse(text);
            addMessage(response, 'bot');
        }, 1500);
    });

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message msg-${sender}`;
        // Allow formatting in bot messages (br tags)
        div.innerHTML = text.replace(/\n/g, '<br>');
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'message msg-bot typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = '...';
        chatMessages.appendChild(div);
        scrollToBottom();
    }

    function removeTyping() {
        const div = document.getElementById('typing-indicator');
        if (div) div.remove();
    }

    function sendBotInternalMessageWithDelay() {
        showTyping();
        setTimeout(() => {
            removeTyping();
            const welcomeText = `<b>สวัสดีครับ! ผมคือผู้ช่วย AI เลือกซื้อของให้คุณ</b> 🤖<br><br>
เพื่อช่วยได้ตรงความต้องการที่สุด ช่วยบอกข้อมูลตามหัวข้อด้านล่างนี้หน่อยนะครับ:<br><br>
<b>1. กำลังจะซื้ออะไร?</b><br>
(เช่น โทรศัพท์มือถือ, โน้ตบุ๊ก, ของใช้ในบ้าน)<br><br>
<b>2. คุณจะใช้เพื่ออะไร?</b> (เลือกเลขข้อได้เลย)<br>
📸 1. ถ่ายรูป / วิดีโอ<br>
🎮 2. เล่นเกม<br>
💻 3. ทำงาน / เรียนออนไลน์<br>
🏃‍♂️ 4. พกพาเบาๆ ออกนอกบ้าน<br>
🏠 5. ของใช้ในบ้าน<br>
🎁 6. ของขวัญ<br>
💡 7. อื่นๆ<br><br>
<b>3. งบประมาณ และ ความสำคัญพิเศษ:</b><br>
(เช่น งบ 15,000, เน้นแบตอึด, กันน้ำ)<br><br>
📲 <b>ตัวอย่างการตอบ:</b><br>
"มือถือ — 1, 3 — งบไม่เกิน 20,000 — เน้นถ่ายรูปสวย"`;
            addMessage(welcomeText, 'bot');

            // Add suggestion chips
            addSuggestionChips();
        }, 1000);
    }

    function addSuggestionChips() {
        const chipsContainer = document.createElement('div');
        chipsContainer.className = 'chat-chips';
        chipsContainer.innerHTML = `
            <button class="chat-chip" onclick="handleChipClick('แนะนำมือถือถ่ายรูปสวย')">📱 มือถือถ่ายรูปสวย</button>
            <button class="chat-chip" onclick="handleChipClick('โน้ตบุ๊กทำงาน')">💻 โน้ตบุ๊กทำงาน</button>
            <button class="chat-chip" onclick="handleChipClick('สินค้าขายดี')">🔥 สินค้าขายดี</button>
            <button class="chat-chip" onclick="handleChipClick('เครื่องสำอาง')">💄 เครื่องสำอาง</button>
        `;
        chatMessages.appendChild(chipsContainer);
        scrollToBottom();
    }

    window.handleChipClick = function (text) {
        const input = document.getElementById('chat-input');
        input.value = text;
        document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    }

    function findProducts(query) {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return products.filter(p =>
            (p.name && p.name.toLowerCase().includes(lowerQuery)) ||
            (p.category && p.category.toLowerCase().includes(lowerQuery)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(lowerQuery)))
        ).slice(0, 3); // Return top 3
    }

    function generateMockResponse(userText) {
        const lower = userText.toLowerCase();
        let response = '';

        // Check for specific keywords first
        if (lower.includes('ขายดี') || lower.includes('แนะนำ') || lower.includes('นิยม')) {
            // Fix: Use reviews as proxy for sales since 'sales' prop differs
            const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 3);
            return `นี่คือสินค้าขายดีและได้รับความนิยมสูงสุดครับ 🔥<br>${renderProductCards(bestSellers)}`;
        }

        if (lower.includes('ถูก') || lower.includes('ประหยัด') || lower.includes('งบน้อย')) {
            // Sor by price asc
            const cheapProducts = [...products].sort((a, b) => a.currentPrice - b.currentPrice).slice(0, 3);
            return `รายการสินค้าราคาสบายกระเป๋าครับ 💰<br>${renderProductCards(cheapProducts)}`;
        }

        if (lower.includes('แพง') || lower.includes('หรู') || lower.includes('พรีเมียม')) {
            // Sor by price desc
            const premiumProducts = [...products].sort((a, b) => b.currentPrice - a.currentPrice).slice(0, 3);
            return `คัดมาให้แล้วครับ สินค้าระดับพรีเมียม 💎<br>${renderProductCards(premiumProducts)}`;
        }

        // Search for products
        const results = findProducts(userText);
        if (results.length > 0) {
            response = `ผมเจอสินค้าที่น่าจะตรงกับความต้องการของคุณครับ 👇<br>${renderProductCards(results)}`;
            if (results.length === 3) {
                response += `<br><span style="font-size: 0.8rem; color: #666;">มีสินค้าอื่นๆ อีกเพียบ ลองระบุรุ่นหรือยี่ห้อเพิ่มได้นะครับ</span>`;
            }
            return response;
        }

        // Fallback for no results but specific categories
        if (lower.includes('มือถือ') || lower.includes('iphone') || lower.includes('samsung')) {
            const phones = products.filter(p => p.category === 'โทรศัพท์').slice(0, 3);
            return `ถ้าคุณมองหามือถือ ผมแนะนำรุ่นยอดนิยมช่วงนี้ครับ:<br>${renderProductCards(phones)}`;
        }

        if (lower.includes('คอม') || lower.includes('โน้ตบุ๊ก')) {
            const laptops = products.filter(p => p.category === 'โน้ตบุ๊ก').slice(0, 3);
            return `สำหรับโน้ตบุ๊ก นี่คือรุ่นที่แนะนำครับ:<br>${renderProductCards(laptops)}`;
        }

        if (lower.includes('เครื่องสำอาง') || lower.includes('ลิป') || lower.includes('ครีม')) {
            const cosmetics = products.filter(p => p.category === 'เครื่องสำอาง').slice(0, 3);
            return `นี่คือเครื่องสำอางยอดฮิตครับ:<br>${renderProductCards(cosmetics)}`;
        }

        return `ขออภัยครับ ผมยังไม่เจอสินค้าที่ตรงกับ "${userText}" ในตอนนี้ 😅<br>
        ลองค้นหาด้วยคำกว้างๆ เช่น "มือถือ", "รองเท้า", "นาฬิกา" หรือเลือกจากเมนูแนะนำได้เลยครับ`;
    }

    function renderProductCards(products) {
        return `<div class="chat-product-grid">
            ${products.map(p => `
                <div class="chat-product-card" onclick="openModalById(${p.id})">
                    <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x400/eee/999?text=No+Image';">
                    <div class="chat-product-info">
                        <div class="chat-product-name">${p.name}</div>
                        <div class="chat-product-price">฿${p.currentPrice.toLocaleString()}</div>
                    </div>
                </div>
            `).join('')}
        </div>`;
    }

    // Expose openModalById to global scope for chat clicks
    window.openModalById = function (id) {
        const product = products.find(p => p.id === id);
        if (product) {
            if (typeof openComparisonModal === 'function') {
                openComparisonModal(product.id);
            } else {
                console.warn('openComparisonModal not found');
            }
        }
    }
});

// Horoscope Logic
function getColorNameThai(color) {
    const map = {
        'black': 'สีดำ',
        'white': 'สีขาว',
        'grey': 'สีเทา',
        'silver': 'สีเงิน/ขาว',
        'gold': 'สีทอง',
        'red': 'สีแดง',
        'blue': 'สีน้ำเงิน',
        'green': 'สีเขียว',
        'pink': 'สีชมพู',
        'yellow': 'สีเหลือง',
        'purple': 'สีม่วง',
        'orange': 'สีส้ม'
    };
    return map[color] || color;
}

window.checkHoroscope = function (productColor) {
    const day = document.getElementById('birth-day-select').value;
    const resultDiv = document.getElementById('horoscope-result');

    if (!day) {
        resultDiv.innerHTML = '';
        return;
    }

    // Simple Thai Astrology Logic (Seven Days Colors)
    // Rules based on "Mahataksa" (มหาทักษา)
    const astrology = {
        'sunday': { lucky: ['red', 'green', 'black', 'grey', 'purple'], unlucky: ['blue'] },
        'monday': { lucky: ['white', 'silver', 'yellow', 'black', 'purple', 'green', 'orange'], unlucky: ['red'] },
        'tuesday': { lucky: ['pink', 'purple', 'orange', 'black', 'grey', 'red'], unlucky: ['white', 'silver', 'yellow'] },
        'wednesday': { lucky: ['green', 'orange', 'grey', 'blue'], unlucky: ['pink'] },
        'wednesday_night': { lucky: ['grey', 'red', 'white', 'silver'], unlucky: ['orange', 'gold'] },
        'thursday': { lucky: ['orange', 'gold', 'blue', 'red', 'green'], unlucky: ['purple', 'black'] },
        'friday': { lucky: ['blue', 'white', 'silver', 'pink', 'orange'], unlucky: ['grey', 'black'] },
        'saturday': { lucky: ['purple', 'black', 'blue', 'red'], unlucky: ['green'] }
    };

    const dayData = astrology[day];
    let isLucky = false;
    let isUnlucky = false;

    // Check match
    if (dayData.lucky.includes(productColor)) isLucky = true;
    if (dayData.unlucky.includes(productColor)) isUnlucky = true;

    if (isLucky) {
        resultDiv.innerHTML = `<div class="horo-result lucky">🌟 สี${getColorNameThai(productColor)} เป็นสีมงคลของคุณ! เสริมดวงปังๆ</div>`;
    } else if (isUnlucky) {
        resultDiv.innerHTML = `<div class="horo-result unlucky">⚠️ สี${getColorNameThai(productColor)} เป็นกาลกิณี (ไม่ถูกโฉลก) ควรเลี่ยงหรือหาเคสสีอื่นใส่แทน</div>`;
    } else {
        resultDiv.innerHTML = `<div class="horo-result neutral">✨ สี${getColorNameThai(productColor)} เป็นสีกลางๆ ใช้ได้ทั่วไป ไม่ดีไม่เสีย</div>`;
    }
}
