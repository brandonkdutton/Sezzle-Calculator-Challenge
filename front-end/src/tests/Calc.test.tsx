import React from 'react';
import { render } from '@testing-library/react';
import Calc from '../Layout';

test('Renders Calc', () => {
  render(< Calc />);
  const container = document.querySelector('#Calc-Container');
  expect(container).toBeInTheDocument();
  expect(container?.children.length).toBeGreaterThan(0);
});