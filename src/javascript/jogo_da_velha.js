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
            if (quadradosDOM[i].classList[quadradosDOM[i].classList.length - 1] != "desabilitado") {
                if (textosDosQuadradosDOM[i].innerText != simbolos[0] && textosDosQuadradosDOM[i].innerText != simbolos[1]) {
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
        if (textosDosQuadradosDOM[0].innerText === simbolos[i]) {
            if (textosDosQuadradosDOM[4].innerText === simbolos[i]) {
                if (textosDosQuadradosDOM[8].innerText === simbolos[i]) {
                    diagonais[0].style.display = "block";
                    jogadores[i].valor++;
                    fimDaPartida = true;
                    algumJogadorVenceu = true;
                }
            }
        } else if (textosDosQuadradosDOM[2].innerText === simbolos[i]) {
            if (textosDosQuadradosDOM[4].innerText === simbolos[i]) {
                if (textosDosQuadradosDOM[6].innerText === simbolos[i]) {
                    diagonais[1].style.display = "block";
                    jogadores[i].valor++;
                    fimDaPartida = true;
                    algumJogadorVenceu = true;
                }
            }
        }

        if (jogadores[i].valor == 1)
            vencedor = jogadores[i].nome;
    }

    return { vencedor, fimDaPartida };
}

function verificarColunas() {
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
    let qtdQuadradosPreenchidos = 0;
    for (let i in textosDosQuadradosDOM) {
        if (textosDosQuadradosDOM[i].innerText == simbolos[0] || textosDosQuadradosDOM[i].innerText == simbolos[1]) {
            qtdQuadradosPreenchidos++;
        }
    }

    if (qtdQuadradosPreenchidos == 9)
        return true;

    return false;
}

function verificarFimDaPartida() {
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
    for (let i in textosDosQuadradosDOM) {
        if (textosDosQuadradosDOM[i].id == idQuadrado) {
            if (textosDosQuadradosDOM[i].innerText == simbolos[0] || textosDosQuadradosDOM[i].innerText == simbolos[1]) {
                return true;
            }
        }
    }

    return false;
}

function jogadaDoBot() {
    let jogadaDoBot = 0;

    do {
        jogadaDoBot = Math.round(Math.random() * 8);
    } while (quadradoJaClicado(jogadaDoBot));


    for (let j in textosDosQuadradosDOM) {
        if (jogadaDoBot == textosDosQuadradosDOM[j].id) {
            textosDosQuadradosDOM[j].innerText = simbolos[1];
            textosDosQuadradosDOM[j].style.visibility = "visible";
            break;
        }
    }
}

function desabilitarQuadrados() {
    for (let i in quadradosDOM) {
        quadradosDOM[i].classList.add("desabilitado");
    }
}

function formatarResultado(vencedor) {
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
    for (let i in textosDosQuadradosDOM) {
        textosDosQuadradosDOM[i].innerText = "-";
        textosDosQuadradosDOM[i].style.visibility = "hidden";
    }
}

async function habilitarQuadrados() {
    for (let i in quadradosDOM) {
        quadradosDOM[i].classList.remove("desabilitado");
    }
}

async function sumirComTracosVitoriosos() {
    const tracosVitoriososDOM = document.getElementsByClassName("traco_vitorioso");

    for (let i in tracosVitoriososDOM) {
        if (tracosVitoriososDOM[i].style.display != "none")
            tracosVitoriososDOM[i].style.display = "none";
        else
            continue;
    }
}

function resetar() {
    esvaziarQuadrados();
    sumirComTracosVitoriosos();
    habilitarQuadrados();
    btnResetarDOM.classList.add("none");
    document.getElementById("game__titulo").innerText = "Clique no jogo para jogar!";
}