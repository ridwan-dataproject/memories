import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import { GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import { signin, signup } from '../../actions/auth'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

// creating sign in and sign up into a single component
const Auth = () => {
    const classes = useStyles()

    const [ showPassword, setShowPassword ] = useState(false)

    const [ isSignup, setIsSignup ] = useState(false) // user always sees sign in at first

    const [ formData, setFormData ] = useState(initialState)

    const dispatch = useDispatch()

    const history = useHistory()

    // Login form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    // inserted to field form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value  })
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchMode = () => {
        setIsSignup(!isSignup)
        setShowPassword(false) // never show password everytme user click switchmode
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: {result, token} })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    

    const googleFailure = () => {

    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>        {/*form header to identify a user*/}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && ( // If only isSignup is true, show this 
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                        {/* else of isSignup = Sign In --> Email and Password fields only*/}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} /> {/* click to show password or hide*/}
                        
                        {/* If only isSignup is true, show this input*/}
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>

                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    
                    <GoogleLogin 
                        clientId="438551387008-39ac526vmff3255i45e9i9aj620rhbf3.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Sign In With Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />


                    <Grid container justify="flex-end">
                            <Grid item>
                                    <Button onClick={switchMode}>
                                        { isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up " }
                                    </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
