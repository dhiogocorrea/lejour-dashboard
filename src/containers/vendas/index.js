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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import VendasPeriodo from './periodo';
import VendasCategoria from './categoria';
import VendasCasamento from './casamento';
import VendasFornecedor from './fornecedor';
import useInterval from '../../core/utils/interval'


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

const VendasCharts = (params) => {
  const [selectedFilter, setSelectedFilter] = useState(params.filter);
  const [title, setTitle] = useState('Total de vendas no Ano');
  const [value, setValue] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(false);

  const tab0 = React.useRef();
  const tab1 = React.useRef();
  const tab2 = React.useRef();
  const tab3 = React.useRef();

  const classes = useStyles();

  useInterval(() => {
    if (switchChecked) {
      switch(value) {
        case 0:
          tab1.current.click();
          break;
        case 1:
          tab2.current.click();
          break;
        case 2:
          tab3.current.click();
          break;
        case 3:
          tab0.current.click();
          break;
      }
    }
  }, 10000)

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };


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
              <Tab ref={tab0} label="Vendas" aria-label="vendas" {...a11yProps(0)} />
              <Tab ref={tab1} label="Vendas por casamento" aria-label="casamento" {...a11yProps(1)} />
              <Tab ref={tab2} label="Vendas por categoria" aria-label="categoria" {...a11yProps(2)} />
              <Tab ref={tab3} label="Vendas por fornecedor" aria-label="fornecedor" {...a11yProps(3)} />
            </Tabs>
          </Paper>
        </AppBar>
        <TabPanel value={value} index={0}>
          <VendasPeriodo
            filter={selectedFilter}
            title={title}
            comissao={false}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VendasCasamento
            filter={selectedFilter}
            title={title}
            comissao={false}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VendasCategoria
            filter={selectedFilter}
            title={title}
            comissao={false}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <VendasFornecedor
            filter={selectedFilter}
            title={title}
            comissao={false}
          />
        </TabPanel>
        <FormControlLabel
          control={<Switch size="small" checked={switchChecked} onChange={handleSwitchChange} />} label="Rolagem automática"
        />
      </div>
    </MuiThemeProvider>
  )
}

export default VendasCharts;