// import { Box, Center, Divider, Icon, Image, Text } from "@chakra-ui/react"

import { Text } from "@chakra-ui/react"
import { Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"


export const CommentListItem = ({data}) => {
  return (
    <>
      <Box my={1} display={{ md: "flex" }}>
        
        <Box textAlign={"left"} >
          <Text
            mb={2}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide"
            noOfLines={1}
          >
            Title
          </Text>
          
          <Text noOfLines={3} color="gray.500">
            { "Description"}
          </Text>
          <Text
            m={0}
            color="gray"
            variant="body2"
            lineHeight="normal"
            fontWeight="semibold"
          >
            { "By Unknown name"}
          </Text>
        </Box>
        
      </Box>
      
    </>
  )
}