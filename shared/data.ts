import type { NeemanShoe, ExampleScenario } from "./schema";

export const neemansShoes: NeemanShoe[] = [
    // READ BASICS
    { id: "tread-basics-black", name: "Tread Basics : Black", price: 999, materials: ["Recycled Plastic"], colors: ["Black"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_92aca9be-73ca-46d3-823e-58c2df33cfee.png?v=1733919853&width=800", productUrl: "https://neemans.com/products/tread-basics-black", description: "Best-seller sneaker with recycled materials for everyday comfort." },
    { id: "tread-basics-white", name: "Tread Basics : White", price: 999, materials: ["Recycled Plastic"], colors: ["White"], categories: ["casual"], imageUrl: "https://neemans.com/cdn/shop/files/White_899dcdcb-d714-4157-bf93-8b37d8e10348.png?v=1724986956&width=800", productUrl: "https://neemans.com/products/tread-basics-white", description: "Clean white sneaker perfect for all occasions." },
    { id: "tread-basics-grey", name: "Tread Basics : Grey", price: 999, materials: ["Recycled Plastic"], colors: ["Grey"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Grey_5a9eb234-a45b-4eee-a248-6d5271b45077.png?v=1733919776&width=800", productUrl: "https://neemans.com/products/tread-basics-grey", description: "Versatile grey sneaker for everyday wear." },
    { id: "tread-basics-navy", name: "Tread Basics : Navy", price: 999, materials: ["Recycled Plastic"], colors: ["Navy"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Blue_968efb5e-4c74-42f0-9b4f-8da7e9e61298.png?v=1733919927&width=800", productUrl: "https://neemans.com/products/tread-basics-blue", description: "Deep navy color for a classic look." },

    // CROSSOVER BROGUES
    { id: "crossover-brogues-black", name: "Crossover Brogues : Black", price: 2299, materials: ["Premium Leather", "Recycled Plastic"], colors: ["Black"], categories: ["formal", "office", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_19912b15-0f9c-499d-9844-1c226dda552d.png?v=1743665424&width=800", productUrl: "https://neemans.com/products/crossover-brogues-black", description: "Classic brogues with sustainable materials for formal and office wear." },
    { id: "crossover-brogues-tan", name: "Crossover Brogues : Tan", price: 2299, materials: ["Premium Leather", "Recycled Plastic"], colors: ["Tan"], categories: ["formal", "office", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Tan_ccd0010f-b5b1-4177-ae78-4a67989354d8.png?v=1743665286&width=800", productUrl: "https://neemans.com/products/crossover-brogues-tan", description: "Elegant tan brogues for sophisticated style." },
    { id: "flexy-brogues-brown", name: "Flexy Brogues : Brown", price: 2599, materials: ["Flexible Knit", "Recycled Plastic"], colors: ["Brown"], categories: ["formal", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Brown_e9d9e4e6-8c4d-4e9b-9a8f-2b7e5c6d3f0a.png?v=1743665355&width=800", productUrl: "https://neemans.com/products/flexy-brogues-brown", description: "Flexible and comfortable brogues for all-day wear." },

    // BEGIN WALK BREEZE
    { id: "begin-walk-breeze-ivory", name: "Begin Walk Breeze : Ivory", price: 2099, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Ivory", "Cream", "White"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Ivory_6b0793c2-d6f4-4d1b-9ba7-ea38ab1b8b63.png?v=1747398883&width=800", productUrl: "https://neemans.com/products/begin-walk-breeze", description: "Lightweight and breathable for easy walking." },
    { id: "begin-walk-breeze-black", name: "Begin Walk Breeze : Black", price: 2099, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Black"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_2b7680ea-4e10-4827-879c-3306c9285491.png?v=1756193944&width=800", productUrl: "https://neemans.com/products/begin-walk-breeze-black", description: "Comfortable black variant for daily walking." },

    // OUTDOOR / TREK
    { id: "begin-walk-trek", name: "Begin Walk Trek : Ivory Brown", price: 2099, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Brown", "Ivory"], categories: ["casual", "walking", "outdoor"], imageUrl: "https://neemans.com/cdn/shop/files/Ivory-Brown_84b428b1-b90b-49b3-a36e-1c3dc47d170b.png?v=1756451590&width=800", productUrl: "https://neemans.com/products/begin-walk-trek", description: "Perfect for trekking and outdoor adventures." },

    // NEW ADDITIONS - WOOL JOGGERS
    { id: "wool-joggers-red", name: "Wool Joggers : Red", price: 5850, materials: ["Merino Wool"], colors: ["Red", "Maroon"], categories: ["casual", "athleisure", "ethnic"], imageUrl: "https://neemans.com/cdn/shop/files/Red_0d0f30c6-15c2-44f3-8c75-a251777d6e15.png?v=1743668190&width=800", productUrl: "https://neemans.com/products/wool-joggers-red", description: "Premium Merino wool joggers in a striking red." },
    { id: "wool-joggers-grey", name: "Wool Joggers : Grey", price: 5850, materials: ["Merino Wool"], colors: ["Grey"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Grey_004a4877-fe69-4815-822c-a104f689f133.png?v=1761808287&width=800", productUrl: "https://neemans.com/products/wool-joggers-grey", description: "Classic grey wool joggers for ultimate comfort." },
    { id: "wool-joggers-blue", name: "Wool Joggers : Blue", price: 5850, materials: ["Merino Wool"], colors: ["Blue"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Blue_968efb5e-4c74-42f0-9b4f-8da7e9e61298.png?v=1733919927&width=800", productUrl: "https://neemans.com/products/wool-joggers-blue", description: "Deep blue wool joggers, cool in summer, warm in winter." },

    // KNIT GLIDERS
    { id: "knit-gliders-black", name: "Knit Gliders : Black", price: 1999, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Black"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Black_649e4c0a-798b-43a7-9993-d4cb5aaa63ae.png?v=1753165227&width=800", productUrl: "https://neemans.com/products/knit-gliders-black", description: "Soft knit sneakers for active lifestyle." },
    { id: "knit-gliders-olive", name: "Knit Gliders : Olive", price: 1999, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Olive", "Green"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Olive_421d75fd-ff5c-4552-9b99-2f52def2b2eb.png?v=1756358865&width=800", productUrl: "https://neemans.com/products/knit-gliders-olive", description: "Trendy olive color with maximum comfort." },
    { id: "knit-gliders-grey", name: "Knit Gliders : Grey", price: 1999, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Grey"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Grey_428fb368-1bc3-4fa8-a483-77717880eaf5.png?v=1752645749&width=800", productUrl: "https://neemans.com/products/knit-gliders-grey", description: "Versatile grey knit sneaker." },
    { id: "knit-gliders-white", name: "Knit Gliders : White", price: 1999, materials: ["Knit Fabric"], colors: ["White"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/White_899dcdcb-d714-4157-bf93-8b37d8e10348.png?v=1724986956&width=800", productUrl: "https://neemans.com/products/knit-gliders-white", description: "Crisp white knit gliders." },

    // LOAFERS & FORMAL
    { id: "dashing-walkers-black", name: "Dashing Walkers : Black", price: 1499, materials: ["Recycled Plastic", "Walking Sole"], colors: ["Black"], categories: ["walking", "casual", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Black_dcf2a65c-fa30-4e6c-9a70-4a7e3a6b3e03.png?v=1724985748&width=800", productUrl: "https://neemans.com/products/dashing-walkers-black", description: "Best for long-distance walking." },
    { id: "dapper-loafers-black", name: "Dapper Loafers : Black", price: 1549, materials: ["Premium Leather", "Recycled Materials"], colors: ["Black"], categories: ["formal", "office", "ethnic"], imageUrl: "https://neemans.com/cdn/shop/files/Black_d5305f9c-961b-4a72-8237-f7f30c252a9a.png?v=1743665708&width=800", productUrl: "https://neemans.com/products/dapper-loafers", description: "Sophisticated loafers for formal occasions." },
    { id: "relive-knit-loafers", name: "ReLive Knit Loafers : Extra Honey", price: 1699, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["Brown", "Honey"], categories: ["casual", "office", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Extra_Honey_f1c1864b-1e1e-416d-84ca-ad6d3450d709.png?v=1743678165&width=800", productUrl: "https://neemans.com/products/relive-knit-loafers-extra-honey", description: "Comfortable knit loafers for everyday style." },
    { id: "knit-grace-loafers-pink", name: "Knit Grace Loafers : Pink", price: 1490, materials: ["Knit Fabric"], colors: ["Pink"], categories: ["casual", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Extra_Honey_f1c1864b-1e1e-416d-84ca-ad6d3450d709.png?v=1743678165&width=800", productUrl: "https://neemans.com/products/knit-grace-loafers", description: "Feminine loafers in elegant pink color." },
    { id: "the-luxe-loafers", name: "The Luxe Loafers : Black", price: 1999, materials: ["Premium Materials"], colors: ["Black"], categories: ["formal", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Black_8d2fa9a8-36f4-4101-b6fd-23f209e83b4e.png?v=1741352242&width=800", productUrl: "https://neemans.com/products/the-luxe-loafers", description: "Luxurious loafers for sophisticated style." },

    // SLIP ONS
    { id: "sole-max-slip-ons-black", name: "Sole Max Slip Ons : Ultra Black", price: 1349, materials: ["Recycled Plastic", "Comfort Sole"], colors: ["Black"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Ultra_Black_8a4564a9-3a8d-4765-8a01-d60a28d2ddc4.png?v=1743681492&width=800", productUrl: "https://neemans.com/products/sole-max-slip-ons", description: "Maximum comfort slip-on shoes." },
    { id: "grip-fit-slip-ons-black", name: "Grip Fit Slip Ons : Black", price: 1199, materials: ["Recycled Plastic", "Grip Sole"], colors: ["Black"], categories: ["casual", "office", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Red_0d0f30c6-15c2-44f3-8c75-a251777d6e15.png?v=1743668190&width=800", productUrl: "https://neemans.com/products/grip-fit-slip-ons", description: "Excellent grip and traction for all-day wear." },
    { id: "everyday-basic-slip-ons", name: "Everyday Basic Slip Ons : Neon Navy", price: 1049, materials: ["Recycled Plastic"], colors: ["Navy", "Blue"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black-Blue.png?v=1725023388&width=800", productUrl: "https://neemans.com/products/everyday-basic-slip-ons", description: "Affordable everyday slip-ons for casual wear." },
    { id: "canvas-coast-slipon", name: "Canvas Coast Slip-On", price: 2599, materials: ["Canvas"], colors: ["Beige", "Cream"], categories: ["casual", "beach"], imageUrl: "https://neemans.com/cdn/shop/files/Ivory-Brown_84b428b1-b90b-49b3-a36e-1c3dc47d170b.png?v=1756451590&width=800", productUrl: "https://neemans.com/products/canvas-coast-slipon", description: "Relaxed canvas slip-ons for coastal vibes." },

    // SANDALS & SLIDES
    { id: "cushers-clogs-black", name: "Cushers Clogs For Men : Black", price: 999, materials: ["Recycled Plastic", "Cushioned Sole"], colors: ["Black"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_7d1b9d80-0576-4bd8-abc1-292574b1e1d5.png?v=1761807385&width=800", productUrl: "https://neemans.com/products/cushers-clogs-for-men-black", description: "Comfortable clogs for casual everyday wear." },
    { id: "de-stress-slides-black", name: "De-Stress Slides : Black", price: 699, materials: ["Recycled Plastic", "Soft Sole"], colors: ["Black"], categories: ["casual"], imageUrl: "https://neemans.com/cdn/shop/files/Black_92aca9be-73ca-46d3-823e-58c2df33cfee.png?v=1733919853&width=800", productUrl: "https://neemans.com/products/de-stress-slides", description: "Ultra-comfortable slides for relaxation." },
    { id: "eco-flips-black", name: "Eco Flips : Coal Black", price: 799, materials: ["Recycled Plastic", "Natural Rubber"], colors: ["Black"], categories: ["casual"], imageUrl: "https://neemans.com/cdn/shop/files/Black_92aca9be-73ca-46d3-823e-58c2df33cfee.png?v=1733919853&width=800", productUrl: "https://neemans.com/products/eco-flips", description: "Eco-friendly flip-flops made from recycled materials." },
    { id: "eco-flips-blue", name: "Eco Flips : Ocean Blue", price: 799, materials: ["Recycled Plastic"], colors: ["Blue"], categories: ["casual"], imageUrl: "https://neemans.com/cdn/shop/files/Blue_968efb5e-4c74-42f0-9b4f-8da7e9e61298.png?v=1733919927&width=800", productUrl: "https://neemans.com/products/eco-flips", description: "Vibrant blue flip-flops." },
    { id: "pure-whoosh-sandals", name: "Pure Whoosh Sandals : Black", price: 1451, materials: ["Recycled Plastic"], colors: ["Black"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_92aca9be-73ca-46d3-823e-58c2df33cfee.png?v=1733919853&width=800", productUrl: "https://neemans.com/products/pure-whoosh-sandals", description: "Airy sandals with a secure fit." },
    { id: "minimals-sandals", name: "The Minimals Sandals : Black", price: 990, materials: ["Minimalist Design"], colors: ["Black"], categories: ["casual"], imageUrl: "https://neemans.com/cdn/shop/files/Black_92aca9be-73ca-46d3-823e-58c2df33cfee.png?v=1733919853&width=800", productUrl: "https://neemans.com/products/minimals-sandals", description: "Minimalist sandals for a sleek look." },

    // SNEAKERS & OTHERS
    { id: "casual-court-black", name: "Casual Court Sneakers : Black", price: 2399, materials: ["Canvas", "Recycled Plastic"], colors: ["Black"], categories: ["casual", "sports"], imageUrl: "https://neemans.com/cdn/shop/files/Black_19912b15-0f9c-499d-9844-1c226dda552d.png?v=1743665424&width=800", productUrl: "https://neemans.com/products/casual-court-sneakers", description: "Sporty casual court sneakers for active days." },
    { id: "fuse-knit-white", name: "Fuse Knit Sneakers : White", price: 3499, materials: ["Knit Fabric", "Recycled Plastic"], colors: ["White"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/White_899dcdcb-d714-4157-bf93-8b37d8e10348.png?v=1724986956&width=800", productUrl: "https://neemans.com/products/fuse-knit-sneakers", description: "Premium fused knit technology for modern comfort." },
    { id: "mid-top-black", name: "Mid-Top Sneakers : Black", price: 2599, materials: ["Recycled Plastic", "Canvas"], colors: ["Black"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_92aca9be-73ca-46d3-823e-58c2df33cfee.png?v=1733919853&width=800", productUrl: "https://neemans.com/products/mid-top-sneakers", description: "Classic mid-top design for extra ankle support." },
    { id: "mid-top-grey", name: "Mid-Top Sneakers : Grey", price: 2599, materials: ["Recycled Plastic", "Canvas"], colors: ["Grey"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Grey_5a9eb234-a45b-4eee-a248-6d5271b45077.png?v=1733919776&width=800", productUrl: "https://neemans.com/products/mid-top-sneakers-grey", description: "Grey mid-top sneakers, versatile and stylish." },
    { id: "pulse-stride", name: "Pulse Stride Sneakers", price: 1499, materials: ["Mesh", "Synthetic"], colors: ["Blue", "Neon Green"], categories: ["sports", "athleisure", "running"], imageUrl: "https://neemans.com/cdn/shop/files/Teal.png?v=1763982313&width=800", productUrl: "https://neemans.com/products/pulse-stride", description: "High-performance sneakers for running and training." },
    { id: "textured-derby", name: "Textured Derby Sneakers", price: 2499, materials: ["Textured Fabric"], colors: ["Grey", "Charcoal"], categories: ["casual", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Grey_428fb368-1bc3-4fa8-a483-77717880eaf5.png?v=1752645749&width=800", productUrl: "https://neemans.com/products/textured-derby", description: "Unique textured sneakers for a standout look." },
    { id: "melange-dress-black", name: "Melange Dress Sneakers : Black", price: 2599, materials: ["Recycled Plastic", "Melange Fabric"], colors: ["Black"], categories: ["casual", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Black_dcf2a65c-fa30-4e6c-9a70-4a7e3a6b3e03.png?v=1724985748&width=800", productUrl: "https://neemans.com/products/melange-dress-sneakers", description: "Dress sneakers perfect for office-casual style." },
    { id: "cloud-flex-black", name: "Cloud Flex Slip Ons : Black", price: 1999, materials: ["Recycled Plastic", "Flex Sole"], colors: ["Black"], categories: ["casual", "walking"], imageUrl: "https://neemans.com/cdn/shop/files/Black_2b7680ea-4e10-4827-879c-3306c9285491.png?v=1756193944&width=800", productUrl: "https://neemans.com/products/cloud-flex-slip-ons", description: "Ultra-lightweight with flexible sole technology." },
    { id: "flow-weave-black", name: "Flow Weave Slip On Sneakers : Black", price: 1999, materials: ["Weave Fabric", "Recycled Plastic"], colors: ["Black"], categories: ["casual", "athleisure"], imageUrl: "https://neemans.com/cdn/shop/files/Black-Blue.png?v=1725023388&width=800", productUrl: "https://neemans.com/products/flow-weave-slip-on-sneakers", description: "Flowing weave design for breathable comfort." },
    { id: "all-purpose-loafers-black", name: "All-Purpose Loafers : Black", price: 1649, materials: ["Premium Leather"], colors: ["Black"], categories: ["formal", "office"], imageUrl: "https://neemans.com/cdn/shop/files/Black_d5305f9c-961b-4a72-8237-f7f30c252a9a.png?v=1743665708&width=800", productUrl: "https://neemans.com/products/all-purpose-loafers", description: "Versatile loafers for any formal occasion." },
];

export const exampleScenarios: ExampleScenario[] = [
    {
        id: "casual-weekend",
        title: "Casual Weekend",
        description: "Jeans, t-shirt, relaxed vibes",
        imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=300&h=200&fit=crop",
        style: "casual",
    },
    {
        id: "casual-street",
        title: "Street Style",
        description: "Casual shirt, chinos, street look",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=200&fit=crop",
        style: "casual",
    },
    {
        id: "casual-dinner",
        title: "Casual Dinner",
        description: "Smart casual, lightweight shirt",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop",
        style: "casual",
    },
    {
        id: "office-wear",
        title: "Office Wear",
        description: "Professional yet comfortable",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=200&fit=crop",
        style: "office",
    },
    {
        id: "office-formal",
        title: "Formal Office",
        description: "Business suit, professional look",
        imageUrl: "https://images.unsplash.com/photo-1552062407-291826ad9442?w=300&h=200&fit=crop",
        style: "office",
    },
    {
        id: "business-casual",
        title: "Business Casual",
        description: "Blazer, trousers, polished style",
        imageUrl: "https://images.unsplash.com/photo-1508526013531-f6dd7f2acca5?w=300&h=200&fit=crop",
        style: "office",
    },
    {
        id: "walking-casual",
        title: "Daily Walking",
        description: "Comfortable shorts, light top",
        imageUrl: "https://images.unsplash.com/photo-1506629082847-11d0e90b8d64?w=300&h=200&fit=crop",
        style: "casual",
    },
    {
        id: "ethnic-fusion",
        title: "Ethnic Fusion",
        description: "Kurta, palazzo, traditional touch",
        imageUrl: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?w=300&h=200&fit=crop",
        style: "ethnic",
    },
    {
        id: "ethnic-formal",
        title: "Formal Ethnic",
        description: "Sherwani, ethnic dress, celebration",
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=200&fit=crop",
        style: "ethnic",
    },
    {
        id: "traditional",
        title: "Traditional Wear",
        description: "Saree, lehenga, cultural style",
        imageUrl: "https://images.unsplash.com/photo-1609882120353-84a8e3a79577?w=300&h=200&fit=crop",
        style: "ethnic",
    },
    {
        id: "athleisure",
        title: "Athleisure",
        description: "Active wear, sporty style",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=200&fit=crop",
        style: "athleisure",
    },
    {
        id: "gym-casual",
        title: "Gym to Coffee",
        description: "Leggings, sports top, casual",
        imageUrl: "https://images.unsplash.com/photo-1506619216547-f1ef5ff89869?w=300&h=200&fit=crop",
        style: "athleisure",
    },
    {
        id: "joggers-style",
        title: "Joggers Look",
        description: "Joggers, hoodie, comfortable",
        imageUrl: "https://images.unsplash.com/photo-1506629082847-11d0e90b8d64?w=300&h=200&fit=crop",
        style: "athleisure",
    },
    {
        id: "formal-event",
        title: "Formal Event",
        description: "Dress, heels, elegant evening",
        imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=200&fit=crop",
        style: "formal",
    },
];
