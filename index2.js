let produtos = [];

function carregarProdutosAPI() {
    fetch("https://fakestoreapi.com/products").then((resposta) => {
        return resposta.json();
    }).then((resposta) => {
        produtos = resposta;
        carregarProdutos(produtos);
    });
}
carregarProdutosAPI();

function carregarProdutos(listaProdutos = []) {
    let cards = document.getElementById("cards");

    cards.innerHTML = "";

    listaProdutos.map((produto) => {
        cards.innerHTML += ` 
        <div class="bg-white rounded p-4">
                <div class="relative">
                    <img src="${produto.image}" alt="" class="w-full h-55 object-contain">
                    <div class="p-2 bg-cyan-500 text-white font-bold absolute top-3 right-3 rounded">${produto.rating.rate}</div>
                </div>
                <div class="pt-4">
                    <h2 class="font-semibold text-xl line-clamp-1">${produto.title}</h2>
                    <h6 class="font-bold">${produto.category}</h6>
                    <h6 class="text-right text-2xl">R$ ${produto.price.toFixed(2)}</h6>
                </div>
            </div>
        </div>`
    });
}
carregarProdutos(produtos);

function filtrarProdutos(categoria){
    if(categoria != "All"){
    let prodrutosFiltrados = produtos.filter((produto) => {
        return produto.category == categoria.toLowerCase();
    });
    carregarProdutos(prodrutosFiltrados);
    }else{
        carregarProdutos(produtos);
    }
}

function ordenarProdutos(ordem){
    let produtosOrdenados = [];
    if(ordem == "preco"){
        produtosOrdenados = produtos.toSorted((prodA, prodB) => {
            return prodA.price - prodB.price;
        });

    } else {
        produtosOrdenados = produtos.toSorted((prodA, prodB) => {
            return prodB.rating.rate - prodA.rating.rate;
        });
    }
    carregarProdutos(produtosOrdenados);
}        

function pesquisarProdutos(texto){
    if(texto.length == 0){
        carregarProdutos(produtos);
        return;
    }
    if(texto.length >= 3){
        let produtosFiltrados = produtos.filter((produto) => {
            return produto.title.toLowerCase().includes(texto.toLowerCase());
        });
        carregarProdutos(produtosFiltrados);
    }
}