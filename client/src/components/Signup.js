import React, { useState, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Google from './Google'
import { authenticateUser, isAuth } from './helpers'

function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const createUser = (e) => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            password: password
        }

        axios.post('http://localhost:8000/api/signup', user)
            .then(res => {
                console.log("Success: " + JSON.stringify(res.data.message))
                toast.success(res.data.message)
            })
            .catch(err => {
                console.log('Error: ' + err.response.data.error)
                toast.error(err.response.data.error)
            })
    }

    const informParent = (res) => (
        authenticateUser(res, () => {
            console.log(res)
            window.location.href = '/'
        })
    )

    return (

        <Fragment>
            <ToastContainer />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* If User Information is Available Redirect to '/' */}
                {isAuth() ? <Redirect to='/' /> : null}
                <Paper elevation={3} style={{ backgroundColor: '#e0e3f4', borderRadius: '15px', width: '20%', height: '30%', padding: '1%', minHeight: '300px', minWidth: '300px' }}>
                    <Grid container spacing={3} justify='center'>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <img src="https://img.icons8.com/nolan/74/stock-share.png" alt='Logo' style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                        </Grid>
                        <br />

                        <form onSubmit={createUser}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <TextField id="standard-basic" label="Name" onChange={updateName} />

                            </Grid>

                            <br />

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                                <TextField id="standard-basic" label="Email" onChange={updateEmail} />

                            </Grid>
                            <br></br>


                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField id="standard-basic" label="Password" onChange={updatePassword} />
                            </Grid>
                            <br />
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <Button variant="contained" color="primary" style={{ width: '100%', borderRadius: '30px', background: 'linear-gradient(90deg, #206aff, #c723ff 70%)' }} type='submit'>
                                    Sign Up
                        </Button>
                            </Grid>



                            <br />

                        </form>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography variant='h5' style={{ display: 'flex', justifyContent: 'center' }}>Or</Typography>
                        </Grid>
                        <br />
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Google informParent={informParent} />
                            </div>
                            <br></br>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

        </Fragment>
    )
}

export default Signup
