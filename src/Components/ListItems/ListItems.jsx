import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardMedia, Divider, Grid, Typography, Modal, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditIcon from '@mui/icons-material/Edit';

import { Link, useHistory } from 'react-router-dom';
import Mapps from '../Location/Mapps';
import { useStyles } from './ListItems.style';

import { BaseUrl } from '../../CommonRequest/BaseUrl'
import { httpRequest } from '../../Service/Service'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};
const ListItems = () => {
    const classes = useStyles();

    const [resp, setResp] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [viewUserData, setViewUserData] = useState([])

    const getUsers = async () => {
        const res = await httpRequest(`${BaseUrl}/user`, "get")
        setResp(res.data.result)
    }


    const getUserById = async (id) => {
        const res = await httpRequest(`${BaseUrl}/user/${id}`, "get")
        console.log(res, "userbyid")
        setViewUserData(() => [res.data.result])
    }

    const deleteUserHandler = async (id) => {
        if (window.confirm("Do you really want to delete this record??")) {
            try {
                const res = await fetch(`${BaseUrl}/user/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    const updatedUsers = resp.filter((user) => user.id !== id);
                    setResp(updatedUsers);
                    getUsers()
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleOpen = (id) => {
        getUserById(id)
        setOpen(true)
    };

    const handleOpen1 = () => {
        setOpen1(true)
    };

    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);


    useEffect(() => {
        getUsers()
    }, [])


    return (
        <Grid container>
            {resp.map((item) => (
                <Grid item sm={3} display="flex" justifyContent="space-between" mt={3} mb={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            sx={{ height: 140 }}
                            image="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                            title="green iguana"
                            alt="Error From Backend"
                        />
                        <CardContent className={classes.content}>
                            <Typography
                                className={classes.heading}
                                variant={"h6"}
                                gutterBottom
                            >
                                {item.name.length > 10 ? item.name.substring(0, 10).concat('...') : item.name}
                            </Typography>
                            <Typography
                                className={"MuiTypography--subheading"}
                                variant={"caption"}
                            >
                                {item.email}
                            </Typography>
                            <Divider className={classes.divider} />
                            <Grid container justifyContent="space-between" >
                                <Grid item>
                                    <Button endIcon={<VisibilityIcon />} variant='outlined' onClick={() => handleOpen(item.id)}>View</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleOpen1} endIcon={<AddLocationAltIcon />} variant='outlined'>Map</Button>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="space-between" mt={2}>
                                <Grid item>
                                    <Button onClick={() => deleteUserHandler(item.id)} endIcon={<DeleteForeverIcon />} variant='outlined'>Delete</Button>
                                </Grid>
                                <Grid item>
                                    <Link to={`edit/${item.id}`} style={{textDecoration:"none"}}>
                                        <Button endIcon={<EditIcon />} variant='outlined'>Edit</Button>
                                    </Link>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Grid container >
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            {viewUserData.map((elem) => (
                                <Grid container display="flex" justifyContent="center" alignItems="center">
                                    <Grid item xs={3}>
                                        <img onError="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                                            src={elem.imageUrl} alt="Error From Backend"
                                            className={classes.img} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container display="flex" justifyContent="space-evenly">
                                            <Grid item sx={4}>
                                                <Typography className={classes.heading}>Name</Typography>
                                                <Typography className={classes.heading}>Email</Typography>
                                                <Typography className={classes.heading}>MobileNo</Typography>
                                                <Typography className={classes.heading}>Address</Typography>
                                                <Typography className={classes.heading}>Longitude</Typography>
                                                <Typography className={classes.heading}>Longitude</Typography>
                                            </Grid>
                                            <Grid item sx={4}>
                                                <Typography >{elem.name}</Typography>
                                                <Typography>{elem.email}</Typography>
                                                <Typography>{elem.mobileNo}</Typography>
                                                <Typography>{elem.address}</Typography>
                                                <Typography>{elem.latitude}</Typography>
                                                <Typography>{elem.longitude}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>
                    </Modal>
                </Grid>
            </Grid>
            <Grid container >
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Modal
                        open={open1}
                        onClose={handleClose1}
                    >
                        <Box sx={style}>
                            <Mapps />
                        </Box>
                    </Modal>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ListItems


