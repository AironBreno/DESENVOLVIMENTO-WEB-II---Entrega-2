import { buscarTodosPosts } from './api.js';

const feedContainer = document.getElementById('feedContainer');

/**
 * Função que cria o elemento HTML para um post.
 * @param {object} post - Objeto contendo os dados do post (id, titulo, corpo, autor, data, etc.)
 */
function criarElementoPost(post) {
    const postDiv = document.createElement('article');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <h3>${post.titulo}</h3>
        <p class="meta">Postado por: ${post.nome_autor || 'Usuário Desconhecido'} em ${post.data_criacao}</p>
        <div class="corpo-post">
            ${post.corpo.substring(0, 200)}... </div>
        <div class="actions">
            <button class="like-btn" data-post-id="${post.id}">Curtir</button>
            <span class="likes-count">0 Likes</span> 
            <a href="detalhe_post.html?id=${post.id}">Ler Mais</a>
        </div>
        <hr>
    `;
    
    // **Atenção:** A lógica de "Curtir" (toggle) será implementada depois, 
    // mas o botão já está pronto para receber o listener.
    
    return postDiv;
}

/**
 * Função principal para carregar e exibir o feed.
 */
async function carregarFeed() {
    try {
        const posts = await buscarTodosPosts(20); // Busca os 20 posts mais recentes
        
        if (posts && posts.length > 0) {
            posts.forEach(post => {
                const postElement = criarElementoPost(post);
                feedContainer.appendChild(postElement);
            });
        } else {
            feedContainer.innerHTML += '<p>Nenhuma postagem encontrada.</p>';
        }

    } catch (error) {
        // Exibe o erro na interface caso a API falhe
        feedContainer.innerHTML += `<p class="erro">Erro ao carregar o feed: ${error.message}</p>`;
    }
}

// Inicializa o carregamento do feed
carregarFeed();
