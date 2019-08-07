import React from 'react';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';

const currencies = [
    {
        value: 'MAT',
        label: 'MAT',
    },
    {
        value: 'LAB',
        label: 'LAB',
    },
    {
        value: 'TURNK',
        label: 'TURNK',
    }
];

const categoryObj = [
    {
        value: 'IND',
        label: 'IND',
    },
    {
        value: 'DATAP',
        label: 'DATAP',
    },
    {
        value: 'ATO',
        label: 'ATO',
    },
    {
        value: 'MED',
        label: 'MED',
    },
    {
        value: 'DEF',
        label: 'DEF',
    },
    {
        value: 'ERG',
        label: 'ERG',
    },
    {
        value: 'OTH',
        label: 'OTH',
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));

function DetailSidebarContent(props) {
    const classes = useStyles();
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={200}>

            <div className="file-details p-16 sm:p-24">
                {<form className="" noValidate onSubmit={props.handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="standard-name"
                        label="var1"
                        className={classes.textField}
                        name="var1"
                        value={props.form.var1}
                        onChange={props.handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="outlined-select-type"
                        select
                        label="Type"
                        className={classes.textField}
                        name="type"
                        value={props.form.type}
                        onChange={props.handleChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    //variant="outlined"
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        id="outlined-select-category"
                        select
                        label="Category"
                        className={classes.textField}
                        name="category"
                        value={props.form.category}
                        onChange={props.handleChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal"
                    //variant="outlined"
                    >
                        {categoryObj.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={(ev) => props.handleSubmit(ev)}
                    >
                        Save
                        </Button>
                </form>}
            </div>
        </FuseAnimate>
    );
};

export default DetailSidebarContent;
