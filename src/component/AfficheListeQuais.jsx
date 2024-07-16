import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormQuai from '../pages/Formulaire/FormQuai';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// variable
const columns = [
    { width: 150, label: 'Nom', dataKey: 'nom' },
    { width: 150, label: 'Type', dataKey: 'type' },
    { width: 150, label: 'Emplacement', dataKey: 'emplacementQuai' },
    { width: 150, label: 'Profondeur (m)', dataKey: 'profondeurQuai', numeric: true },
    { width: 200, label: 'Longueur Disponible (m)', dataKey: 'longueurDispo', numeric: true },
    { width: 150, label: 'Actions', dataKey: 'action' }
];

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

function fixedHeaderContent() {

    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{ fontWeight: 'bold', textAlign: column.dataKey === 'action' && 'center', backgroundColor: 'background.paper' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row, onEdit, onDelete) {
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

const AfficheListeQuais = () => {
    const [editData, setEditData] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const fetchData = async () => {
        const reponse = await axios.get("http://localhost:8081/quai/getAll");
        return reponse.data;
    }

    const {isPending, isError, data = [], error} = useQuery({
        queryKey: ["quais"],
        queryFn: fetchData
    });

    const handleEdit = (row) => {
        setEditData(row);
        setOpenEditDialog(true);
    };

    const handleDelete = (row) => {
        // hey heyy !
    }

    if (isPending) {
        return <h3>chargement de la liste...</h3>
    }

    if (isError) {
        console.log(error);
        return <h3>Une erreur s'est produit</h3>
    }

    return (
        <Paper style={{ height: "57vh", width: '75%' }}>
            <TableVirtuoso
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={(index, row) => rowContent(index, row, handleEdit, handleDelete)}
            />
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Modifier le Quai</DialogTitle>
                <DialogContent>
                    <FormQuai initialValues={editData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default AfficheListeQuais;