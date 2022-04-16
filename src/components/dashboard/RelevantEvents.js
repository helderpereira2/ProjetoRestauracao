import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { Box, Button, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import SportsSoccer from '@material-ui/icons/SportsSoccer';
import TvIcon from '@material-ui/icons/Tv';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Book from '@material-ui/icons/Book';
import MusicNote from '@material-ui/icons/MusicNote';
import Gavel from '@material-ui/icons/Gavel';


const events = [
  {
    id: uuid(),
    name: 'Dia Mundial da Liberdade',
    type: 'Culture',
    time: 'Todo o dia',
    isOnTv: false
  },
  {
    id: uuid(),
    name: 'Coldplay',
    type: 'Music',
    time: '17:00',
    isOnTv: false
  },
  {
    id: uuid(),
    name: 'FC Porto x Benfica',
    type: 'Football',
    time: '19:00',
    isOnTv: true
  },
  {
    id: uuid(),
    name: 'Campanha PS - Gaia',
    type: 'Politics',
    time: '15:00',
    isOnTv: true
  },
  {
    id: uuid(),
    name: 'Sporting x Tondela',
    type: 'Football',
    time: '21:00',
    isOnTv: true
  }
];

const RelevantEvents = (props) => (
  <Card {...props}>

    <CardHeader subtitle={`${events.length} no total`} title="Eventos relevantes (!! TO DO !!)" />
    <Divider />

    <List>
      {events.map((event, i) => (
        <ListItem divider={i < events.length - 1} key={event.id}>
          <ListItemAvatar>
            {
              event.type === "Football" ?
                <SportsSoccer />
                :
                event.type === "Culture" ?
                  <Book />
                  :
                  event.type === "Music" ?
                    <MusicNote />
                    :
                    event.type === "Politics" ?
                      <Gavel />
                      :
                      null
            }

          </ListItemAvatar>
          <ListItemText primary={event.name} secondary={event.time} />
          {
            event.isOnTv && (<IconButton edge="end" size="small" > <TvIcon /> </IconButton>)
          }

        </ListItem>
      ))}
    </List>

    <Divider />

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >
      <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text" >
        Ver todos
      </Button>
    </Box>

  </Card>
);

export default RelevantEvents;
