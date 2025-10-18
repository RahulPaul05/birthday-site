// Birthday Journey App
class BirthdayJourney {
    constructor() {
        this.currentDay = 1;
        this.completedDays = JSON.parse(localStorage.getItem('completedDays')) || [];
        this.currentTask = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDayStatuses();
        this.showScreen('welcome-screen');
    }

    setupEventListeners() {
        // Welcome screen
        document.getElementById('start-journey').addEventListener('click', () => {
            this.showScreen('day-selection');
        });

        // Day selection
        document.getElementById('back-to-welcome').addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });

        // Task screen
        document.getElementById('back-to-days').addEventListener('click', () => {
            this.showScreen('day-selection');
        });

        document.getElementById('complete-task').addEventListener('click', () => {
            this.completeCurrentTask();
        });

        // Birthday message screen
        document.getElementById('restart-journey').addEventListener('click', () => {
            this.restartJourney();
        });

        // Day cards
        document.querySelectorAll('.day-card').forEach(card => {
            card.addEventListener('click', () => {
                const day = parseInt(card.dataset.day);
                if (this.isDayAvailable(day)) {
                    this.startTask(day);
                }
            });
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    updateDayStatuses() {
        for (let day = 1; day <= 7; day++) {
            const card = document.querySelector(`[data-day="${day}"]`);
            const status = document.getElementById(`status-${day}`);
            
            if (this.completedDays.includes(day)) {
                card.classList.add('completed');
                status.textContent = '✅';
            } else if (this.isDayAvailable(day)) {
                card.classList.add('available');
                status.textContent = '🎯';
            } else {
                card.classList.remove('available', 'completed');
                status.textContent = '🔒';
            }
        }
    }

    isDayAvailable(day) {
        if (day === 1) return true;
        return this.completedDays.includes(day - 1);
    }

    startTask(day) {
        this.currentDay = day;
        this.currentTask = this.getTaskForDay(day);
        this.showTaskScreen();
    }

    getTaskForDay(day) {
        const tasks = {
            1: {
                title: "Day 1: Memory Lane",
                description: "Take a moment to reflect on your favorite childhood memory. What made it so special?",
                interaction: this.createMemoryTask(),
                completionMessage: "What a beautiful memory! As you turn 21, remember that the joy and wonder you felt as a child is still within you. You're about to embark on the most exciting chapter of your life! 🌟"
            },
            2: {
                title: "Day 2: Gratitude Garden",
                description: "Write down three things you're grateful for today. They can be big or small!",
                interaction: this.createGratitudeTask(),
                completionMessage: "Your gratitude shines so brightly! At 21, you have so much to look forward to, and your grateful heart will attract even more beautiful experiences into your life. 💖"
            },
            3: {
                title: "Day 3: Dream Big",
                description: "What's one dream you have for your 21st year? Let your imagination soar!",
                interaction: this.createDreamTask(),
                completionMessage: "What an amazing dream! At 21, the world is truly your oyster. Your dreams have the power to become reality, and I believe in you completely! ✨"
            },
            4: {
                title: "Day 4: Self-Love Letter",
                description: "Write a love letter to yourself. What do you love most about who you are?",
                interaction: this.createSelfLoveTask(),
                completionMessage: "You are absolutely incredible! At 21, you're becoming the woman you're meant to be, and that woman is already so special, kind, and wonderful. You deserve all the love in the world! 💕"
            },
            5: {
                title: "Day 5: Photo Memory",
                description: "Upload a photo that makes you smile or take a selfie right now!",
                interaction: this.createPhotoTask(),
                completionMessage: "Look at that beautiful smile! You radiate joy and happiness, and at 21, you're going to create so many more wonderful memories. Keep smiling, beautiful! 📸✨"
            },
            6: {
                title: "Day 6: Future Vision",
                description: "Imagine yourself one year from now. What do you hope to have accomplished?",
                interaction: this.createFutureTask(),
                completionMessage: "Your vision is so inspiring! At 21, you have the power to shape your future exactly as you want it. Every step you take brings you closer to that amazing future you're envisioning! 🚀"
            },
            7: {
                title: "Day 7: Birthday Wishes",
                description: "Make three birthday wishes for yourself. Close your eyes and make them with all your heart!",
                interaction: this.createWishesTask(),
                completionMessage: "Your wishes are so precious! May every single one of them come true in the most beautiful way. Happy 21st birthday, beautiful soul! You deserve all the happiness, love, and success in the world! 🎂🎉"
            }
        };
        return tasks[day];
    }

    createMemoryTask() {
        return `
            <div class="task-interaction">
                <textarea class="text-input" id="memory-input" placeholder="Share your favorite childhood memory here..." rows="4"></textarea>
                <button class="interactive-button" onclick="birthdayApp.submitMemory()">Share My Memory</button>
            </div>
        `;
    }

    createGratitudeTask() {
        return `
            <div class="task-interaction">
                <input type="text" class="text-input" id="gratitude-1" placeholder="First thing I'm grateful for...">
                <input type="text" class="text-input" id="gratitude-2" placeholder="Second thing I'm grateful for...">
                <input type="text" class="text-input" id="gratitude-3" placeholder="Third thing I'm grateful for...">
                <button class="interactive-button" onclick="birthdayApp.submitGratitude()">Share My Gratitude</button>
            </div>
        `;
    }

    createDreamTask() {
        return `
            <div class="task-interaction">
                <textarea class="text-input" id="dream-input" placeholder="What's your dream for this year?" rows="4"></textarea>
                <button class="interactive-button" onclick="birthdayApp.submitDream()">Share My Dream</button>
            </div>
        `;
    }

    createSelfLoveTask() {
        return `
            <div class="task-interaction">
                <textarea class="text-input" id="selflove-input" placeholder="Write a love letter to yourself..." rows="5"></textarea>
                <button class="interactive-button" onclick="birthdayApp.submitSelfLove()">Share My Love Letter</button>
            </div>
        `;
    }

    createPhotoTask() {
        return `
            <div class="task-interaction">
                <div class="photo-upload" onclick="document.getElementById('photo-input').click()">
                    <input type="file" id="photo-input" accept="image/*" onchange="birthdayApp.handlePhotoUpload(event)">
                    <p>📸 Click here to upload a photo or take a selfie!</p>
                </div>
                <button class="interactive-button" onclick="birthdayApp.submitPhoto()">Share My Photo</button>
            </div>
        `;
    }

    createFutureTask() {
        return `
            <div class="task-interaction">
                <textarea class="text-input" id="future-input" placeholder="What do you hope to accomplish in the next year?" rows="4"></textarea>
                <button class="interactive-button" onclick="birthdayApp.submitFuture()">Share My Vision</button>
            </div>
        `;
    }

    createWishesTask() {
        return `
            <div class="task-interaction">
                <input type="text" class="text-input" id="wish-1" placeholder="First birthday wish...">
                <input type="text" class="text-input" id="wish-2" placeholder="Second birthday wish...">
                <input type="text" class="text-input" id="wish-3" placeholder="Third birthday wish...">
                <button class="interactive-button" onclick="birthdayApp.submitWishes()">Make My Wishes</button>
            </div>
        `;
    }

    showTaskScreen() {
        document.getElementById('task-title').textContent = this.currentTask.title;
        document.getElementById('task-description').textContent = this.currentTask.description;
        document.getElementById('task-interaction').innerHTML = this.currentTask.interaction;
        document.getElementById('completion-message').innerHTML = this.currentTask.completionMessage;
        document.getElementById('completion-message').classList.add('hidden');
        document.getElementById('complete-task').classList.add('hidden');
        
        // Update progress bar
        const progress = (this.currentDay / 7) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        
        this.showScreen('task-screen');
    }

    // Task submission methods
    submitMemory() {
        const memory = document.getElementById('memory-input').value.trim();
        if (memory) {
            this.showCompletion();
        }
    }

    submitGratitude() {
        const gratitude1 = document.getElementById('gratitude-1').value.trim();
        const gratitude2 = document.getElementById('gratitude-2').value.trim();
        const gratitude3 = document.getElementById('gratitude-3').value.trim();
        if (gratitude1 && gratitude2 && gratitude3) {
            this.showCompletion();
        }
    }

    submitDream() {
        const dream = document.getElementById('dream-input').value.trim();
        if (dream) {
            this.showCompletion();
        }
    }

    submitSelfLove() {
        const selfLove = document.getElementById('selflove-input').value.trim();
        if (selfLove) {
            this.showCompletion();
        }
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Photo uploaded successfully
        }
    }

    submitPhoto() {
        const photo = document.getElementById('photo-input').files[0];
        if (photo) {
            this.showCompletion();
        }
    }

    submitFuture() {
        const future = document.getElementById('future-input').value.trim();
        if (future) {
            this.showCompletion();
        }
    }

    submitWishes() {
        const wish1 = document.getElementById('wish-1').value.trim();
        const wish2 = document.getElementById('wish-2').value.trim();
        const wish3 = document.getElementById('wish-3').value.trim();
        if (wish1 && wish2 && wish3) {
            this.showCompletion();
        }
    }

    showCompletion() {
        document.getElementById('completion-message').classList.remove('hidden');
        document.getElementById('complete-task').classList.remove('hidden');
    }

    completeCurrentTask() {
        if (!this.completedDays.includes(this.currentDay)) {
            this.completedDays.push(this.currentDay);
            localStorage.setItem('completedDays', JSON.stringify(this.completedDays));
        }
        
        this.updateDayStatuses();
        
        if (this.completedDays.length === 7) {
            this.showFinalBirthdayMessage();
        } else {
            this.showScreen('day-selection');
        }
    }

    showFinalBirthdayMessage() {
        const finalMessage = `
            <h2>🎉 Happy 21st Birthday! 🎉</h2>
            <p>You've completed all 7 days of your special journey, and what an incredible journey it's been!</p>
            <p>You've shared your memories, expressed gratitude, dreamed big, shown yourself love, captured moments, envisioned your future, and made beautiful wishes.</p>
            <p>As you turn 21, know that you are loved, valued, and capable of achieving absolutely anything you set your mind to. This is just the beginning of the most amazing chapter of your life!</p>
            <p>May your 21st year be filled with endless joy, incredible adventures, and all the happiness your heart can hold.</p>
            <p>Happy Birthday, beautiful soul! 🎂✨💖</p>
        `;
        
        document.getElementById('final-message').innerHTML = finalMessage;
        this.showScreen('birthday-message');
    }

    restartJourney() {
        this.completedDays = [];
        localStorage.removeItem('completedDays');
        this.updateDayStatuses();
        this.showScreen('welcome-screen');
    }
}

// Initialize the app when the page loads
let birthdayApp;
document.addEventListener('DOMContentLoaded', () => {
    birthdayApp = new BirthdayJourney();
});
