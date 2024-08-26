import React from 'react';
import TableListe from '../component/TableListe';
import FormNavire from './Formulaire/FormNavire'

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

const ListeUser = () => {
    return (
        <>
            <h2 style={{color:"#728699", fontWeight:"500"}}>Liste de navires</h2>
            <section className='listeNavire'>
                <TableListe
                    columns={columns}
                    apiUrl="http://localhost:8081/navire"
                    Item="navire"
                    FormComponent={FormNavire}
                />
            </section>
        </>
    );
};

export default ListeUser;