import React from 'react';
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {temperatureHistory} from '../actions/weather';
import {Line, Bar} from 'react-chartjs-2';

import {Card, CardContent, Typography, Divider, Paper} from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        border: 'none'
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
    const {temperature, humidity, history, batteryLow} = props;
    const data = {
        labels: history.map((item, index) => {
            if (index % 4 === 0)
                return item.key;
            else
                return "";
        }),
        datasets: [{
            label: "Значение темп. за 24H",
            data: history.map(item => item.value),
            fill: false,
            borderColor: 'red',
            pointRadius: 0,  // <<< Here.

            // backgroundColor: 'transparent',
            // lineWidth: '1px',
            // pointStyle: 'rectRounded'
        }]
    };
    const options = {
        maintainAspectRatio: false,
        // scales: {
        //     xAxes: [{
        //         ticks: {
        //             //min: -22,
        //             //max: 0,
        //
        //             // forces step size to be 5 units
        //             stepSize: 6
        //         }
        //     }]
        // },

    };
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Температура на улице
                    </Typography>
                    <Typography variant="h2" component="h1">
                        {temperature}&deg;C
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Влажность: {humidity}%. {batteryLow ? " Батарея LOW !!!" : ""}
                    </Typography>

                    <hr/>
                    <div>
                        <Line
                            legend={{display: false}}
                            width={200}
                            height={180}
                            data={data}
                            options={options}
                        />
                    </div>
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
    componentDidMount() {
        const {temperatureHistory} = this.props;
        temperatureHistory();
    }

    render() {
        return <SimpleCard {...this.props.weather}/>
    }
}

const selected = (state) => {
    return {weather: state.weather};
};

export default connect(selected, {temperatureHistory})(Weather);
