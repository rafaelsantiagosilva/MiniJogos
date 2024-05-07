"use strict";

document.getElementById("btn_sortear").addEventListener("click", sortearMegaSena);

async function sortearMegaSena() {
     let numerosAleatorios = [];
     const BOLAS_DOM = document.getElementsByClassName("numero_bola");

     async function animarBola(j, bola, numeroAleatorio) {
          let animacao = "";

          if (j == 0)
               animacao = "primeira_bola_animada";
          else if (j == 14)
               animacao = "ultima_bola_animada";
          else
               animacao = "bola_animada";

          bola.classList.add(animacao);

          await new Promise((resolve) => setTimeout(resolve, 100));

          if (j == 2) {
               bola.innerText = numeroAleatorio
          } else {
               bola.innerText = gerarNumeroAleatorio();
          }

          bola.classList.remove(animacao);
     }

     async function comecarAnimacoes() {
          let index = 0;
          while (index < 6) {
               let numeroAleatorio = 0;

               do {
                    numeroAleatorio = gerarNumeroAleatorio();
               } while (numerosAleatorios.includes(numeroAleatorio));

               numerosAleatorios.push(numeroAleatorio);
               index++;
          }

          numerosAleatorios = ordenarEmOrdemCrescente(numerosAleatorios);

          for (let i in numerosAleatorios) {
               for (let j = 0; j < 3; j++) {
                    await animarBola(j, BOLAS_DOM[i], numerosAleatorios[i]);
               }
          }
     }

     await comecarAnimacoes();
}

function gerarNumeroAleatorio() {
     let numeroAleatorio = Math.round(Math.random() * 59 + 1).toString();

     if (numeroAleatorio.length < 2)
          numeroAleatorio = "0" + numeroAleatorio;

     return numeroAleatorio;
}

function ordenarEmOrdemCrescente(numerosArray) {
     for (let i = 0; i < numerosArray.length; i++) {
          for (let j = 0; j < numerosArray.length; j++) {
               if (Number(numerosArray[i]) < Number(numerosArray[j])) {
                    let temp = numerosArray[i];
                    numerosArray[i] = numerosArray[j];
                    numerosArray[j] = temp;
               }
          }
     }

     return numerosArray;
}