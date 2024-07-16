import AfficheListe from '../component/AfficheListeQuais';
import FormQuai from './Formulaire/FormQuai';

const columnsQuai = [
    { width: 150, label: 'Nom', dataKey: 'nom' },
    { width: 150, label: 'Type', dataKey: 'type' },
    { width: 150, label: 'Emplacement', dataKey: 'emplacementQuai' },
    { width: 150, label: 'Profondeur (m)', dataKey: 'profondeurQuai', numeric: true },
    { width: 200, label: 'Longueur Disponible (m)', dataKey: 'longueurDispo', numeric: true },
    { width: 150, label: 'Actions', dataKey: 'action' }
];


const ListeQuai = () => {
    return (
        <section className='listeQuai'>
            <AfficheListe 
                columns={columnsQuai}
                apiUrl="http://localhost:8081/quai/getAll"
                FormComponent={FormQuai}
            />
        </section>
    );
};

export default ListeQuai;