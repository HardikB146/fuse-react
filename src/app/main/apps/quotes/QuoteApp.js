import React, { useRef, useEffect } from 'react';
import { Fab, Icon, Typography } from '@material-ui/core';
import { FuseAnimate, FusePageSimple } from '@fuse';
import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import QuoteList from './QuoteList';
import QuoteDialog from './QuoteDialog';
import DetailSidebarContent from './DetailSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function QuoteApp(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getQuotes(props.match.params));
    }, [dispatch, props.match.params]);

    const pageLayout = useRef(null);
    const childRef = useRef();
    const dialogRef = useRef();

    return (
        <div>
            <FusePageSimple
                classes={{
                    root: "bg-red",
                    sidebarHeader: "h-96 min-h-96 sm:h-160 sm:min-h-160",
                    rightSidebar: "w-320"
                }}
                header={
                    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                        <div className="flex flex-1 items-end">
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab onClick={() => dialogRef.current.openDialog()} color="secondary" aria-label="add" className="absolute bottom-0 left-0 ml-16 -mb-28 z-999">
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
                    <QuoteList detailComp={childRef} />
                }
                rightSidebarContent={
                    <DetailSidebarContent ref={childRef} />
                }
                ref={pageLayout}
                innerScroll
            />
            <QuoteDialog ref={dialogRef}/>
        </div>
    )
}

export default withReducer('QuoteApp', reducer)(QuoteApp);
