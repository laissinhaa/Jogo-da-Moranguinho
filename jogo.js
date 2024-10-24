const moranguinho = document.querySelector('.moranguinho');
const morango = document.querySelector('.morango');
const gameOverScreen = document.querySelector('.game-over'); // Tela de Game Over
const scoreDisplay = document.getElementById('score'); // Exibição da pontuação
const jumpCountDisplay = document.getElementById('jumpCount'); // Exibição do contador de pulos
const restartButton = document.getElementById('restart-button'); // Botão de reinício

let score = 0; // Pontuação inicial
let jumpCount = 0; // Contador de pulos inicial
let isJumping = false; // Prevenir duplo pulo

// Função de pulo
const jump = () => {
    if (isJumping) return; // Ignora se já estiver pulando
    isJumping = true;

    moranguinho.classList.add('jump');
    jumpCount++; // Incrementa o contador de pulos
    jumpCountDisplay.textContent = jumpCount; // Atualiza a exibição dos pulos

    setTimeout(() => {
        moranguinho.classList.remove('jump');
        isJumping = false; // Libera para o próximo pulo
    }, 500);
};

// Atualiza a pontuação a cada segundo
const updateScore = setInterval(() => {
    score++;
    scoreDisplay.textContent = score; 
}, 1000);

const loop = setInterval(() => {
    const morangoPosition = morango.offsetLeft;
    const moranguinhoPosition = +window.getComputedStyle(moranguinho).bottom.replace('px', '');


    if (morangoPosition <= 125 && morangoPosition > 0 && moranguinhoPosition < 60) {
        morango.style.animation = 'none';
        morango.style.left = `${morangoPosition}px`;

        moranguinho.style.display = 'none'; 
        gameOverScreen.style.display = 'block'; 

        clearInterval(loop); 
        clearInterval(updateScore); 
    }
}, 10);

restartButton.addEventListener('click', () => {
    location.reload(); 
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Impede que a página desça
        jump();
    }
});
