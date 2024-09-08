import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { WeatherDashboard } from "./page";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#344955",
    },
    secondary: {
      main: "#f9aa33",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "Rubik, sans-serif",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <WeatherDashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;
