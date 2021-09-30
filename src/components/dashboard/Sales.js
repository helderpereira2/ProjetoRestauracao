import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, colors, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const possibleGrans = ["Últimos 7 dias", "Último mês"]

// =========== RANDOM VALUES =============
let weekDataReal = Array.from({ length: 7 }, () => Math.floor(Math.random() * 1000));
let weekDataForecast = [];

weekDataReal.forEach((number) => {
  weekDataForecast.push(Math.abs(number + Math.floor(Math.random() * 250) - 130))
})

let monthDataReal = Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000));
let monthDataForecast = [];

monthDataReal.forEach((number) => {
  monthDataForecast.push(Math.abs(number + Math.floor(Math.random() * 250) - 130))
})
// =====================================

// =========== LAST 30 DAYS =============

let today = new Date();
today.setDate(today.getDate() - 1);
let lastDays = []

for (let i = 0; i < 30; i++) {
  lastDays.push(today.getDate() + "/" + (today.getMonth() + 1));
  today.setDate(today.getDate() - 1);
}

lastDays.reverse()

// =====================================

const Sales = (props) => {
  const theme = useTheme();

  const [selectedGranularity, setSelectedGranularity] = React.useState("Últimos 7 dias");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newGran) => {
    if (newGran) {
      setSelectedGranularity(newGran)
    }

    setAnchorEl(null);
  };


  let data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: selectedGranularity.includes("7") ? weekDataReal : monthDataReal,
        label: 'Vendas',
        maxBarThickness: 10
      },
      {
        backgroundColor: colors.grey[200],
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: selectedGranularity.includes("7") ? weekDataForecast : monthDataForecast,
        label: 'Previsão',
        maxBarThickness: 10
      }
    ],
    labels: selectedGranularity.includes("7") ? lastDays.slice(lastDays.length - 7) : lastDays
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>

      <CardHeader title="Vendas"
        action={(
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text" onClick={handleClick}>
            {selectedGranularity}
          </Button>
        )}
      />

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {
          possibleGrans.map((granularity) => {
            if (granularity != selectedGranularity) {
              return (
                <MenuItem onClick={() => handleClose(granularity)}>{granularity}</MenuItem>
              )
            } else {
              return null;
            }
          })
        }

      </Menu>

      <Divider />

      <CardContent>
        <Box sx={{ height: 400, position: 'relative' }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
          Overview
        </Button>
      </Box>

    </Card>
  );
};

export default Sales;
