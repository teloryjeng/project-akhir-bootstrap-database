// script/loadproductdetail.js

function loadProductDetail() {
    // Ambil parameter id dari URL (contoh: kemeja-flanel.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Jika tidak ada ID, default ke ID 1 (misalnya Flanel Shirt)
    const fetchId = productId ? productId : 1;

    fetch(`http://localhost:3000/api/products/detail/${fetchId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Product not found');
            }
            return response.json();
        })
        .then(product => {
            // Ubah Title halaman
            document.title = `${product.name} - Haha Hihi Kidswear`;

            // Ubah Nama Produk
            const nameEl = document.getElementById('product-name');
            if (nameEl) nameEl.textContent = product.name;

            // Ubah Deskripsi
            const descEl = document.getElementById('product-desc');
            if (descEl) descEl.textContent = product.description;

            // Ubah Harga
            const priceEl = document.getElementById('product-price');
            if (priceEl) {
                priceEl.textContent = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(product.price);
            }

            // Ubah Breadcrumb
            const breadcrumbEl = document.getElementById('breadcrumb-text');
            if (breadcrumbEl) {
                let displayGender = product.gender.toUpperCase();
                if (displayGender === 'UNISEX') {
                    displayGender = 'BOY & GIRL';
                }
                breadcrumbEl.innerHTML = `<i class="bi bi-arrow-return-right"></i> ${displayGender} | ${product.category}`;
            }

            // Ubah Gambar dari product_images
            const imagesContainer = document.getElementById('product-images-container');
            const modalCarouselInner = document.getElementById('modal-carousel-inner');
            
            if (imagesContainer && modalCarouselInner && product.images && product.images.length > 0) {
                let galleryHTML = '';
                let carouselHTML = '';

                product.images.forEach((imgObj, index) => {
                    const imagePath = imgObj.image_path.replace(/^\.\.\//, './');
                    
                    // Gallery
                    galleryHTML += `
                        <div class="col-6 mb-3">
                            <img src="${imagePath}"
                             id="product-img-${index}"
                             alt="${product.name} 00${index + 1}"
                             class="img-fluid rounded img-thumbnail-link" 
                             data-bs-toggle="modal" 
                             data-bs-target="#productModal"
                             onclick="goToSlide(${index})">
                            <span class="img-label">00${index + 1}</span>
                        </div>
                    `;

                    // Modal Carousel
                    const activeClass = index === 0 ? 'active' : '';
                    carouselHTML += `
                        <div class="carousel-item ${activeClass}">
                            <img src="${imagePath}" class="d-block w-100 rounded" alt="00${index + 1}">
                        </div>
                    `;
                });

                imagesContainer.innerHTML = galleryHTML;
                modalCarouselInner.innerHTML = carouselHTML;
            } else if (imagesContainer && modalCarouselInner) {
                // Fallback jika tidak ada gambar di product_images, gunakan gambar utama product
                const imagePath = product.image ? product.image.replace(/^\.\.\//, './') : './asset/img/placeholder.jpg';
                imagesContainer.innerHTML = `
                    <div class="col-6 mb-3">
                        <img src="${imagePath}" alt="${product.name}" class="img-fluid rounded img-thumbnail-link" data-bs-toggle="modal" data-bs-target="#productModal" onclick="goToSlide(0)">
                        <span class="img-label">001</span>
                    </div>
                `;
                modalCarouselInner.innerHTML = `
                    <div class="carousel-item active">
                        <img src="${imagePath}" class="d-block w-100 rounded" alt="001">
                    </div>
                `;
            }

            // Ubah Ukuran dari product_sizes
            const sizesContainer = document.getElementById('product-sizes-container');
            if (sizesContainer && product.sizes && product.sizes.length > 0) {
                let sizesHTML = '';
                product.sizes.forEach(size => {
                    const disabledStr = size.stock <= 0 ? 'disabled' : '';
                    const btnClass = size.stock <= 0 ? 'btn-outline-secondary' : 'btn-outline-dark';
                    sizesHTML += `<button class="btn ${btnClass} size-btn" data-size="${size.size_name}" ${disabledStr}>${size.size_name}</button>`;
                });
                sizesContainer.innerHTML = sizesHTML;

                // Handle size selection
                let selectedSize = null;
                const sizeBtns = sizesContainer.querySelectorAll('.size-btn');
                sizeBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        // Reset all to outline
                        sizeBtns.forEach(b => {
                            if (!b.hasAttribute('disabled')) {
                                b.classList.remove('btn-dark');
                                b.classList.add('btn-outline-dark');
                            }
                        });
                        // Set clicked to solid
                        e.target.classList.remove('btn-outline-dark');
                        e.target.classList.add('btn-dark');
                        selectedSize = e.target.getAttribute('data-size');
                    });
                });

                // Logika Add to Cart
                const addToCartBtn = document.getElementById('add-to-cart-btn');
                
                // Hitung total stok
                const totalStock = product.sizes.reduce((acc, size) => acc + size.stock, 0);

                if (totalStock <= 0) {
                    if (addToCartBtn) {
                        addToCartBtn.disabled = true;
                        addToCartBtn.textContent = "Out Of Stock";
                        addToCartBtn.classList.remove('btn-dark');
                        addToCartBtn.classList.add('btn-secondary');
                        // Menampilkan cursor stop/not-allowed
                        addToCartBtn.style.pointerEvents = 'auto';
                        addToCartBtn.style.cursor = 'not-allowed';
                    }
                } else if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', () => {
                        const userStr = localStorage.getItem('user');
                        if (!userStr) {
                            window.location.href = "signin.html";
                            return;
                        }

                        if (!selectedSize) {
                            showOverlay("Please select a size first.", false);
                            return;
                        }

                        const user = JSON.parse(userStr);
                        const userId = user.id;

                        // Tambahkan ke Cart via API
                        fetch('http://localhost:3000/api/cart', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                user_id: userId,
                                product_id: product.id,
                                size: selectedSize,
                                quantity: 1
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.error) {
                                showOverlay("Failed to add product to cart: " + data.error, false);
                            } else {
                                showOverlay("Product successfully added to cart!", true, "cart.html");
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            showOverlay("An error occurred while contacting the server.", false);
                        });
                    });
                }

            } else if (sizesContainer) {
                sizesContainer.innerHTML = '<p class="text-danger mb-0">Product Out Of Stock</p>';
                const addToCartBtn = document.getElementById('add-to-cart-btn');
                if (addToCartBtn) {
                    addToCartBtn.disabled = true;
                    addToCartBtn.textContent = "Out Of Stock";
                    addToCartBtn.classList.remove('btn-dark');
                    addToCartBtn.classList.add('btn-secondary');
                    addToCartBtn.style.pointerEvents = 'none';
                }
            }

        })
        .catch(error => {
            console.error('Error fetching product detail:', error);
            const nameEl = document.getElementById('product-name');
            if (nameEl) nameEl.textContent = "Product not found";
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
});
