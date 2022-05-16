import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import StarIcon from '@mui/icons-material/StarBorder'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import GlobalStyles from '@mui/material/GlobalStyles'
import Container from '@mui/material/Container'
import Navbar from '../components/navbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import PropTypes from 'prop-types'
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

function ElevationScroll(props) {
    const { children, window } = props
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    })

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    })
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}


const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            'Free to use',
            'Limited Map Function',
            'Comment Funtion'
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '4.99',
        description: [
            'Full Map function',
            'Comment Funtion',
            'Safe path finder',
            'No ads'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    // {
    //     title: 'Plus',
    //     price: '',
    //     description: [
    //         'Full Map function',
    //         'Comment Funtion',
    //         ''
    //     ],
    //     buttonText: 'Contact us',
    //     buttonVariant: 'outlined',
    // },
]



function PricingContent(props) {
    const navigate = useNavigate()
    const handleFree = () =>{
        navigate('/login')
    }
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar><Navbar /></AppBar></ElevationScroll>

            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 9 }}>
                <Typography
                    component="h4"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography variant="h7" align="center" color="text.secondary" component="p" sx={{
                    mb: 3,
                    ml: 2,
                    mr: 2
                }}>
                    It is free to use most of the funtions. We also have servel plans for you to select to have a better experience.

                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            £{tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            /mo
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        onClick={tier.title === 'Free' ? handleFree : null}
                                      
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Copyright sx={{ mt: 5 }} />
            {/* End footer */}
        </React.Fragment>
    )
}

export default function Pricing() {
    return <PricingContent />
}