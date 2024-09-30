function loadImage(event, imgId) {
    const img = document.getElementById(imgId);
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block"; // Exibir a imagem
}

function saveAllNotes() {
    const aulas = [
        'linguagens', 'engenharia', 'filosofia', 'modelagem', 'sistemas'
    ];

    aulas.forEach((aula) => {
        const notes = document.getElementById(`nota-${aula}`).value;
        const imgSrc = document.getElementById(`img-${aula}`).src;

        // Salvar anotações no localStorage
        localStorage.setItem(`nota-${aula}`, notes);
        localStorage.setItem(`img-${aula}`, imgSrc);
    });

    alert('Todas as anotações foram salvas com sucesso!');
}

// Carregar anotações ao abrir a página
window.onload = function() {
    const aulas = [
        'linguagens', 'engenharia', 'filosofia', 'modelagem', 'sistemas'
    ];

    aulas.forEach((aula) => {
        const savedNote = localStorage.getItem(`nota-${aula}`);
        const savedImg = localStorage.getItem(`img-${aula}`);

        if (savedNote) {
            document.getElementById(`nota-${aula}`).value = savedNote;
        }
        if (savedImg) {
            const img = document.getElementById(`img-${aula}`);
            img.src = savedImg;
            img.style.display = "block"; // Exibir a imagem
        }
    });
};
