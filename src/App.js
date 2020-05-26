import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import ActivityList from './components/ActivityList';
import LoadMoreButton from './components/LoadMoreButton';

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
    const displayButton = activities.length > 0;
    return (
      <AppPage>
        <AppHeader>Activités</AppHeader>
        <AppContent>
          <ActivityList activities={activities} />
          <LoadMoreButton
            onClick={() => this.fetchActivities}
            isLoading={isLoading}
            display={displayButton}
          />
        </AppContent>
      </AppPage>
    );
  }
}
export default App;

const AppPage = styled.div`
  background-color: #f2f5f6;
  min-height: 100vh;
`;

const AppHeader = styled.header`
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 1.2px;
  color: #acacac;
  text-transform: uppercase;
  text-align: center;
  padding: 20px 0;
`;

const AppContent = styled.div`
  padding: 20px 0 40px 0;
  width: 60%;
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    width: 70%;
  }
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;
