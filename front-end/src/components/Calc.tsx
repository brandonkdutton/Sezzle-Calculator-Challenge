import React, { FC, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import KeyPad from './KeyPad';
import CalcScreen from './CalcScreen';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  }
}));

interface Props {
  setEquation: (value: string) => void
  onEqualsClicked: () => void
  equation: string
}

const Calc: FC<Props> = ({ setEquation, onEqualsClicked, equation }) => {

  // adds a math symbol too the end of the equation string
  const addMath = (value: string): void => {
    setEquation(equation + value);
  };

  // clears the equation
  const handleClear = (): void => {
    setEquation('');
  }

  const classes = useStyles();

  return (
    <Paper className={classes.paper} id='Calc-Container'>
      <CalcScreen
        displayValue={equation}
        onChangeCallback={(e: ChangeEvent<HTMLInputElement>) => setEquation(e.target.value)}
      />
      <KeyPad
        onKeyPressed={addMath}
        onSubmit={onEqualsClicked}
        onClear={handleClear}
      />
    </Paper>
  );
};

export default Calc;