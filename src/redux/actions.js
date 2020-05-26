import axios from 'axios';
import { URL } from '../constants.js';

import {
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILED,
} from './constants';

export const fetchActivities = config => dispatch => {
  dispatch({ type: FETCH_ACTIVITIES_PENDING });
  axios
    .get(URL, config)
    .then(res => {
      const payload = {
        results: res.data.results,
        metaData: res.data.metaData,
      };
      dispatch({ type: FETCH_ACTIVITIES_SUCCESS, payload });
    })
    .catch(() => {
      dispatch({ type: FETCH_ACTIVITIES_FAILED, payload: true });
    });
};
