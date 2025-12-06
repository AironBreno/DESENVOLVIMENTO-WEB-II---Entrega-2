import { criarPostagem } from './api.js';

const postForm = document.getElementById('postForm');
const mensagemStatus = document.getElementById('mensagemStatus');

function exibirStatus(mensagem, tipo = 'sucesso') {
    mensagemStatus.textContent = mensagem;
    mensagemStatus.className = tipo;
    mensagemStatus.style.display = 'block';
}

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    mensagemStatus.textContent = '';
    
    // 1. Verificar se o usuário está logado (se o user_id existe no localStorage)
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        exibirStatus('Você precisa estar logado para criar uma postagem.', 'erro');
        // Redireciona para o login se não houver user_id
        setTimeout(() => { window.location.href = 'index.html'; }, 1500); 
        return;
    }

    // 2. Coletar os dados do formulário
    const postData = {
        titulo: document.getElementById('titulo').value,
        corpo: document.getElementById('corpo').value,
        user_id: userId // Vincula o post ao usuário logado
        // A data_criacao deve ser preenchida pelo seu backend (função createPost)
    };

    // 3. Chamar a função de API
    try {
        await criarPostagem(postData);
        
        exibirStatus('✅ Postagem publicada com sucesso! Redirecionando...', 'sucesso');
        postForm.reset(); 
        
        // Redireciona para o feed após 2 segundos
        setTimeout(() => {
            window.location.href = 'feed.html'; 
        }, 2000);

    } catch (error) {
        exibirStatus(error.message || 'Erro desconhecido ao publicar.', 'erro');
    }
});
