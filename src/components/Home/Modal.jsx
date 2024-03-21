import React, { useEffect, useState } from "react";
import { Button, Stack, Box, Zoom, Typography, FormGroup, FormControlLabel, Checkbox, MenuItem, Menu, IconButton } from "@mui/material";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Loader from "../Loader/Loader";
import { GetActions, GetMenuData, GetProfileDetails, UpsertProfile } from "../../api/Api";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colourTheme, secondaryColorTheme } from "../../config";

import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
// import { makeStyles } from "@material-ui/core";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import DescriptionIcon from '@mui/icons-material/Description';
import Swal from "sweetalert2";


import { useSpring, animated } from '@react-spring/web';
import SvgIcon from '@mui/material/SvgIcon';

import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const buttonStyle = {
    textTransform: "none",
    color: `#fff`,
    backgroundColor: `#1976d2`,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
};

const customFormGroupStyle1 = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    maxHeight: '550px', // Adjust as needed
    overflowY: 'auto', // Hide vertical overflow
    overflowX: 'auto', // Allow horizontal scrolling
    padding: '10px',
    width: '572px',

};



function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{ width: 14, height: 14 }}
            {...props}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}



function StyledTreeItem(props) {
    // Implement your StyledTreeItem component here
    return (
        <TreeItem
            label={
                <div>
                    <Typography variant="body2">
                        {props.labelText}
                    </Typography>
                </div>
            }
            {...props}
        />
    );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////





function Modal({ isOpen, handleNewClose, mode, resetChangesTrigger, formDataEdit }) {
    const [open, setOpen] = React.useState(false);
    const [warning, setWarning] = useState(false);
    const [message, setMessage] = useState("");
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [menu, setMenu] = React.useState([]);
    const [ActionButton, setActionButton] = React.useState([]);
    const [SelectActionButton, setSelectActionButton] = React.useState([]);
    const [menuId, setMenuId] = React.useState([]);
    const [actions, setActions] = React.useState([]);
    const [mode1, setMode1] = useState("");
    const [nameUpdate, setNameUpdate] = React.useState('')

    console.log(formDataEdit, "formDataEdit");
    const getInitialFormData = () => {
        return {
            profileId: 0,
            profileName: "",
            userId: 0,
        }
    };





    const modalStyle = {
        display: isOpen ? "block" : "none",
    };

    useEffect(() => {
        setMode1(mode);
    }, [mode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetMenuData()
                const data = JSON.parse(response.result)
                setMenu(data)
            } catch (error) {
                console.log("get menus", error);
            }
        }
        fetchData()



    }, [])

    useEffect(() => {
        const GetProfileDetails7 = async () => {
            let profilId = formDataEdit
            try {
                const response = await GetProfileDetails({ profileId: profilId })
                const data = JSON.parse(response.result)
                const datas = data.Table.map((item) => item.sProfileName);

                const datas1 = data.Table1.map((item) => item);
                const datas2 = datas1.map((item) => (item.iMenuId));
                if (datas1.length > 0) {
                    const combinedId = datas1.map((actionItem) => `${actionItem.iMenuId}_${actionItem.iActionId}`).join(',');
                    setSelectActionButton(combinedId.split(','));
                    setMenuId(datas2[0])

                }
                console.log(response);
                setName(datas[0])

            } catch (error) {
                console.log("get menus", error);
            }
        }
        if (formDataEdit > 0) {
            GetProfileDetails7()
        }
    }, [])


    const handleClickEvents = async (thirdMenu) => {
        try {
            const response = await GetActions({
                menuId: thirdMenu.iId
            })
            const data = JSON.parse(response.result)
            setActionButton(data)
            setMenuId(thirdMenu.iId)
        } catch (error) {
            console.log("Get Actions ", error)
        }
    };



    // const handleCloses = () => {
    //     setMenuIds(null);
    // };

    // const handleMenuList = () => {
    //     setAnchorEl(null);
    //     setAnchorElNav(null); // This line will close the menu
    //     setActiveSubMenuId(null);
    // };

    // const handleSubMenu = (event, Id) => {
    //     if (Id === 25) {
    //         navigate("/home");
    //     } else {
    //         setAnchorEl(event.currentTarget);
    //         setMenuId(Id);
    //     }
    // }

    // const handleMobMenu = (id) => {
    //     if (id === 25) {
    //         navigate("/home");
    //     } else {
    //         setActiveSubMenuId(id);
    //         console.log(id, "handleMobMenu,setActiveSubMenuId");

    //     }
    // };

    // let menuItems

    // if (activeSubMenuId == null) {
    //     // Main menu items

    //     menuItems = menu
    //         .filter((menuList) => menuList.iParentId === 0)
    //         .map((menuList) => (
    //             <MenuItem
    //                 key={menuList.iId}
    //                 onClick={() => handleMobMenu(menuList.iId)}
    //             >
    //                 <Typography textAlign="center">{menuList.sName}</Typography>
    //             </MenuItem>
    //         ));
    // } else {
    //     // Sub-menu items
    //     menuItems = [
    //         <MenuItem key="back" onClick={() => setActiveSubMenuId(null)}>
    //             <ArrowBackIcon sx={{ color: colourTheme }} />
    //         </MenuItem>,
    //         ...menu
    //             .filter((menuList) => menuList.iParentId === activeSubMenuId)
    //             .map((menuList) => (
    //                 <MenuItem
    //                     key={menuList.iId}
    //                     onClick={() => handleClickEvent(menuList)}
    //                 >
    //                     <Typography textAlign="center">{menuList.sName}</Typography>
    //                 </MenuItem>
    //             )),
    //     ];
    // }



    const handleSaveAccount = async () => {
        if (mode1 === "edit") {
            const dataArray = SelectActionButton.map(item => {
                const [iMenu, iAction] = item.split('_');
                return {
                    iMenu: parseInt(iMenu),
                    iAction: parseInt(iAction)
                };
            });
            if (!dataArray.length > 0) {
                Swal.fire({
                    title: "Error!",
                    text: "Action is required",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: secondaryColorTheme,
                });
                return;
            }
            if (!name) {
                Swal.fire({
                    title: "Error!",
                    text: "UserName is required",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: secondaryColorTheme,
                });
                return;
            }
            const data = {
                profileId: formDataEdit,
                profileName: name,
            }


            try {
                const response = await UpsertProfile(data, dataArray)
                // const result = JSON.parse(response.result)
                // if (response.status === "Success") {
                if (response.message === "Inserted Successfully" || response.message === "Updated Successfully") {
                    Swal.fire({
                        title: "Success!",
                        text: `${response.message}`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    //   handleOpenAlert();
                    setMessage(`${response.message}`);
                    return;
                }
                //   }
                resetChangesTrigger()
                handleNewClose()
            } catch (error) {
                console.log("Get UpsertProfile ", error)
            }
        } else {
            if (!name) {
                Swal.fire({
                    title: "Error!",
                    text: "name is required",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: secondaryColorTheme,
                });
                return;
            }

            const dataArray = SelectActionButton.map(item => {
                const [iMenu, iAction] = item.split('_');
                return {
                    iMenu: parseInt(iMenu),
                    iAction: parseInt(iAction)
                };
            });
            if (!dataArray.length > 0) {
                Swal.fire({
                    title: "Error!",
                    text: "Action is required",
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: secondaryColorTheme,
                });
                return;
            }
            const data = {
                profileId: formDataEdit,
                profileName: name,
            }
            try {
                const response = await UpsertProfile(data, dataArray)
                if (response.message === "Inserted Successfully" || response.message === "Updated Successfully") {
                    Swal.fire({
                        title: "Success!",
                        text: `${response.message}`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    //   handleOpenAlert();
                    setMessage(`${response.message}`);
                    return;
                }
                resetChangesTrigger()
                handleNewClose()
            } catch (error) {
                console.log("Get UpsertProfile ", error)
            }
        }


    }

    const handleAllClear = () => {
        handleNewClose();
        // handleClear();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpenAlert = () => {
        setWarning(true);
    };

    const handleCloseAlert = () => {
        setWarning(false);
    };
    const newButtonClick = () => {
        setMode1("new");
        getInitialFormData()
    };


    const handleCheckboxChange = (iActionId) => {
        const combinedId = `${menuId}_${iActionId}`
        setSelectActionButton((prevItems) => {
            if (Array.isArray(prevItems)) { // Check if prevItems is an array
                if (prevItems.includes(combinedId)) {
                    return prevItems.filter((id) => id !== combinedId); // Deselect if already selected
                } else {
                    return [...prevItems, combinedId]; // Select if not selected
                }
            } else {
                return [combinedId]; // If it's not an array, initialize with iId
            }
        });
    };


    const handleSelectAll = () => {
        const combinedId = ActionButton.map((actionItem) => `${menuId}_${actionItem.iActionId}`).join(',');
        console.log(combinedId, "select all");
        setSelectActionButton(combinedId.split(','));
    };

    const handleUnselectAll = () => {
        setSelectActionButton([])
    };

    return (
        <div><div
            className={`modal-backdrop fade ${isOpen ? "show" : ""}`}
            style={{
                display: isOpen ? "block" : "none",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
        ></div>
            <Zoom in={isOpen} timeout={isOpen ? 400 : 300}>
                <div
                    className={`modal ${isOpen ? "modal-open" : ""}`}
                    style={modalStyle}
                >
                    <div style={{ marginTop: "10%", width: "80%", marginLeft: "100px" }} >
                        <div className="modal-content">
                            <form>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    padding={2}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        onClick={newButtonClick}
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        style={buttonStyle}
                                    >
                                        New
                                    </Button>
                                    <Button
                                        onClick={handleSaveAccount}
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        style={buttonStyle}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        // onClick={handleAllClear}
                                        variant="contained"
                                        startIcon={<CloseIcon />}
                                        style={buttonStyle}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={handleAllClear}
                                        variant="contained"
                                        startIcon={<CloseIcon />}
                                        style={buttonStyle}
                                    >
                                        Close
                                    </Button>
                                </Stack>
                                <Box
                                    sx={{
                                        width: "auto",
                                        marginTop: 1,
                                        padding: 3,
                                        zIndex: 1,
                                        backgroundColor: "#ffff",
                                        borderRadius: 2,
                                    }}
                                >
                                    <div className="attendanceNewContainer">
                                        <MDBCol sx={{ width: "10px" }}>
                                            <MDBInput
                                                required
                                                value={name}
                                                id="form6Example1"
                                                maxLength={100}
                                                label="Name"
                                                onChange={(e) => setName(e.target.value)}
                                                labelStyle={{
                                                    fontSize: "15px",
                                                }}
                                                style={{
                                                    width: "200px", // Adjust the width as per your preference
                                                }}
                                            />

                                        </MDBCol>
                                        <div style={{ display: 'flex' }}>


                                            <div style={customFormGroupStyle1}>
                                                <Typography sx={{ fontSize: '16px', paddingBottom: '10px' }}>
                                                    Menu
                                                </Typography>

                                                {/* <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}> */}
                                                <TreeView
                                                    aria-label="customized"
                                                    defaultExpanded={['1']}
                                                    defaultCollapseIcon={<MinusSquare />}
                                                    defaultExpandIcon={<PlusSquare />}
                                                    defaultEndIcon={<CloseSquare />}
                                                    sx={{ overflowX: 'hidden' }}
                                                >
                                                    {menu &&
                                                        menu.filter((menuList) => menuList.iParentId === 0).map((menuList) => (
                                                            <StyledTreeItem
                                                                key={menuList.iId}
                                                                nodeId={menuList.iId.toString()}
                                                                labelText={menuList.sName}
                                                            >
                                                                {menu
                                                                    .filter((subMenu) => subMenu.iParentId === menuList.iId)
                                                                    .map((subMenu) => (
                                                                        <StyledTreeItem
                                                                            key={subMenu.iId}
                                                                            nodeId={subMenu.iId.toString()}
                                                                            labelText={subMenu.sName}
                                                                        >
                                                                            {menu
                                                                                .filter((thirdMenu) => thirdMenu.iParentId === subMenu.iId)
                                                                                .map((thirdMenu) => (
                                                                                    <StyledTreeItem
                                                                                        key={thirdMenu.iId}
                                                                                        nodeId={thirdMenu.iId.toString()}
                                                                                        labelText={thirdMenu.sName}

                                                                                        onClick={() => handleClickEvents(thirdMenu)}
                                                                                    />
                                                                                ))}
                                                                        </StyledTreeItem>
                                                                    ))}
                                                            </StyledTreeItem>
                                                        ))}
                                                </TreeView>
                                                {/* </Box> */}


                                            </div>

                                            <div style={customFormGroupStyle1}>
                                                <Box sx={{
                                                    marginBottom: '20px',
                                                    flexDirection: 'column'
                                                }}>
                                                    <Typography sx={{ fontSize: '16px', paddingBottom: '10px' }}>
                                                        Action
                                                    </Typography>

                                                    <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                                                        {ActionButton.map((item) => (
                                                            <FormControlLabel
                                                                key={item.iActionId}
                                                                control={
                                                                    <Checkbox
                                                                        checked={Array.isArray(SelectActionButton) && SelectActionButton.includes(`${menuId}_${item.iActionId}`)}
                                                                        onChange={() => handleCheckboxChange(item.iActionId)}
                                                                    />
                                                                }
                                                                label={item.sName}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>


                                                <div>
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            onChange={handleSelectAll}
                                                            checked={SelectActionButton.length === ActionButton.length}
                                                        />}
                                                        label="Select All"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={handleUnselectAll} />}
                                                        label="Unselect All"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Box>

                            </form>
                        </div>
                    </div>
                </div>

            </Zoom >
            <Loader open={open} handleClose={handleClose} />
            <ErrorMessage
        open={warning}
        handleClose={handleCloseAlert}
        message={message}
      />
        </div>
    )
}

export default Modal