"use strict";

class Corpo {
    tamanho = 20;
    constructor(x = 200, y = 200, cor = "#efefef") {
        this.x = x;
        this.y = y;
        this.cor = cor;
    }
}

const canvas = document.getElementById("jogo");
const context = canvas.getContext("2d");
const COR_DO_CANVAS = "#195fcc";
const cobra = [new Corpo()];

let direcao;
let comecou;

document.getElementById("btnComecar").addEventListener("click", comecar);

function draw() {
    context.fillStyle = COR_DO_CANVAS;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let maca = gerarMaca();

    context.fillStyle = maca.cor;
    context.fillRect(maca.x, maca.y, maca.tamanho, maca.tamanho);

    for (let i = 0; i < cobra.length; i++) {
        context.fillStyle = cobra[i].cor;
        context.fillRect(
            cobra[i].x,
            cobra[i].y - i * cobra[i].tamanho,
            cobra[i].tamanho,
            cobra[i].tamanho
        );
    }
}

document.querySelector("body").addEventListener("load", draw());
document.addEventListener("keydown", ({ key }) => {
    direcao = key.substring(5, key.length).toLowerCase();
});

function comecar() {
    setInterval(() => {
        let velocidade = cobra[0].tamanho;

        if (direcao == "up" || direcao == "left") velocidade *= -1;

        if (direcao == "up" || direcao == "down") cobra[0].y += velocidade;
        else cobra[0].x += velocidade;

        context.fillStyle = COR_DO_CANVAS;
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cobra.length; i++) {
            if (i != 0) {
                cobra[i].x = cobra[i - 1].x;
                cobra[i].y = cobra[i - 1].y;
            }

            context.fillStyle = cobra[i].cor;
            context.fillRect(
                cobra[i].x - i * cobra[i].tamanho,
                cobra[i].y,
                cobra[i].tamanho,
                cobra[i].tamanho
            );
        }
    }, 300);
}

function gerarPontoDaMaca(max, min) {
    return Math.round(Math.random() * max - min);
}

function gerarMaca() {
    return new Corpo(
        gerarPontoDaMaca(canvas.width - cobra[0].tamanho, cobra[0].tamanho),
        gerarPontoDaMaca(canvas.height - cobra[0].tamanho, cobra[0].tamanho),
        "#ff0000"
    );
}
