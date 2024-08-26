import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon
import RemoveIcon from '@mui/icons-material/Remove';
import ErrorIcon from '@mui/icons-material/Error';
import PrintIcon from '@mui/icons-material/Print';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { toast } from 'react-hot-toast';
import Draggable from 'react-draggable';
import FormQuai from './Formulaire/FormQuai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import jsPDF from 'jspdf';
import ExcelJS from 'exceljs';
import AssignNav from '../component/AssignNav';

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

const columns = [
    { id: 'nomQuai', label: 'Nom'},
    { id: 'emplacementQuai', label: 'Emplacement'},
    { id: 'profondeurQuai', label: 'Profondeur (m)'},
    { id: 'longueursQuai', label: 'Longueur (m)'},
];

function Row({ row, search, handleAddNav, handleEdit, handleDelete, handleRemoveAssign } ) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {highlightSearchTerm(row.nomQuai.toString(), search)}
                </TableCell>
                <TableCell align="right">{highlightSearchTerm(row.emplacementQuai.toString(), search)}</TableCell>
                <TableCell align="right">{highlightSearchTerm(row.profondeurQuai.toString(), search)}</TableCell>
                <TableCell align="right">{highlightSearchTerm(row.longueursQuai.toString(), search)}</TableCell>
                <TableCell align="center" sx={{padding: '0 !important'}}>
                    <IconButton
                        sx={{
                            color: 'gray', // Couleur de base
                            '&:hover': {
                                color: '#19d29a', // Couleur au survol (par défaut la couleur primaire de MUI)
                                backgroundColor: 'rgb(25 210 155 / 6%)'
                            }
                        }}
                        onClick={() => handleAddNav(row)}
                    >
                        <AddIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: 'gray', // Couleur de base
                            '&:hover': {
                                color: 'primary.main', // Couleur au survol (par défaut la couleur primaire de MUI)
                                backgroundColor: 'rgb(25 118 210 / 6%)'
                            }
                        }}
                        onClick={() => handleEdit(row)}
                    >
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: 'gray', // Couleur de base
                            '&:hover': {
                                color: 'error.main', // Couleur au survol (par défaut la couleur d'erreur de MUI)
                                backgroundColor: 'rgb(211 47 47 / 6%)'
                            }
                        }}
                        onClick={() => handleDelete(row)}
                    >
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Occupation
                            </Typography>
                            {
                                // Si l'idNav du premier objet de occupation n'est pas null (quai occupé) afficher la liste
                                row.occupation[0].idNav != null ?
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Navire</TableCell>
                                            <TableCell align="right">Type de Changement</TableCell>
                                            <TableCell align="right">Longueur (m)</TableCell>
                                            <TableCell align="right">Retirer</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.occupation.map((occ) => (
                                            <TableRow key={occ.dateChange}>
                                                <TableCell component="th" scope="row">
                                                    {occ.dateChange}
                                                </TableCell>
                                                <TableCell>{occ.nomNav}</TableCell>
                                                <TableCell align="right">{occ.typeChange}</TableCell>
                                                <TableCell align="right">{occ.longueursNav}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        sx={{
                                                            color: 'gray', // Couleur de base
                                                            '&:hover': {
                                                                color: 'error.main', // Couleur au survol (par défaut la couleur d'erreur de MUI)
                                                                backgroundColor: 'rgb(211 47 47 / 6%)'
                                                            }
                                                        }}
                                                        onClick={() => handleRemoveAssign({idNav: occ.idNav, longueurNav: occ.longueursNav, idQuai: row.idQuai})}
                                                    >
                                                        <RemoveIcon fontSize='small' />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                :
                                <p>Aucun navire</p>
                                // Si non afficher ceci
                            }
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const ListeQuai = () => {

    // Icone et label des menus rapides
    const actions = [
        { icon: <CreateIcon />, name: 'Ajouter' },
        { icon: <PrintIcon />, name: 'Imprimer PDF' },
        { icon: <FileDownloadIcon />, name: 'Exporter Excel' },
    ];

    // Recuperation des donnée à afficher
    const fetchData = async () => {
        const reponse = await axios.get("http://localhost:8081/quai/getAllOccup");
        return reponse.data;
    }
    const {isPending, isError, data = [], error} = useQuery({
        queryKey: ['quai'],
        queryFn: fetchData
    });

    // Parcours de chaque résultat pour parser la colonne occupation
    const quai = data.map(row => {
        return {
            ...row,
            occupation: JSON.parse(row.occupation)
        };
    });

    console.log(quai);

    const [search, setSearch] = useState(''); // Etat pour la barre de recherche

    const [openFormDialog, setOpenFormDialog] = useState(false);  // Etat pour l'ouverture de la fenetre du formulaire
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAssignNav, setOpenAssignNav] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    /* Filtrer les données */
    const filteredData = quai.filter((row) => {
        return columns.some((column) => {
            const value = row[column.id];
            if (value != null) {
                return value.toString().toLowerCase().includes(search.toLowerCase());
            }
            return false;
        });
    });

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

    // Pour actualiser automatiquement la liste
    const queryClient = useQueryClient();

    const removeAssignMutation = useMutation({

        mutationFn: async ({idNav, idQuai}) => {
    
            // Faire partir le navire
            await axios.post("http://localhost:8081/navire/update/changeSituation", {idNav, situationNav: "parti"});
    
            // Supprimer l'association du quai avec le navire
            await axios.post("http://localhost:8081/changement/remove", {idNav, idQuai});
          
        },
        onError: (error) => {
            setTimeout(() => {
                toast(
                    "Il semble que vous rencontriez un probleme.\n\n Le probleme peut venir soit de la connexion au serveur soit de la base de donnée ou une mauvaise connexion.\nVeuillez réessayer plus tard.",
                    {
                      duration: 12000,
                    }
                );
            }, 1000);
            console.log(error);
        },
        onSuccess: () => {
          // Recharger la liste apres l'operation
          queryClient.invalidateQueries("quai");
        }
      });

    // Gestion de la suppression
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`http://localhost:8081/escale/quai/${id}`);
            await axios.delete(`http://localhost:8081/changement/quai/${id}`);
            await axios.delete(`http://localhost:8081/quai/${id}`);
        },
        onSuccess: () => {
            // Recharger la liste
            queryClient.invalidateQueries('quai');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleConfirmDelete = async () => {

        await toast.promise(
            deleteMutation.mutateAsync(selectedRow.idQuai),
            {
                loading: "Chargement...",
                success: "Quai supprimé",
                error: "Erreur lors de la suppression de l'item"
            }
        );
        setOpenDeleteDialog(false);
        setSelectedRow(null);
        /* console.log(selectedRow.idQuai); */
    };

    const handleConfirmRemove = async () => {

        await toast.promise(
            removeAssignMutation.mutateAsync(selectedRow),
            {
              loading: "chargement...",
              success: "Navire retiré du quai",
              error: "Une erreur est survenue"
            }
        );
        setOpenRemoveDialog(false);
        setSelectedRow(null);
    }

    /* Gestion de recherche */
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    // Fonction pour ouvrir la fenetre
    const handleAdd = () => {
        setOpenFormDialog(true);
    };

    // Fonction pour ouvrir la fenetre d'assignation de navire
    const handleAddNav = (row) => {
        setSelectedRow(row);
        setOpenAssignNav(true);
    }

    const handleEdit = (row) => {
        setSelectedRow(row);
        setOpenFormDialog(true);
        console.log(row);
    }

    const handleDelete = (row) => {
        setSelectedRow(row);
        setOpenDeleteDialog(true);
        console.log(row);
    }

    const handleRemoveAssign = (occ) => {
        setSelectedRow(occ);
        setOpenRemoveDialog(true);
    }

    // Fonction pour fermer le formulaire et 
    const handleCloseForm = () => {
        setOpenFormDialog(false); 
        setSelectedRow(null);   // Rendre null apres fermeture du formulaire de modification
    }

    if (isPending) {
        return <p>chargement de la liste...</p>  
    }

    if (isError) {
        console.log(error);
        return <p>Une erreur s'est produit</p>
    }
    
    return (
        <>
            <h2 style={{color:"#728699", fontWeight:"500"}}>Liste de quais</h2>
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
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell sx={{fontWeight: "bold"}}>Nom du Quai</TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="right">Emplacement</TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="right">Profondeur (m)</TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="right">Longueur (m)</TableCell>
                            <TableCell sx={{fontWeight: "bold"}} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <Row key={row.idQuai} row={row} search={search} handleAddNav={handleAddNav} handleEdit={handleEdit} handleDelete={handleDelete} handleRemoveAssign={handleRemoveAssign}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

            <Dialog
                open={openFormDialog}
                onClose={() => setOpenFormDialog(false)}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogContent dividers>
                    <FormQuai initialValues={selectedRow} handleClose={handleCloseForm}/>
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
                    Supprimer ce quai
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Cette action effacera toutes les données de la ligne selectionnée. 
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
            <Dialog
                open={openRemoveDialog}
                onClose={() => setOpenRemoveDialog(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" display= 'flex' alignItems='center' gap='15px'>
                    <ErrorIcon sx={{ fontSize: '2.5rem !important',  color: 'primary.main' }}/>
                    Retrait de navire
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir retirer ce navire du quai ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpenRemoveDialog(false)}>
                        Annuler
                    </Button>
                    <Button onClick={handleConfirmRemove} variant="contained" color='error'>Retirer</Button>
                </DialogActions>
            </Dialog> 
            <Dialog
                open={openAssignNav}
                onClose={() => setOpenAssignNav(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" display= 'flex' alignItems='center' gap='15px'>
                    <ErrorIcon color='error' sx={{ fontSize: '2.5rem !important' }}/>
                    Affectation de navire
                </DialogTitle>
                <DialogContent>
                    <AssignNav quai={selectedRow}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpenAssignNav(false)}>
                        Annuler
                    </Button>
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

export default ListeQuai;
