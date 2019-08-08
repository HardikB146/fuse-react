import React, { useEffect, useState } from 'react';
import { Typography, Tooltip, Icon, Toolbar, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper, Checkbox, TablePagination } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    temppad:{
        //padding:"10px",
    }
}));



const headRows = [
    { id: 'createdBy', numeric: false, disablePadding: true, label: 'Created By' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
    { id: 'var1', numeric: true, disablePadding: false, label: 'Var' },
    { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'dateCreated', numeric: true, disablePadding: false, label: 'Created' },
    { id: 'action', numeric: true, disablePadding: false, label: 'Action' },

];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    > {row.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected.length > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected.length > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected.length} selected
                    </Typography>
                ) : ""}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected.length > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon
                                onClick={props.deleteItemsCall} />
                        </IconButton>
                    </Tooltip>
                ) : ""}
            </div>
        </Toolbar>
    );
};

function QuoteList(props) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [editRowId, setEditRowId] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = props.quotesData.entities.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    useEffect(() => {
        props.LoadQuotes(rowsPerPage, page);
    }, [page, rowsPerPage]);

    function handleClick(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function deleteItemsCall() {
        props.deleteItems(selected);
        setSelected([]);
    }

    const isSelected = name => selected.indexOf(name) !== -1;

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <div className={classes.temppad}>
                <Paper className={`${classes.paper}`}>
                    <EnhancedTableToolbar numSelected={selected} deleteItemsCall={deleteItemsCall} />
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={props.quotesData.entities.length}
                            />
                            <TableBody>
                                {props.quotesData.entities && props.quotesData.entities.length > 0 && props.quotesData.entities.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover

                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={editRowId === row.id}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    onChange={(event) => {
                                                        handleClick(event, row.id);
                                                    }}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.createdBy}
                                            </TableCell>
                                            <TableCell align="right">{row.category}</TableCell>
                                            <TableCell align="right">{row.var1}</TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
                                            <TableCell align="right">{row.status}</TableCell>
                                            <TableCell align="right">{Moment(row.dateCreated).format('d MMM YYYY')}</TableCell>
                                            <TableCell align="right">
                                                <Icon className="cursor-pointer" onClick={(event) => {
                                                    //handleClick(event, row.id);
                                                    setEditRowId(row.id);
                                                    props.changeIndex(index);
                                                }}>create</Icon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={props.quotesData.pagination.total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </FuseAnimate>
    );
}

export default QuoteList;
