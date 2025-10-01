class SpeechController {
    constructor() {
        this.speechText = document.getElementById('speechText');
        this.speechBubble = document.getElementById('speechBubble');
        this.currentIndex = 0;
        this.isPresenting = false;
        this.presentationInterval = null;
        this.synth = window.speechSynthesis;
        this.utterance = null;
    }

    initialize() {
        this.setupSpeechSynthesis();
        console.log('Speech controller inicializado');
    }

    setupSpeechSynthesis() {
        // Configurar voz em português se disponível
        const voices = this.synth.getVoices();
        const portugueseVoice = voices.find(voice => 
            voice.lang.includes('pt') || voice.lang.includes('PT')
        );
        
        this.utterance = new SpeechSynthesisUtterance();
        this.utterance.rate = 0.9;
        this.utterance.pitch = 1;
        this.utterance.volume = 0.8;
        
        if (portugueseVoice) {
            this.utterance.voice = portugueseVoice;
        }
        
        // Event listeners para síntese de voz
        this.utterance.onstart = () => {
            avatarController.setSpeakingState();
        };
        
        this.utterance.onend = () => {
            avatarController.setIdleState();
        };
    }

    startPresentation() {
        if (this.isPresenting) return;
        
        this.isPresenting = true;
        this.currentIndex = 0;
        avatarController.playGreetingAnimation();
        
        this.speakCurrentText();
    }

    pausePresentation() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        
        this.isPresenting = false;
        avatarController.setIdleState();
        
        if (this.presentationInterval) {
            clearTimeout(this.presentationInterval);
        }
        
        this.updateSpeechText("Apresentação pausada. Clique em 'Iniciar Tour' para continuar.");
    }

    repeatPresentation() {
        this.pausePresentation();
        setTimeout(() => {
            this.startPresentation();
        }, 500);
    }

    speakCurrentText() {
        if (this.currentIndex >= presentationData.presentation.length) {
            this.endPresentation();
            return;
        }

        const currentSpeech = presentationData.presentation[this.currentIndex];
        this.updateSpeechText(currentSpeech.text);
        
        // Usar síntese de voz se disponível
        if (this.synth && this.utterance) {
            this.utterance.text = currentSpeech.text;
            this.synth.speak(this.utterance);
        }

        // Preparar próximo texto
        this.presentationInterval = setTimeout(() => {
            this.currentIndex++;
            this.speakCurrentText();
        }, currentSpeech.duration);
    }

    updateSpeechText(text) {
        this.speechText.style.opacity = '0';
        
        setTimeout(() => {
            this.speechText.textContent = text;
            this.speechText.style.opacity = '1';
            
            // Efeito visual no balão
            this.speechBubble.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.speechBubble.style.transform = 'scale(1)';
            }, 200);
        }, 300);
    }

    endPresentation() {
        this.isPresenting = false;
        avatarController.setIdleState();
        avatarController.playNodAnimation();
        
        this.updateSpeechText("Obrigado por visitar nosso museu. Esperamos vê-lo novamente em breve!");
    }
}

// Instância global do controlador de fala
const speechController = new SpeechController();

function initializeSpeech() {
    speechController.initialize();
}

// Funções globais para controles
function startPresentation() {
    speechController.startPresentation();
}

function pausePresentation() {
    speechController.pausePresentation();
}

function repeatPresentation() {
    speechController.repeatPresentation();
}