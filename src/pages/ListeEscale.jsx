import React from 'react';
import FormEscale from './Formulaire/FormEscale';
import TableListe from '../component/TableListe';

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
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'ETA',
      label: 'ETA',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'typeMouvement',
      label: 'Mouvement',
      minWidth: 30,
      align: 'left',
    },
    {
      id: 'ATA',
      label: 'ATA',
      minWidth: 100,
      align: 'left',
    },
];

const ListeEscale = () => {
    return (
        <>
            <h2>Liste des escales</h2>
            <section className='listeEscale'>
                <TableListe
                    columns={columns}
                    apiUrl="http://localhost:8081/escale"
                    Item="escale"
                    FormComponent={FormEscale}
                />
            </section>
        </>
    );
};

export default ListeEscale;