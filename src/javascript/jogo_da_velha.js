"use strict";

const quadradosDOM = document.getElementsByClassName("quadrado");
const textosDosQuadradosDOM = document.querySelectorAll(".quadrado span");
const btnResetarDOM = document.getElementById("btn_resetar");

btnResetarDOM.addEventListener("click", resetar);

const simbolos = ["X", "O"];
let algumJogadorVenceu = false;

for (let i in quadradosDOM) {
    if (!todosOsQuadradosPreenchidos()) {
        quadradosDOM[i].addEventListener("click", () => {
            if (quadradosDOM[i].classList[quadradosDOM[i].classList.length - 1] != "desabilitado") { // Se a ultima classe não for "desabilitado"...
                if (!simbolos.includes(textosDosQuadradosDOM[i].innerText)) {
                    textosDosQuadradosDOM[i].style.visibility = "visible";
                    textosDosQuadradosDOM[i].innerText = simbolos[0];

                    if (verificarFimDaPartida().fimDaPartida) {
                        btnResetarDOM.classList.remove("none");
                        formatarResultado(verificarFimDaPartida().vencedor);
                        desabilitarQuadrados();
                    } else {
                        jogadaDoBot();
                        if (verificarFimDaPartida().fimDaPartida) {
                            btnResetarDOM.classList.remove("none");
                            formatarResultado(verificarFimDaPartida().vencedor);
                            desabilitarQuadrados();
                        }
                    }
                }
            }
        });
    }
}

function verificarDiagonais() {
    // Função que verifica se alguma diagonal foi feita. Se sim, retorna que houve o fim da partida e qual foi o vencedor

    const diagonais = document.getElementsByClassName("tv-diagonal");
    let vencedor = "";
    let fimDaPartida = false;
    let jogadores = [
        {
            nome: "Usuário",
            valor: 0
        },
        {
            nome: "Computador",
            valor: 0
        }
    ]

    for (let i in jogadores) {
        let diagonal = 0;
        let somador = 0;

        for (let j = 0; j <= 2; j += 2) {
            if (j == 0) {
                diagonal = 0;
                somador = 4;
            } else if (j == 2) {
                diagonal = 1;
                somador = 2;
            }

            if (textosDosQuadradosDOM[j].innerText === simbolos[i]) {
                if (textosDosQuadradosDOM[j + somador].innerText === simbolos[i]) {
                    if (textosDosQuadradosDOM[j + somador + somador].innerText === simbolos[i]) {
                        diagonais[diagonal].style.display = "block";
                        jogadores[i].valor++;
                        fimDaPartida = true;
                        algumJogadorVenceu = true;
                    }
                }
            }
        }

        if (jogadores[i].valor == 1)
            vencedor = jogadores[i].nome;
    }

    return { vencedor, fimDaPartida };
}

function verificarColunas() {
    // Função que verifica se alguma coluna foi feita. Se sim, retorna que houve o fim da partida e qual foi o vencedor


    const colunas = document.getElementsByClassName("tv-vertical");
    let vencedor = "";
    let fimDaPartida = false;
    let jogadores = [
        {
            nome: "Usuário",
            valor: 0
        },
        {
            nome: "Computador",
            valor: 0
        }
    ]

    for (let i in jogadores) {
        for (let j = 0; j < 3; j++) {
            if (textosDosQuadradosDOM[j].innerText === simbolos[i]) {
                if (textosDosQuadradosDOM[j + 3].innerText === simbolos[i]) {
                    if (textosDosQuadradosDOM[j + 6].innerText === simbolos[i]) {
                        colunas[j].style.display = "block";
                        jogadores[i].valor++;
                        fimDaPartida = true;
                        algumJogadorVenceu = true;
                    }
                }
            }
        }

        if (jogadores[i].valor === 1)
            vencedor = jogadores[i].nome;
    }

    return { vencedor, fimDaPartida };
}

