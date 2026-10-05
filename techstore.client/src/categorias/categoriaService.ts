import type { Categoria } from "./Categoria";

const API_URL = `${import.meta.env.VITE_API_URL}/categorias`;

export interface CriarCategoriaRequest {
    nome: string;
    descricao: string;
}

export async function buscarCategorias(): Promise<Categoria[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        console.log('Erro: ', response.status);
        throw Error(`Erro: ${response.status}`);
    }

    const dados: Categoria[] = await response.json();
    console.log(dados);

    return dados;
}

export async function salvarCategoria(categoria: CriarCategoriaRequest): Promise<Categoria> {
    if (categoria.nome == '')
        throw Error(`Campo Nome está vazio.`);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(categoria)
    });

    if (!response.ok) {
        throw Error(`Erro: ${response.status}`);
    }

    return response.json();
}

export async function deletarCategoria(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw Error(`Error: ${response.status}`);
    }
}

export async function atualizarCategoria(categoria: Categoria): Promise<Categoria> {

    const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(categoria)
    });

    if (!response.ok) {
        throw Error(`Error: ${response.status}`);
    }

    return await response.json();
}