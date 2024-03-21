import React, { useEffect, useState } from "react";
import { Button, Stack, Box, Zoom, Typography, FormGroup, FormControlLabel, Checkbox, MenuItem, Menu, IconButton } from "@mui/material";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Loader from "../Loader/Loader";
import { GetActions, GetMenuData } from "../../api/Api";
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


import { useSpring, animated } from '@react-spring/web';
import SvgIcon from '@mui/material/SvgIcon';

import Collapse from '@mui/material/Collapse';
import { alpha, styled } from '@mui/material/styles';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';

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
// const defaultTheme = createTheme();

// const useStyles = makeStyles((theme) => ({
//     customFormGroupStyle1: {
//         border: '1px solid #ccc',
//         borderRadius: '10px',
//         maxHeight: '550px', // Adjust as needed
//         overflowY: 'auto', // Hide vertical overflow
//         overflowX: 'auto', // Allow horizontal scrolling
//         padding: '10px',
//         width: '572px',
//         },
//   }));





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

// function TransitionComponent(props) {
//   const style = useSpring({
//     to: {
//       opacity: props.in ? 1 : 0,
//       transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
//     },
//   });

//   return (
//     <animated.div style={style}>
//       <Collapse {...props} />
//     </animated.div>
//   );
// }

// const CustomTreeItem = React.forwardRef((props, ref) => (
//   <TreeItem {...props} TransitionComponent={TransitionComponent} ref={ref} />
// ));

// const StyledTreeItems = styled(CustomTreeItem)(({ theme }) => ({
//   [`& .${treeItemClasses.iconContainer}`]: {
//     '& .close': {
//       opacity: 0.3,
//     },
//   },
//   [`& .${treeItemClasses.group}`]: {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
//   },
// }));

//  function CustomizedTreeView() {
//   return (
//     <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
//       <TreeView
//         aria-label="customized"
//         defaultExpanded={['1']}
//         defaultCollapseIcon={<MinusSquare />}
//         defaultExpandIcon={<PlusSquare />}
//         defaultEndIcon={<CloseSquare />}
//         sx={{ overflowX: 'hidden' }}
//       >
//         <StyledTreeItems nodeId="1" label="Main">
//           <StyledTreeItems nodeId="2" label="Hello" />
//           <StyledTreeItems nodeId="3" label="Subtree with children">
//             <StyledTreeItems nodeId="6" label="Hello" />
//             <StyledTreeItems nodeId="7" label="Sub-subtree with children">
//               <StyledTreeItems nodeId="9" label="Child 1" />
//               <StyledTreeItems nodeId="10" label="Child 2" />
//               <StyledTreeItems nodeId="11" label="Child 3" />
//             </StyledTreeItems>
//             <StyledTreeItems nodeId="8" label="Hello" />
//           </StyledTreeItems>
//           <StyledTreeItems nodeId="4" label="World" />
//           <StyledTreeItems nodeId="5" label="Something something" />
//         </StyledTreeItems>
//       </TreeView>
//     </Box>
//   );
// }














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