function verificarLinhas() {
    // Função que verifica se alguma linha foi feita. Se sim, retorna que houve o fim da partida e qual foi o vencedor


    const linhas = document.getElementsByClassName("tv-horizontal");
    let vencedor = "";
    let fimDaPartida = false;
    let jogadores = [
        {
            nome: "Usuário",
            valor: 0
        },
        {
            nome: "Computador",
            valor: 0
        }
    ]

    for (let i in jogadores) {
        for (let j = 0; j < 9; j += 3) {
            if (textosDosQuadradosDOM[j].innerText === simbolos[i]) {
                if (textosDosQuadradosDOM[j + 1].innerText === simbolos[i]) {
                    if (textosDosQuadradosDOM[j + 2].innerText === simbolos[i]) {
                        linhas[j / 3].style.display = "block";
                        jogadores[i].valor++;
                        fimDaPartida = true;
                        algumJogadorVenceu = true;
                    }
                }
            }
        }

        if (jogadores[i].valor === 1)
            vencedor = jogadores[i].nome;
    }

    return { vencedor, fimDaPartida };
}

function todosOsQuadradosPreenchidos() {
    // Função que verifica e retorna se todos os quadrados estão preenchidos


    let qtdQuadradosPreenchidos = 0;

    for (let i in textosDosQuadradosDOM) {
        if (simbolos.includes(textosDosQuadradosDOM[i].innerText)) {
            qtdQuadradosPreenchidos++;
        }
    }

    if (qtdQuadradosPreenchidos == 9)
        return true;

    return false;
}

function verificarFimDaPartida() {
    // Função que roda todas as funções de verificação:
        // - Verifica se houve vencedor
        // - Verifica se houve empate
        // - Retorna se é o fim da partida e o vencedor/empate

    const funcoesDeVerificacao = [verificarDiagonais, verificarColunas, verificarLinhas];

    for (let i in funcoesDeVerificacao) {
        if (funcoesDeVerificacao[i]().fimDaPartida) {
            return { vencedor: funcoesDeVerificacao[i]().vencedor, fimDaPartida: true };
        }
    }

    if (todosOsQuadradosPreenchidos() && !algumJogadorVenceu) {
        return { vencedor: "Empate", fimDaPartida: true };
    }

    return { vencedor: "", fimDaPartida: false };
}

function quadradoJaClicado(idQuadrado) {
    // Função que verifica, através de seu parâmetro, se o quadrado correspondente já foi clicado

    if (simbolos.includes(textosDosQuadradosDOM[idQuadrado].innerText))
        return true;

    return false;
}

function quadradoAleatorio() {
    // Função que gera um id de um quadrado aleatoriamente

    return Math.round(Math.random() * 8);
}


