console.log("cadastro.js funcionando");

const API = "http://localhost:3000/pessoas";

// Capturando os elementos conforme os IDs do seu HTML
const formCadastro = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("Idade"); 
const mensagem = document.getElementById("mensagem");
const botaoSalvar = formCadastro.querySelector("button[type='submit']");

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que a página seja recarregada ao enviar

    // Prepara os dados para envio
    const novaPessoa = {
        nome: campoNome.value,
        idade: Number(campoIdade.value)
    };

    try {
        mensagem.textContent = "Cadastrando...";
        if (botaoSalvar) botaoSalvar.disabled = true;

        const resposta = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaPessoa)
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível cadastrar a pessoa.");
        }

        const pessoaCriada = await resposta.json();
        console.log("Cadastrado com sucesso:", pessoaCriada);

        // Feedback visual para o usuário
        mensagem.textContent = "Pessoa cadastrada com sucesso!";
        formCadastro.reset(); // Limpa os campos do formulário

        // Redireciona de volta para a listagem (index.html) após 1.5 segundos
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {
        mensagem.textContent = error.message;
        if (botaoSalvar) botaoSalvar.disabled = false;
    }
});