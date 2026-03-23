import { useState } from "react";
import Button from "./components/Button";

export default function App() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [descricao, setDescricao] = useState("")

    function remover(idTarefa) {
        const novaLista = listaTarefas.filter(tarefa => tarefa.id != idTarefa);

        setListaTarefas(novaLista);
    }

    function adicionar() {
        const novaTarefa = {
            id: (listaTarefas.length + 1) + Date.now().toFixed(),
            texto: descricao,
            feita: false
        }

        setListaTarefas([...listaTarefas, novaTarefa]);
        setDescricao("");
    }

    function marcarConcluida(idTarefa) {
        const listaAtualizada = listaTarefas.map(tarefa => {
            if (tarefa.id == idTarefa) {
                return {
                    ...tarefa,
                    feita: !tarefa.feita
                }
            }

            return tarefa;
        })

        setListaTarefas(listaAtualizada);
    }

    return (
        <main>
            <div>
                <h1>To-Do List</h1>
                <input value={descricao} onChange={e => setDescricao(e.target.value)} />
                <Button texto="Adicionar" funcao={adicionar} />
            </div>
            <div>
                <fieldset>
                    <legend>Tarefas</legend>
                    {listaTarefas.map(tarefa => (
                        <span style={{ display: "flex", alignItems: "center" }} id={tarefa.id}>
                            <span onClick={() => remover(tarefa.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                            </span>
                            <input type="checkbox"
                                onChange={() => marcarConcluida(tarefa.id)}
                                checked={tarefa.feita} />
                            {tarefa.feita ?
                                <p style={{ textDecoration: "line-through" }}>
                                    {tarefa.texto}
                                </p>
                                :
                                <p>
                                    {tarefa.texto}
                                </p>
                            }
                        </span>
                    ))}
                </fieldset>
            </div>
        </main>
    )
}