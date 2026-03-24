import { useState } from "react";

export default function App() {
    const [listaCarrinho, setListaCarrinho] = useState([]);
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState(0);

    function adicionar() {
        if (nome == "" || quantidade == 0) {
            return;
        }

        const produto = {
            "id": listaCarrinho.length + 1,
            nome,
            quantidade
        }

        setListaCarrinho([...listaCarrinho, produto]);
        setNome("");
        setQuantidade(0)
    }

    function removerItem(indiceProduto) {
        const listaFiltrada = listaCarrinho
            .filter(item => item.id != indiceProduto);

        setListaCarrinho(listaFiltrada);
    }

    function adicionarQuantidade(indiceProduto) {
        const listaProdutosAtualizada = listaCarrinho
            .map(produto => {
                let quantidadeAtual = Number(produto.quantidade);
                            //= =
                if (produto.id == indiceProduto) {
                    return { ...produto, quantidade: quantidadeAtual + 1 }
                }

                return produto;
            })

        setListaCarrinho(listaProdutosAtualizada);
    }

    return (
        <div>
            <div>
                <h1>Carrinho Show - Loja Sandrolaxx</h1>

                <div>
                    <label htmlFor="name">Nome Produto</label>
                    <input id="name" type="text"
                        value={nome} onChange={e => setNome(e.target.value)} />
                </div>                     {/* = > */}

                <div>
                    <label htmlFor="qtd">Quantidade</label>
                    <input id="qtd" type="number"
                        value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                </div>

                <button onClick={adicionar}>Adicionar</button>
            </div>
            <div>
                <h2>Itens do Carrinho</h2>
                {listaCarrinho.map(item => (
                    <div style={{ border: "2px solid", borderRadius: "10px" }}
                        key={item.id}>
                        <p>Nome: {item.nome}</p>
                        <p>Quantidade: {item.quantidade}</p>
                        <button onClick={() => removerItem(item.id)}>
                            Remover
                        </button>
                        <button onClick={() => adicionarQuantidade(item.id)}>
                            Adicionar Quantidade
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}