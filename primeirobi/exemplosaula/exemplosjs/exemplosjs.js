// //Tipos variaveis
var valorGlobal = "valor var";
let valorEscopoBloco = "valor escopo bloco";
const valorConstante = "valor constante";

// console.log(valorGlobal)
// console.log(valorEscopoBloco)
// console.log(valorConstante)

// // //Criando objeto
// const aluno = {
//     nome: "João Felipe",
//     idade: 25,
//     profissao: "Staff Enginner",
//     endereco: {
//         rua: "Malibu",
//         cidade: "Cascavel",
//         uf: "PR"
//     }
// }

// const alunoJoao2 = {
//     ...aluno,
//     profissao: "Jogador de Tigrinho"
// }

// console.log(aluno)

// // // console.log(aluno);
// // // console.log(aluno.idade);
// // // console.log("Rua:", aluno.endereco.rua);

// // // Listas
// const listaFrutas = ["🍇", "🍊", "🍉"];
// const listaFrutas2 = ["🍓", "🍓", "🍓"];
// const listaFrutas3 = [...listaFrutas, ...listaFrutas2]

// console.log(listaFrutas)
// console.log(listaFrutas2)
// console.log(listaFrutas3)
// // // const listaFrutas = [aluno, aluno];
// // // Iterando com for
// // for (let index = 0; index < listaFrutas.length; index++) {
// //     const element = listaFrutas[index];
// //     console.log(element)
// // }

// // // console.log(listaFrutas)

// // // Função
// function soma(numero1, numero2) {
//     const result = numero1 + numero2;

//     console.log("Valor da soma é: ", result)
// }

// // // Função anônima
// const soma = (numero1, numero2) => console.log("Valor da soma é: ", numero1 + numero2);

// // // Chamada da Função
// soma(3,40);

// // // Função
// function funcaoComRest(nome1, nome2, ...outrosNomes) {
//     console.log("Nome1: " + nome1, "Nome2: " + nome2, "outrosNomes: " + outrosNomes.join(","))
// }

// funcaoComRest("Sandrolaxx", "Jośe", "Claudio")
// // // console.log("Dois string é igual a dois number:", "2" == 2);
// // // console.log("Dois string é igual a dois number (estritamente):", "2" === 2);

// const alunoDois = {
//     nome: "Rafael",
//     idade: 23
// }

// const { nome, idade } = alunoDois;

// // console.log(alunoDois.nome);
// // console.log(nome);
// // console.log(idade);

//Map
const listaFrutas = ["🍇", "🍊", "🍉", "🍊"];
const listaNumeros = [1, 5, 8];
                                       // = >
const listaBananas = listaFrutas.map(item => "🍌");
const valorVezesDois = listaNumeros.map(item => item * 2);

// console.log(listaBananas)
// console.log(valorVezesDois)

//Filter
const listaSemLaranja = listaFrutas.filter(item => item == "🍊")

console.log(listaSemLaranja);
// 1, 5, 8
//Reduce
const valInicial = 0;
const total = listaNumeros
    .reduce((valAnte, valAtual) => valAnte + valAtual, valInicial)

console.log(total)