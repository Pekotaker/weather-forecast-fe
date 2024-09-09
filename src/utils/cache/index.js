/*
    response schema:
    [
      {
        "date": "2024-09-09T00:00:00",
        "id": "2a1bc088-3074-471d-b277-87b671800a67",
        "condition": "Patchy rain nearby",
        "temperature": 28.6,
        "humidity": 74,
        "day": 0,
        "city": "Ho Chi Minh City",
        "condition_icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
        "wind_speed": 18
      },
      {...}
    ]


    JSON schema to store in local storage:
    {
        current_date: "...",
        history: [
            {
                "location": "...",
                "response": [...]
            }
        ]
    }
*/

async function helperFunction(response) {
  if (!response) {
    return null;
  }
  const currentDate = new Date();
  const location = response[0].city;

  const weatherHistory = await getWeatherHistory();
  if (!weatherHistory) {
    const newWeatherHistory = {
      current_date: currentDate,
      history: [
        {
          location: location,
          response: response,
        },
      ],
    };
    await storeWeatherData(newWeatherHistory);
  } else {
    const historyDate = new Date(weatherHistory.current_date);
    if (currentDate.getDate() !== historyDate.getDate()) {
      const newWeatherHistory = {
        current_date: currentDate,
        history: [
          {
            location: location,
            response: response,
          },
        ],
      };
      await storeWeatherData(newWeatherHistory);
    } else {
      const history = weatherHistory.history;
      const found = history.find((item) => item.location === location);
      if (!found) {
        history.push({
          location: location,
          response: response,
        });
        await storeWeatherData({
          current_date: currentDate,
          history: history,
        });
      }
    }
  }
}

// Function to retrieve weather history data from local storage
async function getWeatherHistory() {
  try {
    const weatherHistory = JSON.parse(localStorage.getItem("weatherHistory"));
    return weatherHistory || null;
  } catch (error) {
    console.error("Error retrieving weather history:", error);
    return null;
  }
}

// Function to store data in local storage
async function storeWeatherData(data) {
  try {
    localStorage.setItem("weatherHistory", JSON.stringify(data));
    console.log("Weather data stored successfully.");
  } catch (error) {
    console.error("Error storing weather data:", error);
  }
}

// Function to get list of all locations from local storage
async function getLocations() {
  const weatherHistory = await getWeatherHistory();
  if (!weatherHistory) {
    return [];
  }
  return weatherHistory.history.map((item) => item.location);
}

async function getLocationDetail(index) {
  const weatherHistory = await getWeatherHistory();
  if (!weatherHistory) {
    return null;
  }
  if (index >= weatherHistory.history.length) {
    return null;
  } else {
    return weatherHistory.history[index];
  }
}

export { helperFunction, getLocations, getLocationDetail };
