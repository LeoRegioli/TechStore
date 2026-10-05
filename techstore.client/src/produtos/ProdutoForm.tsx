import { Button, Field, Input, makeStyles, Select } from "@fluentui/react-components";
import type { Categoria } from "../categorias/Categoria";

interface ProdutoFormProps {
    nome: string;
    descricao: string;
    preco: string;
    categoriaId: number | null;
    categorias: Categoria[];

    emEdicao: boolean;


    onNomeChange: (nome: string) => void;
    onDescricaoChange: (descricao: string) => void;
    onPrecoChange: (preco: string) => void;
    onCategoriaChange: (categoriaId: number) => void;
    onSalvar: () => void;
    onAtualizar: () => void;
}

const useStyles = makeStyles({
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
        marginTop: "16px",
    },
});


export function ProdutoForm(props: ProdutoFormProps) {
    const styles = useStyles();
    return (
        <>
            <Field label="Nome">
                <Input value={props.nome} onChange={(_, data) => { props.onNomeChange(data.value) }} />
            </Field>

            <Field label="Descrição">
                <Input value={props.descricao} onChange={(_, data) => { props.onDescricaoChange(data.value) }} />
            </Field>
            <Field label="Preço">
                <Input value={props.preco} onChange={(_, data) => { props.onPrecoChange(data.value) }} />
            </Field>

            <Field label="Categoria">
                <Select
                    value={props.categoriaId?.toString() ?? ""}
                    onChange={(_, data) => {
                        props.onCategoriaChange(Number(data.value));
                    }}
                >
                    <option value="" disabled>
                        Selecione uma categoria
                    </option>

                    {props.categorias.map(categoria => (
                        <option
                            key={categoria.id}
                            value={categoria.id.toString()}
                        >
                            {categoria.nome}
                        </option>
                    ))}
                </Select>
            </Field>
            <div className={styles.actions}>
                {
                    !props.emEdicao ?
                        <Button appearance="primary" onClick={props.onSalvar} disabled={props.emEdicao}>{props.emEdicao ? 'Salvando...' : 'Salvar'}</Button> :
                        <Button appearance="primary" onClick={props.onAtualizar}>Atualizar</Button>
                }
            </div>
        </>
    )
}