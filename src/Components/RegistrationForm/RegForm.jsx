import React from 'react'
import "./RegForm.css"
import { Button, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../EditeItem/EditeItem.style';

import { httpRequest } from '../../Service/Service';
import { phoneRegExp } from '../../RegxHandling/Regx'
import { BaseUrl } from '../../CommonRequest/BaseUrl';


const RegForm = () => {
    const classes = useStyles();
    const [image, setImage] = useState()
    const navigate = useHistory()


    const schema = yup.object().shape({
        name: yup.string().required("Field is required!"),
        mobileNo: yup.string()
            .required("required")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "too short")
            .max(10, "too long"),
        email: yup.string().email().required("Field is required!"),
        address: yup.string().required("Field is required!"),
        latitude: yup.string().required("Field is required!"),
        longitude: yup.string().required("Field is required!"),
    });

    const defaultValues = {
        name: "",
        mobileNo: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });

    const onSubmit = async (data) => {
        const {
            name,
            mobileNo,
            email,
            address,
            latitude,
            longitude,
        } = data

        let formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("mobileNo", mobileNo);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        alert("Data is Created Successfully")

        const res = await httpRequest(`${BaseUrl}/user`, "post", formData)
            .then((res) => {
                navigate.push("/listitems")
            })
        console.log(res)
        reset()
    };
    return (
        <Grid container style={{ width: "100%", maxWidth: "80%", alignSelf: "flex-start" }}>
            <Grid container spacing={3} style={{ textAlign: "left" }}>
                <Grid item xs={12} >
                    <Grid container className={classes.inputContainer} style={{ marginTop: "2%" }}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4" gutterBottom>
                                Registration Form
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid item xs={12} >
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Name</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            fullWidth
                                            autoComplete="family-name"
                                            {...register("name")}
                                            helperText={errors?.name?.message}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                        <InputLabel>Image</InputLabel>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <TextField
                                            required
                                            id="image"
                                            fullWidth
                                            type='file'
                                            onChange={(e) => setImage(e.target.files[0])}
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
                                            id="mobile"
                                            label="mobile"
                                            fullWidth
                                            type='number'
                                            autoComplete="family-name"
                                            {...register("mobileNo")}
                                            helperText={errors?.mobileNo?.message}
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
                                            id="email"
                                            label="Email"
                                            fullWidth
                                            {...register("email")}
                                            helperText={errors?.email?.message}
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
                                            id="address"
                                            label="Address"
                                            fullWidth
                                            {...register("address")}
                                            helperText={errors?.address?.message}
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
                                            id="latitude"
                                            label="Latitude"
                                            type='number'
                                            fullWidth
                                            {...register("latitude")}
                                            helperText={errors.latitude?.message}
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
                                            id="longitude"
                                            label="Longitude"
                                            type='number'
                                            fullWidth
                                            {...register("longitude")}
                                            helperText={errors.longitude?.message}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container className={classes.inputContainer}>
                                    <Grid item xs={12} sm={2}>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Button type='submit' color='success' variant='contained' fullWidth>Save</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RegForm