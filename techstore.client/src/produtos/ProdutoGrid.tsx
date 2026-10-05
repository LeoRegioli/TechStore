import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridRow, makeStyles } from "@fluentui/react-components";
import type { Produto } from "./Produto";
import type { Categoria } from "../categorias/Categoria";

interface ProdutoGridProps {
    produtos: Produto[];
    onEditar: (produto: Produto) => void;
    onDeletar: (id: number) => void;
}

const useStyles = makeStyles({
    actions: {
        display: "flex",
        gap: "8px",
        justifyContent: "flex-start",
    },
});

export function ProdutoGrid(props: ProdutoGridProps) {
    const styles = useStyles();

    const colunas = [
        createTableColumn<Produto>({
            columnId: 'nome',
            renderHeaderCell: () => 'Nome',
            renderCell: (produto) => produto.nome
        }),

        createTableColumn<Produto>({
            columnId: 'descricao',
            renderHeaderCell: () => 'Descricao',
            renderCell: (produto) => produto.descricao
        }),

        createTableColumn<Produto>({
            columnId: 'preco',
            renderHeaderCell: () => 'Preço',
            renderCell: (produto) => produto.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }),

        createTableColumn<Produto>({
            columnId: 'categoria',
            renderHeaderCell: () => 'Categoria',
            renderCell: (produto) => produto.categoriaNome
        }),

        createTableColumn<Produto>({
            columnId: 'acoes',
            renderHeaderCell: () => 'Ações',
            renderCell: (produto) => (
                <div className={styles.actions}>
                    <Button onClick={() => props.onEditar(produto)}>
                        Editar
                    </Button>

                    <Button
                        appearance="primary"
                        onClick={() => props.onDeletar(produto.id)}
                    >
                        Excluir
                    </Button>
                </div>
            )
        })
    ];

    return (
        <div>
            <DataGrid items={props.produtos} columns={colunas}>
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
    )
}