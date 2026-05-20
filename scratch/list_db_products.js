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
    console.log('Berhasil terhubung ke database!');
    
    db.query('SHOW TABLES', (err, tables) => {
        if (err) {
            console.error('Gagal menampilkan tabel:', err);
            db.end();
            return;
        }
        console.log('Tabel di database:', tables);
        
        db.query('SELECT id, name, category, gender, image, price FROM products', (err, results) => {
            if (err) {
                console.error('Gagal mengambil produk:', err);
            } else {
                console.log('--- DAFTAR PRODUK DI DATABASE ---');
                console.log(`Total produk: ${results.length}`);
                results.forEach(p => {
                    console.log(`ID: ${p.id} | Nama: ${p.name} | Kategori: ${p.category} | Gender: ${p.gender} | Image: ${p.image} | Price: ${p.price}`);
                });
            }
            db.end();
        });
    });
});
