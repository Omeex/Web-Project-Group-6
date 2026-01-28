document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Destination card hover enhancement
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 2. Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.display = 'none';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
            setTimeout(() => {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            }, 10);
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(20px)';
            setTimeout(() => {
                backToTop.style.display = 'none';
            }, 300);
        }
    });
    
    // 3. Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.backgroundPosition = `center ${rate}px`;
        }
    });
    
    
});