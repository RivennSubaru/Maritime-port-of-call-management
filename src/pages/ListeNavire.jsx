import React from 'react';
import AfficheListe from '../component/AfficheListe';
import FormNavire from './Formulaire/FormNavire';

const columnsNavire = [
    { width: 150, label: 'Numeros', dataKey: 'num' },
    { width: 150, label: 'Nom', dataKey: 'nom' },
    { width: 150, label: 'Navigateur', dataKey: 'nomNavigateur' },
    { width: 150, label: 'Type', dataKey: 'type' },
    { width: 150, label: 'Tirant d\'eau', dataKey: 'tirantEau' },
    { width: 150, label: 'longueurs', dataKey: 'longueursNav' },
    { width: 150, label: 'Actions', dataKey: 'action' }
];

const ListeNavire = () => {
    return (
        <section className='listeNavire'>
            <AfficheListe 
                columns={columnsQuai}
                apiUrl="http://localhost:8081/navire/getAll"
                FormComponent={FormQuai}
            />
        </section>
    );
};

export default ListeNavire;