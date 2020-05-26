import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchActivities } from './redux/actions';

import ActivityList from './components/ActivityList';
import LoadMoreButton from './components/LoadMoreButton';
import ErrorMessage from './components/ErrorMessage';

import { DEFAULT_LIMIT, HEADERS } from './constants.js';

class App extends Component {
  componentDidMount() {
    this.fetchActivities();
  }

  getConfig = () => {
    return {
      headers: HEADERS,
      params: {
        limit: DEFAULT_LIMIT,
        sort: '-date',
        type: 'Walking,Running,Cycling',
        skip: this.props.skip,
      },
    };
  };

  fetchActivities = () => {
    const config = this.getConfig();
    this.props.onFetchActivities(config);
  };

  render() {
    const { activities, isPending, isError, skip, total } = this.props;
    const hasMoreResults = total > skip;

    const displayButton = hasMoreResults || skip === 0;

    return (
      <AppPage>
        <AppHeader>Activités</AppHeader>
        {isError ? (
          <ErrorMessage />
        ) : (
          <AppContent>
            <ActivityList activities={activities} />
            <LoadMoreButton
              onClick={() => this.fetchActivities}
              isPending={isPending}
              display={displayButton}
            />
          </AppContent>
        )}
      </AppPage>
    );
  }
}
const mapStateToProps = state => {
  return {
    activities: state.activities,
    isPending: state.isPending,
    isError: state.isError,
    skip: state.skip,
    total: state.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchActivities: config => dispatch(fetchActivities(config)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

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
  width: 70%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;
