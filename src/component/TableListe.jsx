import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import PrintIcon from '@mui/icons-material/Print';
import CreateIcon from '@mui/icons-material/Create';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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

const TableListe = ({columns, apiUrl, Item, FormComponent}) => {

    // Icone et label des menus rapides
    const actions = [
        { icon: <CreateIcon />, name: 'Ajouter' },
        { icon: <PrintIcon />, name: 'Imprimer PDF' },
        { icon: <FileDownloadIcon />, name: 'Exporter Excel' },
    ];

    // Recuperation des donnée à afficher
    const fetchData = async () => {
        const reponse = await axios.get(apiUrl + "/getAll");
        return reponse.data;
    }
    const {isPending, isError, data = [], error} = useQuery({
        queryKey: [apiUrl],
        queryFn: fetchData
    });

    /* STATES */
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [search, setSearch] = React.useState(''); // Etat pour la barre de recherche
    const [open, setOpen] = React.useState(false);  // Etat pour l'ouverture de la fenetre du formulaire

    
    // Fonction pour fermer la fenetre
    const handleClose = () => {
        setOpen(false);
    };
    // Fonction pour ouvrir la fenetre
    const handleAdd = () => {
        setOpen(true);
    };

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

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

    if (isPending) {
        return <h3>chargement de la liste...</h3>  
    }

    if (isError) {
        console.log(error);
        return <h3>Une erreur s'est produit</h3>
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
                {/* Barre de recherche */}
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
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {value != null
                                        ? highlightSearchTerm(value.toString(), search)
                                        : value}
                                    </TableCell>
                                );
                                })}
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
            <Box sx={{ position: 'relative', height: 320 }}>
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
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <FormComponent/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
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