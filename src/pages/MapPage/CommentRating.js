import { Typography } from "@mui/material/";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfied from "@mui/icons-material/SentimentVerySatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "It is dangerous!",
  },
  2: {
    icon: <SentimentNeutralIcon />,
    label: "It is alright",
  },
  3: {
    icon: <SentimentVerySatisfied />,
    label: "It is safe",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
  // return <span>123</span>
}

export function CommentRatings({ratingLabel, setRatingLabel}) {
  const handleChange = (e, index) => {
    if (!index) {
      setRatingLabel("How do you feel about it?");
      return;
    }
    const label = customIcons[index].label;
    setRatingLabel(label);
    
  };
  return (
    <>
      <Rating
        onChange={handleChange}
        sx={{ mt: 2 }}
        name="highlight-selected-only"
        max={3}
        defaultValue={2}
        IconContainerComponent={IconContainer}
        highlightSelectedOnly
      />
      <Typography>{ratingLabel}</Typography>
    </>
  );
}
