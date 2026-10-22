console.log("listar.js funcionando");

const API = "http://localhost:3000/pessoas";
const corpoTabela = document.getElementById("corpoTabela");
const mensagem = document.getElementById("mensagem");


async function listarPessoas() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(API);
        // console.log(resposta);
        if(!resposta.ok){
            throw new Error("Não foi possivel listar as pessoas")
        }

        const pessoas = await resposta.json();
        corpoTabela.innerHTML = "";

        if(pessoas.length === 0){
            const linha = document.createElement("tr");
            const celula = document.createElement("td");
            celula.colSpan = 4;
            celula.textContent = "Nenhuma pessoa cadastrada";
            linha.appendChild(celula);
            corpoTabela.appendChild(linha);
            return;
        }

        pessoas.forEach(pessoa => {
            // console.log(pessoa);
            const linha = document.createElement("tr");

            const celulaId = document.createElement("td");
            celulaId.textContent = pessoa.id;

            const celulaNome = document.createElement("td");
            celulaNome.textContent = pessoa.nome;

            const celulaIdade = document.createElement("td");
            celulaIdade.textContent = pessoa.idade;

            const celulaAcoes = document.createElement("td");
            celulaAcoes.className = "acoes-tabela";

            const linkEditar = document.createElement("a")
            linkEditar.href = `editar.html?id=${pessoa.id}`
            linkEditar.className = "botao";
            linkEditar.textContent = "Editar";

            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "perigo";
            botaoExcluir.addEventListener("click", ()=> excluirPessoa(pessoa.id));
            
            celulaAcoes.append(linkEditar, botaoExcluir);

            linha.append(celulaId, celulaNome, celulaIdade, celulaAcoes);
            corpoTabela.appendChild(linha)
        });

    } catch (error) {
        mensagem.textContent = error.message;
    }
}


async function excluirPessoa(id) {
    console.log("Vou excluir id:", id);
    const confirmou = confirm("Deseja realmente excluir esta pessoa?")

    if(!confirmou) return;

    try {
        const resposta = await fetch(`${API}/${id}`,{
            method: "DELETE"
        })

        if(!resposta.ok){
            throw  new Error("Não foi possivel exclur");
        }

        await listarPessoas()
    } catch (error) {
        mensagem.textContent = erro.message;
    }
}


listarPessoas();