import { Box, Center, Icon, Image, Text } from "@chakra-ui/react"
import { Divider } from "@mui/material"

export const CommentListItem = ({data}) => {
  return (
    <>
      <Box p={4} display={{ md: "flex" }}>
        
        <Box textAlign={"left"} mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
          >
            User: Ty
          </Text>
          <Text
            mt={1}
            display="block"
            fontSize="lg"
            lineHeight="normal"
            fontWeight="semibold"
            href="#"
          >
            { "Unknown name"}
          </Text>
          <Text noOfLines={3} mt={2} color="gray.500">
            { "Description"}
          </Text>
        </Box>
        
      </Box>
      <Center>
        <Divider w={"80%"} orientation="horizontal" />
      </Center>
    </>
  )
}