function verificarMelhorJogadaDoBot() {
    // Função que verifica qual a melhor jogada possível para o bot:
        // - Para vencer
        // - Para impedir que o usuário vença

    for (let i = 0; i < textosDosQuadradosDOM.length; i++) {
        if (simbolos.includes(textosDosQuadradosDOM[i].innerText)) {
            // Verificando diagonais
            if (i == 0 || i == 2 || i == 6 || i == 8) {
                if (simbolos.includes(textosDosQuadradosDOM[4].innerText) &&
                    !quadradoJaClicado(8 - i))
                    return 8 - i;

                else if (simbolos.includes(textosDosQuadradosDOM[(8 - i)].innerText) &&
                    !quadradoJaClicado((4)))
                    return 4;
            }

            // Verificando colunas
            if (i == 0 || i == 1 || i == 2) { // Primeira linha
                if (simbolos.includes(textosDosQuadradosDOM[(i + 3)].innerText) &&
                    !quadradoJaClicado((i + 6)))
                    return i + 6;

                else if (simbolos.includes(textosDosQuadradosDOM[(i + 6)].innerText) &&
                    !quadradoJaClicado((i + 3)))
                    return i + 3;
            }

            if (i == 3 || i == 4 || i == 5) { // Segunda linha
                if (simbolos.includes(textosDosQuadradosDOM[(i - 3)].innerText) &&
                    !quadradoJaClicado((i + 3)))
                    return i + 3;

                else if (simbolos.includes(textosDosQuadradosDOM[(i + 3)].innerText) &&
                    !quadradoJaClicado((i - 3)))
                    return i - 3;
            }

            if (i == 6 || i == 7 || i == 8) { // Terceira linha
                if (simbolos.includes(textosDosQuadradosDOM[(i - 3)].innerText) &&
                    !quadradoJaClicado((i - 6)))
                    return i - 6;

                else if (simbolos.includes(textosDosQuadradosDOM[(i - 6)].innerText) &&
                    !quadradoJaClicado((i - 3)))
                    return i - 3;
            }

            // Verificando linhas
            if (i % 3 == 0) { // Primeira coluna
                if (simbolos.includes(textosDosQuadradosDOM[(i + 1)].innerText) &&
                    !quadradoJaClicado((i + 2)))
                    return i + 2;

                else if (simbolos.includes(textosDosQuadradosDOM[(i + 2)].innerText) &&
                    !quadradoJaClicado((i + 1)))
                    return i + 1;
            }

            if ((i - 1) % 3 == 0) { // Segunda coluna
                if (simbolos.includes(textosDosQuadradosDOM[(i + 1)].innerText) &&
                    !quadradoJaClicado((i - 1)))
                    return i - 1;

                else if (simbolos.includes(textosDosQuadradosDOM[(i - 1)].innerText) &&
                    !quadradoJaClicado((i + 1)))
                    return i + 1;
            }

            if ((i - 2) % 3 == 0) { // Terceira coluna
                if (simbolos.includes(textosDosQuadradosDOM[(i - 1)].innerText) &&
                    !quadradoJaClicado((i - 2)))
                    return i - 2;

                else if (simbolos.includes(textosDosQuadradosDOM[(i - 2)].innerText) &&
                    !quadradoJaClicado((i - 1)))
                    return i - 1;
            }
        }
    }

    return -1;
}

function jogadaDoBot() {
    // Função que gera a jogada do bot

    let jogadaDoBot = verificarMelhorJogadaDoBot();

    if (jogadaDoBot == -1) {
        do {
            jogadaDoBot = quadradoAleatorio();
        } while (quadradoJaClicado(jogadaDoBot));
    }

    textosDosQuadradosDOM[jogadaDoBot].innerText = simbolos[1];
    textosDosQuadradosDOM[jogadaDoBot].style.visibility = "visible";
}

function desabilitarQuadrados() {
    // Função que faz com que o quadrados deixem de ser clicaveis

    for (let i in quadradosDOM) {
        quadradosDOM[i].classList.add("desabilitado");
    }
}

function formatarResultado(vencedor) {
    // Função que formata o resultado do fim da partida

    const tituloDOM = document.getElementById("game__titulo");

    switch (vencedor) {
        case "Usuário":
            tituloDOM.innerText = "Você venceu! Parabéns! Vamos de novo?";
            break;
        case "Computador":
            tituloDOM.innerText = "Eu venci! Quer tentar uma revanche?";
            break;
        case "Empate":
            tituloDOM.innerText = "Ahhh, deu empate! Vamos de novo?";
            break;
    }
}

async function esvaziarQuadrados() {
    // Função que esvazia os quadrados

    for (let i in textosDosQuadradosDOM) {
        textosDosQuadradosDOM[i].innerText = "-";
        textosDosQuadradosDOM[i].style.visibility = "hidden";
    }
}

async function habilitarQuadrados() {
    // Função que faz com que os quadrados voltem a ser clicáveis

    for (let i in quadradosDOM) {
        quadradosDOM[i].classList.remove("desabilitado");
    }
}

async function sumirComTracosVitoriosos() {
    // Função que deixa os traços de vitória invisíveis novamente

    const tracosVitoriososDOM = document.getElementsByClassName("traco_vitorioso");

    for (let i in tracosVitoriososDOM) {
        if (tracosVitoriososDOM[i].style.display != "none")
            tracosVitoriososDOM[i].style.display = "none";
        else
            continue;
    }
}

function resetar() {
    // Função que reseta para conseguir jogar novamente

    esvaziarQuadrados();
    sumirComTracosVitoriosos();
    habilitarQuadrados();
    btnResetarDOM.classList.add("none");
    document.getElementById("game__titulo").innerText = "Clique no jogo para jogar!";
}