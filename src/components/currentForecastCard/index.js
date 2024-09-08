import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const CurrentForecastCard = ({
  city,
  date,
  temperature,
  wind_speed,
  humidity,
  condition,
  condition_icon,
}) => {
  return (
    <Card
      sx={{
        flexGrow: 1,
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
      }}
    >
      <CardContent>
        <Grid container justifyContent="center">
          <Grid item xs={8} textAlign="left">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                justifyContent: "space-evenly",
              }}
            >
              <Typography variant="h5">
                {city} ({date})
              </Typography>
              <Typography variant="body1">
                Temperature: {temperature}°C
              </Typography>
              <Typography variant="body1">Wind: {wind_speed} kph</Typography>
              <Typography variant="body1">Humidity: {humidity}%</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <img
              src={condition_icon ? `https:${condition_icon}` : ""}
              alt={condition}
              style={{ width: "100px", height: "100px" }}
            />
            <Typography variant="h6">{condition}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentForecastCard;
