import React from 'react';

import AppButton from '../components/Button';

import Container from 'react-bootstrap/Container';

const Finish = (props) => {
  document.title = "ArticlesRanker";

  return (
    <Container>
      <br />
      <br />
      <Container>
        <h1>Your rankings have been submitted</h1>
      </Container>
      <br />
      <Container>
        <AppButton onClick={props.handleRestart} label="Start again" />
      </Container>
    </Container>
  );
};

export default Finish;
