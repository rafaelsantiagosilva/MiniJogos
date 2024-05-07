"use strict";

class Corpo {
    tamanho = 20;
    constructor(x = 100, y = 100, cor = "#00ff00") {
        this.x = x;
        this.y = y;
        this.cor = cor;
    }
}

const canvas = document.getElementById("jogo");
const context = canvas.getContext("2d");
const COR_DO_CANVAS = "#195fcc";
const cobra = [new Corpo()];

let direcao = direcaoAleatoria();
let comecou;
let maca = gerarMaca();
let pontuacao = 0;

document.getElementById("btnComecar").addEventListener("click", jogo);
document.addEventListener("keydown", mudarDirecao);

function jogo() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    moverCobra();
    desenharCobra();
    desenharMaca();

    setTimeout(() => {
        jogo();
    }, 300);
}

function direcaoAleatoria() {
    let n = Math.round(Math.random() * 3);

    switch (n) {
        case 0:
            return "up";
        case 1:
            return "left";
        case 2:
            return "right";
        case 3:
            return "down";
    }
}

function mudarDirecao(event) {
    let key = event.key;
    direcao = key.substring(5, key.length).toLowerCase();
}

function desenharCobra() {
    context.fillStyle = cobra[0].cor;

    cobra.forEach((corpo) =>
        context.fillRect(corpo.x, corpo.y, corpo.tamanho, corpo.tamanho));
}

function perder() {
    direcao = undefined;
    document.removeEventListener("keydown", mudarDirecao);
    alert("Perdeu!");
}

function verificarColisao() {
    const cabecaDaCobra = cobra[0];
    const indiceDoPescoco = cobra.length - 1;

    if (cabecaDaCobra.x < cabecaDaCobra.tamanho - 5 ||
        cabecaDaCobra.y < cabecaDaCobra.tamanho - 5 ||
        cabecaDaCobra.x > canvas.width - cabecaDaCobra.tamanho ||
        cabecaDaCobra.y > canvas.width - cabecaDaCobra.tamanho) {
        perder();
    }
}

function moverCobra() {
    if (!direcao) return;

    const cabecaDaCobra = cobra[cobra.length - 1];
    verificarColisao();

    if (cabecaDaCobra.x == maca.x && cabecaDaCobra.y == maca.y) {
        maca = gerarMaca();
        desenharMaca();
        pontuacao++;
        cobra.push(new Corpo(cobra[cobra.length - 1].x, cobra[cobra.length - 1].y));
    }

    if (direcao == "up")
        cobra.push(new Corpo(cabecaDaCobra.x, cabecaDaCobra.y - cabecaDaCobra.tamanho));
    else if (direcao == "left")
        cobra.push(new Corpo(cabecaDaCobra.x - cabecaDaCobra.tamanho, cabecaDaCobra.y));
    else if (direcao == "right")
        cobra.push(new Corpo(cabecaDaCobra.x + cabecaDaCobra.tamanho, cabecaDaCobra.y));
    else if (direcao == "down")
        cobra.push(new Corpo(cabecaDaCobra.x, cabecaDaCobra.y + cabecaDaCobra.tamanho));



    cobra.shift();
}

function gerarPontoDaMaca(max, min) {
    let ponto = Math.round(Math.random() * max - min);
    do {
        ponto = Math.round(ponto / cobra[0].tamanho) * cobra[0].tamanho;
    } while (ponto < 0 || ponto > canvas.width);

    return ponto;
}

function gerarMaca() {
    return new Corpo(
        gerarPontoDaMaca(canvas.width - cobra[0].tamanho, cobra[0].tamanho),
        gerarPontoDaMaca(canvas.height - cobra[0].tamanho, cobra[0].tamanho),
        "#ff0000"
    );
}

function desenharMaca() {
    context.fillStyle = maca.cor;
    context.fillRect(maca.x, maca.y, maca.tamanho, maca.tamanho);
}

desenharCobra();
desenharMaca();