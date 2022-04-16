import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components'
import { Box, Container, Grid, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DataGrid } from '@mui/x-data-grid';
import Autocomplete from '@mui/material/Autocomplete';
import SalesDetails from '../components/dashboard/SalesDetails';
import TextField from '@material-ui/core/TextField';
import _, { map } from 'underscore';
//import { DatePicker, DateTimePicker, LocalizationProvider, AdapterDateFns } from '@material-ui/lab/AdapterDateFns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DatePicker';
import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import { ComposedChart, XAxis, YAxis, Line, Area, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label, ReferenceLine } from 'recharts'

import oldSalesData from '../exampleData/dados2.json';
import { getSales } from '../services/salesService'
import AppContext from '../AppContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: 10,
    top: 50,
    width: '50%'
  }
});

const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

const defaultMinDate = new Date("2015-01-01")
const defaultMaxDate = new Date()

const initFiltersMap = () => {
  let initFilters = new Map();
  initFilters.set("table", ["list"]);
  initFilters.set("weekDay", ["list"]);
  initFilters.set("initialDate", ["range"]);
  return initFilters;
}

export default function Sales(props) {
  const classes = useStyles();
  const context = React.useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();

  const [rawData, setRawData] = useState({});
  const [rawRows, setRawRows] = useState([]);
  const [rows, setRows] = useState([]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsData, setDetailsData] = useState({});

  const [tables, setTables] = useState([]);

  const [filters, setFilters] = useState(initFiltersMap());
  const [filtersNumber, setFiltersNumber] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saleListPerPage, setSaleListPerPage] = useState(20);

  const [activePage, setActivePage] = useState("saleList");

  const [salesData, setSalesData] = useState([]);

  // ESTES WIDTHS DEVEM SER DINÂMICOS

  // SALES DATA COLUMNS
  const columns = [
    { field: 'id', headerName: 'ID', width: 130 }, // SALE IDENTIFIER
    { field: 'table', headerName: 'Mesa', width: 130, type: 'number', align: 'left', headerAlign: 'left' }, //TABLE
    { // DATE 
      field: 'initialDate', headerName: 'Data', width: 200,
      renderCell: (params) => {
        return (
          <span>{params.value.toLocaleDateString()}</span>
        );
      },
    },
    { // WEEK DAY
      field: 'weekDay', headerName: 'Dia da Semana', width: 200,
      renderCell: (params) => {
        return (
          <span>{weekDays[params.value]}</span>
        );
      },
    },
    { field: 'initialTime', headerName: 'Hora', width: 200 }, // HOUR
    { // DURATION OF THE SALE IN HOURS AND MINUTES
      field: 'duration', headerName: 'Duração', width: 150,
      renderCell: (params) => {
        const d = Number(params.value);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hora e " : " horas e ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minuto" : " minutos") : "0 minutos";

        return (
          <span>{hDisplay + mDisplay}</span>
        );
      },
    },
    { // BUTTON TO OPEN PRODUCTS DETAILS
      field: "details",
      headerName: "Detalhes",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          setDetailsData(rawData[params.row["id"]]);
          setDetailsOpen(true);
        };

        return <Button onClick={onClick}> + </Button>
      }
    }
  ];

  // ==================== INITIAL ROWS ====================
  useEffect(() => {

    getSales((response) => {
      //console.log(JSON.parse(response))
      let salesData = JSON.parse(response)
      let newSalesDataDict = {};

      let newRows = [];
      for (const [key, value] of Object.entries(salesData)) {
        newSalesDataDict[key] = value;

        newRows.push({
          id: key,
          table: value["table"],
          initialDate: new Date(value["initialTime"]),
          weekDay: new Date(value["initialTime"]).getDay(),
          initialTime: new Date(value["initialTime"]).toLocaleTimeString(),
          duration: value["duration"],
        });
      }

      setRawData(newSalesDataDict);
      setRows(newRows);
      setRawRows(newRows);

      setTables(_.keys(_.countBy(newRows, function (newRows) { return newRows["table"]; })))
    }, (error) => {
      enqueueSnackbar(error.message)
    })

  }, []);

  // ==================== FILTERED ROWS ====================
  useEffect(() => {
    let filtersNumber = 0
    if (rawRows.length > 0) {
      let newRows = rawRows;
      filters.forEach((values, feature) => {
        if (values[0] == "list" && values.length > 1) {
          filtersNumber += values.length - 1;
          newRows = newRows.filter((row) => values.includes(row[feature]));
        } else if (values[0] == "range") {
          if (values.length == 2) {
            let rangeMin = values[1]["Min"];
            let rangeMax = values[1]["Max"];

            if (rangeMin) {
              filtersNumber++;
              newRows = newRows.filter((row) => row[feature] >= rangeMin);
            }
            if (rangeMax) {
              filtersNumber++;
              newRows = newRows.filter((row) => row[feature] <= rangeMax);
            }
          }
        }
      });
      setRows(newRows);
    }
    setFiltersNumber(filtersNumber);

  }, [filters]);


  return (
    <React.Fragment>
      <Helmet>
        <title>Sales | Material Kit</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={true}>
          <Grid container spacing={1}>

            <Grid item xs={11} style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant={activePage == "saleList" ? "contained" : "outlined"} onClick={() => setActivePage("saleList")} style={{ marginRight: 15 }}> Lista de Vendas </Button>
              <Button variant={activePage == "salesGraph" ? "contained" : "outlined"} onClick={() => setActivePage("salesGraph")}> Gráfico de Vendas </Button>
            </Grid>

            <Grid item xs={1} align="center">
              <IconButton color="primary" onClick={() => { setFiltersOpen(true) }} style={{ backgroundColor: 'white' }}>
                <Badge color="secondary" badgeContent={filtersNumber}>
                  <FilterAltIcon />
                </Badge>
              </IconButton>
            </Grid>

            {
              activePage == "saleList" ?
                <Grid item xs={12} >
                  <Card style={{ height: window.innerHeight * 0.80, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={saleListPerPage}
                      rowsPerPageOptions={[20, 50, 100]}
                      onPageSizeChange={(newPageSize) => { setSaleListPerPage(newPageSize) }}
                      checkboxSelection
                    />
                  </Card>
                </Grid>
                : activePage == "salesGraph" ?
                  <React.Fragment>

                    <Grid item xs={12}>
                      !! TO DO !!
                      <ResponsiveContainer height={500}>
                        <ComposedChart width={"90%"} data={[]}>
                          <CartesianGrid strokeDasharray="2 2" />

                          <XAxis dataKey="date" allowDataOverflow={true} >
                            <Label className="Label"
                              value="Data"
                              offset={-5}
                              position="bottom"
                            />
                          </XAxis>

                          <YAxis type="number" allowDataOverflow={true}>
                            <Label className="Label"
                              value="Vendas (€)"
                              angle={270}
                              position="insideLeft"
                            />
                          </YAxis>

                          <Tooltip />

                          <Legend verticalAlign="top" />

                        </ComposedChart>
                      </ResponsiveContainer>
                    </Grid>

                  </React.Fragment>
                  : null
            }

          </Grid>
        </Container>
      </Box>
      {
        detailsOpen && <SalesDetails handleClose={() => { setDetailsOpen(false); }} detailsData={detailsData} context={context} />
      }

      {
        filtersOpen &&
        <Dialog classes={{ paper: classes.dialog }} open={filtersOpen} TransitionComponent={Transition} keepMounted onClose={() => { setFiltersOpen(false) }}>
          <DialogTitle>
            <Typography variant="h1">Filtrar Vendas</Typography>
          </DialogTitle>

          <Divider style={{ margin: "5px" }} />

          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Autocomplete
                  options={tables}
                  onChange={(option, v) => {
                    if (v != null) {
                      let table = parseInt(v)
                      let newFilter = new Map(filters)

                      let tableFilter = []
                      if (filters.has("table")) {
                        tableFilter = filters.get("table");
                      }

                      if (!tableFilter.includes(table)) {
                        tableFilter.push(table);
                        newFilter.set("table", tableFilter);
                        setFilters(newFilter);
                      }
                    }
                  }}
                  style={{ width: 200, height: '90%' }}
                  renderInput={(params) => <TextField {...params} label="Filtrar por Mesa" variant="outlined" />}
                />
              </Grid>

              <Grid item xs={7} />

              {
                filters.has("table") &&
                filters.get("table").map((table, index) => {
                  if (index != 0) {
                    return (
                      <Grid key={table} item xs={3}>
                        <Button key={table} variant="contained" style={{ width: '100%' }} endIcon={<CloseIcon />}
                          onClick={() => {
                            let newFilter = new Map(filters)
                            let tableFilter = filters.get("table");
                            tableFilter.splice(tableFilter.indexOf(table), 1);

                            if (tableFilter.length == 0) {
                              newFilter.delete("table");
                            } else {
                              newFilter.set("table", tableFilter);
                            }

                            setFilters(newFilter);
                          }}
                        >
                          <> Mesa: {table} </>
                        </Button>
                      </Grid>
                    )
                  }
                })
              }
            </Grid>

            <Divider style={{ margin: "15px" }} />

            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Autocomplete
                  options={weekDays}
                  onChange={(option, v) => {
                    if (v != null) {
                      let newWeekDay = v
                      let newFilter = new Map(filters)

                      let weekDayFilter = []
                      if (filters.has("weekDay")) {
                        weekDayFilter = filters.get("weekDay");
                      }

                      let index = weekDays.indexOf(newWeekDay)
                      if (!weekDayFilter.includes(index)) {
                        weekDayFilter.push(index);
                        newFilter.set("weekDay", weekDayFilter);
                        setFilters(newFilter);
                      }
                    }
                  }}
                  style={{ width: 200, height: '90%' }}
                  renderInput={(params) => <TextField {...params} label="Filtrar por Dia" variant="outlined" />}
                />
              </Grid>

              <Grid item xs={7} />

              {
                filters.has("weekDay") &&
                filters.get("weekDay").map((weekDay, index) => {
                  if (index != 0) {
                    return (
                      <Grid key={weekDay} item xs={4}>
                        <Button key={weekDay} variant="contained" endIcon={<CloseIcon />}
                          onClick={() => {
                            let newFilter = new Map(filters)
                            let weekDayFilter = filters.get("weekDay");
                            weekDayFilter.splice(weekDayFilter.indexOf(weekDay), 1);
                            newFilter.set("weekDay", weekDayFilter);
                            setFilters(newFilter);
                          }}
                        >
                          <> {weekDays[weekDay]} </>
                        </Button>
                      </Grid>
                    )
                  }
                })
              }
            </Grid>

            <Divider style={{ margin: "15px" }} />

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Data Inicial"
                    value={getValueFromFilter(filters, "initialDate", [1, "Min"]) || defaultMinDate}
                    onChange={(newValue) => {
                      let newFilter = new Map(filters)
                      let initialDateFilter = filters.get("initialDate");

                      if (getValueFromFilter(filters, "initialDate", [1, "Min"])) {
                        initialDateFilter[1]["Min"] = newValue;
                      } else if (initialDateFilter.length === 1) {
                        initialDateFilter.push({ "Min": newValue });
                      } else {
                        let maxValue = getValueFromFilter(filters, "initialDate", [1, "Max"])
                        initialDateFilter[1] = { "Min": newValue, "Max": maxValue }
                      }

                      newFilter.set("initialDate", initialDateFilter);
                      setFilters(newFilter);
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6} style={{ margin: "0 !important" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    hideTabs={false}
                    renderInput={(props) => <TextField {...props} />}
                    label="Data Final"
                    value={getValueFromFilter(filters, "initialDate", [1, "Max"]) || defaultMaxDate}
                    onChange={(newValue) => {
                      let newFilter = new Map(filters)
                      let initialDateFilter = filters.get("initialDate");

                      if (getValueFromFilter(filters, "initialDate", [1, "Max"])) {
                        initialDateFilter[1]["Max"] = newValue;
                      } else if (initialDateFilter.length === 1) {
                        initialDateFilter.push({ "Max": newValue });
                      } else {
                        let minValue = getValueFromFilter(filters, "initialDate", [1, "Min"])
                        initialDateFilter[1] = { "Max": newValue, "Min": minValue }
                      }

                      newFilter.set("initialDate", initialDateFilter);
                      setFilters(newFilter);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Divider style={{ margin: "15px" }} />

            <Grid container spacing={4} align="center">
              <Grid item xs={6}>
                <Button variant="outlined" color="error" onClick={() => { setFilters(initFiltersMap()) }}>Limpar filtros</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={() => { setFiltersOpen(false) }}>Confirmar</Button>
              </Grid>
            </Grid>

          </DialogContent>
        </Dialog>
      }

    </React.Fragment >
  );
}

const getValueFromFilter = (filter, mainKey, filterKeys) => {
  if (filter.has(mainKey)) {
    let value = filter.get(mainKey);

    if (value.length > 1) {
      filterKeys.forEach(filterKey => {
        value = value[filterKey];
      });
      return value;
    }
  }
  return null;
}

