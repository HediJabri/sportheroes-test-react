import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import _ from 'lodash';

const API_URL = 'https://api.runningheroes.com';
const URL = `${API_URL}/v3/users/5411bab0c8e1e7656f4ff291/activities`;
const DEFAULT_LIMIT = 10;
const headers = { 'Content-Type': 'Application/json' };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      skip: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchActivities(this.state.skip);
  }

  groupByDay = activities => {
    return _.groupBy(activities, activity =>
      moment(activity.date).startOf('day'),
    );
  };

  getConfig = () => {
    return {
      headers,
      params: {
        limit: DEFAULT_LIMIT,
        sort: '-date',
        type: 'Walking,Running,Cycling',
        skip: this.state.skip,
      },
    };
  };
  getActivityDay(date) {
    const formatDate = moment(new Date(date).toISOString()).format(
      'dddd Do MMM',
    );
    const today = moment()
      .startOf('day')
      .format('dddd Do MMM');
    const yesterday = moment()
      .subtract(1, 'day')
      .startOf('day')
      .format('dddd Do MMM');
    if (formatDate === today) return "Aujourd'hui";
    if (formatDate === yesterday) return 'Hier';
    return formatDate;
  }
  fetchActivities = () => {
    this.setState({ isLoading: true });
    const config = this.getConfig();
    axios
      .get(URL, config)
      .then(res => {
        const activities = [...this.state.activities, ...res.data.results];
        const skip = this.state.skip + DEFAULT_LIMIT;
        this.setState({ activities, skip, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { activities, isLoading } = this.state;
    const activitiesGrouped = this.groupByDay(activities);
    const activitiesDays = Object.keys(activitiesGrouped);
    return (
      <div className="App">
        <header className="App-header">Activités</header>
        <div className="App-content">
          {/* Activity list */}
          {activitiesDays.map(activitiesDay => {
            return (
              <div className={'App-activities'} key={activitiesDay}>
                {this.getActivityDay(activitiesDay)} <br />
                {activitiesGrouped[activitiesDay].map(activity => {
                  return <div key={activity.id}> - {activity.type}</div>;
                })}
              </div>
            );
          })}
          {/* Load more button */}
          {activitiesDays.length > 0 && (
            <button onClick={() => this.fetchActivities()}>
              {isLoading && <span>...</span>}
              Load more
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default App;
