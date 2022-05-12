/*
 * @Author: Liusong He
 * @Date: 2022-04-25 18:07:07
 * @LastEditTime: 2022-05-12 18:54:41
 * @FilePath: \6214\src\pages\login.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import Navbar from '../components/navbar'
import { logout } from '../util/firebaseAuth'
import { login, auth } from '../util/firebaseAuth'
import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Alert,
  Button,
  Checkbox,
  CssBaseline,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  Snackbar,
} from '@mui/material'
import axios from 'axios'
import {signWithGoogle, splitName} from "../util/firebaseAuth"

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
// const currentUser = auth.currentUser
export default function SignIn() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      // navigate('/user_page')
    }
  })
  const[emptyItem, setEmptyItem] = React.useState(false)

  const handleClose = () =>{
    setEmptyItem(false)
  }

  //switch mode depend on system setting 
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // mode: prefersDarkMode ? 'dark' : 'light',
          mode: 'light'
        },
      }),
    [prefersDarkMode],
  )
  // const customization = useSelector((state) => state.customization);
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    localStorage.clear()
    axios.post("https://hungry-monkey-api.azurewebsites.net/api/user/checkUserStatus", {
      email: data.get('email')
    }).then((res)=>{
      console.log("Check User Status Is: "+ res.data.result)
      if (res.data.result.toString() === 'true'){
        login(data.get('email'), data.get('password')).then((response) => {
          console.log('response:', response)
          if (response) {
            console.log('currentUser.uid', response.user.uid)
            sessionStorage.setItem('uid', response.user.uid)
            // navigate('/user_page')
          } else {
            console.log("Login Failed")
          }
        }).catch((err) => {
          console.log('err:', err)
          alert('username or password is wrong')
        })
      }else{
        setEmptyItem(true)
        console.log("Email not verified")
      }
    }).catch(()=>{
      alert("Email doesn't exist")
      console.log("User doesn't exist")
    })
  }



  const handleGoogleLogin = () => {
    console.log('Google Here')
    signWithGoogle().then((it)=>{
      const userFromGoogle = it.user
      axios.post("https://hungry-monkey-api.azurewebsites.net/api/user/getUserByUID",{
        uid: userFromGoogle.uid
      }).then((it)=>{
          console.log("Google Sign In 200")
        sessionStorage.setItem('uid',userFromGoogle.uid)
        // navigate('/user_page')
      }).catch(()=>{
        console.log("Google Sign In 400!!!")
        const nameList = splitName(userFromGoogle.displayName)
        console.log(`Name is ${nameList}`)
        axios.post("https://hungry-monkey-api.azurewebsites.net/api/user/createUser", {
          uid: userFromGoogle.uid,
          email: userFromGoogle.email,
          first_name: nameList[0],
          last_name: nameList[1],
          role: "normal",
          status: "confirmed"
        }).then((it)=>{
          console.log("Google Sign In complete")
          sessionStorage.setItem('uid',userFromGoogle.uid)
          // navigate('/user_page')
        })
      })
    })
  }

  // if (!auth.currentUser) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* The component used for the root node. Either a string to use a HTML element or a component
        Applies the theme typography styles. */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={true}
              sx={{ mt: 3, mb: 3 }}
            >
              Sign In
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button>

            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button

              fullWidth
              variant="contained"
              sx={{
                mt: 0,
                mb: 3,
                // color: 'grey.700',
                // backgroundColor: theme.palette.grey[50],
                // borderColor: theme.palette.grey[100]
              }}
              startIcon={<GoogleIcon />}
              color='warning'
              onClick={handleGoogleLogin}
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./register_m" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
            open={emptyItem}
            autoHideDuration={3000}
            onClose={handleClose}
            severity="info"
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please verify your email first
          </Alert>
        </Snackbar>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
  // }
  // else {
  //   window.open('\Home', '_self')
  //   return null
  // }
}