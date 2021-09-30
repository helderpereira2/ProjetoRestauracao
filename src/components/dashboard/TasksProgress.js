import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const TasksProgress = (props) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>

        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {props.title}
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {props.percentage}%
          </Typography>
        </Grid>

        <Grid item>
          <Avatar sx={{ backgroundColor: orange[600], height: 56, width: 56 }}>
            <InsertChartIcon />
          </Avatar>
        </Grid>

      </Grid>

      <Box sx={{ pt: 3 }}>
        <LinearProgress value={props.percentage} variant="determinate" />
      </Box>

    </CardContent>
  </Card>
);

export default TasksProgress;
