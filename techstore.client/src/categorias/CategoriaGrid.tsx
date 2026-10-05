import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridRow, makeStyles } from "@fluentui/react-components";
import type { Categoria } from "./Categoria";

interface CategoriaGridProps {
    categorias: Categoria[];

    onDeletar: (id: number) => void
    onEditar: (categoria: Categoria) => void;
}

const useStyles = makeStyles({
    actions: {
        display: "flex",
        gap: "8px",
        justifyContent: "flex-start",
    },
});

export function CategoriaGrid(props: CategoriaGridProps) {
    const styles = useStyles();
    const colunas = [
        createTableColumn<Categoria>({
            columnId: 'nome',
            renderHeaderCell: () => 'Nome',
            renderCell: (categoria) => categoria.nome
        }),

        createTableColumn<Categoria>({
            columnId: 'descricao',
            renderHeaderCell: () => 'Descricao',
            renderCell: (categoria) => categoria.descricao
        }),

        createTableColumn<Categoria>({
            columnId: 'acoes',
            renderHeaderCell: () => 'Ações',
            renderCell: (categoria) => (
                <div className={styles.actions}>
                    <Button onClick={() => props.onEditar(categoria)}>
                        Editar
                    </Button>

                    <Button appearance="primary" onClick={() => props.onDeletar(categoria.id)} >
                        Excluir
                    </Button>
                </div>
            )
        })
    ];

    return (
        <div>
            <DataGrid items={props.categorias} columns={colunas}>
                <DataGridHeader>
                    <DataGridRow>
                        {({ renderHeaderCell }) => (
                            <DataGridCell>
                                {renderHeaderCell()}
                            </DataGridCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>

                <DataGridBody<Categoria>>
                    {({ item, rowId }) => (
                        <DataGridRow<Categoria> key={rowId} >
                            {({ renderCell }) => (
                                <DataGridCell>
                                    {renderCell(item)}
                                </DataGridCell>
                            )}
                        </DataGridRow>
                    )}
                </DataGridBody>
            </DataGrid>
        </div>
    );
}