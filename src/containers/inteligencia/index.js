import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import RadioFilters from '../../components/filter/RadioFilters';
import VendasPeriodo from '../vendas/periodo';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E2645A',
    }
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const InteligenciaCharts = (params) => {
  const [selectedFilter, setSelectedFilter] = useState(params.filter);
  const [title, setTitle] = useState('Total de vendas no Ano');
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filters = [
    { label: 'Dia', value: 'day', title: 'Total de vendas no último dia' },
    { label: 'Semana', value: 'week', title: 'Total de vendas na última semana' },
    { label: 'Mês', value: 'month', title: 'Total de vendas no último mês' },
    { label: '3 Meses', value: 'three_months', title: 'Total de vendas nos últimos 3 meses' },
    { label: '6 Meses', value: 'six_months', title: 'Total de vendas nos últimos 6 meses' },
    { label: 'Ano', value: 'year', title: 'Total de vendas no Ano' }
  ]

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setTitle(event.target.dataset.label)
    params.setFilterRadio(event.target.value)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <RadioFilters
          filters={filters}
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />
        <AppBar position="static">
          <Paper square>
            <Tabs
              value={value}
              TabIndicatorProps={{ style: { background: '#E2645A' } }}
              onChange={handleChange}
              centered
              textColor="primary"
            >
              <Tab label="Vendas" aria-label="vendas" {...a11yProps(0)} />
            </Tabs>
          </Paper>
        </AppBar>
        <TabPanel value={value} index={0}>
          <VendasPeriodo
            filter={selectedFilter}
            title={title}
            comissao={false}
            applyRegression={true}
          />
        </TabPanel>
      </div>
    </MuiThemeProvider>
  )
}

export default InteligenciaCharts;