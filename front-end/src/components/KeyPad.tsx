import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

interface Props {
  onKeyPressed: (key: string) => void
  onSubmit: () => void
  onClear: () => void
}

const KeyPad: FC<Props> = ({ onKeyPressed, onSubmit, onClear }) => {
  return (
    <Grid container direction="column" spacing={1} id='Key-Pad-Container'>
      <Grid item container direction="row" spacing={1}>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('1')}>1</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('2')}>2</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('3')}>3</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('+')}>+</Button>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('4')}>4</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('5')}>5</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('6')}>6</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('-')}>-</Button>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('7')}>7</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('8')}>8</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('9')}>9</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('*')}>*</Button>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('0')}>0</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onClear}>C</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onSubmit}>=</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => onKeyPressed('/')}>/</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default KeyPad;