"use strict";
const palavraDOM = document.getElementById("palavra");
const partesDoCorpoDOM = document.getElementsByClassName("parte-do-corpo");

const tituloDOM = document.getElementById("game__titulo");

const btnChuteDOM = document.getElementById("btn-chutar");
btnChuteDOM.addEventListener("click", chutar);

const inputChuteDOM = document.getElementById("inpChute");
inputChuteDOM.addEventListener("change", verificarInput)

let pokemon;
let palavraResposta = "";
let dicas = [];
let erros = 0;

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
     dicas[0] = pokemon.types[0].type.name + (pokemon.types[1] ? `, ${pokemon.types[1].type.name}` : "")
     dicas[1] = pegarGeracao(Number(pokemon.id));
     dicas[2] = pokemon.id;

     console.log("Pokemon: " + palavraResposta);
     console.log("Dica 1: " + dicas[0]);
     console.log("Dica 2: " + dicas[1]);
     console.log("Dica 3: " + dicas[2]);

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
          console.log("Erros: " + erros);
     }

     if (palavraDOM.innerText == palavraResposta) {
          tituloDOM.innerText = "Parabéns! Você acertou!";
          btnChuteDOM.style.display = "none";
          return;
     } else if (erros == 6) {
          tituloDOM.innerText = "Que pena! Você perdeu! A resposta era: " + palavraResposta;
          btnChuteDOM.style.display = "none";
          return;
     }
}