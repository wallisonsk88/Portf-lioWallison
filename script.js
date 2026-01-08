// Initialize Lucide Icons
lucide.createIcons();

// Update Year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth Scroll Function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let isMenuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuBtn.innerHTML = '<i data-lucide="x"></i>';
        lucide.createIcons();
    } else {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    }
}

// Scroll Spy (Active Section Highlighting)
window.addEventListener('scroll', () => {
    const sections = ['home', 'services', 'projects', 'about', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const element = document.getElementById(section);
        const navLink = document.querySelector(`button[data-section="${section}"]`);

        if (element && navLink) {
            if (element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                // Remove active class from all
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-indigo-400');
                    link.classList.add('text-slate-400');
                });
                // Add active class to current
                navLink.classList.remove('text-slate-400');
                navLink.classList.add('text-indigo-400');
            }
        }
    });
});

// Form Handling
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Loading State
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success State
                submitBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                submitBtn.classList.add('bg-green-600', 'text-white');
                submitBtn.innerHTML = 'Mensagem Enviada! <i data-lucide="check-circle" width="18"></i>';
                lucide.createIcons();
                form.reset();
            } else {
                throw new Error('Erro no envio');
            }
        } catch (error) {
            submitBtn.classList.add('bg-red-600');
            submitBtn.innerHTML = 'Erro ao enviar <i data-lucide="alert-circle" width="18"></i>';
            lucide.createIcons();
        }

        // Reset button state after 3 seconds
        setTimeout(() => {
            submitBtn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
            submitBtn.classList.remove('bg-green-600', 'bg-red-600');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
            lucide.createIcons();
        }, 3000);
    });
}

