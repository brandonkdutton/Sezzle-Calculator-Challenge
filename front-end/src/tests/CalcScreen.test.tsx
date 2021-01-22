import React from 'react';
import { render } from '@testing-library/react';
import CalcScreen from '../components/CalcScreen';

test('Renders CalcScreen', () => {
  render(< CalcScreen
    displayValue={'f = m*a'}
    onChangeCallback={() => null}
  />);
  const container = document.querySelector('#Calc-Screen-Container');
  expect(container).toBeInTheDocument();

  const input = container?.querySelector('input');
  expect(input).toBeInTheDocument();
});