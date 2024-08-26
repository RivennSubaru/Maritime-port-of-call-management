import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import PrintIcon from '@mui/icons-material/Print';
import CreateIcon from '@mui/icons-material/Create';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import { useState } from 'react';
import Draggable from 'react-draggable';
import ErrorIcon from '@mui/icons-material/Error';
import { toast } from 'react-hot-toast';

// Fonction pour surligner le texte recherché
const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="highlight">
                {part}
            </span>
        ) : (
            part
        )
    );
};

function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
}

const TableListe = ({columns, apiUrl, Item, FormComponent, setNotif}) => {

    //Recuperation du token
    const token = localStorage.getItem("token");

    // Icone et label des menus rapides
    const actions = [
        { icon: <CreateIcon />, name: 'Ajouter' },
        { icon: <PrintIcon />, name: 'Imprimer PDF' },
        { icon: <FileDownloadIcon />, name: 'Exporter Excel' },
    ];

    // Recuperation des donnée à afficher
    const fetchData = async () => {

        // Si c'est userManager donc admin, il faut securiser
        if (Item === "utilisateur") {

            const reponse = await axios.get(apiUrl + "/getAll", {
                headers: {
                    Authorization: token
                }
            });
            return reponse.data;

        } else {

            const reponse = await axios.get(apiUrl + "/getAll");
            return reponse.data;
        }

    }
    const {isPending, isError, data = [], error} = useQuery({
        queryKey: [apiUrl],
        queryFn: fetchData
    });

    /* STATES */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [search, setSearch] = useState(''); // Etat pour la barre de recherche
    const [openFormDialog, setOpenFormDialog] = useState(false);  // Etat pour l'ouverture de la fenetre du formulaire
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    /* Gestion de recherche */
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    /* Filtrer les données */
    const filteredData = data.filter((row) => {
        return columns.some((column) => {
            const value = row[column.id];
            if (value != null) {
                return value.toString().toLowerCase().includes(search.toLowerCase());
            }
            return false;
        });
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    /* IMPRESSION PDF */
    const handlePrintPDF = () => {

        // init du document pdf
        const doc = new jsPDF();
        // En-tete de la table dans pdf (extraction des labels)
        const tableColumn = columns.map(col => col.label);

        // Création des lignes du tableau
        // On extrait les valeurs correspondant aux colonnes définies et on les ajoute à tableRows
        const tableRows = [];
        filteredData.forEach(row => {
          const rowData = columns.map(col => row[col.id]);
          tableRows.push(rowData);
        });
    
        // Génération du tableau dans le PDF
        doc.autoTable({
          head: [tableColumn],  // en-tête
          body: tableRows,      // lignes
          startY: 20,           // position de départ du tableau sur l'axe Y (20 unités à partir du haut).
        });

        // Enregistrement du document PDF
        doc.save('table_data.pdf');
    };


    /* EXPORTATION EXCEL */
    const handlePrintExcel = async () => {

        /* Initialisation du classeur Excel */
        const workbook = new ExcelJS.Workbook();            // créer un nouveau classeur Excel.
        const worksheet = workbook.addWorksheet('Sheet1');  // ajoute une nouvelle feuille de calcul nommée Sheet1.
    
        // Ajout de la ligne d'en-tête
        // Les étiquettes des colonnes (label) sont ajoutées comme en-tête de la première ligne de la feuille.
        const headerRow = worksheet.addRow(columns.map(col => col.label));
    
        // Ajout des lignes de données
        filteredData.forEach(row => {
            const rowData = columns.map(col => row[col.id]);
            worksheet.addRow(rowData);
        });
    
        // Écriture des données dans un buffer
        const buffer = await workbook.xlsx.writeBuffer();

        //Création d'un blob et enregistrement du fichier
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'table_data.xlsx');
    };

    // Fonction pour ouvrir la fenetre
    const handleAdd = () => {
        setOpenFormDialog(true);
    };

    const handleEdit = (row) => {
        setSelectedRow(row);
        setOpenFormDialog(true);
        /* console.log(row); */
    }

    const handleDelete = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
        /* console.log(row); */
    }

    // Fonction pour fermer le formulaire et 
    const handleCloseForm = () => {
        setOpenFormDialog(false); 
        setSelectedRow(null);   // Rendre null apres fermeture du formulaire de modification
    }

    // Pour actualiser automatiquement la liste
    const queryClient = useQueryClient();

    // Gestion de la suppression
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            if (Item == 'navire') {
                await axios.delete(`http://localhost:8081/changement/nav/${id}`);
                await axios.delete(`http://localhost:8081/escale/nav/${id}`);
                await axios.delete(`${apiUrl}/${id}`);
            } else if (Item == 'utilisateur') {

                await axios.delete(`${apiUrl}/${id}`);
            }
        },
        onSuccess: () => {
            // Recharger la liste apres ajout ou modification
            queryClient.invalidateQueries([apiUrl]);
        },
        onError: (error) => {
            console.log(error);
        }
    });

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

    if (isPending) {
        return <p>chargement de la liste...</p>  
    }

    if (isError) {
        console.log(error);
        return <p>Une erreur s'est produit</p>
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <TextField
                    placeholder='Recherche...'
                    variant="outlined" 
                    value={search} 
                    onChange={handleSearchChange}
                    style={{ width: '40%' }} // Set width to 40%
                    fullWidth 
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            borderRadius: '9999px', // rounded corners like Google
                            height: '40px', // adjust height
                        },
                    }}
                    sx={{
                        '.MuiOutlinedInput-root': {
                            backgroundColor: '#f1f3f4', // light gray background like Google
                            '&:hover fieldset': {
                                borderColor: '#dfe1e5', // border color on hover like Google
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#dfe1e5', // border color when focused like Google
                            },
                        },
                    }}
                />
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth, fontWeight: 'bold'  }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                            <TableCell key="action" align="center" style={{ fontWeight: 'bold' }}>
                                {Item != 'escale' ? "Action" : "Modifier"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                const formattedValue = column.format ? column.format(value) : value;
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {value != null
                                        ? highlightSearchTerm(formattedValue.toString(), search)
                                        : value}
                                    </TableCell>
                                );
                                })}
                                <TableCell align="center" sx={{padding: '0 !important'}}>
                                    <IconButton
                                        sx={{
                                            color: 'gray', // Couleur de base
                                            '&:hover': {
                                                color: 'primary.main', // Couleur au survol (par défaut la couleur primaire de MUI)
                                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                            }
                                        }}
                                        onClick={() => handleEdit(row)}
                                    >
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                    {Item != 'escale' &&
                                    <IconButton
                                        sx={{
                                            color: 'gray', // Couleur de base
                                            '&:hover': {
                                                color: 'error.main', // Couleur au survol (par défaut la couleur d'erreur de MUI)
                                                backgroundColor: 'rgba(211, 47, 47, 0.04)'
                                            }
                                        }}
                                        onClick={() => handleDelete(row)}
                                    >
                                        <DeleteIcon fontSize='small' />
                                    </IconButton>
                                    }
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {
                // Gestion d'utilisateur pas besoin d'impression
                Item !== 'utilisateur' &&
                    <Box sx={{ position: 'fixed', right: 0, bottom: 0, zIndex: 999999 }}>
                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            sx={{ position: 'absolute', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={() => {
                                        if (action.name === 'Ajouter') {
                                            handleAdd();
                                        } else if (action.name === 'Imprimer PDF') {
                                            handlePrintPDF();
                                        } else if (action.name === 'Exporter Excel') {
                                            handlePrintExcel();
                                        }
                                    }}
                                />
                            ))}
                        </SpeedDial>
                    </Box>
            }
            <Dialog
                open={openFormDialog}
                onClose={() => setOpenFormDialog(false)}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers>
                    <FormComponent initialValues={selectedRow} handleClose={handleCloseForm} setNotif={setNotif}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseForm}>Annuler</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" display= 'flex' alignItems='center' gap='15px'>
                    <ErrorIcon color='error' sx={{ fontSize: '2.5rem !important' }}/>
                    Supprimer {Item}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {Item === "navire" &&
                        <>
                            Cette action effacera toutes les données de la ligne selectionnée ainsi que les escales qui y sont reliés.<br /><br />
                        </>}
                            Êtes-vous sûr de vouloir supprimer cet item ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpenDeleteDialog(false)}>
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color='error'>Supprimer</Button>
                </DialogActions>
            </Dialog> 
        </>
    );
}

// Style CSS pour le surlignage
const style = document.createElement('style');
style.innerHTML = `
  .highlight {
    background-color: yellow;
  }
`;
document.head.appendChild(style);

export default TableListe;