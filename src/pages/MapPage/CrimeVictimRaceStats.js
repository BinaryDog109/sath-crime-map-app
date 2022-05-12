import { Divider, Link, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export const CrimeVictimRaceStats = () => {
  const [stats, setStats] = useState(null);
  const url =
    "https://open-data-cw2-api.azurewebsites.net/api/map/getGovEthnicityDistribution";
  useEffect(() => {
    const getRaceStats = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setStats(json);
    };
    getRaceStats();
  }, []);
  return (
    <div>
      <Typography variant="caption">
        Data from{" "}
        <Link href="https://www.ethnicity-facts-figures.service.gov.uk/crime-justice-and-the-law/crime-and-reoffending/victims-of-crime/latest">
          Victims of crime
        </Link>{" "}
      </Typography>
      <List>
        {stats &&
          Object.keys(stats).map((ethnicity) => (
            <>
              <Divider textAlign="left">{ethnicity}</Divider>
              <ListItem
                sx={{
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <CountUp
                  style={{
                    fontSize: "3rem",
                    fontWeight: 600,
                  }}
                  end={stats[ethnicity] * 100}
                />
                %
                <Typography ml={"auto"}>of being a victim of crimes</Typography>
              </ListItem>
            </>
          ))}
      </List>
    </div>
  );
};
