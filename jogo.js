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
    scoreDisplay.textContent = score; // Exibe a pontuação atualizada
}, 1000);

// Verifica colisões e para o jogo em caso de impacto
const loop = setInterval(() => {
    const morangoPosition = morango.offsetLeft;
    const moranguinhoPosition = +window.getComputedStyle(moranguinho).bottom.replace('px', '');

    // Verifica se houve colisão
    if (morangoPosition <= 125 && morangoPosition > 0 && moranguinhoPosition < 60) {
        morango.style.animation = 'none';
        morango.style.left = `${morangoPosition}px`;

        moranguinho.style.display = 'none'; // Oculta a Moranguinho
        gameOverScreen.style.display = 'block'; // Exibe a tela de Game Over

        clearInterval(loop); // Para o loop de colisão
        clearInterval(updateScore); // Para a contagem de pontos
    }
}, 10);

// Reinicia o jogo ao clicar no botão
restartButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
});

// Adiciona evento de pulo ao pressionar uma tecla
document.addEventListener('keydown', jump);
