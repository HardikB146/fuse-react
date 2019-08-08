import React, { useState } from 'react';
import { FusePageSimple } from '@fuse';
import { useForm } from '@fuse/hooks';
import { Link, withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, Button, MenuItem, TextField, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    layoutRoot: {

    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    new: {
        maxWidth: "500px",
        margin: "auto",
    },
    btnm: {
        marginLeft: "20px",
    }
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

function QuoteAdd(props) {
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);

    const dispatch = useDispatch();

    const handleTabChange = (event, value) => {
        setSelectedTab(value);
    };

    const { form, handleChange } = useForm(defaultFormState);

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.addQuotes(form));
        //closeComposeDialog();
        props.history.push('/apps/quotes');
    }

    return (
        <FusePageSimple
            classes={{
                root: classes.layoutRoot,
                toolbar: "px-16 sm:px-24"
            }}

            contentToolbar={
                <div style={{ "width": "100%" }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full h-64 border-b-1"
                    >
                        <Tab className="h-64" label="Step 1" />
                        <Tab className="h-64" label="Step 2" />
                        <Tab className="h-64" label="Step 3" />
                    </Tabs>
                    <div style={{ float: "right", "margin-top": "-50px" }}>
                        <Button component={Link} to="/apps/quotes" variant="contained" className={classes.button}>
                            Close And Quit
                    </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" className={`${classes.btnm} ${classes.button}`}>
                            Save
                   </Button>
                    </div>

                </div >
            }
            content={
                < div className={`p-24 ${classes.new}`}>
                    {selectedTab === 0 &&
                        (
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <form style={{ width: "100%" }} noValidate onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                                            <div className="flex">
                                                <TextField
                                                    fullWidth
                                                    id="standard-name"
                                                    label="var1"
                                                    className="mb-24"
                                                    name="var1"
                                                    value={form.var1}
                                                    onChange={handleChange}
                                                    //margin="normal"
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
                                                    //margin="normal"
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
                                                   // margin="normal"
                                                //variant="outlined"
                                                >
                                                    {categoryObj.map(option => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )}
                    {
                        selectedTab === 1 && (
                            <div>
                                <h3 className="mb-16">Step 2</h3>
                                <h1>Demo Text</h1>
                            </div>
                        )
                    }
                    {
                        selectedTab === 2 && (
                            <div>
                                <h3 className="mb-16">Step 3</h3>
                                <h1>Demo Text</h1>
                            </div>
                        )
                    }
                </div >
            }
        />
    )
}

export default withRouter(QuoteAdd);
