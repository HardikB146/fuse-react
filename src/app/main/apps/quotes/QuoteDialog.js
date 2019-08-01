import React, { useImperativeHandle, forwardRef } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, MenuItem, Typography, Toolbar, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from '@fuse/hooks';
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';


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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const defaultFormState = {
    id: uuidv4(),
    var1: "",
    type: "",
    category: "",
    createdBy: "mjanzen3@ebay.co.uk",
    status: "Open",
    dateCreated: "2019-04-12T00:24:41Z"
};
const QuoteDialog = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { form, handleChange } = useForm(defaultFormState);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    useImperativeHandle(ref, () => ({
        openDialog() {
            setOpen(true);
        }
    }));

    function closeComposeDialog() {
        setOpen(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.addQuotes(form));
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: "m-24"
            }}
            open={open}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        New Quote
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                <DialogContent classes={{ root: "p-24" }}>
                    <div className="flex">
                        <TextField
                            fullWidth
                            id="standard-name"
                            label="var1"
                            className="mb-24"
                            name="var1"
                            value={form.var1}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </div>

                    <div className="flex">

                        <TextField
                            fullWidth
                            id="outlined-select-type"
                            select
                            label="Type"
                            className="mb-24"
                            name="type"
                            value={form.type}
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
                    </div>

                    <div className="flex">
                        <TextField
                            fullWidth
                            id="outlined-select-category"
                            select
                            label="Category"
                            className="mb-24"
                            name="category"
                            value={form.category}
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
                    </div>

                </DialogContent>

                <DialogActions className="justify-between pl-16">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        type="submit"
                    >
                        Add
                        </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
});
//QuoteDialog = forwardRef(QuoteDialog);
export default QuoteDialog;
