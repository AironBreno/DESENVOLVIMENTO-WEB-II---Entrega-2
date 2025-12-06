// URL base do seu backend em PHP (Pode ser localhost ou o servidor final)
const BASE_URL = 'http://localhost/seu-diretorio-do-backend'; 

/**
 * Função para tentar realizar o login.
 * Chama o endpoint que usa a função getUserByEmail do seu backend.
 * @param {string} email - O email do usuário.
 * @param {string} senha - A senha do usuário.
 */
export async function fazerLogin(email, senha) {
    try {
        // Assume que você tem um endpoint de login que recebe email e senha
        const response = await fetch(`${BASE_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
            // Lança um erro se o status HTTP não for 200-299
            throw new Error('Falha na autenticação. Verifique suas credenciais.');
        }

        const data = await response.json();
        return data; // Deve retornar os dados do usuário logado
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}
