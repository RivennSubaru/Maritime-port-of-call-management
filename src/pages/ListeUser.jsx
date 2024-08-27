import React from 'react';
import TableListe from '../component/TableListe';
import FormNavire from './Formulaire/FormNavire'

const columns = [
    { id: 'pseudo', label: 'Pseudo', minWidth: 170 },
    { id: 'role', label: 'Rôle', minWidth: 100 },
]; 

const ListeUser = () => {
    return (
        <>
            <h2 style={{color:"#728699", fontWeight:"500"}}>Liste d'utilisateurs</h2>
            <section className='listeNavire'>
                <TableListe
                    columns={columns}
                    apiUrl="http://localhost:8081/user"
                    Item="utilisateur"
                />
            </section>
        </>
    );
};

export default ListeUser;