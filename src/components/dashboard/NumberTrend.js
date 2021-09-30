import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { red, green } from '@material-ui/core/colors';

const NumberTrend = (props) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>

        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6" >
            {props.title}
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {props.number} {props.symbol}
          </Typography>
        </Grid>

        <Grid item>
          <Avatar sx={{ backgroundColor: red[600], height: 56, width: 56 }}>
            {props.icon}
          </Avatar>
        </Grid>

      </Grid>

      <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
        {
          props.number > props.previousNumber ?
            <ArrowUpwardIcon sx={{ color: green[900] }} />
            :
            <ArrowDownwardIcon sx={{ color: red[900] }} />
        }

        <Typography sx={{ color: props.number > props.previousNumber ? green[900] : red[900], mr: 1 }} variant="body2">
          {Math.abs(Math.round((props.number / props.previousNumber) * 100 - 100))}%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Comparado com o último mês
        </Typography>
      </Box>

    </CardContent>
  </Card>
);

export default NumberTrend;
