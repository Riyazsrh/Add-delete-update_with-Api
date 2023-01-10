import { Button, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BaseUrl } from "../../CommonRequest/BaseUrl";
import { useStyles } from "./EditeItem.style";

const EditF = () => {
    let { id } = useParams();
    const classes = useStyles();

    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        image: "",
        mobileNo: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        fetch(`${BaseUrl}/user/${id}`)
            .then((res) => res.json())
            .then((data) => setData(data.result));
    }, []);

    const handleChange = (name) => (e) => {
        const value = name === "image" ? e.target.files[0] : e.target.value;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append("name", data.name);
            formData.append("image", data.image);
            formData.append("mobileNo", data.mobileNo);
            formData.append("email", data.email);
            formData.append("address", data.address);
            formData.append("latitude", data.latitude);
            formData.append("longitude", data.longitude);

            const res = await fetch(`${BaseUrl}/user/${id}`, {
                method: "PUT",
                body: formData,
            });
            if (res.ok) {
                setData({
                    name: "",
                    image: "",
                    mobileNo: "",
                    email: "",
                    address: "",
                    latitude: "",
                    longitude: "",
                });
                history.replace("/listitems");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container style={{ width: "100%", maxWidth: "80%", alignSelf: "flex-start" }}>
                <Grid Grid container spacing={3} style={{ textAlign: "left" }}>
                    <Grid item xs={12} >
                        <Grid container className={classes.inputContainer} style={{ marginTop: "2%" }}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4" gutterBottom>
                                    Update User Data
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} >
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Name</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            className="form-control"
                                            placeholder="Enter name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange("name")}

                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Mobile</InputLabel>
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            className="form-control"
                                            type="file"
                                            accept="image/*"
                                            name="image"
                                            onChange={handleChange("image")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Email</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            className="form-control"
                                            placeholder="Enter email"
                                            type="text"
                                            name="email"
                                            value={data?.email}
                                            onChange={handleChange("email")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Address</InputLabel>
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            className="form-control"
                                            placeholder="Enter address"
                                            type="text"
                                            name="address"
                                            value={data?.address}
                                            onChange={handleChange("address")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Latitude</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            className="form-control"
                                            placeholder="Enter latitude"
                                            type="number"
                                            name="latitude"
                                            value={data.latitude}
                                            onChange={handleChange("latitude")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Longitude</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            className="form-control"
                                            placeholder="Enter longitude"
                                            type="number"
                                            name="longitude"
                                            value={data.longitude}
                                            onChange={handleChange("longitude")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Button type='submit' color='success' variant='contained' fullWidth onClick={handleSubmit}>Save</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Grid>

    );
};

export default EditF;
