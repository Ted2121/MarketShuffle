import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
} from "@mui/material";

export default function TwWarNotes() {
    document.title = 'TW Reports';
    const [quillInput, setQuillInput] = useState('');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('dateTime');
    const [selected, setSelected] = React.useState([]);
    const rows = [ /* Your row data goes here */]; // Replace with your actual data

    //#region Quill
    const handleQuillInput = (event) => {
        const { value } = event.target;
        setQuillInput(value);
    }

    const addAttacks = () => {
        if (quillInput.trim()) {
            const { id, date, target, links, world } = parseQuill(reportInput.trim());
            const newAttacks = { id, target, targetLink, world, attacks };

            setReports((prevReports) => {
                const grouped = groupReportsByTarget([newReport, ...prevReports]);
                const limitedReports = limitReportsToFive(grouped);
                return Object.values(limitedReports).flat();
            });
            setReportInput(''); // Clear input after adding
        }
    };

    //#endregion Quill

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
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
    };

    return (
        <Box sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            marginTop: 5,
            marginBottom: 10,
        }}>
            <ReactQuill
                value={quillInput}
                onChange={handleQuillInput}
                modules={{ toolbar: false }}
                style={{ width: '700px', height: '50px' }}
            />
            <Button onClick={addAttacks} variant="contained">
                Add Attacks
            </Button>
            <TableContainer>
                <Table sx={{ width: '70%' }} size={'medium'}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onChange={handleSelectAllClick}
                                    checked={selected.length === rows.length}
                                    indeterminate={selected.length > 0 && selected.length < rows.length}
                                />
                            </TableCell>
                            <TableCell onClick={(event) => handleRequestSort(event, 'name')}>Name</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat</TableCell>
                            <TableCell align="right">Carbs</TableCell>
                            <TableCell align="right">Protein</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = selected.includes(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
