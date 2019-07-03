import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {Card, CardContent, Typography, Divider} from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    const classes = useStyles();
    const [t1, t2] = [23.5, 22.9];
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Температура на улице (датчик 1)
                    </Typography>
                    <Typography variant="h2" component="h1">
                        {t1} &deg; C
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Температура на улице (датчик 2)
                    </Typography>
                    <Typography variant="h2" component="h1">
                        {t2} &deg; C
                    </Typography>
                </CardContent>
            </Card>
            <Divider/>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Температура на улице усредненная
                    </Typography>
                    <Typography variant="h2" component="h1">
                        {(t1 + t2) / 2} &deg; C
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
