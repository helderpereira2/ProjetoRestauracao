import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, CircularProgress, Typography, Paper } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import AppContext from '../AppContext';
import Dropzone from '../components/settings/Dropzone';

import teal from "@material-ui/core/colors/teal";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";

const thememui = createTheme({
  palette: {
    type: "light",
    primary: {
      lighter: teal[200],
      light: teal[300],
      main: teal[400],
      dark: teal[700]
    },
    secondary: {
      lighter: deepOrange[200],
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[600]
    },
    error: {
      lighter: red[200],
      light: red[300],
      main: red[500],
      dark: red[600]
    }
  }
});

const useStyles = makeStyles({
  dropzone: {
    transition: "0.3s",
    textAlign: "center",
    color: thememui.palette.primary.light,
    border: "4px dashed",
    borderRadius: "10px",
    cursor: "pointer",
    '&:hover': {
      transition: "0.3s",
      color: "rgba(0, 194, 152,0.9)",
      backgroundColor: "rgba(0, 194, 152,0.15)",
      borderStyle: "solid",
    },
    '&:active': {
      transition: "0.2s",
      color: "rgba(0, 194, 152,0.9)",
      backgroundColor: "rgba(0, 194, 152,0.25)",
      borderStyle: "solid",
    }
  },

  dropzoneActive: {
    height: "90%",
    transition: "0.3s",
    textAlign: "center",
    color: "rgba(0, 181, 194,0.9)",
    border: "4px dashed rgb(67, 110, 93)",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "rgba(0, 181, 194,0.15)",
    borderStyle: "solid",
  },

  "@keyframes shake": {
    "0% ": {
      transform: "translate(1px, 1px) rotate(0deg)"
    },
    "10%": {
      transform: "translate(-1px, -2px) rotate(- 1deg)",
    },
    "20%": {
      transform: "translate(-3px, 0px) rotate(1deg)",
    },
    "30% ": {
      transform: "translate(3px, 2px) rotate(0deg)",
    },
    "40%": {
      transform: "translate(1px, -1px) rotate(1deg)",
    },
    "50%": {
      transform: "translate(-1px, 2px) rotate(- 1deg) ",
    },
    "60%": {
      transform: "translate(-3px, 1px) rotate(0deg)",
    },
    "70%": {
      transform: "translate(3px, 1px) rotate(- 1deg)",
    },
    "80%": {
      transform: "translate(-1px, -1px) rotate(1deg)",
    },
    "90%": {
      transform: "translate(1px, 2px) rotate(0deg)",
    },
    "100%": {
      transform: "translate(1px, -2px) rotate(- 1deg)",
    }
  },
  dropzoneError: {
    height: "90%",
    transition: "0.3s",
    textAlign: "center",
    color: "rgba(194, 174, 0,0.9)",
    border: " 4px dashed  #a48316",
    borderRadius: "10px",
    backgroundColor: "  rgba(194, 174, 0,0.15)",
    cursor: "pointer",
    animation: '$shake 0.3s',
    "&:hover": {
      transition: "0.3s",
      backgroundColor: "rgb(149, 194, 0,0.15)",
      color: "rgb(149, 194, 0,0.9)",
      borderColor: "#86a03c",
    }
  },

  dropzoneErrorActive: {
    height: "90%",
    transition: "0.3s",
    textAlign: "center",
    color: "  rgba(18, 166, 119,0.8)",
    border: "4px dashed  #3ca078",
    borderRadius: "10px",
    backgroundColor: " rgba(18, 166, 119,0.15)",
    cursor: "pointer",
  }
});

export default function Sales(props) {
  const classes = useStyles();
  const context = React.useContext(AppContext);

  const { enqueueSnackbar } = useSnackbar();

  const [isUploading, setIsUploading] = React.useState(false);

  const onDrop = (acceptedFiles) => {

    console.log(acceptedFiles);

    if (acceptedFiles.length === 0)
      return

    setIsUploading(true);
    acceptedFiles.forEach(element => {
      console.log(element)
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Os Meus Dados | AdecI</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }} >
        <Container maxWidth={true}>
          <Paper style={{ height: window.innerHeight * 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!isUploading ?
              (<Dropzone style={{ height: "98%", width: '98%' }} classes={classes} onDrop={onDrop} accept={".xlsx, .xls, .csv, .json"} />)
              :
              (<div style={{ height: "100%", width: "100%", marginLeft: "auto", marginRight: "auto", justifyContent: "center", display: "flex", alignItems: "center", }}>
                <div style={{ textAlign: "center" }}>
                  <CircularProgress disableShrink size={300} />
                  <div style={{ height: "40px" }} />
                  <Typography variant="h1">Carregando dados...</Typography>
                </div>
              </div>)}
          </Paper>

          <Paper style={{ marginTop: '2%' }}>
            <Typography variant="h2">Últimos ficheiros carregados...</Typography>
            <Typography variant="h2">...</Typography>
            <Typography variant="h2">...</Typography>
            <Typography variant="h2">...</Typography>
          </Paper>
        </Container>
      </Box>
    </React.Fragment >
  );
}

