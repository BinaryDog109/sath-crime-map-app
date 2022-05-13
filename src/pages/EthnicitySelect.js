import React, { useState } from "react"
import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import EthnicityOption from "../components/EthnicityOption"

function EthnicitySelect() {
    const [selectedEthnicity, setSelectedEthinicity] = useState('')

    const handleContinue = () => {

    }

  return (
        <Box>
            {/** top title + back button? */}
            <Grid container alignItems="center">
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" textAlign={"center"}>Please select your ethnicity</Typography>
                </Grid>
                <Grid item xs={2}/>
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
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{marginBottom: 10}}>
                <Grid item xs={12} justifyContent="center" >
                    <Button sx={{marginLeft: "50%", transform: "translate(-50%)"}} variant="contained" onClick={handleContinue}>Continue</Button>
                </Grid>
            </Grid>

        </Box>
  );
}

export default EthnicitySelect;
