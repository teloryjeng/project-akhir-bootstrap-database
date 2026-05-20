const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hahahihi'
});

db.connect(err => {
    if (err) {
        console.error('Koneksi database gagal:', err);
        process.exit(1);
    }
    
    db.query('SELECT * FROM product_images LIMIT 10', (err, images) => {
        if (err) {
            console.error('Error fetching images:', err);
        } else {
            console.log('\n=== SAMPLE PRODUCT IMAGES ===');
            console.log(images);
        }
        
        db.query('SELECT * FROM product_sizes LIMIT 15', (err, sizes) => {
            if (err) {
                console.error('Error fetching sizes:', err);
            } else {
                console.log('\n=== SAMPLE PRODUCT SIZES ===');
                console.log(sizes);
            }
            db.end();
        });
    });
});
