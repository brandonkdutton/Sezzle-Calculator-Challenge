import React, { FC, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  textArea: {
    padding: '8px',
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}));

interface Props {
  displayValue: string
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
}

const CalcScreen: FC<Props> = ({ displayValue, onChangeCallback }) => {
  const classes = useStyles();
  return (
    <Grid item id='Calc-Screen-Container'>
      <Input
        value={displayValue}
        onChange={onChangeCallback}
        className={classes.textArea}
      />
    </Grid>
  );
};

export default CalcScreen;