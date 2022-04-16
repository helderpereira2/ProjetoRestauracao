import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography, Paper } from '@material-ui/core';
import { userSignUp } from '../services/authenticationService'
import { useSnackbar } from 'notistack';

const Register = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Helmet>
        <title>Registar | Adeci</title>
      </Helmet>
      <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <Container maxWidth="md">
          <Paper style={{ padding: '10%' }}>
            <Formik initialValues={{ email: '', restName: '', password: '', confirmPassword: '', policy: false }}
              validationSchema={
                Yup.object().shape({
                  email: Yup.string().email('O email deve ser válido').max(255).required('É necessário preencher o email'),
                  restName: Yup.string().max(255).required('É necessário preencher o nome do Restaurante'),
                  password: Yup.string().max(255).required('É necessário preencher a password').matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                    "A password deve conter pelo menos 8 carateres e usar uma letra maiúscula, uma letra minúscula, um número e um caratér especial"
                  ),
                  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As passwords não são iguais').required('É necessário confirmar a password'),
                  policy: Yup.boolean().oneOf([true], 'Deve aceitar os termos de serviço'),
                })
              }
              onSubmit={(values, actions) => {
                //navigate('/app/dashboard', { replace: true });
                console.log(values);
                userSignUp(values.restName, values.email, values.password, (response) => {
                  alert("SUCESSO")
                }, (error) => {
                  console.log(error)
                  enqueueSnackbar(error, { variant: 'error' });
                })

                actions.setSubmitting(false);
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <Typography color="textPrimary" variant="h2">
                      Criar nova conta
                    </Typography>
                    <Typography color="textSecondary" gutterBottom variant="body2" >
                      Use o seu email para realizar o registo do seu restaurante
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.restName && errors.restName)}
                    fullWidth
                    helperText={touched.restName && errors.restName}
                    label="Nome do Restaurante"
                    margin="normal"
                    name="restName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.restName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Endereço Email"
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
                  <TextField
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    fullWidth
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    label="Confirmação Password"
                    margin="normal"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                  <Box sx={{ alignItems: 'center', display: 'flex', ml: -1 }}>
                    <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
                    <Typography color="textSecondary" variant="body1" >
                      Declaro que li os
                      {' '}
                      <Link color="primary" component={RouterLink} to="#" underline="always" variant="h6" >
                        Termos e Condições
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (<FormHelperText error>{errors.policy}</FormHelperText>)}
                  <Box sx={{ py: 2 }}>
                    <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                      Registar
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Já tem uma conta?
                    {' '}
                    <Link component={RouterLink} to="/login" variant="h6" underline="hover">
                      Login
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

export default Register;
