const COMBINACOES_VENCEDORAS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let nomeX = '';
let nomeO = '';
let tabuleiro = [];
let jogadorAtual = 'X';
let fimDeJogo = false;

let placar = { X: 0, O: 0, empates: 0 };
let historico = [];

// ── Telas ──

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.add('escondido'));
  document.getElementById(id).classList.remove('escondido');
}

// ── Cadastro ──

document.getElementById('btn-comecar').addEventListener('click', () => {
  const inputX = document.getElementById('nome-x');
  const inputO = document.getElementById('nome-o');

  inputX.classList.remove('erro');
  inputO.classList.remove('erro');

  const vX = inputX.value.trim();
  const vO = inputO.value.trim();

  if (!vX) { inputX.classList.add('erro'); inputX.focus(); return; }
  if (!vO) { inputO.classList.add('erro'); inputO.focus(); return; }

  nomeX = vX;
  nomeO = vO;

  placar = { X: 0, O: 0, empates: 0 };
  historico = [];

  document.getElementById('label-x').textContent = nomeX;
  document.getElementById('label-o').textContent = nomeO;
  document.getElementById('placar-nome-x').textContent = nomeX;
  document.getElementById('placar-nome-o').textContent = nomeO;

  mostrarTela('tela-jogo');
  iniciarPartida();
});

// ── Jogo ──

function iniciarPartida() {
  tabuleiro = Array(9).fill(null);
  jogadorAtual = 'X';
  fimDeJogo = false;

  document.querySelectorAll('.espaco').forEach(c => {
    c.innerHTML = '';
    c.classList.remove('ocupado', 'vencedor');
  });

  atualizarStatus();
  atualizarTagsAtivas();
}

function nomeDo(jogador) {
  return jogador === 'X' ? nomeX : nomeO;
}

function atualizarStatus() {
  document.getElementById('status').innerHTML =
    `Vez de <strong>${nomeDo(jogadorAtual)}</strong>`;
}

function atualizarTagsAtivas() {
  document.getElementById('tag-x').classList.toggle('ativo', jogadorAtual === 'X');
  document.getElementById('tag-o').classList.toggle('ativo', jogadorAtual === 'O');
}

function svgX() {
  return `<svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="10" x2="42" y2="42" stroke="#D85A30" stroke-width="5" stroke-linecap="round"/>
    <line x1="42" y1="10" x2="10" y2="42" stroke="#D85A30" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
}

function svgO() {
  return `<svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="16" stroke="#185FA5" stroke-width="5"/>
  </svg>`;
}

document.querySelectorAll('.espaco').forEach(celula => {
  celula.addEventListener('click', function () {
    const idx = parseInt(this.dataset.index);
    if (fimDeJogo || tabuleiro[idx]) return;

    tabuleiro[idx] = jogadorAtual;
    this.innerHTML = jogadorAtual === 'X' ? svgX() : svgO();
    this.classList.add('ocupado');

    const resultado = verificarVencedor();

    if (resultado) {
      fimDeJogo = true;

      if (resultado.vencedor === 'empate') {
        document.getElementById('status').innerHTML = 'Empate!';
        placar.empates++;
        registrarHistorico('empate', null);
      } else {
        document.getElementById('status').innerHTML =
          `<strong>${nomeDo(resultado.vencedor)}</strong> venceu!`;
        resultado.linha.forEach(i =>
          document.querySelectorAll('.espaco')[i].classList.add('vencedor')
        );
        placar[resultado.vencedor]++;
        registrarHistorico('vitoria', resultado.vencedor);
      }

      setTimeout(() => {
        atualizarPlacar();
        mostrarTela('tela-placar');
      }, 900);

    } else {
      jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
      atualizarStatus();
      atualizarTagsAtivas();
    }
  });
});

function verificarVencedor() {
  for (const [a, b, c] of COMBINACOES_VENCEDORAS) {
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return { vencedor: tabuleiro[a], linha: [a, b, c] };
    }
  }
  if (tabuleiro.every(v => v !== null)) {
    return { vencedor: 'empate', linha: [] };
  }
  return null;
}

// ── Histórico ──

function registrarHistorico(tipo, vencedor) {
  const partida = historico.length + 1;
  historico.unshift({ partida, tipo, vencedor });
}

function atualizarPlacar() {
  document.getElementById('placar-vitorias-x').textContent = placar.X;
  document.getElementById('placar-vitorias-o').textContent = placar.O;
  document.getElementById('placar-empates').textContent = placar.empates;

  const lista = document.getElementById('historico');
  lista.innerHTML = '';

  if (historico.length === 0) {
    lista.innerHTML = '<li class="historico-vazio">Nenhuma partida ainda</li>';
    return;
  }

  historico.forEach(({ partida, tipo, vencedor }) => {
    const li = document.createElement('li');
    const descricao = tipo === 'empate'
      ? `Partida ${partida} — Empate`
      : `Partida ${partida} — ${nomeDo(vencedor)} venceu`;
    const badge = tipo === 'empate'
      ? `<span class="resultado-badge empate">Empate</span>`
      : `<span class="resultado-badge">Vitória</span>`;
    li.innerHTML = `<span>${descricao}</span>${badge}`;
    lista.appendChild(li);
  });
}

// ── Botões ──

document.getElementById('btn-reiniciar').addEventListener('click', iniciarPartida);

document.getElementById('btn-trocar').addEventListener('click', () => {
  mostrarTela('tela-cadastro');
});

document.getElementById('btn-jogar-de-novo').addEventListener('click', () => {
  mostrarTela('tela-jogo');
  iniciarPartida();
});

document.getElementById('btn-reiniciar-placar').addEventListener('click', () => {
  placar = { X: 0, O: 0, empates: 0 };
  historico = [];
  atualizarPlacar();
});
