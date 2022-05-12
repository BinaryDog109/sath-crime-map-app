import React, { useState } from "react"
import { Box, Button, Grid, Typography } from '@mui/material'
import EthnicityOption from "../components/EthnicityOption"

function EthnicitySelect() {
    const [optionSelected, setOptionSelected] = useState(false)
    const [selectedEthnicity, setSelectedEthinicity] = useState('')

  return (
        <Box>
            {/** top title + back button? */}
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                    <Typography variant="h6">Please select your ethnicity</Typography>
                </Grid>
                <Grid item xs={2}/>
            </Grid>

            {/** Middle section - ethnicity selection */}
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                    <EthnicityOption ethnicity="White" emoji="🧑🏻👩🏻" setOptionSelected={setOptionSelected} setSelectedEthinicity={setSelectedEthinicity} selectedEthnicity={selectedEthnicity}/>
                    <EthnicityOption ethnicity="Black" emoji="🧑🏿👩🏿"/>
                    <EthnicityOption ethnicity="Asian" emoji="🧑👩"/>
                    <EthnicityOption ethnicity="Mixed" emoji="👨🏽👩🏽"/>
                    <EthnicityOption ethnicity="Other"/>
                </Grid>
            </Grid>
            
            {/** bottom row - submit button takes the user to the next page */}
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Grid item xs={8}/>
                <Grid item xs={4}>
                    <Button variant="contained" disabled={optionSelected? false : true}>Continue</Button>
                </Grid>
            </Grid>

        </Box>
  );
}

export default EthnicitySelect;
