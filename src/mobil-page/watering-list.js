import React from 'react';
import {connect} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {AREAS} from '../config';
import {CardContent, Typography} from "@material-ui/core";

const areas = AREAS.reduce((res, item) => ({...res, [item.id]: item.name}), {});

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1),
        overflowX: 'auto',
    },
    table: {
        //minWidth: 650,
    },
    title: {
        fontSize: 12,
    },
}));


function List(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {/*<TableCell>#</TableCell>*/}
                        <TableCell>Правило</TableCell>
                        <TableCell align="right">Время</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.items.map(item => (
                            <TableRow key={item.id} onClick={() => props.onSelect(item.id)}>
                                  <TableCell>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {areas[item.area]}
                                    </Typography>
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Typography className={classes.title}
                                                color={item.active ? "textPrimary" : "textSecondary"} gutterBottom>
                                        {item.start}<br/>{item.time} мин
                                    </Typography>

                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
    )


}


class WateringList extends React.Component {


    onSelect = id => {
        this.props.history.push(`/watering/${id}`);
    };

    render() {
        const {items} = this.props;
        return <List items={items} onSelect={this.onSelect}/>
    }
}

const selected = (state) => {
    return {items: state.waterings};
};

export default connect(selected, {})(WateringList);