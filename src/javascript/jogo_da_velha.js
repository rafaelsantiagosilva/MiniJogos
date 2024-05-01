"use strict";

const quadrados = document.getElementsByClassName("quadrado");
const textosDosQuadrados = document.querySelectorAll(".quadrado span");
const simbolos = ["X", "O"];
let algumJogadorVenceu = false;

for (let i in quadrados) {
    if (!todosOsQuadradosPreenchidos()) {
        quadrados[i].addEventListener("click", () => {
            if (quadrados[i].classList[quadrados[i].classList.length - 1] != "desabilitado") {
                if (textosDosQuadrados[i].innerText != simbolos[0] && textosDosQuadrados[i].innerText != simbolos[1]) {
                    textosDosQuadrados[i].style.visibility = "visible";
                    textosDosQuadrados[i].innerText = simbolos[0];

                    if (verificarFimDaPartida().fimDaPartida) {
                        formatarResultado(verificarFimDaPartida().vencedor);
                        desabilitarQuadrados();
                    } else {
                        jogadaDoBot();
                        if (verificarFimDaPartida().fimDaPartida) {
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
        if (textosDosQuadrados[0].innerText === simbolos[i]) {
            if (textosDosQuadrados[4].innerText === simbolos[i]) {
                if (textosDosQuadrados[8].innerText === simbolos[i]) {
                    diagonais[0].style.display = "block";
                    jogadores[i].valor++;
                    fimDaPartida = true;
                    algumJogadorVenceu = true;
                }
            }
        } else if (textosDosQuadrados[2].innerText === simbolos[i]) {
            if (textosDosQuadrados[4].innerText === simbolos[i]) {
                if (textosDosQuadrados[6].innerText === simbolos[i]) {
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
            if (textosDosQuadrados[j].innerText === simbolos[i]) {
                if (textosDosQuadrados[j + 3].innerText === simbolos[i]) {
                    if (textosDosQuadrados[j + 6].innerText === simbolos[i]) {
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
            if (textosDosQuadrados[j].innerText === simbolos[i]) {
                if (textosDosQuadrados[j + 1].innerText === simbolos[i]) {
                    if (textosDosQuadrados[j + 2].innerText === simbolos[i]) {
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
    for (let i in textosDosQuadrados) {
        if (textosDosQuadrados[i].innerText == simbolos[0] || textosDosQuadrados[i].innerText == simbolos[1]) {
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
    for (let i in textosDosQuadrados) {
        if (textosDosQuadrados[i].id == idQuadrado) {
            if (textosDosQuadrados[i].innerText == simbolos[0] || textosDosQuadrados[i].innerText == simbolos[1]) {
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


    for (let j in textosDosQuadrados) {
        if (jogadaDoBot == textosDosQuadrados[j].id) {
            textosDosQuadrados[j].innerText = simbolos[1];
            textosDosQuadrados[j].style.visibility = "visible";
            break;
        }
    }
}

function desabilitarQuadrados() {
    for (let i in quadrados) {
        quadrados[i].classList.add("desabilitado");
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