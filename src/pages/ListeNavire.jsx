import React from 'react';
import AfficheListe from '../component/AfficheListe';
import FormNavire from './Formulaire/FormNavire';

const columnsNavire = [
    { width: 150, label: 'Numeros', dataKey: 'numNav' },
    { width: 150, label: 'Nom', dataKey: 'nomNav' },
    { width: 150, label: 'Navigateur', dataKey: 'nomNavigateur' },
    { width: 150, label: 'Type', dataKey: 'type' },
    { width: 150, label: 'Tirant d\'eau', dataKey: 'tirantEau' },
    { width: 150, label: 'Longueurs', dataKey: 'longueur' },
    { width: 150, label: 'Situation', dataKey: 'situationNav' },
    { width: 150, label: 'Actions', dataKey: 'action' }
];

const ListeNavire = () => {
    return (
        <section className='listeNavire'>
            <AfficheListe 
                columns={columnsNavire}
                apiUrl="http://localhost:8081/navire"
                FormComponent={FormNavire}
            />
        </section>
    );
};

export default ListeNavire;