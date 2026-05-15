// script/login.js

function showOverlay(message, isSuccess, redirectUrl = null) {
    // Buat elemen overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-out';

    // Buat kotak pesan
    const box = document.createElement('div');
    box.style.backgroundColor = '#fff';
    box.style.padding = '30px';
    box.style.borderRadius = '10px';
    box.style.textAlign = 'center';
    box.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    box.style.maxWidth = '400px';
    box.style.width = '90%';
    box.style.transform = 'scale(0.8)';
    box.style.opacity = '0';
    box.style.transition = 'all 0.3s ease-out';

    // Ikon (Menggunakan Bootstrap Icons)
    const icon = document.createElement('div');
    icon.innerHTML = isSuccess ? '<i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>' : '<i class="bi bi-x-circle-fill text-danger" style="font-size: 3rem;"></i>';
    icon.style.marginBottom = '15px';

    // Teks
    const text = document.createElement('p');
    text.textContent = message;
    text.style.fontSize = '1.1rem';
    text.style.marginBottom = '20px';

    // Tombol
    const btn = document.createElement('button');
    btn.textContent = 'OK';
    btn.className = 'btn ' + (isSuccess ? 'btn-dark' : 'btn-outline-dark');
    btn.style.width = '100%';
    
    btn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        box.style.transform = 'scale(0.8)';
        box.style.opacity = '0';
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }, 300);
    });

    box.appendChild(icon);
    box.appendChild(text);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Animasi muncul (trigger reflow)
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        box.style.transform = 'scale(1)';
        box.style.opacity = '1';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah reload halaman
            
            const email = document.getElementById('floatingInput').value;
            const password = document.getElementById('floatingPassword').value;
            
            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Simpan data user ke localStorage
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    showOverlay('Login Success! Welcome, ' + data.user.name, true, 'index.html');
                } else {
                    showOverlay('Failed: ' + data.error, false);
                }
            } catch (err) {
                console.error('Error:', err);
                showOverlay('Terjadi kesalahan saat menghubungi server.', false);
            }
        });
    }
});
