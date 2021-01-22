import React, { RefObject } from 'react';
import { render, screen } from '@testing-library/react';
import Feed from '../components/Feed';
import { assert } from 'console';

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

const mockRef = React.createRef<HTMLDivElement>();
const mockFeedData: EquationBroadcast[] = [
  { "date_created": "2021-01-20T15:48:15.525315", "id": 103, "result": "Infinity", "equation": "22%4*9/0" },
  { "date_created": "2021-01-20T15:48:09.791252", "id": 102, "result": "18", "equation": "22%4*9" },
  { "date_created": "2021-01-20T15:48:02.971673", "id": 101, "result": "2", "equation": "22%4" },
  { "date_created": "2021-01-20T15:42:54.135199", "id": 100, "result": "55", "equation": "55" },
];

test('Renders Feed', () => {
  render(< Feed feedData={mockFeedData} scrollToRef={mockRef} />);
  const container = document.querySelector('#Feed-Container');

  // check that each equations are rendered
  const equationList = container?.querySelectorAll('li');
  expect(equationList?.length === mockFeedData.length).toBeTruthy();
});