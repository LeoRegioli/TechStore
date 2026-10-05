import { useEffect, useState } from "react";
import type { Categoria } from "../categorias/Categoria";
import { atualizarCategoria, buscarCategorias, deletarCategoria, salvarCategoria, type CriarCategoriaRequest } from "../categorias/categoriaService";
import { CategoriaForm } from "../categorias/CategoriaForm";
import { CategoriaGrid } from "../categorias/CategoriaGrid";
import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, makeStyles } from "@fluentui/react-components";
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


export function CategoriasPage() {
    const styles = useStyles();

    const [formAberto, setFormAberto] = useState(false);
    const [categoriaNome, setCategoriaNome] = useState("");
    const [categoriaDescricao, setCategoriaDescricao] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaEmEdicaoId, setCategoriaEmEdicaoId] = useState<number | null>(null);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const onSalvarCategoria = async () => {

        if (categoriaNome == null || categoriaNome == '') return;

        const categoriaRequest: CriarCategoriaRequest = {
            "nome": categoriaNome,
            "descricao": categoriaDescricao
        }

        try {
            setSalvando(true);
            const novaCategoria = await salvarCategoria(categoriaRequest);
            setCategorias(categoriaAtuais => [...categoriaAtuais, novaCategoria]);
            setCategoriaNome('');
            setCategoriaDescricao('');
            setErro('');
            console.log(categoriaRequest);
        } catch (error) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Ocorreu um erro ao salvar.");
            }
        } finally {
            setSalvando(false);
            setFormAberto(false);
        }
    }

    const removerCategoria = async (id: number) => {
        const confirmou = window.confirm(
            "Deseja realmente excluir esta categoria?"
        );

        if (!confirmou)
            return;

        await deletarCategoria(id);
        setCategorias(categoriaAtuais => categoriaAtuais.filter(x => x.id !== id));
    }

    const onAtualizarCategoria = async () => {
        if (categoriaEmEdicaoId === null) return;

        const categoria: Categoria = {
            id: categoriaEmEdicaoId,
            nome: categoriaNome,
            descricao: categoriaDescricao
        }

        const categoriaAtualizada = await atualizarCategoria(categoria);
        setCategorias(categoriasAtuais =>
            categoriasAtuais.map(categoria =>
                categoria.id === categoriaAtualizada.id ? categoriaAtualizada : categoria
            )
        );

        setCategoriaEmEdicaoId(null);
        setCategoriaNome("");
        setCategoriaDescricao("");

        setFormAberto(false);
    }

    const popularFormCategoria = (categoria: Categoria) => {
        setCategoriaEmEdicaoId(categoria.id);
        setCategoriaNome(categoria.nome);
        setCategoriaDescricao(categoria.descricao);

        setFormAberto(true);
    }

    const carregarCategorias = async () => {
        const dados = await buscarCategorias();
        setCategorias(dados);
    }

    const novaCategoria = () => {
        setCategoriaEmEdicaoId(null);
        setCategoriaNome("");
        setCategoriaDescricao("");

        setFormAberto(true);
    };

    useEffect(() => {
        console.log('Buscando categorias');
        carregarCategorias();
    }, []);

    return (
        <div className={styles.page}>

            <div className={styles.header}>
                <h1>Categorias</h1>

                <Button
                    icon={<Add20Regular />}
                    appearance="primary"
                    onClick={novaCategoria}
                >
                    Nova categoria
                </Button>
            </div>

            <CategoriaGrid
                categorias={categorias}
                onEditar={popularFormCategoria}
                onDeletar={removerCategoria}
            />

            <Dialog
                open={formAberto}
                onOpenChange={(_, data) => setFormAberto(data.open)}
            >
                <DialogSurface>
                    <DialogBody>

                        <DialogTitle>
                            {categoriaEmEdicaoId === null
                                ? "Nova categoria"
                                : "Editar categoria"}
                        </DialogTitle>

                        <DialogContent>
                            <CategoriaForm
                                nome={categoriaNome}
                                descricao={categoriaDescricao}

                                emEdicao={categoriaEmEdicaoId !== null}

                                onNomeChange={setCategoriaNome}
                                onDescricaoChange={setCategoriaDescricao}

                                onSalvar={onSalvarCategoria}
                                onAtualizar={onAtualizarCategoria}
                                erro={erro}
                                salvando={salvando} />
                        </DialogContent>

                    </DialogBody>
                </DialogSurface>
            </Dialog>

        </div>
    );
}