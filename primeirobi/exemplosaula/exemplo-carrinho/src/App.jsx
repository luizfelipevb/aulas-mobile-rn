import { useState } from "react";
import {
    adicionarProduto,
    removerItem as removerItemDaLista,
    adicionarQuantidade as adicionarQuantidadeDaLista,
} from "./utils/carrinho";

export default function App() {
    const [listaCarrinho, setListaCarrinho] = useState([]);
    const [nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState(0);

    function adicionar() {
        const novaLista = adicionarProduto(listaCarrinho, nome, quantidade);
        if (novaLista === listaCarrinho) {
            return;
        };
        setListaCarrinho(novaLista);
        setNome("");
        setQuantidade(0);
    }

    function removerItem(indiceProduto) {
        setListaCarrinho(removerItemDaLista(listaCarrinho, indiceProduto));
    }

    function adicionarQuantidade(indiceProduto) {
        setListaCarrinho(adicionarQuantidadeDaLista(listaCarrinho, indiceProduto));
    }

    return (
        <div>
            <div>
                <h1>Carrinho Show - Deu Ruim!</h1>

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