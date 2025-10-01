class AvatarController {
    constructor() {
        this.avatar = document.getElementById('animatedAvatar');
        this.mouth = this.avatar.querySelector('.avatar-mouth');
        this.eyes = this.avatar.querySelector('.avatar-eyes');
        this.isSpeaking = false;
        this.isListening = false;
    }

    initialize() {
        this.setIdleState();
        console.log('Avatar controller inicializado');
    }

    setSpeakingState() {
        this.isSpeaking = true;
        this.isListening = false;
        this.avatar.classList.add('speaking');
        this.avatar.classList.remove('listening');
        this.mouth.classList.add('talking');
    }

    setListeningState() {
        this.isSpeaking = false;
        this.isListening = true;
        this.avatar.classList.add('listening');
        this.avatar.classList.remove('speaking');
        this.mouth.classList.remove('talking');
    }

    setIdleState() {
        this.isSpeaking = false;
        this.isListening = false;
        this.avatar.classList.remove('speaking', 'listening');
        this.mouth.classList.remove('talking');
    }

    // Animações especiais
    playGreetingAnimation() {
        this.avatar.style.animation = 'float 2s ease-in-out';
        setTimeout(() => {
            this.avatar.style.animation = '';
        }, 2000);
    }

    playNodAnimation() {
        const head = this.avatar.querySelector('.avatar-head');
        head.style.animation = 'headTilt 1s ease-in-out 2';
        setTimeout(() => {
            head.style.animation = '';
        }, 2000);
    }

    playBlinkAnimation() {
        this.eyes.style.animation = 'blink 0.3s ease-in-out';
        setTimeout(() => {
            this.eyes.style.animation = '';
        }, 300);
    }
}

// Instância global do avatar
const avatarController = new AvatarController();

function initializeAvatar() {
    avatarController.initialize();
    
    // Piscar aleatoriamente
    setInterval(() => {
        if (!avatarController.isSpeaking) {
            avatarController.playBlinkAnimation();
        }
    }, 5000);
}