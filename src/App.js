import React, { Component } from 'react';
import axios from 'axios';

import ActivityList from './components/ActivityList';

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
    return (
      <div className="App">
        <header className="App-header">Activités</header>
        <div className="App-content">
          {/* Activity list */}
          <ActivityList activities={activities} />
          {/* Load more button */}
          {activities.length > 0 && (
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
