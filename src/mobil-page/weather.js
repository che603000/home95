import React from 'react';
import {connect} from "react-redux";
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

function SimpleCard(props) {
    const classes = useStyles();
    const {temperature, humidity, batteryLow} = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Температура на улице
                    </Typography>
                    <Typography variant="h2" component="h1">
                        {temperature}&deg;
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Влажность: {humidity}%.   {batteryLow ?" Батарея LOW !!!" : ""}
                    </Typography>
                </CardContent>
            </Card>
            {/*<Card className={classes.card}>*/}
            {/*    <CardContent>*/}
            {/*        <Typography className={classes.title} color="textSecondary" gutterBottom>*/}
            {/*            Температура на улице (датчик 2)*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h2" component="h1">*/}
            {/*            {t2} &deg; C*/}
            {/*        </Typography>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
            {/*<Divider/>*/}
            {/*<Card className={classes.card}>*/}
            {/*    <CardContent>*/}
            {/*        <Typography className={classes.title} color="textSecondary" gutterBottom>*/}
            {/*            Температура на улице усредненная*/}
            {/*        </Typography>*/}
            {/*        <Typography variant="h2" component="h1">*/}
            {/*            {(t1 + t2) / 2} &deg; C*/}
            {/*        </Typography>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </div>
    );
}

class Weather extends React.Component {
    render() {
        return <SimpleCard {...this.props.weather}/>
    }
}

const selected = (state) => {
    return {weather: state.weather};
};

export default connect(selected, {})(Weather);
