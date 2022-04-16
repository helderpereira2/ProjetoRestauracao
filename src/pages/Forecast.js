import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Button, Card, CircularProgress, Autocomplete, TextField } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DatePicker';
import { ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label, Line } from 'recharts'
import { getProductSales, getProductSalesAndForecast } from '../services/salesService'
import AppContext from '../AppContext';

function initInitialDate() {
  let d = new Date();
  d.setMonth(d.getMonth() - 1);
  return d
}

const DATE_TICKS = 12

export default function Sales(props) {

  const context = useContext(AppContext);
  const [activePage, setActivePage] = useState("salesForecast");

  const [activeElements, setActiveElements] = useState(["Previsões"]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  //const [chartDateTicks, setChartDateTicks] = useState(["2020-01-05", "2020-01-12", "2020-01-19", "2020-01-26", "2020-02-02", "2020-02-09", "2020-02-16", "2020-02-23", "2020-03-01", "2020-03-08", "2020-03-15", "2020-03-22", "2020-03-29"]);
  const [chartDateTicks, setChartDateTicks] = useState([]);

  const [initialDate, setInitialDate] = useState(initInitialDate());
  const [finalDate, setFinalDate] = useState(new Date());

  const [loadingForecastAndSales, setLoadingForecastAndSales] = useState(false);

  useEffect(() => {
    let newData = [];
    setLoadingForecastAndSales(true);
    if (selectedProduct) {
      getProductSalesAndForecast(selectedProduct["id"], initialDate.toLocaleDateString(), finalDate.toLocaleDateString(), (response) => {
        response = JSON.parse(response)

        for (const [date, values] of Object.entries(response)) {
          if (!isNaN(Date.parse(date))) {
            newData.push({ "date": date, "Vendas": values["sales"], "Previsões": values["forecast"] });
          } else {
            console.log(date)
          }
        }

        var daysDifference = (finalDate.getTime() - initialDate.getTime()) / (1000 * 3600 * 24);
        var dateTicks = [];
        for (let i = 0; i < daysDifference / DATE_TICKS; i++) {
          dateTicks.push(new Date(initialDate.getTime() + (i * DATE_TICKS * 1000 * 3600 * 24)).toLocaleDateString());
        }

        console.log(dateTicks)
        //setChartDateTicks(dateTicks);

        setData(newData);
        setLoadingForecastAndSales(false);
      }, (error) => {
        console.log(error);
        setLoadingForecastAndSales(false);
      });
    }
  }, [selectedProduct, initialDate, finalDate]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Previsões | Material Kit</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={true}>
          <Grid container spacing={1}>

            <Grid item xs={11} style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant={activePage == "salesForecast" ? "contained" : "outlined"} onClick={() => setActivePage("salesForecast")} style={{ marginRight: 15 }}> Previsão de Vendas </Button>
              <Button variant={activePage == "moneyForecast" ? "contained" : "outlined"} onClick={() => setActivePage("moneyForecast")}> Previsão Monetária </Button>
            </Grid>

            {
              activePage == "salesForecast" ?
                <React.Fragment>
                  <Grid item xs={2}>
                    <Autocomplete
                      options={Object.keys(context.products)}
                      getOptionLabel={(option) => context.products[option]["productName"]}
                      onChange={(option, v) => {
                        if (v != null) {
                          setSelectedProduct(context.products[v]);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} label="Produto" variant="outlined" />}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        hideTabs={false}
                        renderInput={(props) => <TextField {...props} />}
                        label="Data Inicial"
                        value={initialDate}
                        onChange={(newValue) => {
                          setInitialDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        hideTabs={false}
                        renderInput={(props) => <TextField {...props} />}
                        label="Data Final"
                        value={finalDate}
                        onChange={(newValue) => {
                          setFinalDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} >
                    <Card style={{ height: window.innerHeight * 0.80, width: '100%', fontSize: '1rem', fontFamily: 'Arial' }} >
                      {
                        loadingForecastAndSales ?
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                          </Box>
                          :
                          <ResponsiveContainer height={window.innerHeight * 0.75}>
                            <ComposedChart data={data} margin={{ top: 10, right: 40, left: 10, bottom: 5 }} style={{ paddingTop: 10 }}>
                              <CartesianGrid strokeDasharray="2 2" />

                              <XAxis dataKey="date" allowDataOverflow={true} /*ticks={chartDateTicks}*/ >
                                <Label className="Label"
                                  value="Data"
                                  offset={-5}
                                  position="insideBottom"
                                />
                              </XAxis>

                              <YAxis type="number" allowDataOverflow={true}>
                                <Label className="Label"
                                  value="Vendas (Quantidade)"
                                  angle={270}
                                  offset={-10}
                                  position="left"
                                />
                              </YAxis>

                              <Tooltip />

                              <Legend
                                wrapperStyle={{
                                  paddingLeft: "70px",
                                  paddingBottom: "10px"
                                }}
                                onClick={(event) => {
                                  const newActiveElements = activeElements.slice();
                                  if (newActiveElements.includes(event.dataKey)) {
                                    newActiveElements.splice(newActiveElements.indexOf(event.payload.name), 1);
                                  } else {
                                    newActiveElements.push(event.dataKey);
                                  }
                                  setActiveElements(newActiveElements);
                                }} verticalAlign="top" />)

                              <Line dataKey="Vendas" stroke="#8884d8" hide={!activeElements.includes("Vendas")} />
                              <Line dataKey="Previsões" stroke="#0084d8" hide={!activeElements.includes("Previsões")} />

                            </ComposedChart>
                          </ResponsiveContainer>
                      }
                    </Card>
                  </Grid>
                </React.Fragment>
                :
                null
            }

          </Grid>
        </Container>
      </Box >
    </React.Fragment >
  );
}

