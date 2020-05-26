import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'lodash';

import ActivityItem from './ActivityItem';

const ActivityList = ({ activities }) => {
  const groupByDay = activities => {
    return _.groupBy(activities, activity =>
      moment(activity.date).startOf('day'),
    );
  };
  const getActivityDay = date => {
    const formatedDate = moment(new Date(date).toISOString()).format(
      'dddd Do MMM',
    );
    const today = moment()
      .startOf('day')
      .format('dddd Do MMM');
    const yesterday = moment()
      .subtract(1, 'day')
      .startOf('day')
      .format('dddd Do MMM');
    if (formatedDate === today) return "Aujourd'hui";
    if (formatedDate === yesterday) return 'Hier';
    return formatedDate;
  };
  const activitiesGrouped = groupByDay(activities);
  const activitiesDays = Object.keys(activitiesGrouped);
  return (
    <div className="App-activities-list">
      {activitiesDays.map(activitiesDay => {
        return (
          <div className={'App-activities'} key={activitiesDay}>
            {getActivityDay(activitiesDay)} <br />
            {activitiesGrouped[activitiesDay].map(activity => {
              return <ActivityItem key={activity._id} activity={activity} />;
            })}
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ActivityList;
