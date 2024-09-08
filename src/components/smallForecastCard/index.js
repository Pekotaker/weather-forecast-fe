import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const SmallForecastCard = ({
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
        backgroundColor: "background.default",
        width: "100%",
      }}
    >
      <CardContent>
        <Box textAlign="left">
          <Typography variant="h5">{date}</Typography>
          <img
            src={condition_icon ? `https:${condition_icon}` : ""}
            alt={condition}
          />
          <Typography variant="body1">Temperature: {temperature}°C</Typography>
          <Typography variant="body1">Wind: {wind_speed} kph</Typography>
          <Typography variant="body1">Humidity: {humidity}%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SmallForecastCard;
