import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { CrimeDetailChips } from "./CrimeDetailChips";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const CommentDrawerTabs = ({ children, tabNames=["item1", "item2", "item3"] }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {children instanceof Array ? (
            children.map((child, index) => (
              <Tab key={index} label={tabNames[index]} {...a11yProps(index)} />
            ))
          ) : (
            <Tab label={tabNames[0]} {...a11yProps(0)} />
          )}
        </Tabs>
      </Box>
      {children instanceof Array ? (
        children.map((child, index) => (
          <TabPanel value={value} index={index} key={index}>
            <Box py={2} px={2}>
              {child}
            </Box>
          </TabPanel>
        ))
      ) : (
        <TabPanel value={value} index={0}>
          <Box py={2} px={2}>
            {children}
          </Box>
        </TabPanel>
      )}
    </>
  );
};
