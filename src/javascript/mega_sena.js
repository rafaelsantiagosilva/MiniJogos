document.getElementById("btn_sortear").addEventListener("click", sortearMegaSena);

function sortearMegaSena() {
     let numerosAleatorios = [];
     const BOLAS_DOM = document.getElementsByClassName("bola");

     let index = 0;
     while (index < 6) {
          let numeroAleatorio = 0;

          do {
               numeroAleatorio = gerarNumeroAleatorio();
          } while (numeroExisteNoArray(numerosAleatorios, numeroAleatorio));

          numerosAleatorios.push(numeroAleatorio);
          index++;
     }

     numerosAleatorios = ordenarEmOrdemCrescente(numerosAleatorios);

     for (let i in numerosAleatorios)
          BOLAS_DOM[i].innerText = numerosAleatorios[i];
}

function gerarNumeroAleatorio() {
     let numeroAleatorio = Math.round(Math.random() * 59 + 1).toString()

     if (numeroAleatorio.length < 2)
          numeroAleatorio = "0" + numeroAleatorio;

     return numeroAleatorio;
}

function numeroExisteNoArray(array, numero) {
     for (let i = 0; i < array.length; i++)
          if (array[i] == numero)
               return true;

     return false;
}

function ordenarEmOrdemCrescente(numerosArray) {
     for (let i = 0; i < numerosArray.length; i++) {
          for (let j = 0; j < numerosArray.length; j++) {
               let temp = numerosArray[i];

               if (Number(numerosArray[i]) < Number(numerosArray[j])) {
                    numerosArray[i] = numerosArray[j];
                    numerosArray[j] = temp;
               }
          }
     }

     return numerosArray;
}