import React from 'react';
import styled from 'styled-components';

export default function ErrorMessage() {
  return (
    <AppError data-testid="error-message">
      <h3>Une erreur est survenue</h3>
      <p>Veuillez recharger la page</p>
    </AppError>
  );
}
const AppError = styled.div`
  color: #4f4a4a;
  text-align: center;
`;
