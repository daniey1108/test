import React from "react";
import Routing from './Routing';

import MenuIcon from '@material-ui/icons/Menu';
import * as MaterialUi from '@material-ui/core';

import theme from './theme.jsx'

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <MaterialUi.ThemeProvider theme={theme}>
        <MaterialUi.AppBar position="static">
          <MaterialUi.Toolbar>
            <MaterialUi.IconButton color="inherit" aria-label="menu" onClick={handleClick}>
              <MenuIcon />
            </MaterialUi.IconButton>
            <MaterialUi.Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
                <MaterialUi.MenuItem component='a' href='/'>Home</MaterialUi.MenuItem>
                <MaterialUi.MenuItem component='a' href='/About'>About</MaterialUi.MenuItem>
            </MaterialUi.Menu>
            <MaterialUi.Typography variant="h6">
              Danielle Allan
            </MaterialUi.Typography>
          </MaterialUi.Toolbar>
        </MaterialUi.AppBar>
        <Routing />
        </MaterialUi.ThemeProvider>
      </header>
    </div>
  );
}

export default App;
