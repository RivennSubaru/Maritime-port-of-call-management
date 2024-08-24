import React from 'react';
import FormEscale from './Formulaire/FormEscale';
import TableListe from '../component/TableListe';
import { formatDate } from '../_utils/dateFormatter';
import { Typography } from '@mui/material';
import NotifCollapse from '../component/NotifCollapse';
import { useState } from 'react';

const columns = [
    { id: 'numEscale', label: 'Numéro d\'Escale', minWidth: 100 },
    { id: 'nomNav', label: 'Navire', minWidth: 50 },
    { id: 'nomQuai', label: 'Quai', minWidth: 50 },
    {
      id: 'provenance',
      label: 'Provenance',
      minWidth: 50,
      align: 'left',
    },
    {
      id: 'destination',
      label: 'Déstination',
      minWidth: 50,
      align: 'left',
    },
    {
      id: 'ETD',
      label: 'ETD',
      minWidth: 50,
      align: 'left',
      format: formatDate,
    },
    {
      id: 'ETA',
      label: 'ETA',
      minWidth: 50,
      align: 'left',
      format: formatDate,
    },
    {
      id: 'typeMouvement',
      label: 'Mouvement',
      minWidth: 30,
      align: 'left',
    },
    {
      id: 'etatEscale',
      label: 'Etat',
      minWidth: 30,
      align: 'left',
    },
    {
      id: 'ATD',
      label: 'ATD',
      minWidth: 30,
      align: 'left',
      format: formatDate,
    },
    {
      id: 'ATA',
      label: 'ATA',
      minWidth: 30,
      align: 'left',
      format: formatDate,
    },
];

const ListeEscale = () => {
    const [numEscale, setNumEscale] = useState();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");

    const [displayButton, setDisplayButton] = useState(false);

    const Message = () => {
      if (!numEscale) {
        return <>Rien à afficher pour le moment</>;
      }

      if (type == 'ajout') {
        
        return (
          <>
            Escale créée avec succès. Numero : <span style={{fontWeight: "bold"}} >{numEscale}</span>
          </>
        );
      }

      if (type == 'modification') {
        
        return (
          <>
            Escale modifiée avec succès. Numero : <span style={{fontWeight: "bold"}} >{numEscale}</span>
          </>
        );
      }
    }

    return (
        <>
            <h2 style={{color:"#728699", fontWeight:"500"}}>Liste des escales</h2 >
            <NotifCollapse Message={Message} open={open} setOpen={setOpen} displayButton={displayButton}/>
            <section className='listeEscale'>
                <TableListe
                    columns={columns}
                    apiUrl="http://localhost:8081/escale"
                    Item="escale"
                    FormComponent={FormEscale}
                    setNotif={{setNumEscale, setOpen, setType, setDisplayButton}}
                />
            </section>
        </>
    );
};

export default ListeEscale;