import { Button, Field, Input, makeStyles, MessageBar, MessageBarBody } from "@fluentui/react-components";

interface CategoriaFormProps {
    nome: string;
    descricao: string;
    erro: string | null;

    emEdicao: boolean;
    salvando: boolean;

    onNomeChange: (novoNome: string) => void;
    onDescricaoChange: (novaDescricao: string) => void;

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

export function CategoriaForm(props: CategoriaFormProps) {
    const styles = useStyles();
    return (
        <>
            {props.erro && (
                <MessageBar intent="error">
                    <MessageBarBody>
                        {props.erro}
                    </MessageBarBody>
                </MessageBar>
            )}

            <Field label="Nome da categoria">
                <Input value={props.nome} onChange={(_, data) => { props.onNomeChange(data.value) }} />
            </Field>

            <Field label="Descrição">
                <Input value={props.descricao} onChange={(_, data) => { props.onDescricaoChange(data.value) }} />
            </Field>
            <div className={styles.actions}>
                {
                    !props.emEdicao ?
                        <Button appearance="primary" onClick={props.onSalvar} disabled={props.salvando}>{props.salvando ? 'Salvando...' : 'Salvar'}</Button> :
                        <Button appearance="primary" onClick={props.onAtualizar}>Atualizar</Button>
                }
            </div>

        </>
    )
}