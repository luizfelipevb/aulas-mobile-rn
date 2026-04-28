/**
 * Adiciona um produto à lista do carrinho.
 * Retorna a mesma lista (sem alteração) se nome for vazio ou quantidade for 0.
 * @param {Array} lista - lista atual do carrinho
 * @param {string} nome - nome do produto
 * @param {number|string} quantidade - quantidade desejada
 * @returns {Array} nova lista ou a lista original caso inválido
 */
export function adicionarProduto(lista, nome, quantidade) {
  if (nome === '' || quantidade === 0) {
    return lista
  }

  const produto = {
    id: lista.length + 1,
    nome,
    quantidade,
  }

  return [...lista, produto]
}

/**
 * Remove um item da lista pelo seu id.
 * @param {Array} lista - lista atual do carrinho
 * @param {number} id - id do produto a remover
 * @returns {Array} nova lista sem o item
 */
export function removerItem(lista, id) {
  return lista.filter(item => item.id !== id)
}

/**
 * Incrementa em 1 a quantidade do produto com o id informado.
 * @param {Array} lista - lista atual do carrinho
 * @param {number} id - id do produto a incrementar
 * @returns {Array} nova lista com a quantidade atualizada
 */
export function adicionarQuantidade(lista, id) {
  return lista.map(produto => {
    if (produto.id === id) {
      return { ...produto, quantidade: Number(produto.quantidade) + 1 }
    }
    return produto
  })
}
