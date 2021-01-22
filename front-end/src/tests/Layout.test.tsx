import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../Layout';

test('Renders Layout', () => {
  render(< Layout />);
  const container = document.querySelector('#Layout-Grid-Container');
  expect(container).toBeInTheDocument();
});