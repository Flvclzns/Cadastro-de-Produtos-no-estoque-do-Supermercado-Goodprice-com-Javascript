//Armazena os produtos no Array
let produtos = [];

// Captura o formulário
const form = document.querySelector("form");

// Função para adicionar produto
function adicionar() {
    const codigo = document.getElementById("codigo").value;
    const produto = document.getElementById("produto").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;
    const descricao = document.getElementById("descricao").value;

    if (!codigo || !produto || !preco || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoProduto = {
        codigo,
        produto,
        preco: parseFloat(preco).toFixed(2),
        quantidade: parseInt(quantidade),
        descricao
    };

    produtos.push(novoProduto);
    atualizarTabela();
    form.reset();
}

// Função para remover produto
function remover(codigo) {
    produtos = produtos.filter(p => p.codigo !== codigo);
    atualizarTabela();
}

// Função para editar produto
function editar(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);
    if (produto) {
        const novoNome = prompt("Novo nome:", produto.produto);
        const novoPreco = prompt("Novo preço:", produto.preco);
        const novaQtd = prompt("Nova quantidade:", produto.quantidade);
        const novaDesc = prompt("Nova descrição:", produto.descricao);

        if (novoNome) produto.produto = novoNome;
        if (novoPreco) produto.preco = parseFloat(novoPreco).toFixed(2);
        if (novaQtd) produto.quantidade = parseInt(novaQtd);
        if (novaDesc) produto.descricao = novaDesc;

        atualizarTabela();
    }
}

// Função para listar produtos na tabela
function atualizarTabela() {
    const tbody = document.querySelector("#tabelaProdutos tbody");
    tbody.innerHTML = "";

    produtos.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.codigo}</td>
            <td>${p.produto}</td>
            <td>R$ ${p.preco}</td>
            <td>${p.quantidade}</td>
            <td>${p.descricao}</td>
            

            
            <td>
                <button class="btn btn-editar" onclick="editar('${p.codigo}')"></i> Editar </button>
                <button class="btn btn-remover" onclick="remover('${p.codigo}')"></i> Remover </button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Intercepta envio do formulário
form.addEventListener("submit", function (e) {
    e.preventDefault();
    adicionar();
});

