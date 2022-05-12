// import { Box, Center, Divider, Icon, Image, Text } from "@chakra-ui/react"

import { Text } from "@chakra-ui/react";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfied from "@mui/icons-material/SentimentVerySatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
const ratingMap = {
  "dangerous": {
    icon: <SentimentVeryDissatisfiedIcon color="warning" />,
    label: "dangerous",
  },
  "alright": {
    icon: <SentimentNeutralIcon color="primary" />,
    label: "alright",
  },
  "safe": {
    icon: <SentimentVerySatisfied color="success" />,
    label: "safe",
  },
};
export const CommentListItem = ({ data }) => {
  return (
    <>
      <Box my={1} display={{ md: "flex" }}>
        <Box textAlign={"left"}>
          <Text
            mb={2}
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wide"
            noOfLines={1}
          >
            {data.title}
          </Text>

          <Text color="gray.500">{data.comment}</Text>
          {<span>{ratingMap[data.rating].icon}</span>}
          <Text
            m={0}
            color="gray"
            variant="body2"
            lineHeight="normal"
            fontWeight="semibold"
          >
            By {data.uid}
          </Text>
        </Box>
      </Box>
    </>
  );
};
