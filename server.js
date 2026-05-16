const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Koneksi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hahahihi'
});

db.connect(err => {
    if (err) {
        console.error('Koneksi database gagal:', err);
        return;
    }
    console.log('Berhasil terhubung ke database MySQL!');
});

// 2. Endpoint API Filter Fleksibel
app.get('/api/products/filter', (req, res) => {
    const category = req.query.category;
    const gender = req.query.gender;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM products WHERE 1=1';
    let countSql = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
    let params = [];

    if (category) {
        sql += ' AND category = ?';
        countSql += ' AND category = ?';
        params.push(category);
    }

    if (gender) {
        sql += ' AND (gender = ? OR gender = "Unisex")';
        countSql += ' AND (gender = ? OR gender = "Unisex")';
        params.push(gender);
    }

    if (search) {
        sql += ' AND name LIKE ?';
        countSql += ' AND name LIKE ?';
        params.push(`%${search}%`);
    }

    db.query(countSql, params, (err, countResults) => {
        if (err) return res.status(500).json({ error: err.message });
        const total = countResults[0].total;
        const totalPages = Math.ceil(total / limit);

        const sort = req.query.sort;
        if (sort === 'price_asc') {
            sql += ' ORDER BY price ASC';
        } else if (sort === 'price_desc') {
            sql += ' ORDER BY price DESC';
        } else if (sort === 'oldest') {
            sql += ' ORDER BY id ASC';
        } else {
            sql += ' ORDER BY id DESC';
        }

        sql += ' LIMIT ? OFFSET ?';
        let queryParams = [...params, limit, offset];

        db.query(sql, queryParams, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
                products: results,
                currentPage: page,
                totalPages: totalPages
            });
        });
    });
});

// 3. Endpoint API New Arrivals
app.get('/api/products/new-arrivals', (req, res) => {
    const limit = parseInt(req.query.limit) || 8;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const countSql = 'SELECT COUNT(*) as total FROM products';
    db.query(countSql, (err, countResults) => {
        if (err) return res.status(500).json({ error: err.message });
        const total = countResults[0].total;
        const totalPages = Math.ceil(total / limit);

        const sort = req.query.sort;
        let sql = 'SELECT * FROM products';
        if (sort === 'price_asc') {
            sql += ' ORDER BY price ASC';
        } else if (sort === 'price_desc') {
            sql += ' ORDER BY price DESC';
        } else if (sort === 'oldest') {
            sql += ' ORDER BY id ASC';
        } else {
            sql += ' ORDER BY id DESC';
        }
        sql += ' LIMIT ? OFFSET ?';
        db.query(sql, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
                products: results,
                currentPage: page,
                totalPages: totalPages
            });
        });
    });
});

// 4. Endpoint API Single Product
app.get('/api/products/detail/:id', (req, res) => {
    const id = req.params.id;
    const sqlProduct = 'SELECT * FROM products WHERE id = ?';
    const sqlImages = 'SELECT * FROM product_images WHERE product_id = ?';
    const sqlSizes = 'SELECT * FROM product_sizes WHERE product_id = ?';

    db.query(sqlProduct, [id], (err, productResults) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (productResults.length === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        const product = productResults[0];

        db.query(sqlImages, [id], (err, imagesResults) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            product.images = imagesResults;

            db.query(sqlSizes, [id], (err, sizesResults) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                product.sizes = sizesResults;
                res.json(product);
            });
        });
    });
});

// 5. Endpoint API Register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Harap isi semua field' });
    }

    try {
        // Cek apakah email sudah terdaftar
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            
            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan ke database
            const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(sql, [name, email, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Registration successful', userId: result.insertId });
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while contacting the server' });
    }
});

// 6. Endpoint API Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password must be filled' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Email atau password salah' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Email or password incorrect' });
        }

        // Jangan kirim password kembali ke client
        delete user.password;
        res.json({ message: 'Login successfull', user });
    });
});

