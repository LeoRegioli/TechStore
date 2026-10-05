import type { Produto } from "./Produto";

const API_URL = `${import.meta.env.VITE_API_URL}/produtos`;

export interface CriarProdutoRequest {
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: number;
}

export interface AtualizarProdutoRequest {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: number;
}

export async function buscarProdutos(): Promise<Produto[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        console.log('Erro: ', response.status);
        throw Error(`Erro: ${response.status}`);
    }

    const dados: Produto[] = await response.json();
    console.log(dados);

    return dados;
}

export async function criarProduto(produto: CriarProdutoRequest): Promise<Produto> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(produto)
    });

    if (!response.ok) {
        throw Error(`Error: ${response.status}`)
    }

    return response.json();
}

export async function atualizarProduto(produto: AtualizarProdutoRequest ): Promise<Produto> {

    const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar produto.");
    }

    return await response.json();
}

export async function deletarProduto(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw Error(`Error: ${response.status}`);
    }
}