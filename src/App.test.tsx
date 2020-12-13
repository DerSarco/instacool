import createHistory from 'history/createBrowserHistory';
import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';
import { identity } from 'lodash';
const history = createHistory();

test('renders learn react link', () => {
  render(<App loadInitialData={identity} history={history}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
