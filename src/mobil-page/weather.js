import React from 'react';
import {connect} from "react-redux";
import {TEMP_HISTORY} from '../config'
import {makeStyles} from '@material-ui/core/styles';
import {temperatureHistory} from '../actions/weather';
import {Line} from 'react-chartjs-2';

import {BottomNavigation, BottomNavigationAction, Card, CardContent, Typography} from '@material-ui/core'

import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        border: 'none',
        height:'100%'
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


const HumidityView = props => {
    const {className, value, batteryLow} = props;
    if (value)
        return (
            <Typography className={className} color="textSecondary" gutterBottom>
                Влажность: {value}%. {batteryLow ? " Батарея LOW !!!" : ""}
            </Typography>
        )
    else
        return null;

}

function SimpleCard(props) {
    const classes = useStyles();
    const {temperature, humidity, history = [], batteryLow} = props;
    const minDate = history[0] ? history[0].date : new Date();

    const data = {
        // labels: history.map((item, index) => {
        //     if (index % 4 === 0)
        //         return item.key;
        //     else
        //         return "";
        // }),
        datasets: [{
            label: "Температура:",
            data: history.map(item => ({x: item.date, y: item.value})),
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
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    min: minDate,
                    unit: 'hour',
                    displayFormats: {
                        minute: 'HH:mm',
                        hour: 'DD/MM HH:mm'
                    }
                },
                display: true,
                color: '#F66',
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    major: {
                        fontStyle: 'bold',
                        //fontColor: '#FF0000'
                    }
                }
            }],
        },
        tooltips: {
            intersect: false,
            mode: 'index'
        }

    };


    return (
        <div className={"app-page"}>
            {/*<Card className={classes.card}>*/}
            {/*    <CardContent>*/}
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Температура на улице
                    </Typography>
                    <Typography variant="h2" component="h1">
                        {temperature && temperature.toFixed(1)}&deg;C
                    </Typography>
                    <HumidityView value={humidity} batteryLow={batteryLow} className={classes.title}/>
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
            {/*    </CardContent>*/}

            {/*</Card>*/}
            {/*<BottomNavigation value={0} onChange={handleChange} className={classes.root}>*/}
            {/*    <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon/>}/>*/}
            {/*    <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon/>}/>*/}
            {/*    <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon/>}/>*/}
            {/*    <BottomNavigationAction label="Folder" value="folder" icon={<Icon>folder</Icon>}/>*/}
            {/*</BottomNavigation>*/}

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
        temperatureHistory(TEMP_HISTORY);
    }

    render() {
        return <SimpleCard {...this.props.weather}/>
    }
}

const selected = (state) => {
    return {weather: state.weather};
};

export default connect(selected, {temperatureHistory})(Weather);
