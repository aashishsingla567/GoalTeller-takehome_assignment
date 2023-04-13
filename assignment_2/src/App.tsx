import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./muiTheme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PortfolioPage from "./pages/Portfolio.page";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
