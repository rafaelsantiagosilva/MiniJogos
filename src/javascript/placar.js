"use strict";

const placarDOM = document.getElementsByClassName("placar")[0];
const setaDivDOM = document.getElementsByClassName("seta__placar")[0];
const setaPDOM = document.getElementsByClassName("seta")[0];
const tabelaDOM = document.getElementsByClassName("tabela")[0];

setaDivDOM.addEventListener("click", () => {
     if (placarDOM.classList[placarDOM.classList.length - 1] != "placar_desativado") {
          placarDOM.classList.add("placar_desativado");
          setaDivDOM.classList.add("seta_desativada");
          setaDivDOM.classList.remove("seta_ativada");
          tabelaDOM.style.display = "none";
     } else {
          placarDOM.classList.remove("placar_desativado");
          setaDivDOM.classList.remove("seta_desativada");
          setaDivDOM.classList.add("seta_ativada");
          tabelaDOM.style.display = "table";
     }
});