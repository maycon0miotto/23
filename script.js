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
};