// 7. Endpoints API Cart
// Mengambil item di keranjang milik user tertentu
app.get('/api/cart', (req, res) => {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ error: 'user_id diperlukan' });

    const sql = `
        SELECT c.id as cart_id, c.user_id, c.product_id, c.size, c.quantity, 
               p.name, p.price, p.image, p.category,
               (SELECT stock FROM product_sizes WHERE product_id = c.product_id AND size_name = c.size LIMIT 1) as stock
        FROM cart c
        LEFT JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
        ORDER BY c.id DESC
    `;
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Menambahkan item ke keranjang
app.post('/api/cart', (req, res) => {
    const { user_id, product_id, size, quantity } = req.body;
    if (!user_id || !product_id || !size) return res.status(400).json({ error: 'Data tidak lengkap' });

    const qty = quantity || 1;

    // Cek apakah item dengan product_id dan size yang sama sudah ada di keranjang user
    const checkSql = 'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ? AND size = ?';
    db.query(checkSql, [user_id, product_id, size], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            // Jika ada, update quantity
            const cartId = results[0].id;
            const newQty = results[0].quantity + qty;
            db.query('UPDATE cart SET quantity = ? WHERE id = ?', [newQty, cartId], (err, updateResult) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Quantity updated', cart_id: cartId, new_quantity: newQty });
            });
        } else {
            // Jika belum ada, insert baru
            const insertSql = 'INSERT INTO cart (user_id, product_id, size, quantity) VALUES (?, ?, ?, ?)';
            db.query(insertSql, [user_id, product_id, size, qty], (err, insertResult) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Item added to cart', cart_id: insertResult.insertId });
            });
        }
    });
});

// Update quantity di keranjang
app.put('/api/cart/:id', (req, res) => {
    const cartId = req.params.id;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'Quantity tidak valid' });

    db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quantity updated' });
    });
});

// Hapus semua item dari keranjang user
app.delete('/api/cart/user/:userId', (req, res) => {
    const userId = req.params.userId;
    db.query('DELETE FROM cart WHERE user_id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'All items removed from cart' });
    });
});
app.delete('/api/cart/:id', (req, res) => {
    const cartId = req.params.id;
    db.query('DELETE FROM cart WHERE id = ?', [cartId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item removed from cart' });
    });
});

// 9. Endpoints API Profile
// Update Username
app.put('/api/auth/update-name', (req, res) => {
    const { user_id, new_name } = req.body;
    if (!user_id || !new_name) return res.status(400).json({ error: 'user_id dan new_name diperlukan' });

    db.query('UPDATE users SET name = ? WHERE id = ?', [new_name, user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'User tidak ditemukan' });
        res.json({ message: 'Username updated successfully' });
    });
});

// Change Password
app.put('/api/auth/change-password', async (req, res) => {
    const { user_id, current_password, new_password } = req.body;
    
    if (!user_id || !current_password || !new_password) {
        return res.status(400).json({ error: 'Data tidak lengkap' });
    }

    db.query('SELECT password FROM users WHERE id = ?', [user_id], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' });

        const user = results[0];
        const isMatch = await bcrypt.compare(current_password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Password saat ini salah' });
        }

        const hashedNewPassword = await bcrypt.hash(new_password, 10);
        db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, user_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Password updated successfully' });
        });
    });
});

// Delete Account
app.delete('/api/auth/delete-account/:id', (req, res) => {
    const userId = req.params.id;
    // Hapus data cart terkait dulu
    db.query('DELETE FROM cart WHERE user_id = ?', [userId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        
        db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Account deleted successfully' });
        });
    });
});

// 11. Endpoint API Complete Order (Payment)
app.post('/api/orders/complete', (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: 'user_id diperlukan' });

    // 1. Ambil semua item di keranjang user
    db.query('SELECT * FROM cart WHERE user_id = ?', [user_id], (err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        if (items.length === 0) return res.status(400).json({ error: 'Keranjang kosong' });

        // Memulai transaksi database
        db.beginTransaction(err => {
            if (err) return res.status(500).json({ error: err.message });

            let processed = 0;
            let errorOccurred = false;

            items.forEach(item => {
                if (errorOccurred) return;

                // 2. Kurangi stok di tabel product_sizes
                const updateStockSql = 'UPDATE product_sizes SET stock = stock - ? WHERE product_id = ? AND size_name = ?';
                db.query(updateStockSql, [item.quantity, item.product_id, item.size], (err, result) => {
                    if (err) {
                        if (errorOccurred) return;
                        errorOccurred = true;
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Gagal update stok: ' + err.message });
                        });
                    }

                    processed++;
                    // Jika semua item sudah diproses
                    if (processed === items.length) {
                        // 3. Hapus isi keranjang user
                        db.query('DELETE FROM cart WHERE user_id = ?', [user_id], (err) => {
                            if (err) return db.rollback(() => res.status(500).json({ error: 'Gagal hapus cart: ' + err.message }));

                            // Selesaikan transaksi
                            db.commit(err => {
                                if (err) return db.rollback(() => res.status(500).json({ error: 'Gagal commit transaksi' }));
                                res.json({ message: 'Pembayaran berhasil dikonfirmasi, stok telah diperbarui.' });
                            });
                        });
                    }
                });
            });
        });
    });
});

// 12. Menjalankan Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Node.js berjalan di http://localhost:${PORT}`);
});