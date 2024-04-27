"use strict";

class Mao {
     constructor() {
          this.caminhoPadrao = "../assets/icons/impar_ou_par/";
          this.zero = this.caminhoPadrao + "zero.png";
          this.um = this.caminhoPadrao + "um.png";
          this.dois = this.caminhoPadrao + "dois.png";
          this.tres = this.caminhoPadrao + "tres.png";
          this.quatro = this.caminhoPadrao + "quatro.png";
          this.cinco = this.caminhoPadrao + "cinco.png";
     }
}

class Jogador {
     constructor(jogador) {
          this.posicionamento = "";
          this.valor = 0;
          this.img = document.getElementById(`mao_do_${jogador}`);
     }
}

function numeroExtenso(numero) {
     switch (numero) {
          case 0:
               return "zero";
          case 1:
               return "um";
          case 2:
               return "dois";
          case 3:
               return "tres";
          case 4:
               return "quatro";
          case 5:
               return "cinco";
     }
}

function imparOuPar() {
     const input_radio_impar = document.getElementsByName("rd_ip")[0];
     const resultadoDOM = document.getElementById("resultado");
     const tituloGameDOM = document.getElementById("game__titulo");

     const imagensMao = new Mao();
     const usuario = new Jogador("usuario");
     const bot = new Jogador("bot");

     usuario.posicionamento = input_radio_impar.checked ? "impar" : "par";
     bot.posicionamento = usuario.posicionamento === "impar" ? "par" : "impar";

     usuario.valor = Number(document.getElementById("inp_numero").value);
     bot.valor = Math.round(Math.random() * 5);

     let resultado = usuario.valor + bot.valor;
     resultadoDOM.innerText = resultado;

     if (usuario.posicionamento === "par" && resultado % 2 === 0) {
          tituloGameDOM.innerText = "Você venceu! Parabéns";
     } else if (usuario.posicionamento === "impar" && resultado % 2 !== 0) {
          tituloGameDOM.innerText = "Você venceu! Parabéns!";
     } else {
          tituloGameDOM.innerText = "Eu venci! Tente novamente!";
     }

     for (let i in imagensMao) {
          if (i == "caminhoPadrao")
               continue;

          if (i == numeroExtenso(usuario.valor)) {
               usuario.img.setAttribute("src", imagensMao[i]);
               usuario.img.classList.add("mao_do_usuario_animada");
          }

          if (i == numeroExtenso(bot.valor)) {
               bot.img.setAttribute("src", imagensMao[i]);
               bot.img.classList.add("mao_do_bot_animada");
          }
     }

}

function checarInput() {
     const input = document.getElementById("inp_numero");

     if (input.value > 5) {
          input.value = 5;
     } else if (input.value < 0) {
          input.value = 0;
     } else {
          input.value = Math.floor(input.value);
     }
}

document.getElementById("inp_numero").addEventListener("change", checarInput);
document.getElementById("btn_jogar").addEventListener("click", imparOuPar);