/**
 * AutoParts Pro - Products Catalog & Vehicle Database
 * Comprehensive database of spare parts, categories, brands, and vehicle compatibility specs.
 */

window.AutoPartsData = {
    // Categories List
    categories: [
        { id: "brakes", name: "Brake Components", icon: "fa-circle-dot", count: 2 },
        { id: "engine", name: "Engine Parts", icon: "fa-gears", count: 3 },
        { id: "electrical", name: "Electrical & Lighting", icon: "fa-bolt", count: 2 },
        { id: "filters", name: "Filters (Oil, Air, Cabin)", icon: "fa-filter", count: 1 },
        { id: "suspension", name: "Suspension & Steering", icon: "fa-car-side", count: 1 },
        { id: "cooling", name: "Cooling & Heating", icon: "fa-temperature-arrow-down", count: 1 },
        { id: "transmission", name: "Transmission & Drivetrain", icon: "fa-arrows-spin", count: 1 },
        { id: "fluids", name: "Oils & Lubricants", icon: "fa-oil-can", count: 1 },
        { id: "body", name: "Body & Mirrors", icon: "fa-shield-halved", count: 0 },
        { id: "exhaust", name: "Exhaust System", icon: "fa-wind", count: 0 },
        { id: "interior", name: "Interior Accessories", icon: "fa-chair", count: 0 },
        { id: "tyres", name: "Tyres & Wheels", icon: "fa-compact-disc", count: 0 }
    ],

    // Brands List
    brands: [
        { id: "bosch", name: "Bosch", logo: "assets/images/parts/alternator.jpg", partsCount: 4250, origin: "Germany", rating: 4.9, desc: "Global leader in automotive technology, brake systems, electricals, and fuel injection." },
        { id: "brembo", name: "Brembo", logo: "assets/images/parts/brake-rotors.jpg", partsCount: 1890, origin: "Italy", rating: 4.9, desc: "World leader in design and production of high-performance braking systems." },
        { id: "denso", name: "Denso", logo: "assets/images/parts/radiator.jpg", partsCount: 2310, origin: "Japan", rating: 4.8, desc: "OE supplier of spark plugs, alternators, radiators, and sensors for global carmakers." },
        { id: "ngk", name: "NGK Spark Plugs", logo: "assets/images/parts/spark-plugs.jpg", partsCount: 1450, origin: "Japan", rating: 4.9, desc: "The world's premier manufacturer of ignition components and oxygen sensors." },
        { id: "bilstein", name: "Bilstein", logo: "assets/images/parts/suspension.jpg", partsCount: 980, origin: "Germany", rating: 4.8, desc: "High-performance shock absorbers and suspension technology for road and track." },
        { id: "volta", name: "Volta", logo: "assets/images/parts/motor-oil.jpg", partsCount: 320, origin: "USA", rating: 4.9, desc: "Advanced synthetic motor oils and fluids engineered for maximum engine wear protection." },
        { id: "mahle", name: "Mahle Original", logo: "assets/images/parts/filters.jpg", partsCount: 2100, origin: "Germany", rating: 4.7, desc: "Piston components, air/oil filter elements, and engine thermal management." },
        { id: "valeo", name: "Valeo", logo: "assets/images/parts/headlight.jpg", partsCount: 1760, origin: "France", rating: 4.7, desc: "Automotive headlights, clutch kits, wipers, and climate management systems." }
    ],

    // Vehicle Database (Make -> Models -> Years -> Engines)
    vehicles: {
        "Toyota": {
            models: {
                "Camry": { years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.5L 4-Cyl", "3.5L V6", "2.5L Hybrid"] },
                "Corolla": { years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["1.8L 4-Cyl", "2.0L 4-Cyl", "1.8L Hybrid"] },
                "RAV4": { years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.5L 4-Cyl", "2.5L Hybrid", "2.5L Prime PHEV"] },
                "Hilux": { years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.4L Turbo Diesel", "2.8L Turbo Diesel", "2.7L Petrol"] },
                "Land Cruiser": { years: [2010, 2012, 2015, 2018, 2020, 2022, 2024], engines: ["4.5L V8 Turbo Diesel", "3.5L Twin-Turbo V6", "5.7L V8 Petrol"] }
            }
        },
        "Honda": {
            models: {
                "Civic": { years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["1.8L 4-Cyl", "2.0L 4-Cyl", "1.5L Turbo", "2.0L Type R Turbo"] },
                "Accord": { years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.4L 4-Cyl", "3.5L V6", "1.5L Turbo", "2.0L Hybrid"] },
                "CR-V": { years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.4L 4-Cyl", "1.5L Turbo", "2.0L Hybrid"] }
            }
        },
        "Ford": {
            models: {
                "F-150": { years: [2012, 2014, 2016, 2018, 2020, 2021, 2022, 2023, 2024], engines: ["3.5L EcoBoost V6", "5.0L V8 Coyote", "2.7L EcoBoost V6", "3.5L PowerBoost Hybrid"] },
                "Mustang": { years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.3L EcoBoost", "5.0L V8 GT", "5.2L V8 Shelby"] },
                "Ranger": { years: [2015, 2017, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.2L Diesel", "3.2L 5-Cyl Diesel", "2.0L Bi-Turbo Diesel"] }
            }
        },
        "BMW": {
            models: {
                "3 Series (F30/G20)": { years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.0L 320i B48", "2.0L 330i B48", "3.0L M340i B58", "2.0L 320d Diesel"] },
                "5 Series (G30)": { years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["2.0L 530i", "3.0L 540i B58", "4.4L M550i V8"] },
                "X5 (F15/G05)": { years: [2014, 2016, 2018, 2020, 2022, 2023, 2024], engines: ["3.0L xDrive40i", "3.0L xDrive30d Diesel", "4.4L xDrive50i V8"] }
            }
        },
        "Mercedes-Benz": {
            models: {
                "C-Class (W205/W206)": { years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["C200 2.0L", "C300 2.0L Turbo", "AMG C63 4.0L V8"] },
                "E-Class (W213)": { years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ["E200 2.0L", "E350 2.0L", "E450 3.0L Inline-6 Turbo"] },
                "GLE (V167)": { years: [2019, 2020, 2021, 2022, 2023, 2024], engines: ["GLE 350 2.0L", "GLE 450 3.0L Turbo", "GLE 400d Diesel"] }
            }
        },
        "Volkswagen": {
            models: {
                "Golf (MK7/MK8)": { years: [2013, 2015, 2017, 2019, 2021, 2022, 2023, 2024], engines: ["1.4L TSI", "2.0L GTI Turbo", "2.0L Golf R TSI"] },
                "Tiguan": { years: [2016, 2018, 2020, 2021, 2022, 2023, 2024], engines: ["1.4L TSI", "2.0L TSI 4Motion", "2.0L TDI Diesel"] }
            }
        }
    },

    // Vehicle Types
    vehicleTypes: [
        { id: "sedan", name: "Sedan & Saloon", icon: "fa-car" },
        { id: "hatchback", name: "Hatchback", icon: "fa-car-side" },
        { id: "suv", name: "SUV & Crossover", icon: "fa-truck-pickup" },
        { id: "truck", name: "Pickup Truck", icon: "fa-truck-monster" },
        { id: "commercial", name: "Commercial & Van", icon: "fa-van-shuttle" }
    ],

    // Product Database (25+ rich products)
    products: [
        {
            id: "part-101",
            sku: "BRK-BM-5012",
            oem: "34116792223 / 34116858652",
            name: "Brembo High Carbon Front Brake Disc Set",
            brand: "Brembo",
            brandId: "brembo",
            category: "Brake Components",
            categoryId: "brakes",
            vehicleType: "sedan",
            price: 189.99,
            oldPrice: 229.99,
            workshopPrice: 145.00,
            rating: 4.9,
            reviewsCount: 128,
            stockStatus: "In Stock",
            stockCount: 42,
            isFeatured: true,
            isDeal: true,
            dealEndsIn: "2 days",
            badge: "Top Seller",
            image: "assets/images/parts/brake-rotors.jpg",
            gallery: [
                "assets/images/parts/brake-rotors.jpg"
            ],
            shortDesc: "Vented high-carbon cast iron brake rotors engineered for silent operation, zero vibration, and maximum thermal dissipation.",
            specs: {
                "Diameter": "340 mm",
                "Thickness": "30 mm (Min 28.4 mm)",
                "Centering Diameter": "75 mm",
                "Number of Holes": "5 Bolt Pattern",
                "Material": "High-Carbon Cast Iron with UV Coating",
                "Position": "Front Axle Pair"
            },
            compatibility: [
                { make: "BMW", model: "3 Series (F30/G20)", years: "2012–2024", engine: "All Models" },
                { make: "BMW", model: "5 Series (G30)", years: "2017–2024", engine: "530i / 540i" },
                { make: "Toyota", model: "Camry", years: "2018–2024", engine: "3.5L V6" }
            ],
            bulkTiers: [
                { qty: "1–4 pairs", price: "$189.99 / pr" },
                { qty: "5–19 pairs", price: "$165.00 / pr" },
                { qty: "20+ pairs", price: "$145.00 / pr (Workshop)" }
            ]
        },
        {
            id: "part-102",
            sku: "BSH-ALT-9042",
            oem: "27060-0T040 / 104210-2710",
            name: "Bosch Original 150A Heavy Duty Alternator",
            brand: "Bosch",
            brandId: "bosch",
            category: "Electrical & Lighting",
            categoryId: "electrical",
            vehicleType: "sedan",
            price: 265.50,
            oldPrice: 310.00,
            workshopPrice: 215.00,
            rating: 4.8,
            reviewsCount: 84,
            stockStatus: "In Stock",
            stockCount: 18,
            isFeatured: true,
            isDeal: false,
            badge: "OEM Quality",
            image: "assets/images/parts/alternator.jpg",
            gallery: [
                "assets/images/parts/alternator.jpg"
            ],
            shortDesc: "100% factory-new alternator with high amperage output, premium copper windings, and internal voltage regulation.",
            specs: {
                "Voltage": "12V",
                "Output Current": "150 Amps",
                "Rotation": "Clockwise (CW)",
                "Pulley Class": "S6 (6-Groove Clutch Pulley)",
                "Regulator": "Internal Multifunction Regulator"
            },
            compatibility: [
                { make: "Toyota", model: "Corolla", years: "2010–2020", engine: "1.8L 4-Cyl / 2.0L" },
                { make: "Toyota", model: "Camry", years: "2012–2017", engine: "2.5L 4-Cyl" }
            ],
            bulkTiers: [
                { qty: "1–2 units", price: "$265.50" },
                { qty: "3–9 units", price: "$235.00" },
                { qty: "10+ units", price: "$215.00 (Workshop)" }
            ]
        },
        {
            id: "part-103",
            sku: "NGK-IR-4912",
            oem: "90919-01253 / ILKAR7B11",
            name: "NGK Laser Iridium Spark Plug 4-Pack",
            brand: "NGK Spark Plugs",
            brandId: "ngk",
            category: "Engine Parts",
            categoryId: "engine",
            vehicleType: "hatchback",
            price: 49.99,
            oldPrice: 62.00,
            workshopPrice: 36.50,
            rating: 5.0,
            reviewsCount: 310,
            stockStatus: "In Stock",
            stockCount: 150,
            isFeatured: true,
            isDeal: true,
            dealEndsIn: "5 days",
            badge: "Best Seller",
            image: "assets/images/parts/spark-plugs.jpg",
            gallery: [
                "assets/images/parts/spark-plugs.jpg"
            ],
            shortDesc: "Laser-welded iridium center electrode tip ensures high durability and optimum spark ignition under demanding conditions.",
            specs: {
                "Thread Size": "12 mm",
                "Reach": "26.5 mm",
                "Hex Size": "14 mm",
                "Gap": "1.1 mm (Pre-gapped)",
                "Heat Range": "7",
                "Lifespan": "100,000 Miles"
            },
            compatibility: [
                { make: "Honda", model: "Civic", years: "2012–2024", engine: "1.8L / 2.0L / 1.5L Turbo" },
                { make: "Toyota", model: "Corolla", years: "2014–2024", engine: "1.8L 4-Cyl" },
                { make: "Honda", model: "CR-V", years: "2014–2023", engine: "2.4L / 1.5L Turbo" }
            ],
            bulkTiers: [
                { qty: "1–4 packs", price: "$49.99 / pack" },
                { qty: "5–19 packs", price: "$42.00 / pack" },
                { qty: "20+ packs", price: "$36.50 / pack" }
            ]
        },
        {
            id: "part-104",
            sku: "MHL-FIL-SET4",
            oem: "11428507683 / 04152-YZZA1",
            name: "Mahle Premium Engine Filter Kit (Oil + Air + Cabin)",
            brand: "Mahle Original",
            brandId: "mahle",
            category: "Filters (Oil, Air, Cabin)",
            categoryId: "filters",
            vehicleType: "sedan",
            price: 58.00,
            oldPrice: 75.00,
            workshopPrice: 42.00,
            rating: 4.8,
            reviewsCount: 96,
            stockStatus: "In Stock",
            stockCount: 88,
            isFeatured: false,
            isDeal: false,
            badge: "Combo Pack",
            image: "assets/images/parts/filters.jpg",
            gallery: [
                "assets/images/parts/filters.jpg"
            ],
            shortDesc: "Complete 3-in-1 service filter maintenance bundle with synthetic micro-glass oil filter and active carbon cabin filter.",
            specs: {
                "Oil Filter Media": "Synthetic Micro-Glass (99.6% @ 20 microns)",
                "Air Filter Efficiency": "99.8% Dust Filtration",
                "Cabin Filter": "Activated Carbon Anti-Allergen Shield",
                "Package Includes": "1x Oil Filter + O-Rings, 1x Engine Air Filter, 1x Cabin Air Filter"
            },
            compatibility: [
                { make: "BMW", model: "3 Series (F30/G20)", years: "2015–2024", engine: "2.0L 320i / 330i" },
                { make: "Volkswagen", model: "Golf (MK7/MK8)", years: "2015–2023", engine: "2.0L GTI" }
            ],
            bulkTiers: [
                { qty: "1–4 kits", price: "$58.00" },
                { qty: "5–14 kits", price: "$48.00" },
                { qty: "15+ kits", price: "$42.00" }
            ]
        },
        {
            id: "part-105",
            sku: "BIL-B6-STRUT",
            oem: "31316792873 / 31316792874",
            name: "Bilstein B6 Performance Front Shock Absorber Pair",
            brand: "Bilstein",
            brandId: "bilstein",
            category: "Suspension & Steering",
            categoryId: "suspension",
            vehicleType: "suv",
            price: 349.00,
            oldPrice: 420.00,
            workshopPrice: 285.00,
            rating: 4.9,
            reviewsCount: 72,
            stockStatus: "In Stock",
            stockCount: 14,
            isFeatured: true,
            isDeal: false,
            badge: "Performance",
            image: "assets/images/parts/suspension.jpg",
            gallery: [
                "assets/images/parts/suspension.jpg"
            ],
            shortDesc: "Monotube gas-pressure suspension technology offering precise handling, zero body roll, and enhanced load stabilization.",
            specs: {
                "Design": "Monotube Upside-Down Technology",
                "Damping": "Gas-Pressure Digressive Valve System",
                "Housing": "Yellow Powder-Coated Heavy Gauge Steel",
                "Fitting Position": "Front Axle Left & Right Pair"
            },
            compatibility: [
                { make: "BMW", model: "X5 (F15/G05)", years: "2014–2024", engine: "xDrive35i / xDrive40i" },
                { make: "Mercedes-Benz", model: "GLE (V167)", years: "2019–2024", engine: "GLE 350 / GLE 450" }
            ],
            bulkTiers: [
                { qty: "1–2 pairs", price: "$349.00" },
                { qty: "3–5 pairs", price: "$310.00" },
                { qty: "6+ pairs", price: "$285.00" }
            ]
        },
        {
            id: "part-106",
            sku: "DEN-RAD-7041",
            oem: "16400-28560 / 16400-0H210",
            name: "Denso Aluminum Core Engine Cooling Radiator",
            brand: "Denso",
            brandId: "denso",
            category: "Cooling & Heating",
            categoryId: "cooling",
            vehicleType: "suv",
            price: 178.00,
            oldPrice: 210.00,
            workshopPrice: 142.00,
            rating: 4.7,
            reviewsCount: 53,
            stockStatus: "In Stock",
            stockCount: 22,
            isFeatured: false,
            isDeal: false,
            badge: "Direct Fit",
            image: "assets/images/parts/radiator.jpg",
            gallery: [
                "assets/images/parts/radiator.jpg"
            ],
            shortDesc: "Direct replacement lightweight aluminum core radiator with high-density fins and leak-tested PA66 glass-filled tanks.",
            specs: {
                "Core Material": "TIG-Welded Aluminum Core",
                "Tank Material": "Reinforced Glass-Filled Nylon",
                "Core Thickness": "26 mm",
                "Inlet / Outlet Size": "35 mm / 35 mm",
                "Transmission Oil Cooler": "Integrated Concentric Cooler"
            },
            compatibility: [
                { make: "Toyota", model: "RAV4", years: "2013–2023", engine: "2.5L 4-Cyl" },
                { make: "Honda", model: "CR-V", years: "2014–2022", engine: "2.4L / 1.5L Turbo" }
            ],
            bulkTiers: [
                { qty: "1–2 units", price: "$178.00" },
                { qty: "3–7 units", price: "$158.00" },
                { qty: "8+ units", price: "$142.00" }
            ]
        },
        {
            id: "part-107",
            sku: "VAL-LED-HD1",
            oem: "63117419629 / 63117419630",
            name: "Valeo Full Matrix LED Headlight Assembly (Right)",
            brand: "Valeo",
            brandId: "valeo",
            category: "Electrical & Lighting",
            categoryId: "electrical",
            vehicleType: "sedan",
            price: 520.00,
            oldPrice: 650.00,
            workshopPrice: 440.00,
            rating: 4.9,
            reviewsCount: 41,
            stockStatus: "Low Stock",
            stockCount: 5,
            isFeatured: true,
            isDeal: false,
            badge: "Matrix LED",
            image: "assets/images/parts/headlight.jpg",
            gallery: [
                "assets/images/parts/headlight.jpg"
            ],
            shortDesc: "OE replacement adaptive full-LED headlamp with integrated dynamic DRL strip and cornering assist modules.",
            specs: {
                "Technology": "Adaptive Matrix LED",
                "Voltage": "12V DC",
                "Includes Control Module": "Yes (ECU Included)",
                "Side": "Right Hand Passenger Side",
                "Homologation": "ECE / DOT / SAE Approved"
            },
            compatibility: [
                { make: "Mercedes-Benz", model: "C-Class (W205/W206)", years: "2018–2024", engine: "C200 / C300" },
                { make: "BMW", model: "5 Series (G30)", years: "2018–2023", engine: "530i / 540i" }
            ],
            bulkTiers: [
                { qty: "1 unit", price: "$520.00" },
                { qty: "2–4 units", price: "$475.00" },
                { qty: "5+ units", price: "$440.00" }
            ]
        },
        {
            id: "part-108",
            sku: "VLT-OIL-5W30",
            oem: "DEXOS1-GEN3 / MB229.52",
            name: "Volta Advanced Full Synthetic 5W-30 Motor Oil (5L)",
            brand: "Volta",
            brandId: "volta",
            category: "Oils & Lubricants",
            categoryId: "fluids",
            vehicleType: "sedan",
            price: 44.99,
            oldPrice: 54.99,
            workshopPrice: 32.00,
            rating: 5.0,
            reviewsCount: 420,
            stockStatus: "In Stock",
            stockCount: 210,
            isFeatured: true,
            isDeal: true,
            dealEndsIn: "1 day",
            badge: "Hot Deal",
            image: "assets/images/parts/motor-oil.jpg",
            gallery: [
                "assets/images/parts/motor-oil.jpg"
            ],
            shortDesc: "Formula protects for 10,000 miles between oil changes with exceptional sludge prevention and low temperature pumpability.",
            specs: {
                "Viscosity Grade": "SAE 5W-30",
                "Volume": "5 Liters (5.28 Quarts)",
                "Specification Standard": "API SP / ILSAC GF-6A / ACEA C3",
                "OEM Approval": "GM dexos1 Gen3, MB-Approval 229.52, BMW LL-04"
            },
            compatibility: [
                { make: "Toyota", model: "Camry", years: "2012–2024", engine: "All Gasoline Engines" },
                { make: "Ford", model: "F-150", years: "2012–2024", engine: "3.5L EcoBoost / 5.0L V8" },
                { make: "Honda", model: "Civic", years: "2012–2024", engine: "All Engines" }
            ],
            bulkTiers: [
                { qty: "1–3 jugs", price: "$44.99" },
                { qty: "4–11 jugs", price: "$37.50" },
                { qty: "12+ jugs (Case)", price: "$32.00" }
            ]
        },
        {
            id: "part-109",
            sku: "BRK-PAD-CER",
            oem: "04465-02240 / D1210",
            name: "Brembo Ceramic Low-Dust Front Brake Pad Kit",
            brand: "Brembo",
            brandId: "brembo",
            category: "Brake Components",
            categoryId: "brakes",
            vehicleType: "sedan",
            price: 78.50,
            oldPrice: 92.00,
            workshopPrice: 58.00,
            rating: 4.8,
            reviewsCount: 165,
            stockStatus: "In Stock",
            stockCount: 64,
            isFeatured: false,
            isDeal: false,
            badge: "Low Dust",
            image: "assets/images/parts/brake-pads.jpg",
            gallery: [
                "assets/images/parts/brake-pads.jpg"
            ],
            shortDesc: "Premium ceramic compound reduces brake dust by 90% while extending rotor life and providing smooth initial bite.",
            specs: {
                "Friction Material": "Advanced Ceramic Compound",
                "Includes Wear Sensor": "Yes (Acoustic Wear Indicators)",
                "Shim Material": "Multilayer EPDM Rubber Steel Shim",
                "Position": "Front Axle (Set of 4 Pads)"
            },
            compatibility: [
                { make: "Toyota", model: "Corolla", years: "2014–2023", engine: "1.8L / 2.0L" },
                { make: "Honda", model: "Civic", years: "2016–2022", engine: "1.5L Turbo" }
            ],
            bulkTiers: [
                { qty: "1–4 sets", price: "$78.50" },
                { qty: "5–19 sets", price: "$66.00" },
                { qty: "20+ sets", price: "$58.00" }
            ]
        },
        {
            id: "part-110",
            sku: "BSH-IGN-COIL",
            oem: "0221504470 / 12138616153",
            name: "Bosch Performance Ignition Coil Pack",
            brand: "Bosch",
            brandId: "bosch",
            category: "Engine Parts",
            categoryId: "engine",
            vehicleType: "sedan",
            price: 38.90,
            oldPrice: 46.00,
            workshopPrice: 27.50,
            rating: 4.9,
            reviewsCount: 112,
            stockStatus: "In Stock",
            stockCount: 95,
            isFeatured: false,
            isDeal: false,
            badge: "High Voltage",
            image: "assets/images/parts/ignition-coil.jpg",
            gallery: [
                "assets/images/parts/ignition-coil.jpg"
            ],
            shortDesc: "Provides fast ignition, precise spark timing, and resistance against high thermal loads under engine bay pressure.",
            specs: {
                "Voltage Output": "35,000 Volts Peak",
                "Primary Resistance": "0.6 Ohms",
                "Connector Type": "4-Pin Blade Connector",
                "Installation": "Direct Plug-and-Play Boot"
            },
            compatibility: [
                { make: "BMW", model: "3 Series (F30/G20)", years: "2012–2022", engine: "2.0L B48 / 3.0L B58" },
                { make: "Volkswagen", model: "Golf (MK7/MK8)", years: "2014–2022", engine: "2.0L TSI" }
            ],
            bulkTiers: [
                { qty: "1–3 units", price: "$38.90" },
                { qty: "4–15 units", price: "$32.00" },
                { qty: "16+ units", price: "$27.50" }
            ]
        },
        {
            id: "part-111",
            sku: "TRB-FRD-35EC",
            oem: "DL3Z-6K682-E / 53039880469",
            name: "BorgWarner OEM Turbocharger Assembly (Left Side)",
            brand: "Bosch",
            brandId: "bosch",
            category: "Engine Parts",
            categoryId: "engine",
            vehicleType: "truck",
            price: 690.00,
            oldPrice: 820.00,
            workshopPrice: 570.00,
            rating: 4.9,
            reviewsCount: 29,
            stockStatus: "In Stock",
            stockCount: 8,
            isFeatured: true,
            isDeal: false,
            badge: "OEM Turbo",
            image: "assets/images/parts/turbocharger.jpg",
            gallery: [
                "assets/images/parts/turbocharger.jpg"
            ],
            shortDesc: "Complete direct bolt-on turbocharger including electronic wastegate actuator and high-temp alloy turbine housing.",
            specs: {
                "Turbine Wheel Material": "Inconel High-Temp Superalloy",
                "Wastegate Actuator": "Integrated Electronic Actuator Included",
                "Cooling Type": "Water & Oil Cooled Bearing Housing",
                "Position": "Left Side (Bank 1)"
            },
            compatibility: [
                { make: "Ford", model: "F-150", years: "2013–2020", engine: "3.5L EcoBoost V6" },
                { make: "Ford", model: "Ranger", years: "2019–2023", engine: "2.0L Bi-Turbo" }
            ],
            bulkTiers: [
                { qty: "1 unit", price: "$690.00" },
                { qty: "2–4 units", price: "$620.00" },
                { qty: "5+ units", price: "$570.00" }
            ]
        },
        {
            id: "part-112",
            sku: "CLT-VAL-K20",
            oem: "826380 / 22100-RB0-005",
            name: "Valeo Heavy Duty Clutch Kit with Dual-Mass Flywheel",
            brand: "Valeo",
            brandId: "valeo",
            category: "Transmission & Drivetrain",
            categoryId: "transmission",
            vehicleType: "hatchback",
            price: 430.00,
            oldPrice: 510.00,
            workshopPrice: 350.00,
            rating: 4.8,
            reviewsCount: 47,
            stockStatus: "In Stock",
            stockCount: 11,
            isFeatured: false,
            isDeal: false,
            badge: "Complete Kit",
            image: "assets/images/parts/clutch-kit.jpg",
            gallery: [
                "assets/images/parts/clutch-kit.jpg"
            ],
            shortDesc: "Complete clutch replacement kit including clutch pressure plate, friction disc, dual-mass flywheel, alignment tool, and release bearing.",
            specs: {
                "Disc Diameter": "240 mm",
                "Hub Spline Count": "23 Teeth",
                "Flywheel Type": "Dual-Mass Damper Flywheel",
                "Included": "Pressure Plate, Clutch Disc, Flywheel, Release Bearing, Alignment Tool"
            },
            compatibility: [
                { make: "Volkswagen", model: "Golf (MK7/MK8)", years: "2013–2022", engine: "2.0L GTI / TDI" },
                { make: "Honda", model: "Civic", years: "2016–2022", engine: "2.0L Type R / 1.5L Manual" }
            ],
            bulkTiers: [
                { qty: "1 kit", price: "$430.00" },
                { qty: "2–4 kits", price: "$385.00" },
                { qty: "5+ kits", price: "$350.00" }
            ]
        }
    ],

    // Articles / Blog Posts Data
    articles: [
        {
            id: "blog-1",
            title: "How to Match OEM Part Numbers to Prevent Compatibility Issues",
            category: "Part Buying Guides",
            date: "August 18, 2026",
            author: "Marcus Vance, Master Mechanic",
            readTime: "6 min read",
            image: "assets/images/parts/spark-plugs.jpg",
            summary: "Understand VIN decoding, superseding part numbers, and cross-reference tables so you order the right part the very first time.",
            content: `Ordering spare parts online can be frustrating if a delivered component doesn't align with your car's mounting bracket or wiring harness. In this guide, we break down how to read OEM part numbers and cross-reference them with aftermarket alternatives.

### 1. What is an OEM Part Number?
An OEM (Original Equipment Manufacturer) part number is a unique alphanumeric identifier assigned by the car manufacturer. Unlike general model descriptions, the OEM number guarantees exact dimensions, electrical resistance, and mounting points.

### 2. Superseded Part Numbers
Car manufacturers frequently update component designs to resolve factory revisions. When a part is updated, its part number changes (supersedes). Always verify if your old part number has been superseded by a newer revision before assuming a part is incompatible.

### 3. Using Our Vehicle Compatibility Tool
Our site allows you to input your exact Make, Model, Year, and Engine code. This cross-checks thousands of part schematics in real-time.`
        },
        {
            id: "blog-2",
            title: "Brake Disc Inspection: When to Machine Rotors vs. Complete Replacement",
            category: "Maintenance Tips",
            date: "August 12, 2026",
            author: "Sarah Jenkins, Technical Director",
            readTime: "8 min read",
            image: "assets/images/parts/brake-rotors.jpg",
            summary: "Learn how to measure minimum rotor thickness with a micrometer, identify thermal stress cracks, and choose between ceramic or semi-metallic pads.",
            content: `Squeal, pulsation through the pedal, or reduced stopping power are clear signs your braking system needs attention. Here is how professional technicians evaluate brake rotors.

### Measuring Minimum Thickness
Every brake rotor has a stamped 'Min Th' (Minimum Thickness) spec on its outer edge. If resurfacing the rotor brings its thickness below this safety threshold, the rotor cannot dissipate thermal friction effectively and must be replaced immediately.

### Ceramic vs Semi-Metallic Pads
* **Ceramic Pads**: 90% less brake dust, quiet operation, ideal for daily city driving.
* **Semi-Metallic Pads**: Superior high-temp friction coefficient, ideal for towing, heavy trucks, and track days.`
        },
        {
            id: "blog-3",
            title: "Maximizing Workshop Profitability with Trade Account Bulk Sourcing",
            category: "Workshop Advice",
            date: "August 04, 2026",
            author: "David Ross, Fleet & Trade Account Lead",
            readTime: "5 min read",
            image: "assets/images/parts/clutch-kit.jpg",
            summary: "How auto repair workshops save up to 35% on fast-moving consumables like spark plugs, oil filters, and brake pad sets through tiered bulk ordering.",
            content: `For independent repair workshops, inventory turnaround time and margin preservation are vital. Consumables like oil filters, spark plugs, and brake fluid represent recurring revenue.

### Tiered Quantity Pricing
By grouping monthly inventory orders into bulk tiers (e.g. 20+ spark plug sets or 50+ oil filters), repair shops unlock trade tier discounts that directly boost bottom-line margins.`
        },
        {
            id: "blog-4",
            title: "Understanding Synthetic Engine Oil Viscosity: 0W-20 vs. 5W-30 & Change Intervals",
            category: "Engine Maintenance",
            date: "July 28, 2026",
            author: "Alex Rivera, Senior Fluids Technician",
            readTime: "7 min read",
            image: "assets/images/parts/motor-oil.jpg",
            summary: "A deep dive into multi-grade viscosity ratings, high-shear oil stability, synthetic additives, and extended oil drain intervals for modern turbocharged engines.",
            content: `Selecting the right engine oil viscosity rating is essential for maximizing thermal efficiency, preventing bearing wear, and maintaining timing chain tensioner hydraulic pressure.

### Decoding Viscosity Ratings (0W-20 vs 5W-30)
The 'W' stands for winter grade rating, measuring oil flow resistance at sub-zero cold start temperatures. The second number indicates kinematic viscosity measured at normal operating engine temperatures (100°C / 212°F). Modern tight-clearance engines rely on lower-viscosity 0W-20 oils for rapid oil lubrication to upper valve trains immediately upon turn-key ignition.

### Full Synthetic vs. Synthetic Blends
Full synthetic motor oils feature uniform molecular structures crafted through chemical synthesis. They provide superior resistance to thermal breakdown, oxidation sludge, and viscosity loss under high-boost turbocharging compared to conventional mineral oils.

### Recommended Drain Intervals & Filter Sync
Always replace your spin-on or cartridge oil filter concurrently with every oil change. Trapped contaminants in an old filter can restrict oil flow, triggering internal bypass valves that recirculate unfiltered oil through critical camshaft bearings.`
        },
        {
            id: "blog-5",
            title: "Diagnosing Suspension Noise: Struts, Control Arm Bushings & Sway Bar Links",
            category: "Diagnostic Guides",
            date: "July 19, 2026",
            author: "Marcus Vance, Master Mechanic",
            readTime: "9 min read",
            image: "assets/images/parts/suspension.jpg",
            summary: "Isolate clunks, squeaks, and steering wander with our step-by-step suspension system troubleshooting guide for DIY mechanics and technicians.",
            content: `Suspension clunks and uneven tire wear often stem from deteriorated rubber bushings, worn ball joints, or failing strut damper assemblies. Diagnosing the exact component before ordering replacement suspension kits saves valuable workshop labor time.

### 1. Metallic Clanking Over Speed Bumps
If your vehicle produces sharp metallic popping sounds when traversing uneven road surfaces or speed bumps, inspect sway bar end links and stabilizer bar frame bushings first. Worn end link ball sockets lose grease sealing, leading to metal-on-metal play.

### 2. Steering Wander & Tire Feathering
Excessive play in control arm inner bushings or lower ball joints alters wheel alignment geometry (camber and toe angles). If the vehicle strays from a straight line during hard braking, replace the front lower control arms as complete assemblies.

### 3. Bounce Test for Strut Dampers
Compress each corner of the vehicle manually. If the body bounces more than 1.5 cycles before stabilizing, internal shock absorber seals have failed, requiring replacement in matched left/right axle pairs.`
        },
        {
            id: "blog-6",
            title: "Turbocharger Health & Maintenance: Preventing Boost Leaks and Oil Starvation",
            category: "Performance Tech",
            date: "July 11, 2026",
            author: "Elena Rostova, Performance Specialist",
            readTime: "8 min read",
            image: "assets/images/parts/turbocharger.jpg",
            summary: "Learn how to detect shaft play, prevent oil coking in turbo feed lines, and pressure test intercooler piping for optimal engine boost pressure.",
            content: `Modern forced induction engines rely on high-rpm turbochargers spinning at over 150,000 RPM. Proper oil supply, cool-down cycles, and intake leak detection are vital to prevent premature turbine wheel and compressor wheel damage.

### Preventing Turbo Oil Coking
Shutting off a hot turbocharged engine immediately after spirited driving stops engine oil circulation while turbine housings remain at extreme temperatures (above 700°C). Heat soaks into turbine shaft bearing housings, turning stagnant oil into carbonized sludge (coking). Allow 60–90 seconds of idling before engine shutdown.

### Inspecting Axial and Radial Shaft Play
Remove the intake inlet pipe and inspect the compressor wheel blade edges. Radial (side-to-side) movement should be minimal, and compressor fins must never contact the inner housing walls. Any axial (in-and-out) play indicates worn thrust bearings requiring immediate unit replacement.

### Boost Leak Pressure Testing
A cracked intercooler hose or loose silicone coupler leads to rich fuel mixtures, sluggish throttle response, and excessive exhaust gas temperatures (EGTs). Smoke testing or boost leak testing under 15 PSI isolates hairline cracks instantly.`
        },
        {
            id: "blog-7",
            title: "Electrical System Troubleshooting: Alternator Output & Battery Voltage Drops",
            category: "Electrical Systems",
            date: "June 30, 2026",
            author: "Sarah Jenkins, Technical Director",
            readTime: "6 min read",
            image: "assets/images/parts/alternator.jpg",
            summary: "How to use a digital multimeter to test alternator diode ripple, parasitic battery draw, and starter motor voltage drop across heavy ground straps.",
            content: `Intermittent electrical glitches, dim headlights, or dead batteries are frequently misdiagnosed. A methodical voltage drop test isolates high-resistance wiring and failing charging alternators quickly.

### 1. Static & Load Voltage Benchmarks
* **Healthy Resting Battery**: 12.6V to 12.8V DC (engine off).
* **Charging Voltage**: 13.8V to 14.7V DC (engine idling with headlights & HVAC blower ON).
* If charging voltage drops below 13.5V, the alternator internal voltage regulator or stator winding is deteriorating.

### 2. Diode Ripple Testing
Switch your digital multimeter to AC Voltage mode while the engine is running. A healthy alternator should produce less than 0.5V AC. High AC voltage indicates blown rectifier diodes, which drain the battery when parked overnight.

### 3. Inspecting Heavy Ground Straps
Corroded ground cables from the engine block to chassis create high electrical resistance. Measure voltage drop between the negative battery terminal and chassis ground under starter crank load. Any reading above 0.2V DC necessitates replacing the ground cable.`
        },
        {
            id: "blog-8",
            title: "Cooling System Overhaul: Radiators, Water Pumps & Thermostat Failure Modes",
            category: "Engine Maintenance",
            date: "June 18, 2026",
            author: "Marcus Vance, Master Mechanic",
            readTime: "8 min read",
            image: "assets/images/parts/radiator.jpg",
            summary: "Prevent engine overheating with our diagnostic checklist for stuck thermostats, impeller erosion in water pumps, and aluminum radiator core leaks.",
            content: `An engine cooling system failure can lead to catastrophic head gasket warpage and cylinder block distortion within minutes. Inspecting cooling components during routine service intervals prevents major engine overhauls.

### 1. Thermostat Stuck Closed vs. Stuck Open
* **Stuck Closed**: Coolant cannot flow from the engine block to the radiator core, causing rapid overheating within 5 minutes of idling.
* **Stuck Open**: The engine fails to reach optimal operating temperature (85°C–95°C), resulting in poor heater performance, increased fuel consumption, and carbon buildup.

### 2. Water Pump Impeller Erosion & Bearing Play
Modern water pumps often use composite plastic or aluminum impellers. Cavitation corrosion can erode impeller vanes, reducing coolant circulation flow without any external leaks. Grinding noise or shaft play when wiggling the water pump pulley signals immediate bearing failure.

### 3. Flushing Electrolized Coolant
Old, degraded coolant loses its anti-corrosion additives and becomes acidic. Test coolant with a digital multimeter (DC Volts between negative battery terminal and coolant fluid). Any reading above 0.3V DC indicates stray current electrolysis eating through your aluminum radiator tubes.`
        },
        {
            id: "blog-9",
            title: "Modern Ignition Systems: Coil-on-Plug (COP) Testing & Spark Plug Gap Tuning",
            category: "Electrical Systems",
            date: "June 05, 2026",
            author: "Sarah Jenkins, Technical Director",
            readTime: "7 min read",
            image: "assets/images/parts/ignition-coil.jpg",
            summary: "How to trace engine misfires, measure coil primary/secondary resistance, and gap iridium spark plugs for boosted or naturally aspirated engines.",
            content: `Rough idling, hesitation under heavy acceleration, and OBD-II misfire codes (P0300 through P0308) are classic symptoms of an ignition system breakdown.

### Understanding Coil-on-Plug (COP) Failure
Unlike legacy distributor systems, COP setups place a dedicated ignition coil directly over each spark plug. Thermal stress and engine vibration can cause internal insulation breakdown in coil boot rubbers, allowing high-voltage spark arc to ground against the cylinder head valve cover.

### Measuring Secondary Resistance
Disconnect the coil harness and test terminals with an ohmmeter. Primary resistance typically measures between 0.5 to 2.0 ohms, while secondary winding resistance measures between 6,000 to 15,000 ohms. Any open circuit or infinite resistance indicates an internal coil break.

### Spark Plug Electrode Gap & Torque Specs
Always use a feeler gauge to verify electrode gap prior to installation. Never pry against fragile iridium or platinum center electrodes. Always torque spark plugs to OEM specifications (15–22 lb-ft) to ensure proper heat dissipation into the cylinder head threads.`
        },
        {
            id: "blog-10",
            title: "LED vs. Matrix Headlight Upgrades: OEM Retrofitting & Beam Alignment",
            category: "Part Buying Guides",
            date: "May 22, 2026",
            author: "Alex Rivera, Senior Fluids Technician",
            readTime: "5 min read",
            image: "assets/images/parts/headlight.jpg",
            summary: "A complete guide to upgrading halogen headlights to projector LED assemblies, CAN-bus anti-flicker decoders, and proper optical alignment.",
            content: `Upgrading factory halogen headlight assemblies to modern projector LED units dramatically improves nighttime visibility and roadway safety. However, proper beam pattern cut-off calibration is mandatory to avoid blinding oncoming traffic.

### 1. Reflector Housings vs. Projector Lenses
Installing high-output LED bulbs into reflector housings intended for halogen filaments causes severe light scatter and glare. Always pair LED bulbs with optical projector housings that feature a sharp horizontal beam cut-off shield.

### 2. CAN-Bus Anti-Flicker Decoders
Modern vehicle body control modules (BCMs) monitor headlight current draw. Because LED units draw significantly less wattage than 55W halogen bulbs, the BCM may register a bulb-out error or cause erratic light flickering. Inline CAN-bus capacitor decoders resolve load detection errors instantly.

### 3. Aiming & Alignment Calibration
Park the vehicle 25 feet away from a flat wall on a level surface. Adjust headlight vertical leveling screws until the top edge of the low-beam light pattern sits 2 inches below the height of the headlight lens centerline.`
        },
        {
            id: "blog-11",
            title: "Cabin Air Filtration & HVAC Blower Motor Maintenance",
            category: "Maintenance Tips",
            date: "May 10, 2026",
            author: "David Ross, Fleet & Trade Account Lead",
            readTime: "6 min read",
            image: "assets/images/parts/filters.jpg",
            summary: "Improve cabin air quality, prevent mold odor, and protect HVAC blower motor resistors with multi-layer activated carbon cabin filters.",
            content: `A restricted cabin air filter reduces HVAC airflow, strains the blower motor fan, and causes windshield defroster sluggishness during humid weather.

### HEPA vs. Activated Carbon Filters
Standard particulate cabin filters trap dust and pollen. Premium activated carbon filters incorporate a treated charcoal layer that neutralizes harmful exhaust odors, industrial smog, and mildew mold spores before air enters the passenger cabin.

### Protecting Blower Motor Resistors
When a cabin filter becomes clogged with leaves and debris, the blower motor fan must work harder against high static pressure. The increased electrical current draw overheats and burns out the blower motor resistor card, leaving fans operating only on maximum speed.

### Bi-Annual Replacement Schedule
Replace cabin air filters every 12,000 miles or 12 months (or more frequently in dusty environments or heavy urban traffic).`
        }
    ]
};
