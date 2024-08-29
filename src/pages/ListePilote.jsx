import React from 'react';
import TableListe from '../component/TableListe';
import FormPilote from './Formulaire/FormPilote';

const columns = [
    { id: 'nomPilote', label: 'Nom', minWidth: 170 },
    { id: 'prenomPilote', label: 'Prenom', minWidth: 100 },
    { id: 'telPilote', label: 'Téléphone', minWidth: 100 },
    { id: 'emailPilote', label: 'Email', minWidth: 170},
]; 

const ListePilote = () => {
    return (
        <>
            <h2 style={{color:"#728699", fontWeight:"500"}}>Liste des pilotes</h2>
            <section className='listePilote'>
                <TableListe
                    columns={columns}
                    apiUrl="http://localhost:8081/pilote"
                    Item="pilote"
                    FormComponent={FormPilote}
                />
            </section>
        </>
    );
};

export default ListePilote;