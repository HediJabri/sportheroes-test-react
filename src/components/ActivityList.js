import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'lodash';

import ActivityItem, { ActivityItemPropType } from './ActivityItem';

const dateFormat = 'dddd Do MMM';
const today = moment()
  .startOf('day')
  .format(dateFormat);
const yesterday = moment()
  .subtract(1, 'day')
  .startOf('day')
  .format(dateFormat);

const ActivityList = ({ activities }) => {
  const groupByDay = activities => {
    return _.groupBy(activities, activity =>
      moment(activity.date).startOf('day'),
    );
  };
  const getActivityDay = date => {
    date = moment(new Date(date).toISOString()).format(dateFormat);
    if (date === today) return "Aujourd'hui";
    if (date === yesterday) return 'Hier';
    return date;
  };
  const activitiesGrouped = groupByDay(activities);
  const activitiesDays = Object.keys(activitiesGrouped);
  return (
    <Fragment>
      {activitiesDays.map(activitiesDay => {
        return (
          <AppActivityGroup key={activitiesDay}>
            <AppActivityDate>{getActivityDay(activitiesDay)}</AppActivityDate>
            {activitiesGrouped[activitiesDay].map(activity => {
              return <ActivityItem key={activity._id} activity={activity} />;
            })}
          </AppActivityGroup>
        );
      })}
    </Fragment>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(ActivityItemPropType).isRequired,
};

export default ActivityList;

const AppActivityGroup = styled.div`
  padding-bottom: 20px;
`;
const AppActivityDate = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
  color: #acacac;
  margin-bottom: 10px;
`;
