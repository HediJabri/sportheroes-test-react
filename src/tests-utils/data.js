import { DEFAULT_LIMIT } from '../constants.js';

export const defaultParams = {
  limit: DEFAULT_LIMIT,
  sort: '-date',
  type: 'Walking,Running,Cycling',
  skip: 0,
};

export function createFakeActivities(limit, skip) {
  let results = [];
  for (var i = 0; i < limit; i++) {
    results.push({
      _id: `${i}-${skip.toString()}`,
      distance: 3015,
      duration: 687,
      points: 31,
      steps: 2044,
      date: '2020-05-24T18:15:24.000Z',
      type: 'Running',
    });
  }
  return {
    data: {
      results,
      metaData: { skip, total: 2000 },
    },
  };
}
