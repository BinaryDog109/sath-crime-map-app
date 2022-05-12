/*
 * @Author: Liusong He
 * @Date: 2022-04-25 19:01:30
 * @LastEditTime: 2022-05-12 18:41:37
 * @FilePath: \6214\src\pages\register.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: The meterial version of the login-in page
 */
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Container,
  Divider,
  FormControl,
  InputLabel,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  Alert, Snackbar
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete'
import { signup, auth, login } from "../util/firebaseAuth"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        SATH
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// const theme = createTheme()
// console.log({ countries })
export default function SignUp() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      // navigate('/user_page')
    }
  })
  const [emptyItem, setEmptyItem] = React.useState(false)
  const [role, setRole] = React.useState('normal')
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    // .min(6, 'Username must be at least 6 characters')
    // .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password1: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    password2: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password1'), null], 'Confirm Password does not match'),
    // role: Yup.string('Role is required!'),
  })

  //use for get current user's info
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const [handleAddressInput, setHandleAddressInput] = React.useState('')
  const onSubmit = (event) => {

    console.log({
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email,
      password1: event.password1,
      password2: event.password2,
      address1: event.address1,
      address2: event.address2,
      country: event.country,
      role: role
    })
    signup(event.email, event.password1).then((response) => {
      const currentUser = auth.currentUser
      console.log('currentUser.uid in register line 133', currentUser.uid)
      sessionStorage.clear()
      console.log(currentUser)
      if (currentUser) {
        console.log('-------------------')
        console.log('currentUser.uid', currentUser.uid)
        //sessionStorage.setItem('uid', currentUser.uid)
        //sessionStorage.setItem('firstname', currentUser.first_name)
        const newAccount = {
          'uid': currentUser.uid,
          'email': event.email,
          'nick_name': event.username,

        }
        axios.post('https://open-data-cw2-api.azurewebsites.net/api/user/createNewUser', newAccount)
          .then(response => {
            console.log('response:', response.data)
            //sessionStorage.setItem('user', JSON.stringify(newAccount))
            axios.post('https://hungry-monkey-api.azurewebsites.net/api/user/verifyEmail', {
              uid: currentUser.uid,
              email: event.email
            }).then(() => {
              setEmptyItem(true)
              console.log("Verification Email Sent")
              // navigate('/login')
            })
          })
          .catch(error => {
            console.log(error)
          })

      }
      console.log("Sign Up Success")
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleSelector = (event) => {
    setRole(event.target.value)
    if (event.target.value != 'normal') {
      setHandleAddressInput('none')
    }
    else {
      setHandleAddressInput('')
    }
    console.log(event.target.value)
  }

  const handleClose = () => {
    setEmptyItem(false)
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light'
        },
      }),
    [prefersDarkMode],
  )
  const [username, setUsername] = React.useState('')

  // console.log('currentUser.uid',currentUser);
  if (!sessionStorage.getItem('uid')) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* icon */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <FormControl component="form" noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }
              }>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} 
                >

                  <InputLabel>Role</InputLabel>
                  <Select
                    id="role"
                    value={role}
                    label="Role"
                    onChange={handleSelector}
                    fullWidth
                    
                  >
                    <MenuItem value='asian'>👩👨 Asia</MenuItem>
                    <MenuItem value='black'>👩🏿👨🏿 Black</MenuItem>
                    <MenuItem value='mixed'>👩🏼👨🏼 Mixed</MenuItem>
                    <MenuItem value='white'>👩🏻👨🏻 White</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                    <MenuItem value='=optOut'>Prefer not to say</MenuItem>
                  </Select>
                  <Typography variant="inherit" color="textSecondary">
                    {errors.role?.message}
                  </Typography>
                </Grid>             */}
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="family-name"
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    {...register('username')}
                    error={errors.username ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.lastName?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register('email')}
                    error={errors.email ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.email?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password1"
                    autoComplete="new-password"
                    // store the password1 for comparing with password2
                    // onChange={(e) => setPassword(e.currentTarget.value)}
                    {...register('password1')}
                    error={errors.password1 ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.password1?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // error={confirmpasswordstate}
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="new-password"
                    // onChange={validatePassword}
                    {...register('password2')}
                    error={errors.password2 ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.password2?.message}
                  </Typography>
                </Grid>

                <Grid item xs={12} display={handleAddressInput}>
                  <Divider sx={{ mt: 3, mb: 1 }} orientation="horizontal"></Divider>

                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  name='acceptTerms'
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(onSubmit)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="./login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
          <Snackbar
            open={emptyItem}
            autoHideDuration={3000}
            onClose={handleClose}
            severity="info"
          >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Verification Email Sent
            </Alert>
          </Snackbar>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    )
  } else {
    // navigate('/user_page')
    return null
  }
}
