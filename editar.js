console.log("Editar.js funcionando");

const API = "http://localhost:3000/pessoas";
const formulario = document.getElementById("formEditar");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
// console.log(parametros.get("id"))
const id = Number(parametros.get("id"));

async function carregarPessoa() {
    if (!Number.isInteger(id) || id <= 0) {
        mensagem.textContent = "ID invalido, Volte à listagem"
        formulario.hidden = true;
    }

    try {
        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error("Não foi possivel consultar");
        }

        const pessoas = await resposta.json();
        const pessoa = pessoas.find((item) => item.id === id);
        console.log(pessoa)

        if (!pessoa) {
            mensagem.textContent = "Pessoa não encontrada";
            formulario.hidden = true;
            return;
        }

        campoNome.value = pessoa.nome;
        campoIdade.value = pessoa.idade;

    } catch (error) {
        mensagem.textContent = error.message;
        formulario.hidden = true;
    }

}


formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);

    if (!nome || !Number.isInteger(idade) || idade < 0 || idade >= 130) {
        mensagem.textContent = "Informe um nome e uma idade válida";
        return;
    }

    try {
        mensagem.textContent = "";
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, idade })
        });

        if(!resposta.ok){
            throw new Error("Não foi possivel atualizar a pessoa");
        }

        window.location.href = "index.html";
    } catch (error){
        mensagem.textContent = error.message;
    }
})



carregarPessoa();