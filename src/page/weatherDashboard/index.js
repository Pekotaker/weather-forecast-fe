import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Container,
  CssBaseline,
  Stack,
  Divider,
} from "@mui/material";
import {
  SmallForecastCard,
  CurrentForecastCard,
  EmailDialog,
} from "../../components";
import { SubscribeService, WeatherService } from "../../api";
import { DEFAULT_CITY } from "../../config";

const convertDayToDate = (dayOffset) => {
  const today = new Date();

  // Add the dayOffset to today's date
  const futureDate = new Date(today.setDate(today.getDate() + dayOffset));
  // Extract day, month, and year
  const day = futureDate.getDate();
  const month = futureDate.getMonth() + 1;
  const year = futureDate.getFullYear();

  // Return in DD-MM-YYYY format
  return `${day}-${month}-${year}`;
};

const WeatherDashboard = () => {
  // Example forecast data (can be replaced with API data)

  const [currentWeather, setCurrentWeather] = useState({
    city: null,
    date: null,
    temperature: null,
    wind_speed: null,
    humidity: null,
    condition: null,
    condition_icon: null,
  });

  const [forecastData, setForecastData] = useState([
    {
      city: null,
      date: null,
      temperature: null,
      wind_speed: null,
      humidity: null,
      condition: null,
      condition_icon: null,
    },
    {
      city: null,
      date: null,
      temperature: null,
      wind_speed: null,
      humidity: null,
      condition: null,
      condition_icon: null,
    },
    {
      city: null,
      date: null,
      temperature: null,
      wind_speed: null,
      humidity: null,
      condition: null,
      condition_icon: null,
    },
    {
      city: null,
      date: null,
      temperature: null,
      wind_speed: null,
      humidity: null,
      condition: null,
      condition_icon: null,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [loading, setLoading] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmEmail = async () => {
    setLoading(true);
    setSubmittedEmail(submittedEmail);
    const response = await SubscribeService.subscribe(
      submittedEmail,
      submittedCity
    );
    if (response) {
      alert(response);
      closeDialog();
      setLoading(false);
    }
  };

  const fetchWeatherData = async (city = DEFAULT_CITY) => {
    if (city === "" || city === undefined) {
      city = null;
    }
    let response;
    if (city !== null) {
      response = await WeatherService.getWeatherHistory(city);
    } else {
      response = await WeatherService.getCurrentLocationWeather();
    }
    if (response[0] && response[0].city) {
      setCurrentWeather(response[0]);
      setForecastData(response.slice(1));
    } else {
      alert(`Error: ${response}`);
    }
  };

  useEffect(() => {
    fetchWeatherData(DEFAULT_CITY);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            pt: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Weather Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        id="mainContainer"
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="xl"
          sx={{
            mt: 2,
            mb: 1,
            p: 2,
            backgroundColor: "white",
            boxShadow: 2,
            borderRadius: 2,
          }}
        >
          {/* Search bar section */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginBottom: 3 }}
          >
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: 2,
                }}
              >
                <Stack direction="column" spacing={2} width="100%">
                  <Typography variant="h6" align="center">
                    Enter a city name
                  </Typography>
                  <TextField
                    fullWidth
                    id="search-city"
                    variant="outlined"
                    placeholder="E.g., New York, London, Tokyo"
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      fetchWeatherData(
                        document.getElementById("search-city").value
                      )
                    }
                  >
                    Search
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      fetchWeatherData();
                      document.getElementById("search-city").value = null;
                    }}
                  >
                    Use Current Location
                  </Button>
                  <Divider />
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={openDialog}
                  >
                    Subscribe to Newsletter
                  </Button>
                  <EmailDialog
                    loading={loading}
                    email={submittedEmail}
                    setEmail={setSubmittedEmail}
                    city={submittedCity}
                    setCity={setSubmittedCity}
                    open={dialogOpen}
                    handleClose={closeDialog}
                    handleConfirm={handleConfirmEmail}
                  />
                </Stack>
              </Box>
            </Grid>

            {/* Forecast section */}

            {/* Current day large card */}
            <Grid item xs={12} md={8}>
              <Box sx={{ ml: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CurrentForecastCard
                    city={currentWeather.city}
                    date={convertDayToDate(currentWeather.day)}
                    temperature={currentWeather.temperature}
                    wind_speed={currentWeather.wind_speed}
                    humidity={currentWeather.humidity}
                    condition={currentWeather.condition}
                    condition_icon={currentWeather.condition_icon}
                  />
                </Box>

                <Typography variant="h6" align="left" sx={{ mt: 3 }}>
                  4-Day Forecast
                </Typography>

                {/* 4-day forecast section */}
                <Box sx={{ mt: 3 }}>
                  <Grid container justifyContent={"center"}>
                    {forecastData.map((forecast, index) => (
                      <Grid item xs={12} md={3} sx={{ p: 1 }}>
                        <SmallForecastCard
                          key={index}
                          city={forecast.city}
                          date={convertDayToDate(forecast.day)}
                          temperature={forecast.temperature}
                          wind_speed={forecast.wind_speed}
                          humidity={forecast.humidity}
                          condition={forecast.condition}
                          condition_icon={forecast.condition_icon}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default WeatherDashboard;
