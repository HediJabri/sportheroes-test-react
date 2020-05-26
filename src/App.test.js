import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

import { renderWithRedux } from './tests-utils/helpers';
import { createFakeActivities, defaultParams } from './tests-utils/data';
import { URL, HEADERS, DEFAULT_LIMIT } from './constants.js';

import App from './App';

jest.mock('axios');

const headers = HEADERS;

// First fetch params & data
const data = createFakeActivities(DEFAULT_LIMIT, 0);
const params = defaultParams;
// Second fetch params & data (on load more click)
const newData = createFakeActivities(DEFAULT_LIMIT, 10);
const newParams = { ...defaultParams, skip: DEFAULT_LIMIT };

describe('<App />', () => {
  beforeEach(() => {
    axiosMock.get.mockResolvedValue(data);
  });

  afterEach(() => {
    axiosMock.get.mockClear();
  });

  test('fetch and displays activities data', async () => {
    renderWithRedux(<App />);
    // Spinner should be visible on the first render
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(URL, { params, headers });

    // Wait until activity-items are displayed
    const activityItems = await screen.findAllByTestId('activity-item');
    expect(activityItems.length).toBe(DEFAULT_LIMIT);
  });

  test('fetch and displays new activities on load more button click', async () => {
    const loadMoreText = 'Voir plus';

    renderWithRedux(<App />);
    // Mock new Data for the second fetch on load more button click
    axiosMock.get.mockResolvedValue(newData);

    const loadMoreButton = await screen.findByText(loadMoreText);
    fireEvent.click(loadMoreButton);

    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(axiosMock.get).toHaveBeenCalledWith(URL, {
      params: newParams,
      headers,
    });
    // Wait until the loadMore button is display again
    // Means that data fetching is not pending anymore
    await screen.findByText(loadMoreText);

    const activityItems = await screen.findAllByTestId('activity-item');
    expect(activityItems.length).toBe(DEFAULT_LIMIT * 2);
  });
});

describe('<App /> api failed', () => {
  afterEach(() => {
    axiosMock.get.mockClear();
  });
  test('display error message', async () => {
    axiosMock.get.mockRejectedValue({
      error: 'Request failed',
    });
    renderWithRedux(<App />);

    const error = await screen.findByTestId('error-message');
    expect(error).toBeInTheDocument();
  });
});
