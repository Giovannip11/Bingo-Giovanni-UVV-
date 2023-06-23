"use strict";

var jogadores = [];

function gerarNumerosAleatorios(quantidade, min, max) {
  var numeros = [];

  while (numeros.length < quantidade) {
    var aleatorio = Math.floor(Math.random() * (max - min)) + min;

    if (!numeros.includes(aleatorio)) {
      numeros.push(aleatorio);
    }
  }

  return numeros;
}

function gerarCartela() {
  var nome = document.getElementById('nomes').value;
  if (nome == '') {
    alert('Insira um nome.');
    return;
  }

  var cartela = [
    gerarNumerosAleatorios(5, 1, 15),
    gerarNumerosAleatorios(5, 16, 30),
    gerarNumerosAleatorios(5, 31, 45),
    gerarNumerosAleatorios(5, 46, 60),
    gerarNumerosAleatorios(5, 61, 76)
  ];

  cartela[2][2] = 'X';

  jogadores.push({
    nomeJogador: nome,
    cartela: cartela,
    pontuacao: 0,
    status: ''
  });

  console.log(jogadores);

  var div = document.createElement('div');
  div.classList.add('cartela');

  var tabela = document.createElement('table');

  var h4 = document.createElement('h4');
  h4.innerText = nome;
  div.appendChild(h4);

  var thead = document.createElement('thead');
  var letras = ['B', 'I', 'N', 'G', 'O'];

  for (var i = 0; i < letras.length; i++) {
    var th = document.createElement('th');
    th.innerText = letras[i];
    thead.appendChild(th);
  }

  tabela.appendChild(thead);

  for (var i = 0; i < 5; i++) {
    var tr = document.createElement('tr');
  
    for (var j = 0; j < 5; j++) {
      var td = document.createElement('td');
  
      if (i === 2 && j === 2) {
        td.innerText = 'X';
        td.classList.add('acertou');
        tr.appendChild(td);
      } else {
        td.innerText = cartela[i][j]; 
        tr.appendChild(td);
        td.classList.add('numero' + cartela[i][j]); 
      }
    }
  
    tabela.appendChild(tr);
  }
  

  div.appendChild(tabela);

  var espacoCartelas = document.getElementById('body_cartelas');
  if (!espacoCartelas) {
    espacoCartelas = document.createElement('div');
    espacoCartelas.id = 'body_cartelas';
    var areaCartelas = document.getElementById('area_cartelas');
    areaCartelas.appendChild(espacoCartelas);
  }

  espacoCartelas.appendChild(div);

  document.getElementById('nomes').value = '';
}

function sortearNumero() {
  var resultados = document.getElementById('numeros');
  var numerosJaSorteados = new Set();
  var acabou = false;
  var totalNumeros = 75;

  function marcarNumeroSorteado(numeroSorteado) {
    for (var i = 0; i < jogadores.length; i++) {
      var jogador = jogadores[i];
      var cartela = jogador.cartela;

      for (var j = 0; j < 5; j++) {
        var subArray = cartela[j];

        if (subArray.includes(numeroSorteado)) {
          var marcadores = document.querySelectorAll('.numero' + numeroSorteado);

          marcadores.forEach(function (marcador) {
            marcador.classList.add('acertou');
          });
        }
      }
    }
  }

  function verificarGanhador() {
    for (var i = 0; i < jogadores.length; i++) {
      var jogador = jogadores[i];

      if (jogador.pontuacao === 24) {
        alert(jogador.nomeJogador + ' venceu!');
        jogador.status = 'venceu';
        return true; 
      }
    }

    return false; 
  }

  function sorteio() {
    var numeroSorteado;

    while (true) {
      numeroSorteado = Math.floor(Math.random() * totalNumeros) + 1;
      if (!numerosJaSorteados.has(numeroSorteado)) {
        numerosJaSorteados.add(numeroSorteado);
        break;
      }
    }

    console.log(numeroSorteado);
    marcarNumeroSorteado(numeroSorteado);

    var campoNumero = document.createElement('section');
    campoNumero.classList.add('s');
    campoNumero.id = 'num-' + numeroSorteado;
    campoNumero.innerText = numeroSorteado;
    resultados.appendChild(campoNumero);

    for (var i = 0; i < jogadores.length; i++) {
      var jogador = jogadores[i];
      var cartela = jogador.cartela;

      for (var j = 0; j < 5; j++) {
        var subArray = cartela[j];

        if (subArray.includes(numeroSorteado)) {
          jogador.pontuacao++;

          if (jogador.pontuacao === 24) {
            alert(jogador.nomeJogador + ' venceu');
            acabou = true;
            jogador.status = 'venceu';
          }
        }
      }
    }

    if (!acabou) {
      setTimeout(sorteio, 200);
    }
  }

  sorteio();
}

function reiniciarJogo() {
  var resultados = document.getElementById('numeros');
  resultados.innerHTML = '';
  var cartelas = document.getElementById('cartelas');
  cartelas.innerHTML = '';
  jogadores = [];
}

document.getElementById('btnSortear').addEventListener('click', sortearNumero);
document.getElementById('btnReiniciar').addEventListener('click', reiniciarJogo);
document.getElementById('btnGerarCartela').addEventListener('click', gerarCartela);
function apagarCartelas() {
    var espacoCartelas = document.getElementById('body_cartelas');
    if (espacoCartelas) {
      espacoCartelas.innerHTML = '';
    }
  }
  document.getElementById('btnApagarCartelas').addEventListener('click', apagarCartelas);
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnApagarCartelas').addEventListener('click', apagarCartelas);
  });
    
  
