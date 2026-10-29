const listaBotoes = document.querySelectorAll(".filtro");
const listaImagens = document.querySelectorAll(".miniatura");
const totalImagens = document.getElementById("totalImagens");

const modal = document.getElementById("modal");
const btnFechar = document.getElementById("fechar");
const btnAnterior = document.getElementById("anterior");
const imagemModal = document.getElementById("imagemModal");
const contadorImagem = document.getElementById("contador");
const nomeImagem = document.getElementById("nomeImagem");
const btnProximo = document.getElementById("proximo");

let imagensVisiveis = [];
let indiceAtual = 0;

function atualizarImagensVisiveis(){
    imagensVisiveis = Array.from(listaImagens).filter(
        function (imagem) {
            return !imagem.classList.contains("oculta") 
    });
    totalImagens.textContent = `Exibindo ${imagensVisiveis.length} de ${listaImagens.length}`
}

function filtrarImagens(categoria){
    listaImagens.forEach((imagem)=> {
        const categoriaImagem = imagem.dataset.categoria;

        if (categoria === "todas" || categoriaImagem === categoria){
            imagem.classList.remove("oculta");
            imagem.tabIndex = 0;
        }
        else{
            imagem.classList.add("oculta");
            imagem.tabIndex = -1;
        }
        if (categoriaImagem === categoria){
            imagem.classList.add("ativo");
        }
        else{
            imagem.classList.remove("ativo");
        }
        atualizarImagensVisiveis();
    })
}

listaBotoes.forEach((botao)=>{
    botao.addEventListener("click", ()=>{
        let categoria = botao.dataset.filtro;

        listaBotoes.forEach((item)=>{
            item.classList.remove("ativo");
        })

        botao.classList.add("ativo");

        filtrarImagens(categoria);
    })
})

function mostrarImagem(indice){
    let quantidade = imagensVisiveis.length;

    if (quantidade === 0){
        return
    }

    //Navegação circular
    indiceAtual = (indice + quantidade) % quantidade;

    const imagem = imagensVisiveis[indiceAtual];
    imagemModal.src = imagem.src;
    imagemModal.alt = imagem.alt;
    const dataLegenda = document.getElementById("data-legenda");
    dataLegenda.textContent = imagem.dataset.descricao;
    nomeImagem.textContent = imagem.alt;
    contadorImagem.textContent= `${indiceAtual+1} de ${quantidade}`
}

function abrirModal(imagem) {
    indiceAtual = imagensVisiveis.indexOf(imagem);

    modal.classList.add("ativo");
    mostrarImagem(indiceAtual);
}

listaImagens.forEach((imagem)=>{
    imagem.addEventListener("click", ()=>{
        abrirModal(imagem)
    })
})

btnFechar.addEventListener("click", ()=> {
    modal.classList.remove("ativo");
})
modal.addEventListener("click", (evento)=> {
    if (evento.target === modal){
        modal.classList.remove("ativo");
    }
})

document.addEventListener("keydown", (event)=> {
    if (event.key === "Escape") {
        modal.classList.remove("ativo");
    }

    if (event.key === "ArrowRight") {
        mostrarImagem(indiceAtual + 1)
    }

    if (event.key === "ArrowLeft") {
        mostrarImagem(indiceAtual - 1)
    }
})

btnProximo.addEventListener("click", ()=>{
    mostrarImagem(indiceAtual + 1)
})

btnAnterior.addEventListener("click", ()=>{
    mostrarImagem(indiceAtual - 1)
})

filtrarImagens("todas");