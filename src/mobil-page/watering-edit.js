import React from 'react';
import {connect} from "react-redux";
import {wateringSave} from '../actions/watering';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormControlLabel,
    Switch,
    FormGroup,
    Button,
    Divider
} from '@material-ui/core';
import {AREAS} from '../config';

const useStyles = makeStyles(theme => ({
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
    formControl: {
        margin: theme.spacing(1),
        width: '100%',

    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Edit = (props = {item: {}}) => {
    const [state, setState] = React.useState({
        id: 1,
        area: 1,
        name: 'новое правило',
        start: "06:00",
        time: 20,
        active: true,
        ...props.item
    });
    const {id, area, name, start, time, active} = state;
    const classes = useStyles();

    const handleChange = e => {
        const {name, value: _value, checked, type} = e.target;
        const value = (type === 'checkbox') ? checked : _value;
        setState({...state, [name]: value});
    };

    const onSubmit = e => {
        e.preventDefault();
        props.onSubmit(state);
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <form className={classes.root} autoComplete="off" onSubmit={onSubmit}>
                    <FormGroup row>
                        <FormControl className={classes.textField}>
                            <InputLabel htmlFor="area">Участок</InputLabel>
                            <Select
                                value={area}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'area',
                                }}
                            >
                                {AREAS.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </FormGroup>
                    <FormGroup row>
                        <TextField
                            id="standard-name"
                            label="Название правила"
                            className={classes.textField}
                            value={name}
                            onChange={handleChange}
                            margin="normal"
                            inputProps={{
                                name: 'name',
                            }}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <TextField
                            label="Начало полива"
                            type="time"
                            onChange={handleChange}
                            value={start}
                            className={classes.textField}
                            margin="normal"
                            InputLabelProps={{
                                //shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                                name: 'start'
                            }}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <TextField
                            label="Время полива"
                            type="number"
                            onChange={handleChange}
                            value={time}
                            className={classes.textField}
                            margin="normal"
                            helperText={"Продожительность полива в минутах"}
                            InputLabelProps={{
                                //shrink: true,
                            }}
                            inputProps={{
                                step: 5, // 5 min
                                max: 100,
                                min: 10,
                                name: 'time'
                            }}
                        />
                    </FormGroup>
                    <FormGroup row>
                        <FormControl className={classes.textField}>
                            <FormControlLabel
                                labelPlacement={'end'}
                                control={
                                    <Switch
                                        checked={active}
                                        color={"primary"}
                                        onChange={handleChange}
                                        //value={el => el.checked}
                                        inputProps={{name: 'active'}}
                                    />
                                }
                                label="Использовать правило"
                            />
                        </FormControl>
                    </FormGroup>
                    <Divider/>
                    <Button type="submit" variant="contained" color="primary"
                            className={classes.button}>
                        Сохранить
                    </Button>
                    <Button variant="contained" component={Link} to={'/waterings'} className={classes.button}>
                        Отмена
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

class RouteEdit extends React.Component {
    onSubmit = item => {
        console.log(item);
        this.props.wateringSave(item);
        this.props.history.push(`/waterings`);
    };

    render() {
        const {match: {params}, items} = this.props;
        const item = items.find(i => i.id === params.id) || {};
        return <Edit item={item} onSubmit={this.onSubmit}/>
    }
}

const selected = (state) => {
    return {items: state.waterings};
};

export default connect(selected, {wateringSave})(RouteEdit);