import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogContentText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormEscale from '../pages/Formulaire/FormEscale';

// Components
const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(columns) {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{ fontWeight: 'bold', textAlign: (column.dataKey == ('action' || 'escaleNavire' || 'escaleQuai')) && 'center', backgroundColor: 'background.paper' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row, columns, onEdit, onDelete, onEscale) {
    return (
        <React.Fragment>
        {columns.map((column) => {
            if (column.dataKey === 'action') {
                return (
                    <TableCell key={column.dataKey} align='center'>
                        <IconButton variant='contained' color='primary' onClick={() => onEdit(row)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton variant='contained' color='error' onClick={() => onDelete(row)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                )

            // escale à partir de la liste des quais
            } else if (column.dataKey === 'escaleQuai') {
                return (
                    <TableCell key={column.dataKey} align='center'>
                        <Button onClick={() => onEscale(row)} size='small' variant="contained">+ navire</Button>
                    </TableCell>
                )

            // escale à partir de la liste des navires
            } else if (column.dataKey === 'escaleNavire') {
                return(
                    <TableCell key={column.dataKey} align='center'>
                        <Button onClick={() => onEscale(row)} size='small' variant="contained">escale</Button>
                    </TableCell>
                )
            } else {
                return (
                    <TableCell key={column.dataKey} align={column.numeric || false ? 'right' : 'left'}>
                        {row[column.dataKey]}
                    </TableCell>
                );
            }
        })}
        </React.Fragment>
    );
}

const AfficheListe = ({ columns, apiUrl, FormComponent }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    // Fenetre des formulaires
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEscaleDialog, setOpenEscaleDialog] = useState(false);

    // Pour actualiser automatiquement la liste
    const queryClient = useQueryClient();

    // Recuperer la liste depuis le serveur
    const fetchData = async () => {
        const response = await axios.get(apiUrl + "/getAll");
        return response.data;
    }

    // Stocker la liste dans une variable, et utiliser isLoading etc...
    const { isLoading, isError, data = [], error } = useQuery({
        queryKey: [apiUrl],
        queryFn: fetchData
    });

    // Gestion de la suppression
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`${apiUrl}/${id}`);
        },
        onSuccess: () => {
            // Recharger la liste apres ajout ou modification
            queryClient.invalidateQueries([apiUrl]);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    // Gestion de la modification
    const handleEdit = (row) => {
        setSelectedRow(row);
        setOpenEditDialog(true);
    };

    // Gestion de l'apparition de la formulaire d'escale
    const handleEscale = (row) => {
        setSelectedRow(row);
        setOpenEscaleDialog(true);
    }

    const handleDelete = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        toast.promise(
            deleteMutation.mutateAsync(selectedRow.id),
            {
                loading: "Chargement...",
                success: "Item supprimé",
                error: "Erreur lors de la suppression de l'item"
            }
        );
        setOpenDeleteDialog(false);
        /* console.log(selectedRow.id); */
    };

    if (isLoading) {
        return <h3>Chargement de la liste...</h3>
    }

    if (isError) {
        console.log(error);
        return <h3>Une erreur s'est produite</h3>
    }

    return (
        <Paper style={{ height: "57vh", width: '100%' }}>

            {/* La liste */}
            <TableVirtuoso
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => fixedHeaderContent(columns)}
                itemContent={(index, row) => rowContent(index, row, columns, handleEdit, handleDelete, handleEscale)}
            />


            {/* FORMULAIRE DE MODIFICATION (Soit Navire, Soit Quai) */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Modifier</DialogTitle>
                <DialogContent>
                    <FormComponent initialValues={selectedRow}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            {/* FORMULAIRE D'ESCALE */}
            <Dialog open={openEscaleDialog} onClose={() => setOpenEscaleDialog(false)}>
                <DialogTitle>Escale</DialogTitle>
                <DialogContent>
                    <FormEscale initialValues={selectedRow}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEscaleDialog(false)} color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            {/* FENÊTRE DE SUPPRESSION */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Supprimer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer cet item ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Annuler</Button>
                    <Button onClick={handleConfirmDelete}>Supprimer</Button>
                </DialogActions>
            </Dialog>
            
        </Paper>
    );
}

export default AfficheListe;
