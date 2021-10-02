import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import NumberTrend from '../components/dashboard/NumberTrend';
import LatestOrders from '../components/dashboard/LatestOrders';
import LatestProducts from '../components/dashboard/RelevantEvents';
import Sales from '../components/dashboard/Sales';
import TasksProgress from '../components/dashboard/TasksProgress';
import TotalProfit from '../components/dashboard/TotalProfit';
import PercentageDoughnut from '../components/dashboard/PercentageDoughnut';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import MoneyIcon from '@material-ui/icons/Money';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>

    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
      <Container maxWidth={false}>
        <Grid container spacing={3} >

          <Grid item lg={3} sm={6} xl={3} xs={12} >
            <NumberTrend number={20000} previousNumber={15000} title={"VENDAS TOTAIS DO MÊS"} symbol={"€"} icon={<MoneyIcon />} />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <NumberTrend number={360} previousNumber={380} title={"TOTAL DE CLIENTES DO MÊS"} icon={<PeopleIcon />}/>
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress title={"VENDAS ESTIMADAS PARA O DIA"} percentage={"67.2"} icon={<InsertChartIcon />}/>
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>

          <Grid item lg={8} md={12} xl={9} xs={12} >
            <Sales />
          </Grid>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <PercentageDoughnut sx={{ height: '100%' }} />
          </Grid>

          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>

          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>

        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
