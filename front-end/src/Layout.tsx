import React, { FC, useState, useEffect, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { io, Socket } from 'socket.io-client';
import Calc from './components/Calc';
import Feed from './components/Feed';
import Grid from '@material-ui/core/Grid';
import { evaluate } from 'mathjs';
import { SnackbarContext } from './alerts/SnackbarWrapper';

const useStyles = makeStyles((theme) => ({
  feedBounds: {
    overflowY: 'auto'
  },
  layoutContainer: {
    padding: theme.spacing(2),
    maxHeight: '100vh',
    flexWrap: 'nowrap'
  }
}));

const Layout: FC = ({ }) => {

  const [equation, setEquation] = useState<string>('');
  const [sock, setSock] = useState<Socket>();
  const [feed, setFeed] = useState<EquationBroadcast[]>([]);
  const [lastMessage, setLastMessage] = useState<EquationBroadcast>();
  const { openSnackbar } = useContext(SnackbarContext) || {};

  // individual equation json object.
  interface EquationBroadcast {
    'id': number
    'equation': string
    'result': string
    'date_created': string
  }

  // holds list of the 10 most recent equations for inital fetch.
  interface InitialEquationFetch {
    'equations': [EquationBroadcast]
  }

  // initialize websocket and setup listeners.
  useEffect(() => {
    const ip = '127.0.0.1:5000';
    const sock: Socket = io(ip);
    setSock(sock);

    // triggers when a new equation is broadcasted.
    sock.on('equation_broadcasted', (json: EquationBroadcast) => {
      setLastMessage(json);
    });

    // triggers when server sends back the 10 most recent posts upon first connection.
    sock.on('initial_fetch', (jsonEquations: InitialEquationFetch) => {
      setFeed(jsonEquations['equations']);
    });

    // closes the socket when we're done.
    return () => {
      sock.close();
    }
  }, []);

  // adds a newly broadcasted equation to the equation feed and removes the last if over 10 long.
  useEffect(() => {
    if (lastMessage) {
      const newTen: EquationBroadcast[] = [lastMessage, ...feed ?? []].slice(0, 10);
      setFeed(newTen);
    }
  }, [lastMessage]);

  // scrolls the feed to the bottom every time an element is added
  useEffect(() => {
    scrollToBottom();
  }, [feed]);

  // safely evaluates the current equation string.
  // sends it to the server if valid, shows error message if invalid
  const onEqualsClicked = (): void => {
    try {
      const result = evaluate(equation!).toString();
      sock?.emit('equation_added', {
        equation,
        result
      });
    } catch (err) {
      openSnackbar ?
        openSnackbar('Invalid expression', 'error', 20000) :
        alert('Invalid expression')
    }
  };

  // scrolls to the bottom of the feed
  const ref = useRef<HTMLDivElement>(null);
  const scrollToBottom = (): void => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'end'
    });
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.layoutContainer} direction='column' alignItems='center' spacing={2} id='Layout-Grid-Container'>
      <Grid item container xs={12} sm={10} md={8} direction='column' alignItems='center'>
        <Calc
          setEquation={setEquation}
          onEqualsClicked={onEqualsClicked}
          equation={equation}
        />
      </Grid>
      <Grid item container xs={12} sm={10} md={8} direction='column' alignItems='center' className={classes.feedBounds}>
        <Feed
          feedData={feed}
          scrollToRef={ref}
        />
      </Grid>
    </Grid>
  );
}

export default Layout;