"use strict";

gerarPokemon();

const palavraDOM = document.getElementById("palavra");
const partesDoCorpoDOM = document.getElementsByClassName("parte-do-corpo");

const tituloDOM = document.getElementById("game__titulo");

const btnChuteDOM = document.getElementById("btn-chutar");
btnChuteDOM.addEventListener("click", chutar);

const inputChuteDOM = document.getElementById("inpChute");
inputChuteDOM.addEventListener("change", verificarInput)

const btnResetarDOM = document.getElementById("btn_resetar");
btnResetarDOM.addEventListener("click", jogarNovamente);


document.getElementById("btn_limpar").addEventListener("click", limparPlacar);

atualizarVitorias(localStorage.getItem("vitoriasJFP") ? Number(localStorage.getItem("vitoriasJFP")) : 0);
atualizarDerrotas(localStorage.getItem("derrotasJFP") ? Number(localStorage.getItem("derrotasJFP")) : 0);

let pokemon;
let palavraResposta = "";
let dicas = [];
let erros = 0;

const dicasTabelaDOM = document.getElementsByClassName("dica");

function gerarIdAleatorioPokemon(max, min) {
     return Math.round(Math.random() * (max - min) + min);
}

async function gerarPokemon() {
     const POKEAPI_URL = `https://pokeapi.co/api/v2/pokemon/${gerarIdAleatorioPokemon(1025, 1)}`;
     let error = false;

     do {
          error = false;
          await fetch(POKEAPI_URL)
               .then((res) => res.json())
               .then((res) => {
                    pokemon = res;

                    if (pegarGeracao(Number(pokemon.id)) == "ERROR")
                         error = true;

                    if (pokemon.name.includes("-"))
                         error = true;
               })
               .catch((err) => {
                    console.error("Pokemon não encontrado!");
               });
     } while (error);

     for (let i = 0; i < pokemon.name.length; i++) {
          palavraDOM.innerText += "_";
          palavraResposta += pokemon.name[i];
     }

     palavraResposta = palavraResposta.toUpperCase();
     dicas[0] = pokemon.id;
     dicas[1] = pokemon.types[0].type.name + (pokemon.types[1] ? `, ${pokemon.types[1].type.name}` : "");
     dicas[2] = pegarGeracao(Number(pokemon.id));

     for (let i = 0; i < dicasTabelaDOM.length; i++)
          dicasTabelaDOM.innerText = "-----------";
}

function pegarGeracao(pokemonId) {
     let gen = "Gen ";

     if (pokemonId >= 1 && pokemonId <= 151)
          gen += "I";
     else if (pokemonId >= 152 && pokemonId <= 251)
          gen += "II";
     else if (pokemonId >= 252 && pokemonId <= 386)
          gen += "III";
     else if (pokemonId >= 387 && pokemonId <= 493)
          gen += "IV";
     else if (pokemonId >= 494 && pokemonId <= 649)
          gen += "V";
     else if (pokemonId >= 650 && pokemonId <= 721)
          gen += "VI";
     else if (pokemonId >= 722 && pokemonId <= 809)
          gen += "VII";
     else if (pokemonId >= 810 && pokemonId <= 900)
          gen += "VIII";
     else if (pokemonId >= 901 && pokemonId <= 1003)
          gen += "IX";
     else
          gen = "ERRO";

     return gen;
}

function verificarInput(event) {
     const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

     event.target.value = event.target.value.toUpperCase();

     if (!LETRAS.includes(event.target.value)) {
          event.target.value = "";
          alert("Digite somente letras!");
     }
}

function quantidadeDessaLetraNaPalavra(letra, palavra) {
     let quantidade = 0;

     for (let i = 0; i < palavra.length; i++)
          if (palavra[i] == letra)
               quantidade++;

     return quantidade
}

function chutar() {
     const letrasChutadasDOM = document.getElementById("letras_chutadas");
     const LETRA = inputChuteDOM.value;

     if (LETRA == "") {
          alert("Digite uma letra!");
          return;
     }

     if (letrasChutadasDOM.innerText.includes(LETRA)) {
          alert(`'${LETRA}' já foi chutada!`);
          return;
     }

     letrasChutadasDOM.innerText += inputChuteDOM.value;

     if (palavraResposta.includes(LETRA)) {
          let qtdDaLetraNaPalavra = quantidadeDessaLetraNaPalavra(LETRA, palavraResposta);
          let letrasConfirmadas = 0, i = 0;
          let palavraTemp = palavraDOM.innerText.split('');

          while (letrasConfirmadas != qtdDaLetraNaPalavra && i < palavraResposta.length) {
               if (LETRA == palavraResposta[i]) {
                    palavraTemp[i] = LETRA;
                    letrasConfirmadas++;
               }

               i++;
          }

          palavraTemp = palavraTemp.join('');
          palavraDOM.innerText = palavraTemp;

     } else {
          partesDoCorpoDOM[erros].style.visibility = "visible";
          erros++;

          if (erros == 2)
               dicasTabelaDOM[0].innerText = "ID: " + dicas[0];
          else if (erros == 3)
               dicasTabelaDOM[1].innerText = "Tipos: " + dicas[1];
          else if (erros == 4)
               dicasTabelaDOM[2].innerText = dicas[2];
     }

     if (palavraDOM.innerText == palavraResposta) {
          tituloDOM.innerText = "Parabéns! Você acertou!";
          dicasTabelaDOM[0].innerText = "Tipos: " + dicas[0];
          dicasTabelaDOM[1].innerText = dicas[1];
          dicasTabelaDOM[2].innerText = "ID: " + dicas[2];
          atualizarVitorias(localStorage.getItem("vitoriasJFP") ? Number(localStorage.getItem("vitoriasJFP")) + 1 : 0);
          btnChuteDOM.style.display = "none";
          btnResetarDOM.style.display = "block";
          return;
     } else if (erros == 6) {
          tituloDOM.innerText = "Que pena! Você perdeu! A resposta era: " + palavraResposta;
          atualizarDerrotas(localStorage.getItem("derrotasJFP") ? Number(localStorage.getItem("derrotasJFP")) + 1 : 0);
          btnChuteDOM.style.display = "none";
          btnResetarDOM.style.display = "block";
          return;
     }
}

function atualizarValorLocalStorage(nomeValor, novoValor) {
     document.getElementById(`qtd_${nomeValor}`).innerText = novoValor;
     localStorage.setItem(`${nomeValor}JFP`, novoValor);
}

function atualizarVitorias(novoValor) {
     atualizarValorLocalStorage("vitorias", novoValor);
}

function atualizarDerrotas(novoValor) {
     atualizarValorLocalStorage("derrotas", novoValor);
}

function limparPlacar() {
     atualizarVitorias(0);
     atualizarDerrotas(0);
}

function jogarNovamente() {
     location.reload();
}