import './App.css';
import { useState } from 'react';
import { Grid, AppBar, Toolbar } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ButtonPage from './componenets/ButtonPage';
import PageWrapper from './componenets/PageWrapper';
import {JoinPage, InvitePage, BuyPage, DebugPage, SellPage } from './componenets/Pages';

const theme = createTheme({
  palette: {
    background: {
      default: "#ffe5d9",
    },
    primary: {
      main: '#d87093',
    },
  },
});

const pages = {
  buy: "Buy",
  sell: "Sell",
  invite: "Invite",
  join: "Join",
  debug: "Advanced"
}

const PageSelector = ({ page }) => {
  switch (page) {
    case pages.buy:
      return <BuyPage />
    case pages.sell:
      return <SellPage />
    case pages.invite:
      return <InvitePage />
    case pages.join:
      return <JoinPage />
    case pages.debug:
      return <DebugPage />
    default:
      return null
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState(pages.join);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div position="absolute">
        <AppBar position="relative" color="primary">
          <Toolbar>
            <ButtonPage pageName={pages.buy} setPage={setCurrentPage} />
            <ButtonPage pageName={pages.sell} setPage={setCurrentPage} />
            <ButtonPage pageName={pages.invite} setPage={setCurrentPage} />
            <ButtonPage pageName={pages.join} setPage={setCurrentPage} />
            <ButtonPage pageName={pages.debug} setPage={setCurrentPage} />
          </Toolbar>
        </AppBar>
        <div position="relative" style={{ margin: "10em" }}>
          <PageWrapper title={currentPage}>
            <PageSelector page={currentPage} />
          </PageWrapper>
        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
