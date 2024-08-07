import React from 'react';

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

const ListeEscale = () => {
    return (
        <section className='listeEscale'>
            Welcome to ListeEscale !
        </section>
    );
};

export default ListeEscale;