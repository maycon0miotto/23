const senhaCorreta = "A0800"; 

// Função para verificar a senha
function verificarSenha() {
    const senha = document.getElementById("senha").value;
    const mensagemErro = document.getElementById("mensagemErro");

    if (senha === senhaCorreta) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("mainContainer").style.display = "block";
        carregarAnotacoes();
        carregarLembretes();
    } else {
        mensagemErro.textContent = "Senha incorreta. Tente novamente.";
    }
}

function salvarAnotacoes() {
    const anotacoes = {
        linguagens: document.getElementById("anotacoesLinguagens").value,
        engenharia: document.getElementById("anotacoesEngenharia").value,
        filosofia: document.getElementById("anotacoesFilosofia").value,
        modelagem: document.getElementById("anotacoesModelagem").value,
        sistemas: document.getElementById("anotacoesSistemas").value
    };

    localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
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

// Função para adicionar lembrete de prova
function adicionarLembrete() {
    const nomeProva = document.getElementById("nomeProva").value;
    const dataProva = document.getElementById("dataProva").value;

    if (!nomeProva || !dataProva) {
        alert("Por favor, preencha o nome da prova e a data.");
        return;
    }

    const lembrete = { nome: nomeProva, data: dataProva };
    const lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];
    
    lembretes.push(lembrete);
    localStorage.setItem("lembretes", JSON.stringify(lembretes));

    document.getElementById("nomeProva").value = '';
    document.getElementById("dataProva").value = '';

    carregarLembretes();
}

// Função para calcular os dias restantes até a prova
function calcularDiasRestantes(data) {
    const hoje = new Date();
    const dataProva = new Date(data);
    const diffTime = dataProva - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converte para dias
    return diffDays >= 0 ? diffDays : 0; // Retorna 0 se a data já passou
}

// Função para carregar lembretes da localStorage
function carregarLembretes() {
    const tabelaLembretes = document.getElementById("tabelaLembretes");
    tabelaLembretes.innerHTML = ""; // Limpar tabela existente

    const lembretes = JSON.parse(localStorage.getItem("lembretes")) || [];

    // Ordenar lembretes por data
    lembretes.sort((a, b) => new Date(a.data) - new Date(b.data));

    lembretes.forEach(lembrete => {
        const diasRestantes = calcularDiasRestantes(lembrete.data);
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `<td>${lembrete.nome}</td><td>${lembrete.data}</td><td>${diasRestantes}</td>`;
        tabelaLembretes.appendChild(novaLinha);
    });
}

// Adicionar evento de input para salvar anotações automaticamente
const anotacoesTextAreas = [
    document.getElementById("anotacoesLinguagens"),
    document.getElementById("anotacoesEngenharia"),
    document.getElementById("anotacoesFilosofia"),
    document.getElementById("anotacoesModelagem"),
    document.getElementById("anotacoesSistemas")
];

anotacoesTextAreas.forEach(textarea => {
    textarea.addEventListener("input", salvarAnotacoes);
});
