import { Product, Category, User, MarketplaceStats, ContactMessage, ConditionType, ProductStatus, UserRole } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'reloop_products_inr_v2',
  CATEGORIES: 'reloop_categories_inr_v2',
  USERS: 'reloop_users_inr_v2',
  CURRENT_USER: 'reloop_current_user_inr_v2',
  WISHLIST: 'reloop_wishlist_inr_v2',
  MESSAGES: 'reloop_messages_inr_v2',
};

// Seed Categories (8 categories)
const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-cameras', name: 'Cameras & Optics', slug: 'cameras-optics', icon: 'camera', description: 'Rangefinders, medium format lenses & optical instruments', itemCount: 4 },
  { id: 'cat-audio', name: 'Audio & Hi-Fi', slug: 'audio-hifi', icon: 'headphones', description: 'Audiophile headphones, DACs, studio monitors & amplifiers', itemCount: 4 },
  { id: 'cat-watches', name: 'Luxury Horology', slug: 'luxury-horology', icon: 'watch', description: 'Mechanical chronometers, automatic calibers & vintage timepieces', itemCount: 3 },
  { id: 'cat-ergonomics', name: 'Ergonomics & Studio', slug: 'ergonomics-studio', icon: 'chair', description: 'Architectural seating, sit-stand systems & studio acoustics', itemCount: 3 },
  { id: 'cat-computing', name: 'Computing & Silicon', slug: 'computing-silicon', icon: 'cpu', description: 'High-bandwidth workstations, GPUs, e-ink terminals & keyboards', itemCount: 3 },
  { id: 'cat-mobility', name: 'EV & Micro-Mobility', slug: 'ev-mobility', icon: 'zap', description: 'Carbon e-bikes, telemetry sensors & portable power stations', itemCount: 2 },
  { id: 'cat-wearables', name: 'Designer Tech Apparel', slug: 'tech-apparel', icon: 'shirt', description: 'Technical outerwear, ballistic nylon bags & modular straps', itemCount: 2 },
  { id: 'cat-home', name: 'Smart Home & Synthesis', slug: 'smart-home', icon: 'home', description: 'Ambient synthesizers, air purification & precision hardware', itemCount: 2 },
];

// Seed Users (3 demo users + Google integration)
const INITIAL_USERS: User[] = [
  {
    id: 'user-google-sai',
    name: 'Sai Yagnesh',
    email: 'bonaganisaiyagnesh@gmail.com',
    role: 'seller',
    city: 'Bengaluru Tech Hub',
    rating: 5.0,
    dealsCount: 88,
    kycVerified: true,
    joinedDate: '2023-04-14',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80',
    walletBalance: 285000,
    googleAccount: true,
  },
  {
    id: 'user-admin',
    name: 'Julian Vance (Admin)',
    email: 'admin@reloop.luxury',
    role: 'admin',
    city: 'Mumbai Metropole',
    rating: 5.0,
    dealsCount: 420,
    kycVerified: true,
    joinedDate: '2021-03-12',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    walletBalance: 1145000,
  },
  {
    id: 'user-seller',
    name: 'Julian V. (Private Collector)',
    email: 'seller@reloop.luxury',
    role: 'seller',
    city: 'Bengaluru East',
    rating: 4.98,
    dealsCount: 142,
    kycVerified: true,
    joinedDate: '2021-09-04',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    walletBalance: 580000,
  },
  {
    id: 'user-buyer',
    name: 'Elena Rostova',
    email: 'buyer@reloop.luxury',
    role: 'buyer',
    city: 'Delhi NCR',
    rating: 4.92,
    dealsCount: 24,
    kycVerified: true,
    joinedDate: '2023-01-18',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    walletBalance: 195000,
  },
];

