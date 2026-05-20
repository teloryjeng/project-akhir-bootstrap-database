const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hahahihi'
});

const missingProducts = [
    {
        name: 'Classic Brown Cotton Polo Shirt',
        category: 'Tops',
        gender: 'Boy',
        price: 110000,
        description: 'A timeless and clean cotton polo shirt in rich brown, featuring a soft collar and comfortable premium knit. Perfect for casual weekend outings and smart-casual events.',
        image: '../asset/img/product/brown-polo/produk3.jpg',
        folder: 'brown-polo',
        gallery: [
            'produk3.jpg',
            'pose.jpg',
            'pose (1).jpg',
            'pose (2).jpg',
            'pose (3).jpg',
            'pose (4).jpg'
        ],
        sizes: [
            { size_name: 'S', stock: 12 },
            { size_name: 'M', stock: 15 },
            { size_name: 'L', stock: 8 },
            { size_name: 'XL', stock: 4 }
        ]
    },
    {
        name: 'California Graphic Print Tee',
        category: 'Tops',
        gender: 'Unisex',
        price: 85000,
        description: 'Super soft crewneck cotton t-shirt with a vintage California graphic print on the front. Relaxed fit, breathable fabric, and high-quality print that stays vibrant after washing.',
        image: '../asset/img/product/california-t-shirt/produk 4.jpg',
        folder: 'california-t-shirt',
        gallery: [
            'produk 4.jpg',
            'pose 1.jpg',
            'pose 2.jpg',
            'pose3.jpg',
            'pose 4.jpg',
            'pose 5.jpg'
        ],
        sizes: [
            { size_name: 'S', stock: 20 },
            { size_name: 'M', stock: 25 },
            { size_name: 'L', stock: 15 },
            { size_name: 'XL', stock: 8 }
        ]
    },
    {
        name: 'Urban Cross Streetwear Hoodie',
        category: 'Tops',
        gender: 'Unisex',
        price: 185000,
        description: 'A warm and stylish oversized streetwear hoodie made from premium heavy fleece, detailed with a bold chest cross design. Features a cozy hood, pocket pouch, and ribbed cuffs.',
        image: '../asset/img/product/cross-hoodie/produk1.jpg',
        folder: 'cross-hoodie',
        gallery: [
            'produk1.jpg',
            'pose.jpg',
            'pose(1).jpg',
            'pose(2).jpg',
            'pooosse.jpg'
        ],
        sizes: [
            { size_name: 'S', stock: 10 },
            { size_name: 'M', stock: 12 },
            { size_name: 'L', stock: 8 },
            { size_name: 'XL', stock: 5 }
        ]
    },
    {
        name: 'Freedom Two-Tone Double Sleeve Shirt',
        category: 'Tops',
        gender: 'Boy',
        price: 125000,
        description: 'Get a layered streetwear look without the bulk! This comfortable two-tone tee features a short-sleeve over long-sleeve styling with an urban "Freedom" typography print.',
        image: '../asset/img/product/freedom-double-sleeve/produk 6.jpg',
        folder: 'freedom-double-sleeve',
        gallery: [
            'produk 6.jpg',
            'pose1.jpg',
            'pose2.jpg'
        ],
        sizes: [
            { size_name: 'S', stock: 15 },
            { size_name: 'M', stock: 18 },
            { size_name: 'L', stock: 10 },
            { size_name: 'XL', stock: 6 }
        ]
    },
    {
        name: 'Jack Premium Utility Shirt Jacket',
        category: 'Tops',
        gender: 'Boy',
        price: 195000,
        description: 'A highly versatile corduroy jacket-shirt (shacket) made of durable thick-wale corduroy. Can be worn buttoned up as a shirt or open as a light outer layer.',
        image: '../asset/img/product/jackoff-shirt/produk 5.jpg',
        folder: 'jackoff-shirt',
        gallery: [
            'produk 5.jpg',
            'pose 1.jpg',
            'pose3.jpg',
            'pose4.jpg',
            'pose5.jpg',
            'pose6.jpg'
        ],
        sizes: [
            { size_name: 'S', stock: 8 },
            { size_name: 'M', stock: 14 },
            { size_name: 'L', stock: 6 },
            { size_name: 'XL', stock: 3 }
        ]
    },
    {
        name: 'Marvel Spider-Man Action Print T-Shirt',
        category: 'Tops',
        gender: 'Boy',
        price: 90000,
        description: 'Bring action to your child\'s day with this official style Spider-Man graphic tee. Crafted in soft breathable jersey cotton to ensure comfort during active superhero playtime.',
        image: '../asset/img/product/spiderman-shirt/BAJU1.jpg',
        folder: 'spiderman-shirt',
        gallery: [
            'BAJU1.jpg',
            'pose.jpg',
            'pose (1).jpg',
            'pose (2).jpg',
            'pose (3).jpg'
        ],
        sizes: [
            { size_name: 'S', stock: 22 },
            { size_name: 'M', stock: 20 },
            { size_name: 'L', stock: 14 },
            { size_name: 'XL', stock: 7 }
        ]
    }
];

db.connect(async err => {
    if (err) {
        console.error('Koneksi database gagal:', err);
        process.exit(1);
    }
    console.log('Berhasil terhubung ke database MySQL!');

    for (const prod of missingProducts) {
        try {
            // Cek apakah produk dengan nama atau gambar yang sama sudah ada
            const checkQuery = 'SELECT id FROM products WHERE name = ? OR image = ?';
            const checkResult = await new Promise((resolve, reject) => {
                db.query(checkQuery, [prod.name, prod.image], (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });

            if (checkResult.length > 0) {
                console.log(` Produk "${prod.name}" sudah ada di database (SKIPPED).`);
                continue;
            }

            // 1. Insert ke tabel products
            const prodQuery = 'INSERT INTO products (name, category, gender, price, description, image) VALUES (?, ?, ?, ?, ?, ?)';
            const prodInsert = await new Promise((resolve, reject) => {
                db.query(prodQuery, [prod.name, prod.category, prod.gender, prod.price, prod.description, prod.image], (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                });
            });
            const productId = prodInsert.insertId;
            console.log(`\n Berhasil memasukkan produk: "${prod.name}" (ID: ${productId})`);

            // 2. Insert ke tabel product_images
            for (const imgFile of prod.gallery) {
                const imgPath = `../asset/img/product/${prod.folder}/${imgFile}`;
                const imgQuery = 'INSERT INTO product_images (product_id, image_path) VALUES (?, ?)';
                await new Promise((resolve, reject) => {
                    db.query(imgQuery, [productId, imgPath], (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                });
            }
            console.log(`   - Berhasil memasukkan ${prod.gallery.length} foto ke gallery.`);

            // 3. Insert ke tabel product_sizes
            for (const size of prod.sizes) {
                const sizeQuery = 'INSERT INTO product_sizes (product_id, size_name, stock) VALUES (?, ?, ?)';
                await new Promise((resolve, reject) => {
                    db.query(sizeQuery, [productId, size.size_name, size.stock], (err, res) => {
                        if (err) reject(err);
                        else resolve(res);
                    });
                });
            }
            console.log(`   - Berhasil memasukkan ${prod.sizes.length} ukuran/stok.`);

        } catch (e) {
            console.error(` Gagal memasukkan produk "${prod.name}":`, e);
        }
    }

    console.log('\n--- PROSES PENGISIAN DATABASE SELESAI ---');
    db.end();
});
