import React, { useEffect, useState } from "react"
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import EthnicityOption from "../components/EthnicityOption"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

function EthnicitySelect() {
    const [selectedEthnicity, setSelectedEthinicity] = useState('')
    const navigate = useNavigate()
    const handleContinue = (event) => {
        event.preventDefault()
        for (let i = 0; i < 7; i++) {
            if (event.target[i].checked) {
                sessionStorage.setItem('ethnicity', event.target[i].value)
                // setSelectedEthinicity(element.value)
                axios.patch('https://open-data-cw2-api.azurewebsites.net/api/user/updateUserEthnicity', {
                    uid: sessionStorage.getItem('uid'),
                    ethnicity: event.target[i].value,
                })
            }
        }

        // event.target.forEach(element => {
        //     if(element.checked){
        //         sessionStorage.setItem('ethnicity',element.value)
        //         // setSelectedEthinicity(element.value)
        //     }
        // });
        console.log(event)
        navigate('/mapPage')
    }

    return (
        <Box component="form" onSubmit={handleContinue}>
            {/** top title + back button? */}
            <Grid container alignItems="center">
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" textAlign={"center"}>Please select your ethnicity</Typography>
                </Grid>
                <Grid item xs={2} />
            </Grid>

            {/** Middle section - ethnicity selection */}
            <FormControl sx={{ width: "100%" }}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <RadioGroup name="ethnicity-select-radio-group" defaultValue="optOut">
                            <FormControlLabel value="White" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="White " emoji="🧑🏻👩🏻" />} style={{ justifyContent: "center" }} />
                            <FormControlLabel value="Black" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Black" emoji="🧑🏿👩🏿" />} style={{ justifyContent: "center" }} />
                            <FormControlLabel value="Asia" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Asian" emoji="🧑👩" />} style={{ justifyContent: "center" }} />
                            <FormControlLabel value="Mixed" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Mixed" emoji="👨🏽👩🏽" />} style={{ justifyContent: "center" }} />
                            <FormControlLabel value="unknown" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Prefer not to say" />} style={{ justifyContent: "center" }} />
                            <FormControlLabel value="Other" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Other" />} style={{ justifyContent: "center" }} />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControlLabel
            sx={{ml:3,mb:3}}
              control={<Checkbox value="remember" color="primary" />}
              label="All the ethnicity collected will only be used for statistical purposes"
            />
            {/** bottom row - submit button takes the user to the next page */}
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ marginBottom: 10 }}>
                <Grid item xs={12} justifyContent="center">
                    <Button sx={{ marginLeft: "50%", transform: "translate(-50%)" }} variant="contained" type="submit">Continue</Button>
                </Grid>
            </Grid>

        </Box>
    )
}

export default EthnicitySelect
