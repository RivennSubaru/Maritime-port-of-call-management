import React from 'react';
import RetardEntrant from '../component/Accordion/RetardEntrant';
import RetardSortant from '../component/Accordion/RetardSortant';
import { Paper, Typography } from '@mui/material';

const RetardEscale = () => {
    return (
        <section className='retard'>
            <section className='liste entrant'>
                <Typography variant="h6" gutterBottom color="rgb(114, 134, 153)" paddingBottom={2}>
                    Navires en approche
                </Typography>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        maxHeight: 300, 
                        borderRadius: "10px"
                    }}
                >
                    <RetardEntrant/>
                </Paper>
            </section>
            <section className='liste sortant'>
                <Typography variant="h6" gutterBottom color="rgb(114, 134, 153)" paddingBottom={2}>
                    Navires se préparant à partir
                </Typography>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        maxHeight: 300,
                        borderRadius: "10px"
                    }}
                >
                    <RetardSortant/>
                </Paper>
            </section>
        </section>
    );
};

export default RetardEscale;