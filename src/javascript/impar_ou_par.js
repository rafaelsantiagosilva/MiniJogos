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
          default:
               console.error("ERRO: Por favor, verifique se o valor passado está presente na seguinte lista:\n1, 2, 3, 4, 5");
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

     if (usuario.posicionamento === "par" && resultado % 2 === 0 ||
          usuario.posicionamento === "impar" && resultado % 2 !== 0
     ) {
          tituloGameDOM.innerText = "Você venceu! Parabéns";
          atualizarVitorias(localStorage.getItem("vitorias") ? Number(localStorage.getItem("vitoriasIP")) + 1 : 0);
     } else {
          tituloGameDOM.innerText = "Eu venci! Tente novamente!";
          atualizarDerrotas(localStorage.getItem("derrotas") ? Number(localStorage.getItem("derrotasIP")) + 1 : 0);
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

function atualizarVitorias(novoValor) {
     document.getElementById("qtd_vitorias").innerText = novoValor;
     localStorage.setItem("vitoriasIP", novoValor);
}

function atualizarDerrotas(novoValor) {
     document.getElementById("qtd_derrotas").innerText = novoValor;
     localStorage.setItem("derrotasIP", novoValor);
}

function limparPlacar() {
     document.getElementById("qtd_vitorias").innerText = 0;
     localStorage.setItem("vitoriasIP", 0);
     document.getElementById("qtd_derrotas").innerText = 0;
     localStorage.setItem("derrotasIP", 0);
}

atualizarVitorias(localStorage.getItem("vitoriasIP") ? Number(localStorage.getItem("vitoriasIP")) : 0);
atualizarDerrotas(localStorage.getItem("derrotasIP") ? Number(localStorage.getItem("derrotasIP")) : 0);
document.getElementById("inp_numero").addEventListener("change", checarInput);
document.getElementById("btn_jogar").addEventListener("click", imparOuPar);
document.getElementById("btn_limpar").addEventListener("click", limparPlacar);