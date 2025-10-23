// Birthday Card Interactive Features
class BirthdayCard {
    constructor() {
        this.photoCount = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPhotos();
        this.setupConfetti();
        this.setupHeartAnimation();
    }

    setupEventListeners() {
        // Interactive buttons
        document.getElementById('confetti-btn').addEventListener('click', () => {
            this.triggerConfetti();
        });

        document.getElementById('heart-animation-btn').addEventListener('click', () => {
            this.createHeartAnimation();
        });

        document.getElementById('surprise-btn').addEventListener('click', () => {
            this.showSurprise();
        });

        // Music toggle
        document.getElementById('toggle-music').addEventListener('click', () => {
            this.toggleMusic();
        });

        // Gallery item clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-item')) {
                this.openPhotoModal(e.target.closest('.gallery-item'));
            }
        });
    }

    loadPhotos() {
        const galleryGrid = document.getElementById('gallery-grid');
        const photoPaths = [
            'assets/birthday-photos/photo1.jpg',
            'assets/birthday-photos/photo2.jpg',
            'assets/birthday-photos/photo3.jpg',
            'assets/birthday-photos/photo4.jpg',
            'assets/birthday-photos/photo5.jpg',
            'assets/birthday-photos/photo6.jpg',
            'assets/birthday-photos/photo7.jpg',
            'assets/birthday-photos/photo8.jpg'
        ];

        let loadedPhotos = 0;
        let html = '';

        photoPaths.forEach((path, index) => {
            const img = new Image();
            img.onload = () => {
                loadedPhotos++;
                html += `
                    <div class="gallery-item" data-index="${index}">
                        <img src="${path}" alt="Birthday Memory ${index + 1}" loading="lazy">
                    </div>
                `;
                
                if (loadedPhotos === photoPaths.length || loadedPhotos === photoPaths.filter(p => p).length) {
                    if (html) {
                        galleryGrid.innerHTML = html;
                    }
                }
            };
            img.onerror = () => {
                // Photo doesn't exist, skip
            };
            img.src = path;
        });

        // If no photos load, show placeholder
        setTimeout(() => {
            if (loadedPhotos === 0) {
                galleryGrid.innerHTML = `
                    <div class="gallery-placeholder">
                        <p>📸 Add your favorite photos here!</p>
                        <p class="placeholder-instructions">
                            Place your photos in the <code>assets/birthday-photos/</code> folder<br>
                            Name them: <code>photo1.jpg</code>, <code>photo2.jpg</code>, etc.
                        </p>
                    </div>
                `;
            }
        }, 2000);
    }

    setupConfetti() {
        this.canvas = document.getElementById('confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    triggerConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const confettiCount = 150;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 10);
        }
    }

    createConfettiPiece(color) {
        const confetti = {
            x: Math.random() * this.canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            color: color,
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        };

        const animate = () => {
            this.ctx.save();
            this.ctx.translate(confetti.x, confetti.y);
            this.ctx.rotate(confetti.rotation * Math.PI / 180);
            this.ctx.fillStyle = confetti.color;
            this.ctx.fillRect(-confetti.size/2, -confetti.size/2, confetti.size, confetti.size);
            this.ctx.restore();

            confetti.x += confetti.vx;
            confetti.y += confetti.vy;
            confetti.vy += 0.1; // gravity
            confetti.rotation += confetti.rotationSpeed;

            if (confetti.y < this.canvas.height + 50) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    setupHeartAnimation() {
        this.heartContainer = document.getElementById('heart-container');
    }

    createHeartAnimation() {
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                this.createHeart();
            }, i * 100);
        }
    }

    createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        this.heartContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    showSurprise() {
        const surprises = [
            "🎉 You are absolutely amazing!",
            "💖 You make every day brighter!",
            "✨ You deserve all the happiness in the world!",
            "🌟 You are my favorite person!",
            "🎂 Happy 21st Birthday, beautiful!",
            "💕 You are loved beyond measure!",
            "🎊 You bring so much joy to my life!",
            "🌈 You make everything better!",
            "🦋 You are perfect just the way you are!",
            "🌺 You are my greatest blessing!"
        ];

        const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
        
        // Create surprise popup
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            padding: 30px;
            border-radius: 20px;
            font-size: 1.5rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: surprisePop 0.5s ease-out;
        `;
        
        popup.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 15px;">${randomSurprise.split(' ')[0]}</div>
            <div>${randomSurprise.substring(randomSurprise.indexOf(' ') + 1)}</div>
        `;
        
        document.body.appendChild(popup);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes surprisePop {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            popup.remove();
            style.remove();
        }, 3000);
    }

    toggleMusic() {
        // TODO: Add background music functionality
        const musicBtn = document.getElementById('toggle-music');
        if (musicBtn.textContent.includes('🎵')) {
            musicBtn.textContent = '🔇 Music';
            musicBtn.style.background = 'rgba(255, 107, 107, 0.9)';
        } else {
            musicBtn.textContent = '🎵 Music';
            musicBtn.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    }

    openPhotoModal(galleryItem) {
        const img = galleryItem.querySelector('img');
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    }
}

// Initialize the birthday card when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCard();
});
