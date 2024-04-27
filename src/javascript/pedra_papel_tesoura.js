"use strict";

const opcoes = document.getElementsByClassName("opcao");

for (let i in opcoes) {
     opcoes[i].addEventListener("click", () => {
          let opcao = opcoes[i];

          for (let j in opcoes) {
               if (opcoes[j] != opcao) {
                    opcoes[j].style.boxShadow = "3px 3px 9px 3px rgba(0, 0, 0, 0.336)";
                    opcoes[j].style.border = "none";
               }

               opcoes[i].style.boxShadow = "none";
               opcoes[i].style.border = "6px solid #1850b9";
               pedraPapelTesoura(opcoes[i].id);
          }
     });
}

function pedraPapelTesoura(jogadaDoUsuario) {
     const CAMINHO_DAS_IMAGENS = "../assets/icons/pedra_papel_tesoura/"
     const imgUsuario = document.getElementById("mao_do_usuario");
     const imgBot = document.getElementById("mao_do_bot");
     const jogadaDoBot = gerarJogadaDoBot();

     imgUsuario.setAttribute("src", `${CAMINHO_DAS_IMAGENS}${jogadaDoUsuario}.png`);
     imgBot.setAttribute("src", `${CAMINHO_DAS_IMAGENS}${jogadaDoBot}.png`);

     const VITORIA = 0;
     const DERROTA = 1;
     const EMPATE = 2;

     if (jogadaDoUsuario == jogadaDoBot)
          formatarResultado(EMPATE, jogadaDoUsuario, jogadaDoBot);
     else if (
          jogadaDoUsuario == "pedra" && jogadaDoBot == "tesoura" ||
          jogadaDoUsuario == "papel" && jogadaDoBot == "pedra" ||
          jogadaDoUsuario == "tesoura" && jogadaDoBot == "papel"
     )
          formatarResultado(VITORIA, jogadaDoUsuario, jogadaDoBot);
     else
          formatarResultado(DERROTA, jogadaDoUsuario, jogadaDoBot);
}

function gerarJogadaDoBot() {
     let jogadaDoBot = Math.round(Math.random() * 2 + 1);

     switch (jogadaDoBot) {
          case 1:
               return "pedra";
          case 2:
               return "papel";
          case 3:
               return "tesoura";
     }
}

function formatarResultado(resultado, jogadaDoUsuario, jogadaDoBot) {
     const tituloDoGameDOM = document.getElementById("game__titulo");
     const resultadoDOM = document.getElementById("resultado");

     switch (resultado) {
          case 0:
               tituloDoGameDOM.innerText = "Você venceu! Parabéns!";
               resultadoDOM.innerText = `${jogadaDoUsuario.toUpperCase()} vence de ${jogadaDoBot.toUpperCase()}`;
               break;
          case 1:
               tituloDoGameDOM.innerText = "Eu venci! Tente novamente!";
               resultadoDOM.innerText = `${jogadaDoUsuario.toUpperCase()} perde para ${jogadaDoBot.toUpperCase()}`;
               break;
          case 2:
               tituloDoGameDOM.innerText = "Empate! Vamos jogar novamente!";
               resultadoDOM.innerText = `${jogadaDoUsuario.toUpperCase()} empata com ${jogadaDoBot.toUpperCase()}`;
               break;
     }
}