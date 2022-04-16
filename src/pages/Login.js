import React, { useEffect, useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Container, Grid, Link, TextField, Typography, Paper } from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';
import { userLogin } from '../services/authenticationService'
import { useSnackbar } from 'notistack';
import AppContext from '../AppContext';

export default function Login(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const context = useContext(AppContext);

  React.useEffect(() => {
    /*let authenticationToken = localStorage.getItem('authenticationToken');
    if (authenticationToken) {
      navigate('/app/dashboard', { replace: true });
    }*/
  }, [])


  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <Paper style={{ padding: '5%' }}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('O email deve ser válido').max(255).required('É necessário preencher o email'),
                password: Yup.string().max(255).required('É necessário preencher a password')
              })}
              onSubmit={(values, actions) => {
                //navigate('/app/dashboard', { replace: true });
                userLogin(values.email, values.password, (response) => {
                  response = JSON.parse(response)

                  context.setCurrentUser(response['user']);
                  localStorage.setItem('authenticationToken', response['access_token']);
                  localStorage.setItem('refreshToken', response['refresh_token']);
                  navigate('/app/dashboard', { replace: true });
                }, (error) => {
                  enqueueSnackbar(error, { variant: 'error' });
                })

                actions.setSubmitting(false);
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <Typography color="textPrimary" variant="h2"> Login </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Button fullWidth startIcon={<FacebookIcon />} onClick={handleSubmit} size="large" variant="contained">
                        Entrar com Facebook
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button fullWidth startIcon={<GoogleIcon />} onClick={handleSubmit} size="large" variant="contained">
                        Entrar com Google
                      </Button>
                    </Grid>
                  </Grid>
                  <Box sx={{ pb: 1, pt: 3 }}>
                    <Typography align="center" color="textSecondary" variant="body1">
                      ou entre com o email
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box sx={{ py: 2 }}>
                    <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      Entrar
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Ainda não tem uma conta?
                    {' '}
                    <Link component={RouterLink} to="/register" variant="h6" underline="hover">
                      Registe-se
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
