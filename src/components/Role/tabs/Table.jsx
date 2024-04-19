import React, { useState, useEffect } from "react";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { GetEntryRestriction } from "../../../api/Api";
import AutoComplete3 from "./AutoComplete";
import Swal from "sweetalert2";

const columns = [
    { id: "sMaster", sName: "Master", minWidth: 100 },
    { id: "Master", sName: "Master", minWidth: 80, isChecked: false },
    { id: "Transaction", sName: "Transaction", minWidth: 80, isChecked: false },
    { id: "Report", sName: "Report", minWidth: 80, isChecked: false },
    { id: "View", sName: "View", minWidth: 80, isChecked: false },
];


const EnhancedCheckbox = ({ isChecked, onChange }) => {
    return (
        <Checkbox
            checked={isChecked}
            onChange={onChange}
            inputProps={{ "aria-label": "checkbox" }}
            sx={{ transform: "scale(0.7)" }} // Adjust checkbox size with scale transformation
        />
    );
};

export default function EnhancedTable({ masteriId, setMasters, formDataEdit, mode1, setNewState, newState, }) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [autocompleteOpen, setAutocompleteOpen] = useState({});
    const [formData, setFormData] = useState([]);
    const [Data, setData] = useState(Array.from({ length: 30 }, () => ({}))); // Initialize Data with 30 empty objects
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        // Convert formData object into an array of objects
        const formDataArray = Object.values(formData);

        const formattedData = formDataArray.map(item => ({
            iMasterTypeId: masteriId, // Assuming masteriId is defined somewhere
            iTagId: item.iTagId,
            bMaster: item.Master !== undefined ? item.Master : false,
            bTransaction: item.Transaction !== undefined ? item.Transaction : false,
            bReport: item.Report !== undefined ? item.Report : false,
            bView: item.View !== undefined ? item.View : false
        }));
        setMasters(formattedData)
    }, [formData])

    React.useEffect(() => {
        if (newState === true) {
            setFormData([]);
            setData({})
            setNewState(false); // Move this line before the return statement
            return; // Make sure to have a return statement here
        }
    }, [newState]);

    useEffect(() => {
        if (mode1 === "edit" && formDataEdit > 0 && masteriId > 0) {
            const getEntry = async () => {
                try {
                    setLoading(true)

                    const res = await GetEntryRestriction({
                        roleId: formDataEdit,
                    });
                    const data = JSON.parse(res.result);
                    const formattedData = data.map(item => ({
                        Master: item.bMaster,
                        Report: item.bReport,
                        TagName: item.sName,
                        Transaction: item.bTransaction,
                        iTagId: item.iTagId,
                    }));

                    setData(formattedData);
                    setFormData(formattedData)
                    setLoading(false)
                } catch (error) {
                    console.log("GetEntryRestriction", error);
                    if (error.response.data.message) {
                        Swal.fire({
                            title: "Error!",
                            text: `${error.response.data.message}`,
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: `${error.message}`,
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            };
            getEntry();
        }
    }, [mode1, formDataEdit, masteriId]);

    // useEffect(() => {
    //     if (mode1 === "new") {
    //         setData([
    //             {
    //                 Master: false,
    //                 Report: false,
    //                 Transaction: false,
    //                 View: false,
    //                 TagName: "",
    //                 iTagId: 0,
    //             },
    //             ...Array.from({ length: 29 }, () => ({})),
    //         ]);
    //     }
    // }, [mode1]);

    const handleAddRow = () => {
        const newRow = {
            Master: false,
            Report: false,
            Transaction: false,
            View: false,
            TagName: "",
            iTagId: 0,
        };
        setData([...Data, newRow]);

    }
    const handleRowClick = (row) => {
        setSelectedRow(row);
        setAutocompleteOpen((prevState) => ({
            ...prevState,
            [row.id]: true,
        }));
    };

    const handleAutocompleteClose = (id) => {
        setAutocompleteOpen((prevState) => ({
            ...prevState,
            [id]: false,
        }));
    };

    const handleAutocompleteChange = (value, index) => {
        setFormData((prevData) => ({
            ...prevData,
            [index]: {
                ...prevData[index],
                iTagId: value ? value.iId : '', // If value exists, use value.iId, otherwise use ''
                TagName: value ? value.sName : '', // If value exists, use value.sName, otherwise use ''
            },
        }));
    };


    const handleCheckboxChange = (isChecked, index, fieldName) => {
        setFormData((prevData) => ({
            ...prevData,
            [index]: {
                ...prevData[index],
                [fieldName]: isChecked === undefined ? false : isChecked, // Set initial value to false if undefined
            },
        }));
    };
    return (
        <Box sx={{ width: "95%", margin: "auto", marginTop: "30px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* <Paper sx={{ width: "100%", mb: 2 }}>
                    <TableContainer sx={{ maxHeight: "40vh", overflow: "scroll" }}>
                        {!loading&& <>
                            <Table stickyHeader sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align="center"
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.sName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {Data.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            key={row.id}
                                            onClick={() => handleRowClick(row)}
                                            selected={selectedRow && selectedRow.id === row.id}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>
                                                    {column.id === 'sMaster' ? (
                                                        
                                                        <AutoComplete3
                                                            value={formData[index]?.TagName || ''}
                                                            onChangeName={(value) => handleAutocompleteChange(value, index)}
                                                            masterId={masteriId}
                                                            open={autocompleteOpen[row.id]}
                                                            formData={formData}
                                                            setFormData={setFormData}
                                                            onClose={() => handleAutocompleteClose(row.id)}
                                                        />
                                                    ) : (
                                                        <EnhancedCheckbox
                                                            isChecked={formData[index]?.[column.sName]}
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    !formData[index]?.[column.sName],
                                                                    index,
                                                                    column.sName
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>





                        </Table>
                        </>}
                       
                    </TableContainer>
                </Paper> */}

                <Paper sx={{ width: "100%", mb: 2 }}>
                    <TableContainer sx={{ maxHeight: "40vh", overflow: "scroll" }}>
                        {!loading && (
                            <Table stickyHeader sx={{ minWidth: 750 }}>
                                <TableHead>
                                    <TableRow>

                                        {mode1 === "edit" && (
                                            <Button onClick={handleAddRow}>Add Row</Button>
                                        )}
                                        {mode1 === "new" && (
                                            <TableCell></TableCell>
                                        )}

                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="center"
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.sName}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {Data.map((row, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <TableRow
                                                    key={index}
                                                    onClick={() => handleRowClick(row)}
                                                    selected={selectedRow && selectedRow.id === row.id}
                                                >
                                                    <TableCell>{index + 1}</TableCell>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id}
                                                            sx={{
                                                                padding: "4px",
                                                                height: "1px",
                                                                // border: "1px solid #ddd",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                width: "calc(100% / 5)",
                                                                minWidth: "100px",
                                                                maxWidth: 150,
                                                            }}
                                                            component="th"
                                                            scope="row"
                                                            padding="normal"
                                                            align="left">
                                                            {selectedRow && selectedRow.id === row.id && (
                                                                column.id === 'sMaster' ? (
                                                                    <AutoComplete3
                                                                        value={formData[index]?.TagName || ''}
                                                                        onChangeName={(value) => handleAutocompleteChange(value, index)}
                                                                        masterId={masteriId}
                                                                        open={true} // Always show the Autocomplete for the selected row
                                                                        formData={formData}
                                                                        setFormData={setFormData}
                                                                        onClose={() => handleAutocompleteClose(row.id)}
                                                                    />
                                                                ) : (
                                                                    <EnhancedCheckbox
                                                                        isChecked={formData[index]?.[column.sName]}
                                                                        onChange={(e) =>
                                                                            handleCheckboxChange(
                                                                                !formData[index]?.[column.sName],
                                                                                index,
                                                                                column.sName
                                                                            )
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </TableCell>
                                                    ))}

                                                </TableRow>
                                                {mode1 === "edit" && index === Data.length - 1 && (
                                                    <TableRow>
                                                        <TableCell colSpan={columns.length + 1}>
                                                            {/* <Button onClick={handleAddRow}>Add Row</Button> */}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                        {loading && <div>No data available...</div>} {/* Display loading indicator */}
                        {(!loading && Data.length === 0) && <div>No data available.</div>} {/* Display message for empty data */}
                    </TableContainer>
                </Paper>

            </div>
        </Box>
    );
}
