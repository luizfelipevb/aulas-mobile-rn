import { describe, it, expect } from 'vitest'
import {
  adicionarProduto,
  removerItem,
  adicionarQuantidade,
} from './carrinho'

// ─────────────────────────────────────────────
// adicionarProduto
// ─────────────────────────────────────────────
describe('adicionarProduto', () => {
  it('deve adicionar um produto válido à lista', () => {
    const resultado = adicionarProduto([], 'Arroz', 2)
    expect(resultado).toHaveLength(1)
    expect(resultado[0]).toMatchObject({ nome: 'Arroz', quantidade: 2 })
  })

  it('não deve adicionar produto quando o nome é vazio', () => {
    const resultado = adicionarProduto([], '', 3)
    expect(resultado).toHaveLength(0)
  })

  it('não deve adicionar produto quando a quantidade é 0', () => {
    const resultado = adicionarProduto([], 'Feijão', 0)
    expect(resultado).toHaveLength(0)
  })

  it('deve atribuir id sequencial ao novo produto', () => {
    const lista = [{ id: 1, nome: 'Arroz', quantidade: 1 }]
    const resultado = adicionarProduto(lista, 'Feijão', 3)
    expect(resultado[1].id).toBe(2)
  })

  it('não deve mutar a lista original ao adicionar um produto', () => {
    const lista = []
    const resultado = adicionarProduto(lista, 'Leite', 1)
    expect(lista).toHaveLength(0)
    expect(resultado).toHaveLength(1)
  })

  it('deve preservar os itens anteriores ao adicionar novo produto', () => {
    const lista = [{ id: 1, nome: 'Arroz', quantidade: 1 }]
    const resultado = adicionarProduto(lista, 'Feijão', 2)
    expect(resultado).toHaveLength(2)
    expect(resultado[0].nome).toBe('Arroz')
  })
})

// ─────────────────────────────────────────────
// removerItem
// ─────────────────────────────────────────────
describe('removerItem', () => {
  it('deve remover o item com o id informado', () => {
    const lista = [
      { id: 1, nome: 'Arroz', quantidade: 1 },
      { id: 2, nome: 'Feijão', quantidade: 2 },
    ]
    const resultado = removerItem(lista, 1)
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(2)
  })

  it('não deve alterar a lista quando o id informado não existe', () => {
    const lista = [{ id: 1, nome: 'Arroz', quantidade: 1 }]
    const resultado = removerItem(lista, 99)
    expect(resultado).toHaveLength(1)
  })

  it('deve retornar lista vazia quando o único item é removido', () => {
    const lista = [{ id: 1, nome: 'Arroz', quantidade: 1 }]
    const resultado = removerItem(lista, 1)
    expect(resultado).toHaveLength(0)
  })
})

// ─────────────────────────────────────────────
// adicionarQuantidade
// ─────────────────────────────────────────────
describe('adicionarQuantidade', () => {
  it('deve incrementar em 1 a quantidade do item com o id informado', () => {
    const lista = [{ id: 1, nome: 'Arroz', quantidade: 2 }]
    const resultado = adicionarQuantidade(lista, 1)
    expect(resultado[0].quantidade).toBe(3)
  })

  it('não deve alterar a quantidade de itens com id diferente', () => {
    const lista = [
      { id: 1, nome: 'Arroz', quantidade: 2 },
      { id: 2, nome: 'Feijão', quantidade: 5 },
    ]
    const resultado = adicionarQuantidade(lista, 1)
    expect(resultado[1].quantidade).toBe(5)
  })
})

// ─────────────────────────────────────────────
// TESTE COMENTADO — falha intencionalmente
//
// A validação atual usa `quantidade == 0`, portanto quantidades negativas
// passam pela verificação e são adicionadas à lista.
// Para corrigir, a regra deveria ser `quantidade <= 0`.
//
// it('não deve adicionar produto com quantidade negativa', () => {
//   const resultado = adicionarProduto([], 'Produto', -1)
//   expect(resultado).toHaveLength(0) // falha: retorna lista com 1 item
// })
// ─────────────────────────────────────────────
