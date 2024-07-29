import AfficheListe from '../component/AfficheListe';
import FormQuai from './Formulaire/FormQuai';

const columnsQuai = [
    { width: 150, label: 'Nom', dataKey: 'nom' },
    { width: 150, label: 'Emplacement', dataKey: 'emplacementQuai' },
    { width: 150, label: 'Profondeur (m)', dataKey: 'profondeurQuai', numeric: true },
    { width: 200, label: 'Longueur Disponible (m)', dataKey: 'longueurDispo', numeric: true },
    { width: 150, label: 'Escale', dataKey: 'escaleQuai' },
    { width: 150, label: 'Actions', dataKey: 'action' }
];


const ListeQuai = () => {
    return (
        <>
            <h2>Liste de quais</h2>
            <section className='listeQuai'>
                <AfficheListe 
                    columns={columnsQuai}
                    apiUrl="http://localhost:8081/quai"
                    FormComponent={FormQuai}
                    Item="quai"
                />
            </section>
        </>
    );
};

export default ListeQuai;