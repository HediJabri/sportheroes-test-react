import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import { createFakeActivities, defaultParams } from './tests-utils/data';
import { URL, HEADERS, DEFAULT_LIMIT } from './constants.js';

import App from './App';

jest.mock('axios');

const headers = HEADERS;

const activities = createFakeActivities(10, '1');
const params = defaultParams;
const newActivities = createFakeActivities(10, '2');
const newParams = { ...defaultParams, skip: DEFAULT_LIMIT };

describe('<App />', () => {
  beforeEach(() => {
    axiosMock.get.mockResolvedValue({
      data: activities,
    });
  });

  afterEach(() => {
    axiosMock.get.mockClear();
  });

  test('fetch and displays activities data', async () => {
    render(<App />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(URL, { params, headers });

    const activityItems = await screen.findAllByTestId('activity-item');
    expect(activityItems.length).toBe(DEFAULT_LIMIT);
  });

  test('fetch and displays new activities on load more button click', async () => {
    const loadMoreText = 'Voir plus';

    render(<App />);
    axiosMock.get.mockResolvedValue({
      data: newActivities,
    });

    const loadMoreButton = await screen.findByText(loadMoreText);
    fireEvent.click(loadMoreButton);

    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(axiosMock.get).toHaveBeenCalledWith(URL, {
      params: newParams,
      headers,
    });

    await screen.findByText(loadMoreText);

    const activityItems = await screen.findAllByTestId('activity-item');

    expect(activityItems.length).toBe(DEFAULT_LIMIT * 2);
  });
});

describe('<App /> api failed', () => {
  test('display error message', async () => {
    axiosMock.get.mockRejectedValue({
      error: 'Request failed',
    });
    render(<App />);

    const error = await screen.findByTestId('error-message');
    expect(error).toBeInTheDocument();
  });
});
