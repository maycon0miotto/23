// Função para salvar todas as anotações no localStorage
function salvarAnotacoes() {
    const anotacoes = {
        linguagens: document.getElementById("anotacoesLinguagens").value,
        engenharia: document.getElementById("anotacoesEngenharia").value,
        filosofia: document.getElementById("anotacoesFilosofia").value,
        modelagem: document.getElementById("anotacoesModelagem").value,
        sistemas: document.getElementById("anotacoesSistemas").value
    };

    localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
    alert("Todas as anotações foram salvas!");
}

// Função para carregar as anotações salvas do localStorage
function carregarAnotacoes() {
    const anotacoesSalvas = JSON.parse(localStorage.getItem("anotacoes"));

    if (anotacoesSalvas) {
        document.getElementById("anotacoesLinguagens").value = anotacoesSalvas.linguagens || '';
        document.getElementById("anotacoesEngenharia").value = anotacoesSalvas.engenharia || '';
        document.getElementById("anotacoesFilosofia").value = anotacoesSalvas.filosofia || '';
        document.getElementById("anotacoesModelagem").value = anotacoesSalvas.modelagem || '';
        document.getElementById("anotacoesSistemas").value = anotacoesSalvas.sistemas || '';
    }
}

// Carregar as anotações quando a página for carregada
window.onload = function() {
    carregarAnotacoes();
    carregarLembretes();
};

// Função para adicionar lembrete de prova
function adicionarLembrete() {
    const nomeProva = document.getElementById("nomeProva").value;
    const dataProva = document.getElementById("dataProva").value;

    if (nomeProva && dataProva) {
        const lembrete = {
            nome: nomeProva,
            data: dataProva
        };

        let lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
        lembretes.push(lembrete);

        // Ordenar os lembretes pela data (do mais recente para o mais antigo)
        lembretes.sort((a, b) => new Date(b.data) - new Date(a.data));

        localStorage.setItem("lembretes", JSON.stringify(lembretes));
        carregarLembretes();
        alert("Lembrete adicionado!");
    } else {
        alert("Por favor, preencha o nome e a data da prova.");
    }
}

// Função para carregar lembretes
function carregarLembretes() {
    const tabelaLembretes = document.getElementById("tabelaLembretes");
    tabelaLembretes.innerHTML = ""; // Limpar tabela existente

    const lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

    lembretes.forEach(lembrete => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `<td>${lembrete.nome}</td><td>${lembrete.data}</td>`;
        tabelaLembretes.appendChild(novaLinha);
    });
}
