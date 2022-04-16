import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components'
import { Box, Container, Grid, Card, Button, CardContent, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
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

import salesData from '../exampleData/dados2.json';
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



export default function Products(props) {
  const context = React.useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState([]);
  const [productFilter, setProductFilter] = useState("");

  const [pageSize, setPageSize] = useState(20);

  // ESTES WIDTHS DEVEM SER DINÂMICOS

  // SALES DATA COLUMNS
  const columns = [
    { field: 'id', headerName: 'Código', width: 150 }, // PRODUCT IDENTIFIER
    { field: 'name', headerName: 'Nome', width: 200 }, // PRODUCT NAME
    { //PRICE 1
      field: 'price', headerName: 'Preço', width: 100,
      renderCell: (params) => {
        if (params.value)
          return (<span>{params.value.toFixed(2)}€</span>);
      },
    },
    { //PRICE 2
      field: 'price2', headerName: 'Preço 2', width: 100,
      renderCell: (params) => {
        if (params.value)
          return (<span>{params.value.toFixed(2)}€</span>);
      },
    },
    { field: 'iva', headerName: 'IVA', width: 100 }, //SALE IVA
    { field: 'family', headerName: 'Família', width: 150 }, // PRODUCT FAMILY
  ];

  // ==================== INITIAL ROWS ====================
  useEffect(() => {
    let newRows = [];

    for (let [key, value] of Object.entries(context.products)) {
      newRows.push({
        id: key,
        name: value["productName"],
        price: value["price"],
        price2: value["price2"],
        iva: value["ivaBuy"],
        family: value["family"],
      });
    }

    setRows(newRows);
  }, []);

  // ==================== FILTERED ROWS ====================
  useEffect(() => {
    let newRows = [];

    for (let [key, value] of Object.entries(context.products)) {
      if (
        (value["productName"] && value["productName"].toLowerCase().includes(productFilter.toLowerCase()))
        || (value["family"] && value["family"].toLowerCase().includes(productFilter.toLowerCase()))
        || key.toLowerCase().includes(productFilter.toLowerCase())
      ) {
        newRows.push({
          id: key,
          name: value["productName"],
          price: value["price"],
          price2: value["price2"],
          iva: value["ivaBuy"],
          family: value["family"],
        });
      }
    }

    setRows(newRows);
  }, [productFilter]);


  return (
    <React.Fragment>
      <Helmet>
        <title>Produtos | AdecI</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={true}>
          <Grid container spacing={1}>

            <Grid item xs={12} >
              <Card>
                <CardContent>
                  <Box >
                    <TextField
                      fullWidth
                      value={productFilter}
                      onChange={(value) => setProductFilter(value.target.value)}
                      placeholder="Procurar por Produto ou Família de Produtos"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon fontSize="small" color="action" >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}

                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} >
              <Card style={{ height: window.innerHeight * 0.80, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[20, 50, 100]}
                  checkboxSelection
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </React.Fragment >
  );
}
