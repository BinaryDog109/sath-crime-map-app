import React from "react";
import {
  chakra,
  Box,
  Flex,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'

export function HomePage(){
    const navigate = useNavigate()
  return (
    <chakra.header>
      
      <Box
        w="full"
        h="100vh"
        // Photo by Tamas Tuzes-Katai on Unsplash
        backgroundImage="url(/home-page-unsplash.jpg)"
        bgPos="center"
        bgSize="cover"
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          bg="blackAlpha.700"
        >
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              fontSize={["2xl", "3xl"]}
              fontWeight="semibold"
              color="white"
            //   textTransform="uppercase"
            >
              There is always a {" "}
              <chakra.span bgGradient="linear(to-r, blue.500, white)"
            bgClip="text" textDecor="underline">
                Safe Path
              </chakra.span>
            </Heading>
            <Button onClick={()=>navigate("/mappage")} colorScheme="blue" p={5}>Start to explore</Button>
            <Button onClick={()=>navigate("/register")} p={5}>Sign up</Button>
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
};

