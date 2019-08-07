import React, { useRef, useEffect } from 'react';
import { Fab, Icon, Typography, makeStyles } from '@material-ui/core';
import { FuseAnimate, FusePageSimple } from '@fuse';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import QuoteList from './QuoteList';
import QuoteDialog from './QuoteDialog';
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const defaultFormState = {
    var1: "",
    type: "",
    category: "",
    status: ""
};

const useStyles = makeStyles(theme => ({
    header: {
        background: "#e8e6e6",
        color: "#000000de",
        zIndex: "1",
        boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 3px 3px -2px rgba(0,0,0,0.12)"
    },
}));

function QuoteApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const quotes = useSelector(({ QuoteApp }) => {
        return QuoteApp.quotesReducer;
    });

    const [selectedItem, setSelectedItem] = React.useState({});

    const { form, handleChange, setForm } = useForm(defaultFormState);

    useEffect(() => {
        LoadQuotes();
    }, []);

    const pageLayout = useRef(null);
    const childRef = useRef();
    const dialogRef = useRef();

    function changeIndex(index) {
        const selectedItemTeml = quotes.entities[index];
        console.log("selectedItemTeml", selectedItemTeml);
        setSelectedItem(selectedItemTeml);
        setForm({ ...selectedItemTeml });
        dispatch(Actions.setSelectedIndex(index));
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(Actions.updateQuotes(form));
    }

    function LoadQuotes(limit = 10, offset = 0) {
        dispatch(Actions.getQuotes({ limit: limit, offset: offset }));
    }

    return (
        <div>
            <FusePageSimple
                classes={{
                    root: "bg-red",
                    header: `${classes.header}`,
                    sidebarHeader: `${classes.header}`,
                    rightSidebar: "w-320"
                }}
                header={
                    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                        <div className="flex flex-1 items-end">
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab component={Link} to="/apps/quote/add" color="secondary" aria-label="add" className="absolute bottom-3 left-0 ml-16 -mb-28 z-999">
                                    <Icon>add</Icon>
                                </Fab>
                            </FuseAnimate>

                            <FuseAnimate delay={200}>
                                <Typography className="flex flex-1 pl-72 pb-12 text-16 sm:text-24">
                                    <span className="flex items-center">
                                        <span>Quotes</span>
                                    </span>
                                </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                content={
                    <QuoteList LoadQuotes={LoadQuotes} changeIndex={changeIndex} quotesData={quotes} />
                }
                rightSidebarHeader={
                    <DetailSidebarHeader selectedItem={selectedItem} />
                }
                rightSidebarContent={
                    <DetailSidebarContent ref={childRef} LoadQuotes={LoadQuotes} form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
                }
                ref={pageLayout}
                innerScroll
            />
            <QuoteDialog ref={dialogRef} />
        </div>
    )
}

export default withReducer('QuoteApp', reducer)(QuoteApp);