// Seed 20 Realistic Products in Indian Rupees (₹)
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-leica-m6',
    title: 'Leica M6 Classic (1984)',
    description: 'Original Leitz Wetzlar mechanical 35mm rangefinder in black chrome finish. Featuring 0.72x optical viewfinder with brightline frame masks. Shutter timing checked on telemetric acoustic tester; speeds from 1s to 1/1000s within factory tolerance. Zero shutter curtain rust or mirror de-silvering.',
    price: 205000,
    marketPrice: 249000,
    dealScore: 92,
    condition: 'Like New',
    conditionScore: 9.8,
    category: 'Cameras & Optics',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjj3PyBoPw3WInewy4E0JROq9Hd2ZNNd95N7TI_DSYDm7nrrtVGqPpg0tKMrOLsZda74-_Tk3N90nr8AiL6-trlOgEviPIbBXWR-mPRr2-uNgc1Gv3qJ9l9vD3jfkIq5Drzeu_bwUQUmU2DgqBQjbVbgtc0vPIL9tbTpWbbab7r6bYvjVusO_CjzejuujMgemjILPLz_URfoAo-6BvTjzdlahX0hUsoMzxAx3LMsqLNlwArcD9iUrI',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Munich Old Town Hub',
    distanceKm: 0.8,
    status: 'available',
    negotiable: true,
    views: 1420,
    createdAt: '2025-02-10T14:20:00Z',
    sku: 'LM6-1984',
    featured: true,
    specs: {
      'Format': '35mm Film Rangefinder',
      'Viewfinder': '0.72x Magnification',
      'Shutter': 'Mechanically timed cloth focal plane',
      'Battery': '2x SR44 (Meter only)',
      'Provenance': 'Leitz Wetzlar, West Germany'
    },
    inspectionNotes: 'Authenticated by Maison horologist & optics team. Zero corrosion, calibrated light meter.'
  },
  {
    id: 'prod-sony-xm5',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Platinum Silver noise canceling flagship headphones with dual processor ANC and eight microphone beamforming array. Pristine acoustic transducers with clean earpads. Battery diagnostics report 97% health remaining.',
    price: 24500,
    marketPrice: 32990,
    dealScore: 89,
    condition: 'Like New',
    conditionScore: 9.6,
    category: 'Audio & Hi-Fi',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnmIXMMOyX1pyoFtTy0opRFdKVJ7DuS63hZR8njNNaEyM7XBDdh87SRlIfquSUQ5QSk99HB2kkxJRAJ9cl6hD5rdrCwLlQk6HS8X8Vb2A3Uf0Xqj75F9lJAoQLaYv5noMmawIdlicdcdmtGAyOZCBvLY0lGRijlscniXJ5KivvfjaQo7uME4RWqx604SNBpuAbuA8aqChOTF28zbt7QftyEHM1v_4sy7JZ1znhYKvbmO_O418XKWz_',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Studio North',
    distanceKm: 1.4,
    status: 'available',
    negotiable: false,
    views: 890,
    createdAt: '2025-02-14T09:15:00Z',
    sku: 'SNY-XM5-SLV',
    featured: true,
    specs: {
      'Driver': '30mm Carbon Fiber Composite',
      'Battery Life': '30 Hours with ANC On',
      'Codecs': 'LDAC, AAC, SBC',
      'Weight': '250 grams'
    },
    inspectionNotes: 'Clean acoustic mesh, sanitized earcups, magnetic case included.'
  },
  {
    id: 'prod-hm-aeron',
    title: 'Herman Miller Aeron Remastered (Size B)',
    description: 'Graphite frame with PostureFit SL lumbar stabilization and fully adjustable vinyl arms. Pellicle 8Z mesh weave maintains tight tension across thoracic zones. Smooth pneumatic gas lift and forward tilt lockout.',
    price: 74500,
    marketPrice: 120000,
    dealScore: 94,
    condition: 'Good',
    conditionScore: 8.9,
    category: 'Ergonomics & Studio',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1580481077195-c328a37db71a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Studio Clearance • Hub East',
    distanceKm: 2.1,
    status: 'available',
    negotiable: true,
    views: 1120,
    createdAt: '2025-02-12T11:00:00Z',
    sku: 'HM-AER-B-GR',
    featured: false,
    specs: {
      'Size': 'Size B (Medium)',
      'Lumbar': 'PostureFit SL Dual Pad',
      'Tilt': 'Forward and Rear Limiter',
      'Casters': 'Hard Floor Multi-Surface 2.5"'
    },
    inspectionNotes: 'No mesh sagging. Clean armrests, inspected tilt mechanism.'
  },
  {
    id: 'prod-speedmaster-pro',
    title: 'Omega Speedmaster Professional Moonwatch',
    description: 'Hesalite crystal edition with manual wind Calibre 1861 movement. Certified 48-hour power reserve. Case shows honest micro-hairlines consistent with careful rotation. Includes inner/outer NASA presentation box.',
    price: 405000,
    marketPrice: 520000,
    dealScore: 90,
    condition: 'Like New',
    conditionScore: 9.7,
    category: 'Luxury Horology',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547996160-71dfa63582d8?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Central Vault',
    distanceKm: 3.2,
    status: 'available',
    negotiable: true,
    views: 2100,
    createdAt: '2025-01-28T16:40:00Z',
    sku: 'OMG-SPM-1861',
    featured: true,
    specs: {
      'Caliber': 'Manual Omega 1861',
      'Diameter': '42mm',
      'Crystal': 'Hesalite with logo engraving',
      'Water Resistance': '50 meters'
    },
    inspectionNotes: 'Acoustic timing: +2 sec/day. Amplitude 295 deg. Authenticity certified.'
  },
  {
    id: 'prod-fujifilm-x100v',
    title: 'Fujifilm X100V Compact Camera',
    description: 'Silver aluminum top plate, 26.1MP X-Trans CMOS 4 sensor with sharp 23mm f/2.0 Mark II lens. Hybrid optical/electronic viewfinder. Low shutter actuation count of 1,840 frames. Screen protector applied on day one.',
    price: 112000,
    marketPrice: 140000,
    dealScore: 88,
    condition: 'Like New',
    conditionScore: 9.7,
    category: 'Cameras & Optics',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Design Quarter',
    distanceKm: 1.8,
    status: 'available',
    negotiable: false,
    views: 1850,
    createdAt: '2025-02-05T12:00:00Z',
    sku: 'FJI-X100V-SLV',
    featured: false,
    specs: {
      'Sensor': '26.1MP APS-C X-Trans IV',
      'Lens': '23mm f/2.0 Mark II (35mm equiv)',
      'Actuations': '1,840 shots',
      'Accessories': 'Original box, strap, hood adapter'
    },
    inspectionNotes: 'Pristine front element, zero dust inside viewfinder.'
  },
  {
    id: 'prod-macbook-pro-m3',
    title: 'Apple MacBook Pro 16" (M3 Max / 36GB / 1TB)',
    description: 'Space Black anodized finish with breakthrough thermal efficiency. 14-core CPU, 30-core GPU, Liquid Retina XDR 120Hz display with zero dead pixels. 24 battery cycles with 100% capacity.',
    price: 220000,
    marketPrice: 290000,
    dealScore: 93,
    condition: 'Like New',
    conditionScore: 9.9,
    category: 'Computing & Silicon',
    sellerId: 'user-admin',
    sellerName: 'Julian Vance (Admin)',
    sellerRating: 5.0,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Silicon Hub 01',
    distanceKm: 4.1,
    status: 'available',
    negotiable: true,
    views: 3100,
    createdAt: '2025-02-01T08:30:00Z',
    sku: 'APL-MBP16-M3X',
    featured: true,
    specs: {
      'Processor': 'Apple M3 Max 14-core CPU',
      'Memory': '36GB Unified Architecture',
      'Storage': '1TB NVMe Flash',
      'Battery Health': '100% (24 Cycles)'
    },
    inspectionNotes: 'AppleCare+ coverage eligible. Factory reset, clean iCloud account.'
  },
  {
    id: 'prod-sennheiser-hd800s',
    title: 'Sennheiser HD 800 S Reference Headphones',
    description: 'Flagship 56mm Ring Radiator open-back transducers engineered in Wedemark, Germany. Unrivaled holographic soundstage. Includes balanced 4.4mm Pentaconn and 6.35mm stereo cable with authentic velvet presentation box.',
    price: 99000,
    marketPrice: 149000,
    dealScore: 91,
    condition: 'Like New',
    conditionScore: 9.7,
    category: 'Audio & Hi-Fi',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Acoustic Loft',
    distanceKm: 2.8,
    status: 'available',
    negotiable: false,
    views: 740,
    createdAt: '2025-01-20T17:10:00Z',
    sku: 'SNH-HD800S-GER',
    featured: false,
    specs: {
      'Transducer': '56mm Ring Radiator Dynamic',
      'Impedance': '300 Ohms',
      'Frequency Response': '4 Hz - 51,000 Hz',
      'Origin': 'Wedemark, Germany'
    },
    inspectionNotes: 'Microfiber ear cushions freshly replaced with OEM parts.'
  },
  {
    id: 'prod-teenage-engineering-op1',
    title: 'Teenage Engineering OP-1 Field Synthesizer',
    description: 'Brushed anodized aluminum chassis, stereo signal chain throughout, 32-bit audio engine, and 24-voice polyphony. Crisp high-resolution color OLED display. Gently utilized in smoke-free home studio.',
    price: 124000,
    marketPrice: 165000,
    dealScore: 89,
    condition: 'New',
    conditionScore: 9.9,
    category: 'Smart Home & Synthesis',
    sellerId: 'user-buyer',
    sellerName: 'Elena Rostova',
    sellerRating: 4.92,
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Neo-City West',
    distanceKm: 3.5,
    status: 'available',
    negotiable: true,
    views: 950,
    createdAt: '2025-02-08T13:45:00Z',
    sku: 'TE-OP1-FIELD',
    featured: false,
    specs: {
      'Enclosure': 'Anodized 6063-T6 Aluminum',
      'Battery': '24-hour rechargeable Li-poly',
      'Connectivity': 'Bluetooth 5.0 LE, USB-C Audio',
      'Radio': 'FM stereo transmitter and receiver'
    },
    inspectionNotes: 'Original protective sleeve, Type-C cable, and sealed quick guide.'
  },
  {
    id: 'prod-vanmoof-s5',
    title: 'VanMoof S5 Smart Electric Commuter',
    description: 'Matte Grey finish with integrated halo ring handlebars, ultra-quiet Gen 5 motor, automatic 4-speed electronic shifting, and Kick Lock security. Odometer reads 340 km total travel.',
    price: 145000,
    marketPrice: 250000,
    dealScore: 95,
    condition: 'Good',
    conditionScore: 8.8,
    category: 'EV & Micro-Mobility',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Metro Terminal Hub',
    distanceKm: 4.9,
    status: 'available',
    negotiable: true,
    views: 1380,
    createdAt: '2025-01-25T15:20:00Z',
    sku: 'VM-S5-GRY-EU',
    featured: false,
    specs: {
      'Motor': '250W Front-hub Boost Drive',
      'Battery': '477Wh integrated LG cells',
      'Range': '60 - 140 km per charge',
      'Shift System': 'Electronic automatic E-shifter'
    },
    inspectionNotes: 'Battery diagnostic: 96% health. Charger and keycard included.'
  },
  {
    id: 'prod-arc-teryx-veilance',
    title: "Arc'teryx Veilance Monitor Coat (GORE-TEX Pro)",
    description: 'Black technical minimalist storm parka crafted with 3L GORE-TEX Pro Most Rugged membrane. WaterTight taped internal micro-seams, concealed Excella zip hardware, low-profile StormHood.',
    price: 56000,
    marketPrice: 92000,
    dealScore: 87,
    condition: 'Like New',
    conditionScore: 9.6,
    category: 'Designer Tech Apparel',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Artisanal Vault',
    distanceKm: 2.3,
    status: 'available',
    negotiable: false,
    views: 620,
    createdAt: '2025-02-03T19:00:00Z',
    sku: 'VLC-MON-BLK-M',
    featured: false,
    specs: {
      'Membrane': '3L GORE-TEX Pro Most Rugged',
      'Size': 'Medium (Regular Fit)',
      'Hardware': 'YKK Excella Matte Black',
      'Weight': '515 grams'
    },
    inspectionNotes: 'DWR water repellency restored via Nikwax technical wash.'
  },
  {
    id: 'prod-hasselblad-500cm',
    title: 'Hasselblad 500 C/M with Planar 80mm f/2.8',
    description: 'Legendary chrome medium format 6x6 camera with Carl Zeiss Planar 80mm T* lens and matching A12 film back. Shutter speeds crisp across all stops. Acute Matte D focusing screen installed.',
    price: 179000,
    marketPrice: 235000,
    dealScore: 91,
    condition: 'Good',
    conditionScore: 8.7,
    category: 'Cameras & Optics',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Collector Safe München',
    distanceKm: 1.1,
    status: 'available',
    negotiable: true,
    views: 1650,
    createdAt: '2025-01-19T10:10:00Z',
    sku: 'HBD-500CM-CH',
    featured: false,
    specs: {
      'Format': '6x6 120 Film',
      'Optics': 'Carl Zeiss Planar 80mm f/2.8 T*',
      'Screen': 'Acute Matte D Grid',
      'Back': 'A12 Type IV Matching Numbers'
    },
    inspectionNotes: 'CLA performed by Gothenburg specialist in Nov 2024.'
  },
  {
    id: 'prod-rolex-submariner',
    title: 'Rolex Submariner Date "No-Date" 14060M',
    description: 'Classic 40mm stainless steel diver with 4-line chronometer dial and sapphire crystal. Crisp bezel click springs, zero bracelet stretch on 93150 Oyster bracelet. Box and guarantee papers included.',
    price: 695000,
    marketPrice: 875000,
    dealScore: 89,
    condition: 'Good',
    conditionScore: 8.8,
    category: 'Luxury Horology',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Vault Locker: Mun-04',
    distanceKm: 0.5,
    status: 'available',
    negotiable: true,
    views: 4200,
    createdAt: '2025-01-15T11:25:00Z',
    sku: 'RLX-14060M-SS',
    featured: false,
    specs: {
      'Movement': 'Automatic Calibre 3130',
      'Case': '904L Oystersteel 40mm',
      'Bezel': 'Unidirectional 60-minute Aluminum',
      'Depth Rating': '300m / 1000ft'
    },
    inspectionNotes: 'Pressure-tested to 10 ATM. Serial verified in manufacturer registry.'
  },
  {
    id: 'prod-vitra-eames-lounge',
    title: 'Vitra Eames Lounge Chair & Ottoman',
    description: 'Santos Palisander veneer shells paired with premium black L14 Nero leather upholstery. Polished die-cast aluminum base. Authenticity plaque under seat shell signed by Vitra AG.',
    price: 435000,
    marketPrice: 650000,
    dealScore: 92,
    condition: 'Like New',
    conditionScore: 9.7,
    category: 'Ergonomics & Studio',
    sellerId: 'user-admin',
    sellerName: 'Julian Vance (Admin)',
    sellerRating: 5.0,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Design Architecture Loft',
    distanceKm: 3.8,
    status: 'available',
    negotiable: true,
    views: 1980,
    createdAt: '2025-01-12T14:00:00Z',
    sku: 'VTR-EAMES-PAL',
    featured: false,
    specs: {
      'Wood': 'Molded Santos Palisander',
      'Leather': 'Full-grain Premium L14 Nero',
      'Base': '5-star Polished Die-Cast Base',
      'Edition': 'Classic Vitra European dimensions'
    },
    inspectionNotes: 'Pristine shock mounts, supple moisturized leather.'
  },
  {
    id: 'prod-nvidia-rtx-4090',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition (24GB)',
    description: 'Flagship Ada Lovelace architectural silicon with dual axial cooling fans. Unlocked 24GB GDDR6X VRAM for deep learning workflows and real-time ray-tracing. Never utilized for crypto mining.',
    price: 142000,
    marketPrice: 185000,
    dealScore: 90,
    condition: 'Like New',
    conditionScore: 9.8,
    category: 'Computing & Silicon',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Tech Corridor',
    distanceKm: 2.7,
    status: 'available',
    negotiable: false,
    views: 2450,
    createdAt: '2025-02-06T15:30:00Z',
    sku: 'NV-4090-FE24',
    featured: false,
    specs: {
      'VRAM': '24GB GDDR6X 384-bit',
      'CUDA Cores': '16,384',
      'Cooler': 'Founders Edition Dual Axial Flow',
      'Power': '12VHPWR 450W TGP'
    },
    inspectionNotes: 'Zero thermal throttling under 4-hour FurMark stress benchmark.'
  },
  {
    id: 'prod-rimowa-classic-cabin',
    title: 'Rimowa Classic Cabin Aluminum Carry-On',
    description: 'Anodized high-grade aluminum grooved shell with riveted aluminum corners and handcrafted leather carry handles. Multiwheel ball-bearing system and TSA-approved dual combination locks.',
    price: 76500,
    marketPrice: 112000,
    dealScore: 88,
    condition: 'Good',
    conditionScore: 8.9,
    category: 'Designer Tech Apparel',
    sellerId: 'user-buyer',
    sellerName: 'Elena Rostova',
    sellerRating: 4.92,
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Airport North Hub',
    distanceKm: 5.2,
    status: 'available',
    negotiable: true,
    views: 1190,
    createdAt: '2025-02-04T16:15:00Z',
    sku: 'RMW-CLS-CBN-AL',
    featured: false,
    specs: {
      'Volume': '36 Liters',
      'Shell': 'Anodized 100% Aluminum',
      'Wheel System': 'Multiwheel with cushioned axles',
      'Weight': '4.3 kg'
    },
    inspectionNotes: 'Clean interior flex dividers. Light superficial scuffing on base.'
  },
  {
    id: 'prod-dyson-purifier-big-quiet',
    title: 'Dyson Purifier Big+Quiet Formaldehyde',
    description: 'Commercial-grade architectural air purifier with Cone Aerodynamics projecting clean air over 10 meters. Selective Catalytic Oxidization destroys formaldehyde permanently. Operates at a whisper 56 dB.',
    price: 52900,
    marketPrice: 82500,
    dealScore: 91,
    condition: 'Like New',
    conditionScore: 9.7,
    category: 'Smart Home & Synthesis',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Modern Residence',
    distanceKm: 3.1,
    status: 'available',
    negotiable: false,
    views: 580,
    createdAt: '2025-01-22T09:30:00Z',
    sku: 'DYS-BIG-QT-BP03',
    featured: false,
    specs: {
      'Filtration': 'HEPA H13 + K-Carbon + SCO',
      'Projection': 'Cone Aerodynamics up to 10m',
      'Acoustics': '56 dBA Max sound power',
      'Sensors': 'Particulate, VOC, NO2, HCHO'
    },
    inspectionNotes: 'Filter life remaining: 88%. Remote control magnetically seated.'
  },
  {
    id: 'prod-super73-rx',
    title: 'SUPER73-RX Mojave Electric Cruiser',
    description: 'Dark Earth aerospace-grade 6061-T6 aluminum alloy frame with inverted coil spring fork and rear piggyback coil shock. 960 watt-hour battery with multi-class ride modes and 2000W peak motor output.',
    price: 205000,
    marketPrice: 310000,
    dealScore: 93,
    condition: 'Good',
    conditionScore: 8.9,
    category: 'EV & Micro-Mobility',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'District 4 Depot',
    distanceKm: 4.4,
    status: 'available',
    negotiable: true,
    views: 1470,
    createdAt: '2025-01-30T18:15:00Z',
    sku: 'S73-RX-MJV-DE',
    featured: false,
    specs: {
      'Motor': '1200W Nominal / 2000W Peak',
      'Battery': '960Wh (48V 20Ah) Panasonic',
      'Suspension': 'Fully adjustable inverted fork & rear shock',
      'Brakes': 'Magura 4-piston hydraulic'
    },
    inspectionNotes: 'Brake pads at 80% thickness. Firmware updated to v2.4.'
  },
  {
    id: 'prod-leica-summicron-35',
    title: 'Leica Summicron-M 35mm f/2 ASPH (Chrome)',
    description: 'Silver chrome brass version of the benchmark reportage lens. 7 elements in 5 groups, 11-blade aperture for circular bokeh rendition. Glass surfaces pristine, clickstops precise and tactile.',
    price: 238000,
    marketPrice: 325000,
    dealScore: 92,
    condition: 'Like New',
    conditionScore: 9.8,
    category: 'Cameras & Optics',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Munich Optical Exchange',
    distanceKm: 0.9,
    status: 'available',
    negotiable: true,
    views: 1320,
    createdAt: '2025-02-09T14:40:00Z',
    sku: 'LCA-35CRN-CHR',
    featured: false,
    specs: {
      'Aperture': 'f/2.0 - f/16 (11 blades)',
      'Mount': 'Leica M bayonet with 6-bit coding',
      'Weight': '340 grams (Solid brass barrel)',
      'Origin': 'Wetzlar, Germany'
    },
    inspectionNotes: 'Tested on optical bench. Zero internal fungus or haze.'
  },
  {
    id: 'prod-shure-sm7b',
    title: 'Shure SM7B Studio Vocal Dynamic Mic + Cloudlifter',
    description: 'Broadcast standard cardioid dynamic studio microphone paired with Cloud Microphones Cloudlifter CL-1 inline clean gain preamp. Includes original switch cover plate and dual foam windscreens.',
    price: 31500,
    marketPrice: 45500,
    dealScore: 89,
    condition: 'Good',
    conditionScore: 9.1,
    category: 'Audio & Hi-Fi',
    sellerId: 'user-buyer',
    sellerName: 'Elena Rostova',
    sellerRating: 4.92,
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Broadcast Suite B',
    distanceKm: 2.2,
    status: 'available',
    negotiable: false,
    views: 690,
    createdAt: '2025-01-18T13:20:00Z',
    sku: 'SHR-SM7B-CL1',
    featured: false,
    specs: {
      'Type': 'Dynamic (moving coil)',
      'Polar Pattern': 'Cardioid',
      'Preamp Included': 'Cloudlifter CL-1 (+25dB ultra-clean gain)',
      'Shielding': 'Electromagnetic humbucking coil'
    },
    inspectionNotes: 'XLR pins immaculate, switch covers present and tested.'
  },
  {
    id: 'prod-iwatch-ultra-2',
    title: 'Apple Watch Ultra 2 (Titanium / Ocean Band)',
    description: '49mm aerospace-grade titanium case with flat sapphire front crystal and customizable Action button. 3000 nit display brightness for direct sunlight visibility. Dual-frequency precision GPS (L1 and L5).',
    price: 48000,
    marketPrice: 66000,
    dealScore: 91,
    condition: 'Like New',
    conditionScore: 9.7,
    category: 'Computing & Silicon',
    sellerId: 'user-seller',
    sellerName: 'Julian V. (Private Collector)',
    sellerRating: 4.98,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    location: 'Sub-Hub West',
    distanceKm: 3.4,
    status: 'available',
    negotiable: true,
    views: 1530,
    createdAt: '2025-02-11T16:20:00Z',
    sku: 'APL-ULT2-OCN',
    featured: false,
    specs: {
      'Case': '49mm Natural Titanium',
      'Glass': 'Flat Sapphire Crystal',
      'Brightness': '3,000 nits Peak',
      'Water Resistance': '100m (EN13319 dive certified)'
    },
    inspectionNotes: 'Battery health: 99%. Braided magnetic fast charger included.'
  }
];

