import React, { useImperativeHandle, forwardRef } from 'react';
import { Button, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useForm } from '@fuse/hooks';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './store/actions';

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

const defaultFormState = {
    var1: "",
    type: "",
    category: "",
};

const DetailSidebarContent = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { form, handleChange, setForm } = useForm(defaultFormState);
    
    const quotes = useSelector(({ QuoteApp }) => {
        return QuoteApp.quotesReducer.entities;
    });

    const selectedItemInit = useSelector(({ QuoteApp }) => {
        return QuoteApp.quotesReducer.entities[QuoteApp.quotesReducer.selectedIndex];
    });
    
    const classes = useStyles();
    
    useImperativeHandle(ref, () => ({
        changeIndex(index) {
            const selectedItem = quotes[index];
            setForm({ ...selectedItem });
            dispatch(Actions.setSelectedIndex(index));
        }
    }));
    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.updateQuotes(form));
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={200}>

            <div className="file-details p-16 sm:p-24">
                <form className="" noValidate onSubmit={handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="standard-name"
                        label="var1"
                        className={classes.textField}
                        name="var1"
                        value={selectedItemInit.var1}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="outlined-select-type"
                        select
                        label="Type"
                        className={classes.textField}
                        name="type"
                        value={selectedItemInit.type}
                        onChange={handleChange}
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
                        value={selectedItemInit.category}
                        onChange={handleChange}
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
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save
                        </Button>
                </form>
            </div>
        </FuseAnimate>
    );
}
);

export default DetailSidebarContent;
