import { cadastrarUsuario } from './api.js';

const cadastroForm = document.getElementById('cadastroForm');
const mensagemStatus = document.getElementById('mensagemStatus');

function limparStatus() {
    mensagemStatus.textContent = '';
    mensagemStatus.className = ''; // Limpa as classes de sucesso/erro
}

function exibirStatus(mensagem, tipo = 'sucesso') {
    mensagemStatus.textContent = mensagem;
    mensagemStatus.className = tipo;
    mensagemStatus.style.display = 'block';
}

cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    limparStatus();

    // Coleta todos os dados do formulário
    const userData = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        biografia: document.getElementById('biografia').value,
        avatar_url: document.getElementById('avatar_url').value,
        // O campo data_registro será preenchido pelo seu backend (função createUser)
    };

    // Validação simples de campos obrigatórios
    if (!userData.nome || !userData.email || !userData.senha) {
        exibirStatus('Preencha pelo menos nome, e-mail e senha.', 'erro');
        return;
    }

    try {
        const resultado = await cadastrarUsuario(userData);
        
        exibirStatus('🎉 Cadastro realizado com sucesso! Redirecionando para o login...', 'sucesso');
        
        // Opcional: Limpar formulário
        cadastroForm.reset(); 
        
        // Redireciona para a página de login após 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 2000);

    } catch (error) {
        exibirStatus(error.message || 'Erro desconhecido ao cadastrar.', 'erro');
    }
});