function MenuTree({ menu }) {
    // const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuId, setMenuId] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [menuId1, setMenuId1] = useState(null);

    const [ActionButton, setActionButton] = React.useState([]);
    const [SelectActionButton, setSelectActionButton] = React.useState([]);
    const [thirdMenus, setThirdMenus] = useState('');


    const handleClickEvents = async (thirdMenu) => {
        try {
            const response = await GetActions({
                menuId: thirdMenu.iId
            })
            const data = JSON.parse(response.result)
            setActionButton(data)
            console.log(data,"actions data ---------------------------------------------------------");
        } catch (error) {
            console.log("Get Actions ", error)
        }
    };

 
    const handleCheckboxChange = (iActionId) => {
        console.log(iActionId);
        setSelectActionButton((prevItems) => {
            if (Array.isArray(prevItems)) { // Check if prevItems is an array
                if (prevItems.includes(iActionId)) {
                    return prevItems.filter((id) => id !== iActionId); // Deselect if already selected
                } else {
                    return [...prevItems, iActionId]; // Select if not selected
                }
            } else {
                return [iActionId]; // If it's not an array, initialize with iId
            }
        });
    };

    const handleSelectAll = () => {
        const allAction = ActionButton.map((actionItem) => actionItem.iActionId)
        setSelectActionButton(allAction)

    };

    const handleUnselectAll = () => {
        if (SelectActionButton.length === ActionButton.length) {
            setSelectActionButton([])
        }
    };





    const handleClickEvent = (event, menuItem) => {
        setAnchorEl1(event.currentTarget);
        setMenuId1(menuItem);
        handleClose();
    };
   

    const handleSubMenu = (event, menuId) => {
        setAnchorEl(event.currentTarget);
        setMenuId(menuId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuId(null);
    };

    const handleAllClear = () => {
        handleCloseModal();
        // handleClear();
    };

    const handleCloseLoader = () => {
        setOpen(false);
    };


    return (
        <div>
 <form>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    padding={2}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        style={buttonStyle}
                                    >
                                        New
                                    </Button>
                                    <Button
                                        // onClick={handleSave}
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        style={buttonStyle}
                                    >
                                        Save
                                    </Button>
                                    <Button
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
                                                // value={name}
                                                id="form6Example1"
                                                autoComplete="off"
                                                maxLength={100}
                                                label="Name"
                                                // onChange={(e) => setName(e.target.value)}
                                                labelStyle={{
                                                    fontSize: "15px",
                                                }}
                                                style={{
                                                    width: "10px", // Adjust the width as per your preference
                                                }}


                                            />
                                        </MDBCol>


                                        <div style={{ display: 'flex' }}>
                <div style={customFormGroupStyle1}>
                    <Typography sx={{ fontSize: '16px', paddingBottom: '10px' }}>
                        Menu
                    </Typography>
                    <Box sx={{ minHeight: 270, flexGrow: 1, maxWidth: 300 }}>
                        <TreeView
                            // defaultCollapseIcon={<ExpandMoreIcon />}
                            // defaultExpandIcon={<ChevronRightIcon />}
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

                                        onClick={(e) => handleSubMenu(e, menuList.iId)}
                                    >
                                        {menu
                                            .filter((subMenu) => subMenu.iParentId === menuList.iId)
                                            .map((subMenu) => (
                                                <StyledTreeItem
                                                    key={subMenu.iId}
                                                    nodeId={subMenu.iId.toString()}
                                                    labelText={subMenu.sName}

                                                    onClick={() => handleClickEvent(subMenu.iId)}
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
                    </Box>
                </div>

                <div style={customFormGroupStyle1}>
                    <Box sx={{
                        marginBottom: '20px',
                        flexDirection: 'column'
                    }}>
                        <Typography sx={{ fontSize: '16px', paddingBottom: '10px' }}>
                            Action
                        </Typography>

                        {/* <Action /> */}
                        <Box sx={{ flexDirection: 'column', display: 'flex' }}>
                            {ActionButton.map((item) => (
                                <FormControlLabel
                                    key={item.iActionId}
                                    control={
                                        <Checkbox
                                            checked={Array.isArray(SelectActionButton) && SelectActionButton.includes(item.iActionId)}
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



                            <Loader open={open} handleClose={handleCloseLoader} />

        </div>

    );
}



function Modal({ isOpen, handleCloseModal, edit, action }) {
    const [open, setOpen] = React.useState(false);
    const [warning, setWarning] = useState(false);
    const [message, setMessage] = useState("");
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [menu, setMenu] = React.useState([]);
    const [ActionButton, setActionButton] = React.useState([]);
    const [SelectActionButton, setSelectActionButton] = React.useState([]);
    const [menuId, setMenuId] = React.useState(0);
    const [activeSubMenuId, setActiveSubMenuId] = React.useState(null);
    const [anchorElLogout, setAnchorElLogout] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const modalStyle = {
        display: isOpen ? "block" : "none",
    };


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

        // const actions = async () => {
        //     try {
        //         const response = await GetActions({
        //             menuId: 12
        //         })
        //         const data = JSON.parse(response.result)
        //         setActionButton(data)
        //     } catch (error) {
        //         console.log("Get Actions ", error)
        //     }
        // }
        // actions()
    }, [])


    const handleMenuList = () => {
        setAnchorEl(null);
        setAnchorElNav(null); // This line will close the menu
        setActiveSubMenuId(null);
    };

    const handleSubMenu = (event, Id) => {
        if (Id === 25) {
            navigate("/home");
        } else {
            setAnchorEl(event.currentTarget);
            setMenuId(Id);
        }
    }

    const handleMobMenu = (id) => {
        if (id === 25) {
            navigate("/home");
        } else {
            setActiveSubMenuId(id);
            console.log(id, "handleMobMenu,setActiveSubMenuId");

        }
    };

    let menuItems

    if (activeSubMenuId == null) {
        // Main menu items

        menuItems = menu
            .filter((menuList) => menuList.iParentId === 0)
            .map((menuList) => (
                <MenuItem
                    key={menuList.iId}
                    onClick={() => handleMobMenu(menuList.iId)}
                >
                    <Typography textAlign="center">{menuList.sName}</Typography>
                </MenuItem>
            ));
    } else {
        // Sub-menu items
        menuItems = [
            <MenuItem key="back" onClick={() => setActiveSubMenuId(null)}>
                <ArrowBackIcon sx={{ color: colourTheme }} />
            </MenuItem>,
            ...menu
                .filter((menuList) => menuList.iParentId === activeSubMenuId)
                .map((menuList) => (
                    <MenuItem
                        key={menuList.iId}
                        onClick={() => handleClickEvent(menuList)}
                    >
                        <Typography textAlign="center">{menuList.sName}</Typography>
                    </MenuItem>
                )),
        ];
    }




    // const handleAllClear = () => {
    //     handleCloseModal();
    //     // handleClear();
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleOpenAlert = () => {
    //     setWarning(true);
    // };

    // const handleCloseAlert = () => {
    //     setWarning(false);
    // };


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
                    <div style={{ marginTop: "1%", width: "80%", marginLeft: "100px",height:'50%' }} >
                        <div className="modal-content">
                        <MenuTree menu={menu} />
                            {/* <form>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    padding={2}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        style={buttonStyle}
                                    >
                                        New
                                    </Button>
                                    <Button
                                        // onClick={handleSave}
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
                                                // value={name}
                                                id="form6Example1"
                                                autoComplete="off"
                                                maxLength={100}
                                                label="Name"
                                                // onChange={(e) => setName(e.target.value)}
                                                labelStyle={{
                                                    fontSize: "15px",
                                                }}
                                                style={{
                                                    width: "10px", // Adjust the width as per your preference
                                                }}


                                            />
                                        </MDBCol>
                                        <MenuTree menu={menu} />


                                        <div style={{ display: 'flex' }}>


                                            <div style={customFormGroupStyle1}>
                                                <Typography sx={{ fontSize: '16px', paddingBottom: '10px' }}>
                                                    Menu
                                                </Typography>
                                                <MenuTree menu={menu} />
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
                                                                        checked={Array.isArray(SelectActionButton) && SelectActionButton.includes(item.iActionId)}
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

                            </form> */}
                        </div>
                    </div>
                </div>

            </Zoom >
            {/* <Loader open={open} handleClose={handleClose} /> */}
            {/* <ErrorMessage
        open={warning}
        handleClose={handleCloseAlert}
        message={message}
      /> */}
        </div>
    )
}

export default Modal