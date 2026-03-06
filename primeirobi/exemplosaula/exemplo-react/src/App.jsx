import { useEffect, useState } from "react";
import './App.css'
import Header from "./components/Header"
import Title from "./components/Title"

export default function App() {
    const [contador, setContador] = useState(0);
    const [valorBtc, setValorBtc] = useState();

    useEffect(() => {
        fetch("https://economia.awesomeapi.com.br/json/last/BTC")
            .then(res => res.json())
            .then(json => setValorBtc(json.BTCBRL.bid))
            .catch(console.error)
    }, []);//Array de dependências - Adicionar estados ou deixar vazio

    function incrementar() {
        if (contador == 12) {
            setContador(contador + 2);

            return
        }

        setContador(contador + 1);
    }

    return (
        <main>
            <Header />
            <Title titulo="Titulo"
                subtitulo="Sub-titulo" />
            {/* <p>
                Valor do contador: {contador}
            </p> */}
            <p>
                Valor do BTC: {valorBtc}
            </p>
            {/* <button onClick={incrementar} >Incrementar</button> */}
        </main>
    )
}
