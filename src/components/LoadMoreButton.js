import React, { Fragment } from 'react';
import styled from 'styled-components';

const LoadMoreButton = ({ onClick, isLoading }) => {
  return (
    <Fragment>
      {isLoading ? (
        <AppSpinner>
          <i className="fa fa-spinner fa-pulse fa-spin" aria-hidden="true" />
        </AppSpinner>
      ) : (
        <AppButton onClick={onClick()}>Voir plus</AppButton>
      )}
    </Fragment>
  );
};

LoadMoreButton.propTypes = {};

export default LoadMoreButton;

const AppButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  padding: 12px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #fc8b71, #e9662f);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  :focus {
    outline: none;
  }
`;
const AppSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  color: #acacac;
  font-size: 26px;
`;
