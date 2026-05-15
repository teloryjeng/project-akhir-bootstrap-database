// script/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.href = "signin.html";
        return;
    }

    const user = JSON.parse(userStr);
    const userId = user.id;

    loadCheckoutData(userId);

    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Tampilkan custom overlay konfirmasi sebelum memesan
            showOverlay("Are you sure the address data is correct and you want to process this order?", false, null, true, () => {
                const total = document.getElementById('total-price').textContent;
                // Alihkan ke halaman pembayaran dengan membawa total harga
                window.location.href = `payment.html?total=${encodeURIComponent(total)}`;
            });
        });
    }
});

function loadCheckoutData(userId) {
    const subtotalEl = document.getElementById('subtotal-price');
    const taxEl = document.getElementById('tax-price');
    const totalEl = document.getElementById('total-price');
    const summaryEl = document.getElementById('checkout-items-summary');

    fetch(`http://localhost:3000/api/cart?user_id=${userId}`)
        .then(response => response.json())
        .then(items => {
            if (items.error) throw new Error(items.error);

            if (items.length === 0) {
                window.location.href = "cart.html";
                return;
            }

            let subtotal = 0;
            let summaryHTML = '<h6 class="fw-bold mb-3">Order Details:</h6>';

            items.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                summaryHTML += `
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">${item.name} (x${item.quantity})</span>
                        <span class="small">${formatPrice(itemTotal)}</span>
                    </div>
                `;
            });

            summaryEl.innerHTML = summaryHTML;
            
            const shipping = 20000;
            const tax = subtotal * 0.11; // PPN 11%
            const total = subtotal + shipping + tax;

            subtotalEl.textContent = formatPrice(subtotal);
            taxEl.textContent = formatPrice(tax);
            totalEl.textContent = formatPrice(total);
        })
        .catch(err => {
            console.error('Error fetching checkout data:', err);
        });
}

function formatPrice(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}