// Helper to get or initialize localStorage
function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to set localStorage', err);
  }
}

// REST-identical API methods
export const api = {
  // PRODUCTS
  async getProducts(params?: {
    search?: string;
    category?: string;
    condition?: ConditionType;
    status?: ProductStatus;
    minPrice?: number;
    maxPrice?: number;
    negotiableOnly?: boolean;
    sort?: 'newest' | 'price-asc' | 'price-desc' | 'deal-score' | 'views';
  }): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 60));
    let list = getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);

    if (params) {
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.sku && p.sku.toLowerCase().includes(q))
        );
      }
      if (params.category && params.category !== 'all') {
        list = list.filter(
          (p) => p.category.toLowerCase() === params.category!.toLowerCase()
        );
      }
      if (params.condition) {
        list = list.filter((p) => p.condition === params.condition);
      }
      if (params.status) {
        list = list.filter((p) => p.status === params.status);
      }
      if (params.minPrice !== undefined) {
        list = list.filter((p) => p.price >= params.minPrice!);
      }
      if (params.maxPrice !== undefined) {
        list = list.filter((p) => p.price <= params.maxPrice!);
      }
      if (params.negotiableOnly) {
        list = list.filter((p) => p.negotiable);
      }

      // Sorting
      if (params.sort) {
        switch (params.sort) {
          case 'price-asc':
            list.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            list.sort((a, b) => b.price - a.price);
            break;
          case 'deal-score':
            list.sort((a, b) => (b.dealScore || 0) - (a.dealScore || 0));
            break;
          case 'views':
            list.sort((a, b) => b.views - a.views);
            break;
          case 'newest':
          default:
            list.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
        }
      }
    }

    return list;
  },

  async getProduct(id: string): Promise<Product | null> {
    await new Promise((r) => setTimeout(r, 40));
    const list = getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const item = list.find((p) => p.id === id);
    if (item) {
      item.views = (item.views || 0) + 1;
      setItem(STORAGE_KEYS.PRODUCTS, list);
      return { ...item };
    }
    return null;
  },

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'views'>): Promise<Product> {
    await new Promise((r) => setTimeout(r, 100));
    const list = getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 1,
      dealScore: data.dealScore || Math.floor(Math.random() * 15 + 82),
      conditionScore:
        data.conditionScore ||
        (data.condition === 'New'
          ? 9.9
          : data.condition === 'Like New'
          ? 9.6
          : data.condition === 'Good'
          ? 8.8
          : 7.5),
    };
    list.unshift(newProduct);
    setItem(STORAGE_KEYS.PRODUCTS, list);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await new Promise((r) => setTimeout(r, 80));
    const list = getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    list[index] = { ...list[index], ...updates };
    setItem(STORAGE_KEYS.PRODUCTS, list);
    return list[index];
  },

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    await new Promise((r) => setTimeout(r, 80));
    let list = getItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    list = list.filter((p) => p.id !== id);
    setItem(STORAGE_KEYS.PRODUCTS, list);
    return { success: true };
  },

  async updateStatus(id: string, status: ProductStatus): Promise<Product> {
    return this.updateProduct(id, { status });
  },

  // CATEGORIES
  async getCategories(): Promise<Category[]> {
    await new Promise((r) => setTimeout(r, 30));
    return getItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  async createCategory(cat: Omit<Category, 'id'>): Promise<Category> {
    const list = getItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
      itemCount: 0,
    };
    list.push(newCat);
    setItem(STORAGE_KEYS.CATEGORIES, list);
    return newCat;
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const list = getItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const idx = list.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Category not found');
    list[idx] = { ...list[idx], ...updates };
    setItem(STORAGE_KEYS.CATEGORIES, list);
    return list[idx];
  },

  async deleteCategory(id: string): Promise<boolean> {
    let list = getItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    list = list.filter((c) => c.id !== id);
    setItem(STORAGE_KEYS.CATEGORIES, list);
    return true;
  },

  // USERS & SELLERS
  async getSeller(id: string): Promise<User | null> {
    await new Promise((r) => setTimeout(r, 30));
    const users = getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    return users.find((u) => u.id === id) || null;
  },

  async getUsers(): Promise<User[]> {
    return getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const users = getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('User not found');
    users[idx] = { ...users[idx], ...updates };
    setItem(STORAGE_KEYS.USERS, users);
    return users[idx];
  },

  async deleteUser(id: string): Promise<boolean> {
    let users = getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    users = users.filter((u) => u.id !== id);
    setItem(STORAGE_KEYS.USERS, users);
    return true;
  },

  // AUTH
  async login(email: string, _password?: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 120));
    const users = getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      throw new Error('Invalid email or user credentials');
    }
    setItem(STORAGE_KEYS.CURRENT_USER, found);
    return found;
  },

  // GOOGLE LOGIN
  async loginWithGoogle(customUser?: Partial<User>): Promise<User> {
    await new Promise((r) => setTimeout(r, 200));
    const users = getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const googleEmail = customUser?.email || 'bonaganisaiyagnesh@gmail.com';
    const googleName = customUser?.name || 'Sai Yagnesh';
    const googleAvatar =
      customUser?.avatar ||
      'https://lh3.googleusercontent.com/aida/AEtjO1Xgv3h8Hpm1nepXndxA1-7ejoFzpnF3eSXXdd2qywlNLM1AHwvcjD2r2CaXR3ajPBDmGg9tfiYeQNL7oZbRHiZ8UELpPL1qlgpXf8M1CkIYI9l8WJWIdXu22wdCHlP1ZeL0d8sWpF_FODBksYgiZsj1y_SDhY8slI7YfqVagUvnPjVr9X574ud7O1Re_DzSDktbgIajM_rri4jIg46C8WVE01hcLN7pFuGp0Q3jetta-glCGPa-0yphCHA';

    let existing = users.find((u) => u.email.toLowerCase() === googleEmail.toLowerCase());
    if (!existing) {
      existing = {
        id: `user-google-${Date.now()}`,
        name: googleName,
        email: googleEmail,
        role: customUser?.role || 'seller',
        city: 'Bengaluru Tech Hub',
        rating: 5.0,
        dealsCount: 1,
        kycVerified: true,
        joinedDate: new Date().toISOString().split('T')[0],
        avatar: googleAvatar,
        walletBalance: 250000,
        googleAccount: true,
      };
      users.push(existing);
      setItem(STORAGE_KEYS.USERS, users);
    } else {
      existing.googleAccount = true;
      if (customUser?.avatar) existing.avatar = customUser.avatar;
      setItem(STORAGE_KEYS.USERS, users);
    }

    setItem(STORAGE_KEYS.CURRENT_USER, existing);
    return existing;
  },

  async register(data: { name: string; email: string; role: UserRole; city: string }): Promise<User> {
    await new Promise((r) => setTimeout(r, 120));
    const users = getItem<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('An account with this email already exists');
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      city: data.city || 'Bengaluru',
      rating: 5.0,
      dealsCount: 0,
      kycVerified: false,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80`,
      walletBalance: 50000,
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    setItem(STORAGE_KEYS.CURRENT_USER, newUser);
    return newUser;
  },

  getCurrentUser(): User {
    return getItem<User>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]); // Defaults to Google User (Sai Yagnesh)
  },

  setCurrentUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      setItem(STORAGE_KEYS.CURRENT_USER, user);
    }
  },

  // WISHLIST
  async getWishlist(userId: string): Promise<string[]> {
    const map = getItem<Record<string, string[]>>(STORAGE_KEYS.WISHLIST, {
      'user-google-sai': ['prod-leica-m6', 'prod-sony-xm5', 'prod-vitra-eames-lounge'],
      'user-seller': ['prod-leica-m6', 'prod-sony-xm5'],
      'user-buyer': ['prod-leica-m6', 'prod-macbook-pro-m3'],
      'user-admin': ['prod-rolex-submariner'],
    });
    return map[userId] || [];
  },

  async toggleWishlist(userId: string, productId: string): Promise<{ productIds: string[]; inWishlist: boolean }> {
    const map = getItem<Record<string, string[]>>(STORAGE_KEYS.WISHLIST, {
      'user-google-sai': ['prod-leica-m6', 'prod-sony-xm5', 'prod-vitra-eames-lounge'],
      'user-seller': ['prod-leica-m6', 'prod-sony-xm5'],
      'user-buyer': ['prod-leica-m6', 'prod-macbook-pro-m3'],
      'user-admin': ['prod-rolex-submariner'],
    });
    let list = map[userId] || [];
    const exists = list.includes(productId);
    if (exists) {
      list = list.filter((id) => id !== productId);
    } else {
      list.push(productId);
    }
    map[userId] = list;
    setItem(STORAGE_KEYS.WISHLIST, map);
    return { productIds: list, inWishlist: !exists };
  },

  // STATS
  async getStats(): Promise<MarketplaceStats> {
    await new Promise((r) => setTimeout(r, 20));
    return {
      totalInventory: 14892,
      inventoryGrowth: '+12.4%',
      circularUnitsRecycled: 3410,
      co2TonsSaved: 4.8,
      waterSavedLiters: 42000,
      activeNodes: 3,
      liveLatencyMs: 14,
    };
  },

  // MESSAGES / INQUIRIES
  async sendMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    await new Promise((r) => setTimeout(r, 80));
    const messages = getItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMsg);
    setItem(STORAGE_KEYS.MESSAGES, messages);
    return newMsg;
  },

  async getMessages(): Promise<ContactMessage[]> {
    return getItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  },

  // RESET TO DEMO DATA
  resetDemoData(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    window.location.reload();
  }
};
