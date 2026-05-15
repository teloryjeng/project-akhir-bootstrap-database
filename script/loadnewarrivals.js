// script/loadnewarrivals.js

function loadNewArrivals(callback) {
    const container = document.getElementById('new-arrivals-container');

    // Cegah error jika script ini dipanggil di halaman yang tidak memiliki new-arrivals-container
    if (!container) return;

    // URL menuju Backend API
    const apiUrl = `http://localhost:3000/api/products/new-arrivals?limit=12`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let htmlContent = '';
            const products = data.products || [];

            // Jika tidak ada produk ditemukan
            if (products.length === 0) {
                container.innerHTML = '<p class="text-center w-100">Belum ada produk baru.</p>';
                return;
            }

            // Looping data untuk dicetak menjadi HTML
            products.forEach(product => {
                const formattedPrice = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(product.price);

                // Hilangkan "../" pada image path jika di-load di halaman root index.html
                const imagePath = product.image.replace(/^\.\.\//, './');

                htmlContent += `
                    <div style="flex: 0 0 calc((100% - 72px) / 4); max-width: calc((100% - 72px) / 4);">
                        <a href="product-detail.html?id=${product.id}" class="product-link">
                            <div class="product-card interactive">
                                <img src="${imagePath}" alt="${product.name}" class="img-fluid mb-2" style="background-color: #ebebeb; border-radius: 8px;">
                                <h6>${product.name}</h6>
                                <p>${formattedPrice}</p>
                            </div>
                        </a>
                    </div>
                `;
            });

            // Suntikkan kode HTML yang sudah jadi ke dalam layar
            container.innerHTML = htmlContent;

            // Jalankan callback jika ada
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(error => {
            console.error('Gagal memuat produk:', error);
            container.innerHTML = '<p class="text-center text-danger w-100">Gagal terhubung ke database.</p>';
        });
}

// Menjalankan fungsi secara otomatis setelah struktur halaman web selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Memindahkan loadNewArrivals ke dalam blok pengecekan di bawah agar bisa akses variabel $container


    // Logika untuk tombol geser slider menggunakan jQuery
    const $container = $('#new-arrivals-container');
    const $scrollLeftBtn = $('#scrollLeftBtn');
    const $scrollRightBtn = $('#scrollRightBtn');

    if ($container.length && $scrollLeftBtn.length && $scrollRightBtn.length) {
        const updateArrows = () => {
            const container = $container[0];
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            const maxScroll = scrollWidth - clientWidth;

            // Debugging (opsional, bisa dihapus nanti)
            // console.log(`ScrollLeft: ${scrollLeft}, Max: ${maxScroll}`);

            // Sembunyikan tombol kiri jika di paling kiri
            if (scrollLeft <= 5) { 
                $scrollLeftBtn.css({ 'opacity': '0', 'pointer-events': 'none' });
            } else {
                $scrollLeftBtn.css({ 'opacity': '1', 'pointer-events': 'auto' });
            }

            // Sembunyikan tombol kanan jika di paling kanan atau konten tidak meluap
            if (maxScroll <= 0 || scrollLeft >= maxScroll - 5) {
                $scrollRightBtn.css({ 'opacity': '0', 'pointer-events': 'none' });
            } else {
                $scrollRightBtn.css({ 'opacity': '1', 'pointer-events': 'auto' });
            }
        };

        // Jalankan saat scroll
        $container.on('scroll', updateArrows);

        // Load data dan jalankan updateArrows setelah data masuk ke DOM
        loadNewArrivals(() => {
            // Beri sedikit jeda agar browser selesai merender layout
            setTimeout(updateArrows, 100);
        });

        $scrollLeftBtn.on('click', () => {
            const cardElement = $container.children().first();
            if (cardElement.length) {
                const scrollAmount = cardElement.outerWidth() + 24;
                $container.stop().animate({
                    scrollLeft: "-=" + scrollAmount
                }, 400, 'swing', updateArrows); 
            }
        });

        $scrollRightBtn.on('click', () => {
            const cardElement = $container.children().first();
            if (cardElement.length) {
                const scrollAmount = cardElement.outerWidth() + 24;
                $container.stop().animate({
                    scrollLeft: "+=" + scrollAmount
                }, 400, 'swing', updateArrows);
            }
        });

        // Inisialisasi awal
        updateArrows();
    }
});
