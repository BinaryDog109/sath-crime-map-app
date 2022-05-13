import React, { useEffect, useState } from "react"
import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import EthnicityOption from "../components/EthnicityOption"
import { useNavigate } from 'react-router-dom'

function EthnicitySelect() {
    const [selectedEthnicity, setSelectedEthinicity] = useState('')
    const navigate = useNavigate()
    const handleContinue = (event) => {
        event.preventDefault()
        for (let i = 0; i < 7; i++) {
            if (event.target[i].checked) {
                sessionStorage.setItem('ethnicity', event.target[i].value)
                // setSelectedEthinicity(element.value)
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
            <FormControl sx={{width: "100%"}}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <RadioGroup name="ethnicity-select-radio-group" defaultValue="optOut">
                            <FormControlLabel value="white" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="White" emoji="🧑🏻👩🏻"/>} style={{justifyContent: "center"}} />
                            <FormControlLabel value="black" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Black" emoji="🧑🏿👩🏿"/>} style={{justifyContent: "center"}} />
                            <FormControlLabel value="asian" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Asian" emoji="🧑👩"/>} style={{justifyContent: "center"}} />
                            <FormControlLabel value="mixed" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Mixed" emoji="👨🏽👩🏽"/>} style={{justifyContent: "center"}} />
                            <FormControlLabel value="optOut" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Prefer not to say" />} style={{justifyContent: "center"}} />
                            <FormControlLabel value="other" control={<Radio />} labelPlacement="start" label={<EthnicityOption ethnicity="Other"  />} style={{justifyContent: "center"}} />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </FormControl>

            {/** bottom row - submit button takes the user to the next page */}
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ marginBottom: 10 }}>
                <Grid item xs={6}>
                    <Button sx={{marginLeft: "50%", transform: "translate(-50%)"}} variant="contained" type="submit">Continue</Button>
                </Grid>
            </Grid>

        </Box>
    )
}

export default EthnicitySelect
