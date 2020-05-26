import { DEFAULT_LIMIT } from '../constants.js';
import {
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILED,
} from './constants';

export const initialState = {
  activities: [],
  isPending: true,
  isError: false,
  skip: 0,
  total: 0,
};

export const fetchActivities = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_ACTIVITIES_PENDING:
      return { ...state, isPending: true };
    case FETCH_ACTIVITIES_SUCCESS:
      const { results, metaData } = action.payload;
      const activities = [...state.activities, ...results];
      return {
        ...state,
        activities,
        isPending: false,
        skip: DEFAULT_LIMIT + state.skip,
        total: metaData.total,
      };

    case FETCH_ACTIVITIES_FAILED:
      return { ...state, isPending: false, isError: true };
    default:
      return state;
  }
};
