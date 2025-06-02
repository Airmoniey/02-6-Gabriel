let posicao = 0;
const conteudo = document.getElementById('conteudo');
const totalSlides = 3;

function atualizar() {
  conteudo.style.transform = `translateX(-${posicao * 100}%)`;
}

function proximo() {
  posicao = (posicao + 1) % totalSlides;
  atualizar();
}

function anterior() {
  posicao = (posicao - 1 + totalSlides) % totalSlides;
  atualizar();
}
