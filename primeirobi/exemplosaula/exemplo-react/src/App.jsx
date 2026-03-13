import { useState } from "react";
import Button from "./components/Button";

export default function App() {
    const [contador, setContador] = useState(0);
    const [atividade, setAtividade] = useState();

    function incrementar() {
        setContador(contador + 1);
    }

    function atualizarAtividade(atividade) {
        setAtividade(atividade)
    }

    return (
        <div>
            <div>
                <h1>
                    Lista Atividades
                </h1>
                <label>Insira Atividade</label>
                <input type="text" value={atividade}
                    onChange={evento => atualizarAtividade(evento.target.value)} />
            </div>
            <div>
                Valor do meu contador: {contador}
                <Button funcao={incrementar}
                    btnText="Clicar" />
            </div>
        </div>
    )
}