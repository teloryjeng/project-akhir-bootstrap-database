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
    
    const describeTable = (tableName) => {
        return new Promise((resolve, reject) => {
            db.query(`DESCRIBE ${tableName}`, (err, results) => {
                if (err) reject(err);
                else resolve({ tableName, columns: results });
            });
        });
    };

    Promise.all([
        describeTable('products'),
        describeTable('product_images'),
        describeTable('product_sizes')
    ])
    .then(results => {
        results.forEach(res => {
            console.log(`\n=== SCHEMA TABEL: ${res.tableName} ===`);
            res.columns.forEach(col => {
                console.log(`Field: ${col.Field} | Type: ${col.Type} | Null: ${col.Null} | Key: ${col.Key} | Default: ${col.Default} | Extra: ${col.Extra}`);
            });
        });
        db.end();
    })
    .catch(err => {
        console.error('Error describing tables:', err);
        db.end();
    });
});
