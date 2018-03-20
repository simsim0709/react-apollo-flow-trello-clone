import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import LoginButton from 'components/LoginButton';

import { NavLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const Header = props => {
  const { classes } = props;
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="contrast"
          aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          <NavLink to="/">Trello</NavLink>
        </Typography>
        <LoginButton variant="raised" color="secondary" />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
