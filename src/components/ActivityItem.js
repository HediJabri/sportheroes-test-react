import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { secondsToHm, metersToKm } from '../helpers';

const runningInfo = {
  image: '/images/running.png',
  name: 'Course',
};
const cyclingInfo = {
  image: '/images/cycling.png',
  name: 'Vélo',
};
const walkingInfo = {
  image: '/images/walking.png',
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
    <AppActivity>
      <AppActivityInfo>
        <AppActivityInfoIcon type={type}>
          <img alt={type} src={activityInfo.image} />
        </AppActivityInfoIcon>
        <AppActivityInfoDetails>
          <div>{activityInfo.name}</div>
          {type === 'Walking' ? (
            <span>{`${steps} pas`}</span>
          ) : (
            <span>{`${convertedDistance} km - ${convertedDuration}`}</span>
          )}
        </AppActivityInfoDetails>
      </AppActivityInfo>
      <AppActivityInfoCredits>
        <span>
          {credits} <i className="fa fa-copyright" aria-hidden="true" />
        </span>
        <span>
          {points} <i className="fa fa-bolt" aria-hidden="true" />
        </span>
      </AppActivityInfoCredits>
    </AppActivity>
  );
};

export const ActivityItemPropType = PropTypes.shape({
  duration: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  type: PropTypes.string,
  steps: PropTypes.number,
});

export default ActivityItem;

const AppActivity = styled.div`
  background: white;
  border: 1px solid #f2f5f6;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

`;
const AppActivityInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AppActivityInfoIcon = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 45px;
    height: 45px;
  }
`;
const AppActivityInfoDetails = styled.div`
  padding-left: 15px;
  color: #4f4a4a;
  font-weight: bold;
  div {
    margin-bottom: 3px;
  }
  span {
    color: #acacac;
    font-size: 15px;
  }
`;

const AppActivityInfoCredits = styled.div`
  color: #4f4a4a;
  font-weight: bold;
  span {
    margin-left: 15px;
  }
  i.fa-bolt {
    color: #f24949;
  }
  i.fa-copyright {
    color: #fdae38;
    font-weight: bolder;
  }
`;
