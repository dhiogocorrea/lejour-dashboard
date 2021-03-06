import React from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MemoryIcon from '@material-ui/icons/Memory';

import VendasCharts from './containers/vendas/index'
import ComissaoCharts from './containers/comissao/index'
import InteligenciaCharts from './containers/inteligencia/index'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 50,
    marginTop: 5,
    marginBottom: 5
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f48fb1',
        light: '#757ce8',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  const style = { backgroundColor: '#ffffff', color: '#E2645A' };

  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [filterRadio, setFilterRadio] = React.useState('year');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (indx) => {
    setSelectedTab(indx)
  }

  const renderCharts = () => {
    if (selectedTab === 0)
      return (<VendasCharts filter={filterRadio} setFilterRadio={setFilterRadio} />)
    else if (selectedTab === 1) {
      return (<ComissaoCharts filter={filterRadio} setFilterRadio={setFilterRadio} />)
    } else if (selectedTab == 2) {
      return (<InteligenciaCharts filter={filterRadio} setFilterRadio={setFilterRadio} />)
    }
    return null
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={style}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src="logo.png" alt="logo" className={classes.logo} />
          <p>Dia atual setado em 14/10/2020 15:15 para testes.</p>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Vendas', 'Comissão', 'Inteligencia'].map((text, index) => (
            <ListItem button key={text} onClick={() => handleMenuClick(index)}>
              <ListItemIcon>{index === 0 ? <LoyaltyIcon /> : index === 1 ? <MonetizationOnIcon /> : <MemoryIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {renderCharts()}
      </main>
    </div>
  );
}

export default App;
