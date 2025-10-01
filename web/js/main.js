// Dados da apresentação
const presentationData = {
    artwork: {
        title: "Retrato da Imperatriz Leopoldina",
        artist: "Jean-Baptiste Debret",
        date: "1817",
        period: "Período Colonial Brasileiro",
        technique: "Óleo sobre tela",
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    presentation: [
        {
            text: "Bem-vindo ao Museu Histórico Nacional. Sou o Professor Almeida e serei seu guia nesta jornada pelo tempo.",
            duration: 5000
        },
        {
            text: "Esta magnífica obra é o 'Retrato da Imperatriz Leopoldina', pintado por Jean-Baptiste Debret em 1817.",
            duration: 6000
        },
        {
            text: "Debret foi um dos integrantes da Missão Artística Francesa que trouxe o neoclassicismo para o Brasil colonial.",
            duration: 6000
        },
        {
            text: "Observe a riqueza de detalhes nas joias e no vestido, demonstrando a opulência da corte portuguesa no Brasil.",
            duration: 7000
        },
        {
            text: "A Imperatriz Leopoldina teve papel crucial no processo de independência do Brasil em 1822.",
            duration: 6000
        },
        {
            text: "Esta pintura é um dos poucos retratos originais que sobreviveram ao tempo, sendo uma relíquia histórica.",
            duration: 6000
        },
        {
            text: "A técnica de óleo sobre tela permite apreciar as nuances de cores mesmo após mais de 200 anos.",
            duration: 6000
        },
        {
            text: "Obrigado por visitar nosso museu. Espero que tenha apreciado esta viagem ao passado imperial do Brasil.",
            duration: 5000
        }
    ]
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeMuseum();
});

function initializeMuseum() {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const simulateQR = document.getElementById('simulateQR');
    
    // Configurar obra de arte
    updateArtworkInfo();
    
    // Event listeners
    startBtn.addEventListener('click', startPresentation);
    pauseBtn.addEventListener('click', pausePresentation);
    repeatBtn.addEventListener('click', repeatPresentation);
    simulateQR.addEventListener('click', simulateQRReading);
    
    // Inicializar sistemas
    initializeAvatar();
    initializeSpeech();
    
    console.log('Museu Virtual inicializado com sucesso!');
}

function updateArtworkInfo() {
    document.getElementById('artworkTitle').textContent = presentationData.artwork.title;
    document.getElementById('artistName').textContent = presentationData.artwork.artist;
    document.getElementById('artworkDate').textContent = presentationData.artwork.date;
    document.getElementById('artworkPeriod').textContent = presentationData.artwork.period;
    document.getElementById('artworkTechnique').textContent = presentationData.artwork.technique;
    document.getElementById('artworkImage').src = presentationData.artwork.image;
    document.getElementById('artworkImage').alt = presentationData.artwork.title;
}

function simulateQRReading() {
    const speechText = document.getElementById('speechText');
    speechText.textContent = "QR Code detectado! Iniciando experiência do museu...";
    
    // Efeito visual
    document.querySelector('.qr-code-placeholder').classList.add('pulse');
    
    setTimeout(() => {
        startPresentation();
        document.querySelector('.qr-code-placeholder').classList.remove('pulse');
    }, 2000);
}

// Controles de apresentação serão implementados nos outros arquivos JS