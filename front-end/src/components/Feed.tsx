import React, { FC, RefObject } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { formatDistanceToNow } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      padding: `0px, ${theme.spacing(2)}`
    },
    list: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column-reverse'
    },
    timeLabel: {
      textAlign: 'right'
    }
  }),
);

// individual equation json object.
interface EquationBroadcast {
  'id': number
  'equation': string
  'result': string
  'date_created': string
}

interface Props {
  feedData: EquationBroadcast[]
  scrollToRef: RefObject<HTMLDivElement>
}

const Feed: FC<Props> = ({ feedData, scrollToRef }) => {
  const classes = useStyles();

  // generates an 'x days ago' string from the equation's timestamp.
  const timeAgo = (equationObj: EquationBroadcast): string => {
    try {
      const utcTimestamp: string = equationObj['date_created'];
      const utcSplit = utcTimestamp.split(/-|:|T/);
      utcSplit[1] = (parseInt(utcSplit[1]) - 1).toString(); // because js dates start at 0

      //@ts-ignore -- utcSplit will always be in the correct format
      const localDate: Date = new Date(Date.UTC(...utcSplit));
      const timePeriod = formatDistanceToNow(new Date(localDate));
      return `${timePeriod} ago`;
    } catch (error) {
      console.log(error);
      return 'Once upon a time';
    }
  };

  return (
    <Paper className={classes.paper} id='Feed-Container'>
      <List component="nav" className={classes.list} disablePadding={feedData.length === 0}>
        {feedData.map((equation?: EquationBroadcast, index?: number) => (
          <div key={equation?.id ?? index} ref={index === 0 ? scrollToRef : undefined}>
            <ListItem>
              <ListItemText
                primary={equation?.equation}
                secondary={equation?.result}
              />
              <ListItemText
                secondary={equation ? timeAgo(equation) : ''}
                className={classes.timeLabel}
              />
            </ListItem>
            {index !== 0 &&
              <Divider />
            }
          </div>
        ))}
      </List>
    </Paper>
  );
}

export default Feed;
