//variável para selecionar o elemento onde será escrito o vencedor
const resultado = document.getElementById("winner");

//variável para parar o jogo quando tiver um vencedor
let jogoRodando = true;

//variável para escrever o turno de quem
const turno = document.getElementById("vezDeQuem");

//variável para saber o jogador
let jogador = "O";

// jogadas
let jogadas = ["", "", "", "", "", "", "", "", ""];

//variável para saber avaliar o resultado
const cartilha = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//mensagens 
const ganhador = () => `Parabéns! ${jogador}, você ganhou!`;
const mensagem = () => `O jogo acabou`;
const vez = () => `É a vez de ${jogador}`;

turno.innerHTML = vez();

function marcarCelulaJogada(celulaMarcada, indexCelulaMarcada) {
    jogadas[indexCelulaMarcada] = jogador;
    celulaMarcada.innerHTML = jogador;
    console.log(jogadas);
}

function determinarOTurno() {
    jogador = jogador === "O" ? "X" : "O";
    turno.innerHTML = vez();

}

function determinarResultado() {
    let partidaTerminada = false;
    for (let i=0; i<=7; i++) {
        const condicaoDeVitoria = cartilha[i];
        let a = jogadas[condicaoDeVitoria[0]];
        let b = jogadas[condicaoDeVitoria[1]];
        let c = jogadas[condicaoDeVitoria[3]];
        if ( a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            partidaTerminada = true;
            break
        }
    }

    if (partidaTerminada) {
        resultado.innerHTML = ganhador();
        jogoRodando = false;
        return;
    }

    let faltamJogadas = !jogadas.includes("");
    if (faltamJogadas) {
        turno.innerHTML = mensagem();
        jogoRodando = false;
        return;
    }
    determinarOTurno();
}

function clickCelula(clickedCellEvent) {
    const celulaMarcada = clickedCellEvent.target;
    const indexCelulaMarcada = parseInt(celulaMarcada.getAttribute('value'));
    
    //ver se a caixa já foi marcada
    if (jogadas[indexCelulaMarcada] !== "" || !jogoRodando) {
        return
    }
    
    marcarCelulaJogada(celulaMarcada, indexCelulaMarcada);
    determinarResultado();

}

function reiniciarJogo() {
    jogoRodando = true;
    jogador = "O";
    jogadas = ["", "", "", "", "", "", "", "", ""];
    turno.innerHTML = vez();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}

//event listeners
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', clickCelula));
document.querySelector('button[type="button"]').addEventListener('click', reiniciarJogo);