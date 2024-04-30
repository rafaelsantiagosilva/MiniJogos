"use strict";

const quadrados = document.getElementsByClassName("quadrado");
let sentido = 1;

for (let i in quadrados) {
    quadrados[i].addEventListener("click", () => {
        quadrados[i].style.visibility = "visible";
        quadrados[i].innerText = sentido === 1 ? "X" : "O";
        sentido *= -1;
    });
}
