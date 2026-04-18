export interface Ad {
  id: number | string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  image_url: string | null;
  contact: string | null;
  created_at: string;
  featured: boolean;
  seller_email?: string;
  seller_role?: string;
}

export const CATEGORY_NAMES = [
  'Electronics',
  'Mobiles',
  'Cameras',
  'Vehicles',
  'Property',
  'Home & Furniture',
  'Fashion',
  'Sports',
  'Books',
  'Services',
] as const;

export type CategoryName = (typeof CATEGORY_NAMES)[number];

const DAY = 86_400_000;
const now = Date.now();
const daysAgo = (n: number) => new Date(now - n * DAY).toISOString();

export const SEED_ADS: Ad[] = [
  // Electronics
  {
    id: 'seed-e1',
    title: 'MacBook Pro 14" M3 - 2024',
    description: '16GB RAM, 512GB SSD. Space Black. Box packed, full warranty.',
    price: 485000,
    category: 'Electronics',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    contact: '0300-1112233',
    created_at: daysAgo(1),
    featured: true,
  },
  {
    id: 'seed-e2',
    title: 'Dell XPS 15 Laptop',
    description: 'Intel i7, 16GB RAM, 1TB SSD, 4K OLED. 2 months used.',
    price: 320000,
    category: 'Electronics',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    contact: '0321-4445566',
    created_at: daysAgo(3),
    featured: false,
  },
  {
    id: 'seed-e3',
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Noise cancelling, 30 hour battery. Mint condition with case.',
    price: 65000,
    category: 'Electronics',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    contact: '0333-7778899',
    created_at: daysAgo(5),
    featured: false,
  },
  {
    id: 'seed-e4',
    title: 'LG 55" 4K Smart TV',
    description: 'OLED panel, WebOS, HDR10+. Crystal clear picture.',
    price: 180000,
    category: 'Electronics',
    location: 'Rawalpindi',
    image_url:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    contact: '0345-1212121',
    created_at: daysAgo(6),
    featured: true,
  },

  // Mobiles
  {
    id: 'seed-m1',
    title: 'iPhone 15 Pro Max - 256GB',
    description: 'Natural Titanium. PTA approved. All accessories with box.',
    price: 435000,
    category: 'Mobiles',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1695048132913-0fc1e59a9fcd?w=800&q=80',
    contact: '0300-9998877',
    created_at: daysAgo(2),
    featured: true,
  },
  {
    id: 'seed-m2',
    title: 'Samsung Galaxy S24 Ultra',
    description: '12GB/512GB, Titanium Gray. Full warranty from Samsung.',
    price: 385000,
    category: 'Mobiles',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    contact: '0321-5556677',
    created_at: daysAgo(4),
    featured: false,
  },
  {
    id: 'seed-m3',
    title: 'Google Pixel 8 Pro',
    description: 'Obsidian, 128GB. Best camera smartphone. PTA approved.',
    price: 215000,
    category: 'Mobiles',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
    contact: '0333-4443322',
    created_at: daysAgo(7),
    featured: false,
  },
  {
    id: 'seed-m4',
    title: 'OnePlus 12 - Flowy Emerald',
    description: '16GB/512GB. Hasselblad camera. Like new, 4 months old.',
    price: 195000,
    category: 'Mobiles',
    location: 'Faisalabad',
    image_url:
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80',
    contact: '0345-7788990',
    created_at: daysAgo(9),
    featured: false,
  },

  // Cameras
  {
    id: 'seed-c1',
    title: 'Canon EOS R5 Mirrorless',
    description: '45MP full-frame, 8K video. Body only, under warranty.',
    price: 820000,
    category: 'Cameras',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    contact: '0300-5544332',
    created_at: daysAgo(2),
    featured: true,
  },
  {
    id: 'seed-c2',
    title: 'Sony Alpha A7 IV',
    description: '33MP full-frame. With 28-70mm kit lens. Low shutter count.',
    price: 625000,
    category: 'Cameras',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=800&q=80',
    contact: '0321-1231234',
    created_at: daysAgo(4),
    featured: false,
  },
  {
    id: 'seed-c3',
    title: 'Nikon Z6 II + 24-70mm f/4',
    description: 'Mint condition with extra battery and 128GB XQD card.',
    price: 485000,
    category: 'Cameras',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    contact: '0333-9988776',
    created_at: daysAgo(6),
    featured: false,
  },
  {
    id: 'seed-c4',
    title: 'GoPro Hero 12 Black',
    description: '5.3K video, waterproof. With chest mount and spare batteries.',
    price: 95000,
    category: 'Cameras',
    location: 'Rawalpindi',
    image_url:
      'https://images.unsplash.com/photo-1526470498-9ae73c665de8?w=800&q=80',
    contact: '0345-2223344',
    created_at: daysAgo(8),
    featured: false,
  },

  // Vehicles
  {
    id: 'seed-v1',
    title: 'Honda Civic 2023 Oriel',
    description: 'Turbo 1.5L, full options, sunroof. 18,000 km driven.',
    price: 8900000,
    category: 'Vehicles',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
    contact: '0300-1111222',
    created_at: daysAgo(1),
    featured: true,
  },
  {
    id: 'seed-v2',
    title: 'Toyota Corolla GLi 2020',
    description: '1.3L, manual, single owner. Excellent condition.',
    price: 4650000,
    category: 'Vehicles',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80',
    contact: '0321-3334455',
    created_at: daysAgo(3),
    featured: false,
  },
  {
    id: 'seed-v3',
    title: 'Suzuki Alto VXR 2022',
    description: 'Pearl white, AC, power windows. Low mileage 22,000 km.',
    price: 2350000,
    category: 'Vehicles',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    contact: '0333-5566778',
    created_at: daysAgo(5),
    featured: false,
  },
  {
    id: 'seed-v4',
    title: 'Yamaha YBR 125G 2023',
    description: 'Matte black, 3,500 km. Fuel efficient. Registered Punjab.',
    price: 295000,
    category: 'Vehicles',
    location: 'Faisalabad',
    image_url:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
    contact: '0345-9090909',
    created_at: daysAgo(7),
    featured: false,
  },

  // Property
  {
    id: 'seed-p1',
    title: '10 Marla House DHA Phase 5',
    description: '5 bed, 6 bath, double unit. Fully tiled, modern kitchen.',
    price: 72000000,
    category: 'Property',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    contact: '0300-1010101',
    created_at: daysAgo(2),
    featured: true,
  },
  {
    id: 'seed-p2',
    title: '1 Kanal Plot Bahria Town',
    description: 'Sector F, corner plot, facing park. Ready for construction.',
    price: 28000000,
    category: 'Property',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    contact: '0321-2020202',
    created_at: daysAgo(4),
    featured: false,
  },
  {
    id: 'seed-p3',
    title: '3 Bed Apartment Clifton',
    description: 'Sea view, fully furnished. 8th floor with 2 parking spaces.',
    price: 45000000,
    category: 'Property',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    contact: '0333-3030303',
    created_at: daysAgo(6),
    featured: true,
  },

  // Home & Furniture
  {
    id: 'seed-h1',
    title: 'L-Shape Leather Sofa Set',
    description: '7 seater, imported leather, walnut frame. 6 months used.',
    price: 185000,
    category: 'Home & Furniture',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    contact: '0300-6060606',
    created_at: daysAgo(1),
    featured: true,
  },
  {
    id: 'seed-h2',
    title: 'King Size Bed with Mattress',
    description: 'Solid sheesham wood, orthopedic mattress included.',
    price: 95000,
    category: 'Home & Furniture',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    contact: '0321-7070707',
    created_at: daysAgo(3),
    featured: false,
  },
  {
    id: 'seed-h3',
    title: '6-Seater Dining Table',
    description: 'Marble top, teak wood legs. With matching chairs.',
    price: 72000,
    category: 'Home & Furniture',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80',
    contact: '0333-8080808',
    created_at: daysAgo(5),
    featured: false,
  },
  {
    id: 'seed-h4',
    title: 'Modern Study Desk + Chair',
    description: 'Height adjustable ergonomic setup for home office.',
    price: 28500,
    category: 'Home & Furniture',
    location: 'Rawalpindi',
    image_url:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    contact: '0345-9191919',
    created_at: daysAgo(7),
    featured: false,
  },
  {
    id: 'seed-h5',
    title: 'Haier 18 kg Washing Machine',
    description: 'Front load, inverter, 2 years used. Energy efficient.',
    price: 58000,
    category: 'Home & Furniture',
    location: 'Faisalabad',
    image_url:
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80',
    contact: '0300-2222111',
    created_at: daysAgo(9),
    featured: false,
  },

  // Fashion
  {
    id: 'seed-f1',
    title: 'Gul Ahmed 3-Piece Lawn Suit',
    description: 'Unstitched, embroidered, summer collection 2024.',
    price: 6500,
    category: 'Fashion',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
    contact: '0300-3434343',
    created_at: daysAgo(1),
    featured: true,
  },
  {
    id: 'seed-f2',
    title: 'Branded Men Leather Jacket',
    description: 'Genuine cow leather, size L. Imported, barely worn.',
    price: 15500,
    category: 'Fashion',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    contact: '0321-5656565',
    created_at: daysAgo(3),
    featured: false,
  },
  {
    id: 'seed-f3',
    title: 'Nike Air Max 270 - Size 42',
    description: 'Original, triple black. Box and tags included.',
    price: 14000,
    category: 'Fashion',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    contact: '0333-1414141',
    created_at: daysAgo(4),
    featured: false,
  },
  {
    id: 'seed-f4',
    title: 'Designer Bridal Lehenga',
    description: 'Hand embroidered, maroon & gold. Used once at wedding.',
    price: 65000,
    category: 'Fashion',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&q=80',
    contact: '0345-7878787',
    created_at: daysAgo(6),
    featured: true,
  },
  {
    id: 'seed-f5',
    title: 'Rolex Submariner Replica',
    description: 'AAA quality, automatic movement. 316L steel.',
    price: 18500,
    category: 'Fashion',
    location: 'Rawalpindi',
    image_url:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    contact: '0300-4545454',
    created_at: daysAgo(8),
    featured: false,
  },

  // Sports
  {
    id: 'seed-s1',
    title: 'CA Plus 15000 Cricket Bat',
    description: 'English willow, grade 1. Barely used, perfect grain.',
    price: 22500,
    category: 'Sports',
    location: 'Sialkot',
    image_url:
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    contact: '0300-7171717',
    created_at: daysAgo(1),
    featured: true,
  },
  {
    id: 'seed-s2',
    title: 'Professional Football Size 5',
    description: 'Adidas Al Rihla replica. Match quality, thermal bonded.',
    price: 4500,
    category: 'Sports',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
    contact: '0321-8282828',
    created_at: daysAgo(3),
    featured: false,
  },
  {
    id: 'seed-s3',
    title: 'Yonex Badminton Racket Set',
    description: 'Pair of Voltric 7 rackets with shuttles and grips.',
    price: 12800,
    category: 'Sports',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1613918431703-aa50889e3be8?w=800&q=80',
    contact: '0333-6363636',
    created_at: daysAgo(4),
    featured: false,
  },
  {
    id: 'seed-s4',
    title: 'Home Gym Dumbbell Set 50kg',
    description: 'Rubber coated with barbell rod. Complete set.',
    price: 18000,
    category: 'Sports',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
    contact: '0345-1313131',
    created_at: daysAgo(6),
    featured: false,
  },
  {
    id: 'seed-s5',
    title: 'Treadmill - Motorized 2.5HP',
    description: 'Foldable, 16 programs, heart rate monitor. Like new.',
    price: 85000,
    category: 'Sports',
    location: 'Faisalabad',
    image_url:
      'https://images.unsplash.com/photo-1592489304563-d812a1a70a28?w=800&q=80',
    contact: '0300-1515151',
    created_at: daysAgo(8),
    featured: true,
  },

  // Books
  {
    id: 'seed-b1',
    title: 'FSc Physics, Chemistry, Biology Set',
    description: 'Part I & II, all in excellent condition. Punjab board.',
    price: 3500,
    category: 'Books',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
    contact: '0300-9191919',
    created_at: daysAgo(2),
    featured: false,
  },
  {
    id: 'seed-b2',
    title: 'CSS Preparation Bundle',
    description: 'Dogar, Caravan and JWT books. Solved past papers included.',
    price: 8500,
    category: 'Books',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80',
    contact: '0321-2828282',
    created_at: daysAgo(4),
    featured: true,
  },
  {
    id: 'seed-b3',
    title: 'Atomic Habits - James Clear',
    description: 'Hardcover, international edition. New.',
    price: 1800,
    category: 'Books',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    contact: '0333-7272727',
    created_at: daysAgo(6),
    featured: false,
  },

  // Services
  {
    id: 'seed-sv1',
    title: 'AC Service & Repair - All Brands',
    description: 'Gas filling, installation, general service. Same day visit.',
    price: 2500,
    category: 'Services',
    location: 'Lahore',
    image_url:
      'https://images.unsplash.com/photo-1580281657702-257584239a55?w=800&q=80',
    contact: '0300-3636363',
    created_at: daysAgo(1),
    featured: false,
  },
  {
    id: 'seed-sv2',
    title: 'Home Tutor for O/A Levels',
    description: 'Maths, Physics, Chemistry. 10+ years experience.',
    price: 25000,
    category: 'Services',
    location: 'Islamabad',
    image_url:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    contact: '0321-4747474',
    created_at: daysAgo(3),
    featured: true,
  },
  {
    id: 'seed-sv3',
    title: 'Wedding Photography Package',
    description: 'Full event coverage, photo + video, drone shots.',
    price: 125000,
    category: 'Services',
    location: 'Karachi',
    image_url:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    contact: '0333-5858585',
    created_at: daysAgo(5),
    featured: true,
  },
];
