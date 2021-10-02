import { Avatar, Card, CardContent, Grid, Button, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>

        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            LUCRO ESTIMADO DA SEMANA
          </Typography>
          <Typography color="textPrimary" variant="h3">
            350 €
          </Typography>
        </Grid>

        <Grid item>
          <Avatar sx={{ backgroundColor: red[600], height: 56, width: 56 }} >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>

        {
          /*
          <Grid item>
          <div style={{ display: "flex", flexDirection: 'row' }}>
            <Button> DIA </Button>
            <Button> SEMANA </Button>
            <Button> MÊS </Button>
          </div>
        </Grid>
          */
        }


      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;
