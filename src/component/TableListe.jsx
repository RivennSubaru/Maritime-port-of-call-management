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
import { Box, InputAdornment, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import PrintIcon from '@mui/icons-material/Print';
import CreateIcon from '@mui/icons-material/Create';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const TableListe = ({columns, apiUrl, Item}) => {

    const actions = [
        { icon: <CreateIcon />, name: 'Ajouter' },
        { icon: <PrintIcon />, name: 'Imprimer PDF' },
        { icon: <FileDownloadIcon />, name: 'Imprimer Excel' },
      ];

    const fetchData = async () => {
        const reponse = await axios.get(apiUrl + "/getAll");
        return reponse.data;
    }

    const {isPending, isError, data = [], error} = useQuery({
        queryKey: [apiUrl],
        queryFn: fetchData
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState(''); // Etat pour la barre de recherche

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

    const handleAdd = () => {
        // Logique pour ajouter un élément
        console.log('Ajouter action clicked');
    };


    /* IMPRESSION PDF */
    const handlePrintPDF = () => {

        // init du document pdf
        const doc = new jsPDF();
        // En-tete de la table dans pdf (extraction des labels)
        const tableColumn = columns.map(col => col.label);

        // Création des lignes du tableau || on extrait les valeurs correspondant aux colonnes définies et on les ajoute à tableRows
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


    /* IMPORTATION EXCEL */
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
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
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
                                } else if (action.name === 'Imprimer Excel') {
                                    handlePrintExcel();
                                }
                            }}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
}

export default TableListe;