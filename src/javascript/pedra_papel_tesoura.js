"use strict";

const opcoes = document.getElementsByClassName("opcao");
const VITORIA = 0;
const DERROTA = 1;
const EMPATE = 2;

atualizarVitorias(localStorage.getItem("vitoriasPPT") ? Number(localStorage.getItem("vitoriasPPT")) : 0);
atualizarDerrotas(localStorage.getItem("derrotasPPT") ? Number(localStorage.getItem("derrotasPPT")) : 0);
atualizarEmpates(localStorage.getItem("empatesPPT") ? Number(localStorage.getItem("empatesPPT")) : 0);

document.getElementById("btn_limpar").addEventListener("click", limparPlacar);
for (let i in opcoes) {
     opcoes[i].addEventListener("click", () => {
          let opcao = opcoes[i];

          for (let j in opcoes) {
               if (opcoes[j] != opcao) {
                    opcoes[j].style.boxShadow = "3px 3px 9px 3px rgba(0, 0, 0, 0.336)";
                    opcoes[j].style.border = "none";
               } else {
                    opcoes[i].style.boxShadow = "none";
                    opcoes[i].style.border = "6px solid #1850b9";
                    pedraPapelTesoura(opcoes[i].id);
               }
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

     if (jogadaDoUsuario == jogadaDoBot) {
          formatarResultado(EMPATE, jogadaDoUsuario, jogadaDoBot);
          atualizarEmpates(localStorage.getItem("empatesPPT") ? Number(localStorage.getItem("empatesPPT")) + 1 : 0);
     } else if (
          jogadaDoUsuario == "pedra" && jogadaDoBot == "tesoura" ||
          jogadaDoUsuario == "papel" && jogadaDoBot == "pedra" ||
          jogadaDoUsuario == "tesoura" && jogadaDoBot == "papel"
     ) {
          formatarResultado(VITORIA, jogadaDoUsuario, jogadaDoBot);
          atualizarVitorias(localStorage.getItem("vitoriasPPT") ? Number(localStorage.getItem("vitoriasPPT")) + 1 : 0);
     }
     else {
          formatarResultado(DERROTA, jogadaDoUsuario, jogadaDoBot);
          atualizarDerrotas(localStorage.getItem("derrotasPPT") ? Number(localStorage.getItem("derrotasPPT")) + 1 : 0);
     }
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
     const maoDoUsuarioDOM = document.getElementById("mao_do_usuario");
     const maoDoBotDOM = document.getElementById("mao_do_bot");

     switch (resultado) {
          case VITORIA:
               tituloDoGameDOM.innerText = "Você venceu! Parabéns!";
               resultadoDOM.innerText = `${jogadaDoUsuario.toUpperCase()} vence de ${jogadaDoBot.toUpperCase()}`;
               maoDoBotDOM.classList.remove("mao_animada");
               maoDoUsuarioDOM.classList.add("mao_animada");
               break;
          case DERROTA:
               tituloDoGameDOM.innerText = "Eu venci! Tente novamente!";
               resultadoDOM.innerText = `${jogadaDoUsuario.toUpperCase()} perde para ${jogadaDoBot.toUpperCase()}`;
               maoDoUsuarioDOM.classList.remove("mao_animada");
               maoDoBotDOM.classList.add("mao_animada");
               break;
          case EMPATE:
               tituloDoGameDOM.innerText = "Empate! Vamos jogar novamente!";
               resultadoDOM.innerText = `${jogadaDoUsuario.toUpperCase()} empata com ${jogadaDoBot.toUpperCase()}`;
               maoDoUsuarioDOM.classList.remove("mao_animada");
               maoDoBotDOM.classList.remove("mao_animada");
               break;
          default:
               console.error("ERRO: Verifique o código e veja se somente os valores da variáveis 'VITORIA', 'DERROTA' ou 'EMPATE' estão sendo passados.");
               break;
     }
}

function atualizarValorLocalStorage(nomeValor, novoValor) {
     document.getElementById(`qtd_${nomeValor}`).innerText = novoValor;
     localStorage.setItem(`${nomeValor}PPT`, novoValor);
}

function atualizarVitorias(novoValor) {
     atualizarValorLocalStorage("vitorias", novoValor);
}

function atualizarDerrotas(novoValor) {
     atualizarValorLocalStorage("derrotas", novoValor);
}

function atualizarEmpates(novoValor) {
     atualizarValorLocalStorage("empates", novoValor);
}

function limparPlacar() {
     atualizarVitorias(0);
     atualizarDerrotas(0);
     atualizarEmpates(0);
}