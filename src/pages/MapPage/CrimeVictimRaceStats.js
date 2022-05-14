import { Box, Divider, Link, List, ListItem, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";

export const CrimeVictimRaceStats = ({ crimeId }) => {
  const [stats, setStats] = useState(null);
  const [commentStats, setCommentStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false)
  const [commentStatsLoading, setCommentStatsLoading] = useState(false)
  const url =
    "https://open-data-cw2-api.azurewebsites.net/api/map/getGovEthnicityDistribution";
  const commentStatsUrl =
    "https://open-data-cw2-api.azurewebsites.net/api/map/getCommentRatingDistributionByEthnicity";
  useEffect(() => {
    const getGovEthnicityStats = async () => {
      setStatsLoading(true)
      const response = await fetch(url);
      const json = await response.json();
      setStats(json);
      setStatsLoading(false)
    };
    const getCommentEthcinityStats = async () => {
      setCommentStatsLoading(true)
      const response = await fetch(commentStatsUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          crimeId: crimeId,
        }),
      });
      const json = await response.json();
      setCommentStats(json);
      setCommentStatsLoading(false)
    };
    getGovEthnicityStats();
    if (crimeId) getCommentEthcinityStats();
  }, [crimeId]);
  // console.log({ stats, commentStats });
  return crimeId ? (
    <div>
      <div>
        <Typography variant="caption">Data from the comment section</Typography>
        <List>
          {commentStatsLoading && "Loading and calculating..."}
          {commentStats &&
            Object.keys(commentStats).map((ethnicity, index) => (
              <Fragment key={index}>
                <Divider textAlign="left">{ethnicity}</Divider>
                <ListItem
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Box>
                    <CountUp
                      style={{
                        fontSize: "3rem",
                        fontWeight: 600,
                      }}
                      end={commentStats[ethnicity].safe * 100}
                    />
                    %<Typography ml={"auto"}>feels safe</Typography>
                  </Box>
                  <Box>
                    <CountUp
                      style={{
                        fontSize: "3rem",
                        fontWeight: 600,
                      }}
                      end={commentStats[ethnicity].dangerous * 100}
                    />
                    %<Typography ml={"auto"}>feels dangerous</Typography>
                  </Box>
                </ListItem>
              </Fragment>
            ))}
        </List>
      </div>
      <Divider></Divider>
      <div>
        <Typography variant="caption">
          Data from{" "}
          <Link href="https://www.ethnicity-facts-figures.service.gov.uk/crime-justice-and-the-law/crime-and-reoffending/victims-of-crime/latest">
            Victims of crime
          </Link>{" "}
        </Typography>
        <List>
        {statsLoading && "Loading and calculating..."}
          {stats &&
            Object.keys(stats).map((ethnicity, index) => (
              <Fragment key={index}>
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
                  <Typography ml={"auto"}>
                    of being a victim of crimes
                  </Typography>
                </ListItem>
              </Fragment>
            ))}
        </List>
      </div>
    </div>
  ) : (
    <Typography>Please select a location of crime first</Typography>
  );
};
