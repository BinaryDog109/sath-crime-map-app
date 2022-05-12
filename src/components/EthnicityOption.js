import React, { useEffect, useState } from "react"
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

const boxStyle = {
    marginTop: 15, 
    marginBottom: 15
}

function EthnicityOption(props) {
    const [otherOption, setOtherOption] = useState(false)
    const [optOut, setOptOut] = useState(false)

    useEffect(() => {
        if(props.ethnicity === "Other"){
            // other has been selected
            setOtherOption(true)
        }
        
        if(props.ethnicity === "Prefer not to say") {
            setOptOut(true)
        }

    }, [])

    if(otherOption) {
        return (
            <Box style={boxStyle}>
                <Card>
                    <Typography gutterBottom variant="h5" component="div">{props.ethnicity}</Typography>
                </Card>
            </Box>
      );
    } else if(optOut) {
        return (
            <Box style={boxStyle}>
                <Card>
                    <Typography gutterBottom variant="h5" component="div">{props.ethnicity}</Typography>
                </Card>
            </Box>
        );
    } else {
        return (
            <Box style={boxStyle}>
                <Card>
                    <CardContent>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={6}><Typography gutterBottom variant="h5" component="div">{props.ethnicity}</Typography></Grid>
                            <Grid item xs={6}><Typography gutterBottom variant="h6" component="div">{props.emoji}</Typography></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
      );
    }
}

export default EthnicityOption;
