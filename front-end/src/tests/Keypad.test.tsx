import React from 'react';
import { render } from '@testing-library/react';
import Keypad from '../components/KeyPad';

test('Renders Keypad', () => {
  render(< Keypad
    onKeyPressed={() => null}
    onSubmit={() => null}
    onClear={() => null}
  />);
  const container = document.querySelector('#Key-Pad-Container');
  expect(container).toBeInTheDocument();

  const buttons = document.querySelectorAll('button');
  expect(buttons.length === 16).toBeTruthy();
});