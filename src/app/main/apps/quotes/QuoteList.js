import React from 'react';
import { Hidden, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useSelector } from 'react-redux';
import Moment from 'moment';

function QuoteList(props) {
    const quotes = useSelector(({ QuoteApp }) => {
        return QuoteApp.quotesReducer;
    });  
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell className="hidden sm:table-cell">Created By</TableCell>
                        <TableCell className="hidden sm:table-cell">Category</TableCell>
                        <TableCell className="hidden sm:table-cell">Var1</TableCell>
                        <TableCell className="">Type</TableCell>
                        <TableCell className="hidden sm:table-cell">Status</TableCell>
                        <TableCell className="hidden sm:table-cell">Created</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {quotes.entities && quotes.entities.length > 0 && quotes.entities.map((value, index) => {
                        return (
                            <TableRow
                                key={value.id}
                                hover
                                onClick={event => props.detailComp.current.changeIndex(index)}
                                selected={index === quotes.selectedIndex}
                                className="cursor-pointer"
                            >

                                <TableCell>{value.createdBy}</TableCell>
                                <TableCell className="hidden sm:table-cell">{value.category}</TableCell>
                                <TableCell className="hidden sm:table-cell">{value.var1}</TableCell>
                                <TableCell className="hidden sm:table-cell">{value.type}</TableCell>
                                <TableCell className="">{value.status}</TableCell>
                                <TableCell className="hidden sm:table-cell">{Moment(value.dateCreated).format('d MMM YYYY')}</TableCell>
                                <Hidden lgUp>
                                    <TableCell>
                                        <IconButton
                                        //onClick={(ev) => props.pageLayout.current.toggleRightSidebar()}
                                        //aria-label="open right sidebar"
                                        >
                                            <Icon>info</Icon>
                                        </IconButton>
                                    </TableCell>
                                </Hidden>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </FuseAnimate>
    );
}

export default QuoteList;
