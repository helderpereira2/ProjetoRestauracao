import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button, Card, CardHeader, Chip, Divider, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'Em operação'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'Finalizado'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'Em operação'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'Em operação'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'Finalizado'
  },
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'Em operação'
  },
];

const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Últimas Vendas" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell> Referência </TableCell>
              <TableCell> Funcionário </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort" >
                  <TableSortLabel active direction="desc">
                    Data
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell> Estado </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell> {order.ref} </TableCell>
                  <TableCell> {order.customer.name} </TableCell>
                  <TableCell> {moment(order.createdAt).format('DD/MM/YYYY')} </TableCell>
                  <TableCell> <Chip color="primary" label={order.status} size="small" /> </TableCell>
                </TableRow>
              ))
            }
          </TableBody>

        </Table>
      </Box>
    </PerfectScrollbar>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
      <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
        View all
      </Button>
    </Box>

  </Card>
);

export default LatestOrders;
