import React from 'react';
import TableListe from '../component/TableListe';

const columns = [
    { id: 'numNav', label: 'Numéro Navire', minWidth: 170 },
    { id: 'nomNav', label: 'Nom Navire', minWidth: 100 },
    { id: 'nomPilote', label: 'Pilote', minWidth: 100 },
    {
      id: 'tirantEau',
      label: 'Tirant d\'Eau',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'longueur',
      label: 'Longueur',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'type',
      label: 'Type de Navire',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'situationNav',
      label: 'Situation',
      minWidth: 170,
      align: 'right',
    },
]; 

const ListeNavire = () => {
    return (
        <>
            <h2>Liste de navires</h2>
            <section className='listeNavire'>
                <TableListe
                    columns={columns}
                    apiUrl="http://localhost:8081/navire"
                    Item="navire"
                />
            </section>
        </>
    );
};

export default ListeNavire;