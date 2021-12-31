let seuVotoPara = document.querySelector(".d1-1 span");
let cargo = document.querySelector(".d1-2 span");
let descricao = document.querySelector(".d1-4");
let aviso = document.querySelector(".d2");
let lateral = document.querySelector(".d1-rigth");
let numeros = document.querySelector(".d1-3");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;

function comecarEtapa() {
  let etapa = etapas[etapaAtual];
  let numeroHtml = "";
  numero = '';
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHtml = '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  console.log("atualizando", numero);
  let etapa = etapas[etapaAtual];

  let candidato = etapa.candidatos.filter((item) => {
    if (String(item.numero) === numero) {
      return true;
    } else {
      return false;
    }
  });

  if(candidato.length > 0){
      candidato = candidato[0];
      seuVotoPara.style.display = 'block';
      aviso.style.display = "block";
      descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

      let fotosHtml = '';
      for(let i in candidato.fotos){
          fotosHtml += `<div class="d1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
      }

      lateral.innerHTML =  fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = "block";
        descricao.innerHTML = `<div class="aviso--grande pisca">Voto Nulo</div>`
    }

  console.log('candidato', candidato)
}

function clicou(n) {
  let elNumero = document.querySelector(".numero.pisca");
  if (elNumero !== null) {
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;
    elNumero.classList.remove("pisca");
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add("pisca");
    } else {
      atualizaInterface();
    }
  }
}

function branco() {
    if(numero === ''){
        votoBranco = true;
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">Voto em Branco</div>`
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
  alert(`Clicou em Confirma`);
}

comecarEtapa();
