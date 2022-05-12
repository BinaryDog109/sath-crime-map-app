import React, { useEffect, useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardActionArea, CardContent, Grid, Typography, TextField } from '@mui/material'

const outlined = {
    marginTop: 15, 
    marginBottom: 15,
    border: '1px solid rgba(255, 25, 24, 1)',
}

const boxStyle = {
    marginTop: 15, 
    marginBottom: 15
}

function EthnicityOption(props) {
    const [otherOption, setOtherOption] = useState(false)
    const [otherEthnicityValue, setOtherEthnicityValue] = useState('')
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if(props.ethnicity === "Other"){
            // other has been selected
            setOtherOption(true)
        }
    }, [])

    const handleTextInput = (event) => {
        setOtherEthnicityValue(event.target.value)
    }

    const handleSelection = () => {
        props.setOptionSelected(true)
        props.setSelectedEthinicity(props.ethnicity)
        setSelected(!selected)
        console.log(props.selectedEthnicity)
    }

    if(otherOption) {
        return (
            <Box style={boxStyle}>
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" >
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item xs={11}><Typography gutterBottom variant="h5" component="div">{props.ethnicity}</Typography></Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField id="other-ethnicity-input" label="Please input your ethnicity" variant="outlined" fullWidth onChange={handleTextInput}/>
                    </AccordionDetails>
                </Accordion>
            </Box>
      );
    } else {
        return (
            <Box style={selected? outlined : boxStyle}>
                <Card onClick={handleSelection}>
                    <CardActionArea>
                        <CardContent>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item xs={6}><Typography gutterBottom variant="h5" component="div">{props.ethnicity}</Typography></Grid>
                                <Grid item xs={5}><Typography gutterBottom variant="h4" component="div">{props.emoji}</Typography></Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
      );
    }
}

export default EthnicityOption;
