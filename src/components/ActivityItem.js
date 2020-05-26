import React from 'react';
import PropTypes from 'prop-types';
import { secondsToHm, metersToKm } from '../helpers';

const runningInfo = {
  image: '../../public/images/running.png',
  name: 'Course',
};
const cyclingInfo = {
  image: '../../public/images/cycling.png',
  name: 'Vélo',
};
const walkingInfo = {
  image: '../../public/images/walking.png',
  name: 'Marche',
};

const ActivityItem = ({
  activity: { duration, distance, type, steps, points },
}) => {
  const getActivityInfo = type => {
    switch (type) {
      case 'Walking':
        return walkingInfo;
      case 'Cycling':
        return cyclingInfo;
      case 'Running':
        return runningInfo;
      default:
        return runningInfo;
    }
  };

  const activityInfo = getActivityInfo(type);
  const convertedDistance = metersToKm(distance);
  const convertedDuration = secondsToHm(duration);
  const credits = Math.floor(points / 5);
  return (
    <div className={'App-activity'}>
      <div className={'App-activity__info'}>
        <div className={'App-activity__info__icon'}>
          <img alt={type} src={activityInfo.image} />
        </div>
        <div className={'App-activity__info__details'}>
          <div className={'App-activity__info__name'}>{activityInfo.name}</div>
          <div>{`${convertedDuration}`}</div>
          <div>{`${duration}`}</div>
          {type === 'Walking' ? (
            <div>{`${steps} pas`}</div>
          ) : (
            <div>{`${convertedDistance} km`}</div>
          )}
        </div>
      </div>
      <div className={'App-activity__credits'}>
        <div>Points: {points}</div>
        <div>Credits: {credits}</div>
      </div>
    </div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object,
};

export default ActivityItem;
