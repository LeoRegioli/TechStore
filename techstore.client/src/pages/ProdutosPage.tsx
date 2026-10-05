import { useEffect, useState } from "react";
import type { Produto } from "../produtos/Produto";
import { type CriarProdutoRequest, atualizarProduto, buscarProdutos, criarProduto, deletarProduto } from "../produtos/produtoService";
import { ProdutoForm } from "../produtos/ProdutoForm";
import { ProdutoGrid } from "../produtos/ProdutoGrid";
import { buscarCategorias } from "../categorias/categoriaService";
import type { Categoria } from "../categorias/Categoria";
import { Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, makeStyles } from "@fluentui/react-components";
import { Add20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    page: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },

    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

function ProdutosPage() {
    const styles = useStyles();

    
    // const [erro, setErro] = useState<string | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [formAberto, setFormAberto] = useState(false);

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoNome, setProdutoNome] = useState("");
    const [produtoDescricao, setProdutoDescricao] = useState("");
    const [produtoPreco, setProdutoPreco] = useState('');
    const [produtoCategoriaId, setProdutoCategoriaId] = useState<number | null>(null);
    const [produtoEmEdicaoId, setProdutoEmEdicaoId] = useState<number | null>(null);

    const carregarCategorias = async () => {
        const dados = await buscarCategorias();
        setCategorias(dados);
    }

    const onSalvarProduto = async () => {

        if (produtoCategoriaId == null)
            return;

        const produtoRequest: CriarProdutoRequest = {
            nome: produtoNome,
            descricao: produtoDescricao,
            preco: Number(produtoPreco),
            categoriaId: produtoCategoriaId
        }

        try {
            const novoProduto = await criarProduto(produtoRequest);
            setProdutos(produtosAtuais => [...produtosAtuais, novoProduto]);
        } catch (error) {
            console.log(error);
            // if (error instanceof Error) {
            //     setErro(error.message);
            // } else {
            //     setErro("Ocorreu um erro ao salvar.");
            // }
        } finally {
            setFormAberto(false);
            setProdutoNome("");
            setProdutoDescricao("");
            setProdutoPreco('');
            setProdutoCategoriaId(null);
        }
    }

    const removerProduto = async (id: number) => {
        const confirmou = window.confirm(
            "Deseja realmente excluir este produto?"
        );

        if (!confirmou)
            return;

        await deletarProduto(id);
        setProdutos(produtoAtuais => produtoAtuais.filter(x => x.id !== id));
    }

    const carregarProdutos = async () => {
        const dados = await buscarProdutos();
        setProdutos(dados);
        console.log(dados);
    }

    const onAtualizarProduto = async () => {

        if (produtoEmEdicaoId === null || produtoCategoriaId === null) {
            return;
        }

        const request = {
            id: produtoEmEdicaoId,
            nome: produtoNome,
            descricao: produtoDescricao,
            preco: Number(produtoPreco),
            categoriaId: produtoCategoriaId
        };

        const produtoAtualizado = await atualizarProduto(request);

        setProdutos(atuais =>
            atuais.map(produto =>
                produto.id === produtoAtualizado.id
                    ? produtoAtualizado
                    : produto
            )
        );
        setProdutoEmEdicaoId(null);
        setProdutoNome("");
        setProdutoDescricao("");
        setProdutoPreco('');
        setProdutoCategoriaId(null);
        setFormAberto(false);
    };

    const popularFormProduto = (produto: Produto) => {
        setProdutoNome(produto.nome);
        setProdutoDescricao(produto.descricao);
        setProdutoPreco(String(produto.preco));
        setProdutoCategoriaId(produto.categoriaId);
        setProdutoEmEdicaoId(produto.id);

        setFormAberto(true);
    };

    const novoProduto = () => {
        setProdutoEmEdicaoId(null);
        setProdutoNome("");
        setProdutoDescricao("");
        setProdutoPreco('');
        setProdutoCategoriaId(null);

        setFormAberto(true);
    };

    useEffect(() => {
        carregarCategorias();
        carregarProdutos();
    }, []);

    return (

        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Produtos</h1>

                <Button
                    icon={<Add20Regular />}
                    appearance="primary"
                    onClick={novoProduto}
                >
                    Novo produto
                </Button>
            </div>

            <ProdutoGrid
                produtos={produtos}
                onEditar={popularFormProduto}
                onDeletar={removerProduto}
            />

            <Dialog
                open={formAberto}
                onOpenChange={(_, data) => setFormAberto(data.open)}
            >
                <DialogSurface>
                    <DialogBody>

                        <DialogTitle>
                            {produtoEmEdicaoId === null
                                ? "Novo produto"
                                : "Editar produto"}
                        </DialogTitle>

                        <DialogContent>
                            <ProdutoForm
                                nome={produtoNome}
                                descricao={produtoDescricao}
                                preco={produtoPreco}
                                categoriaId={produtoCategoriaId}
                                categorias={categorias}

                                emEdicao={produtoEmEdicaoId !== null}

                                onNomeChange={setProdutoNome}
                                onDescricaoChange={setProdutoDescricao}
                                onPrecoChange={setProdutoPreco}
                                onCategoriaChange={setProdutoCategoriaId}

                                onSalvar={onSalvarProduto}
                                onAtualizar={onAtualizarProduto}
                            />
                        </DialogContent>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div >
    );
}
export default ProdutosPage;