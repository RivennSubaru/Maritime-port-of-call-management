import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// variable
const columns = [
    { width: 150, label: 'Nom', dataKey: 'nomQuai' },
    { width: 120, label: 'Type', dataKey: 'type' },
    { width: 150, label: 'Emplacement', dataKey: 'emplacementQuai' },
    { width: 150, label: 'Profondeur (m)', dataKey: 'profondeurQuai', numeric: true },
    { width: 150, label: 'Longueur Disponible (m)', dataKey: 'longueurDispo', numeric: true },
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {


    return (
        <TableRow>
        {columns.map((column) => (
            <TableCell
                key={column.dataKey}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{ backgroundColor: 'background.paper' }}
            >
            {column.label}
            </TableCell>
        ))}
        </TableRow>
    );
}

function rowContent(_index, row) {
    return (
        <React.Fragment>
        {columns.map((column) => (
            <TableCell key={column.dataKey} align={column.numeric || false ? 'right' : 'left'}>
                {row[column.dataKey]}
            </TableCell>
        ))}
        </React.Fragment>
    );
}

const AfficheListeQuais = () => {

    const fetchData = async () => {
        const reponse = await axios.get("http://localhost:8081/quai/getAll");
        return reponse.data;
    }

    const {isPending, isError, data = [], error} = useQuery({
        queryKey: ["quais"],
        queryFn: fetchData,
    });

    if (isPending) {
        toast.loading("chargement...")
        return <h3>chargement de la liste...</h3>
    }

    if (isError) {
        console.log(error);
        return <h3>Une erreur s'est produit</h3>
    }

    return (
        <Paper style={{ height: "57vh", width: '75%' }}>
        <TableVirtuoso
            data={data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
        />
        </Paper>
    );
}

export default AfficheListeQuais;