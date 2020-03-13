import React from 'react';

import AppButton from '../components/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Start = (props) => {
  document.title = "ArticlesRanker";

  return (
    <Container>
      <br />
      <br />
      <Row>
        <h1 className="display-1">BBC Web Conding Test 2020 ArticlesRanker</h1>
      </Row>
      <br />
      <Row>
        <h4>Welcome to ArticlesRanker. In this app you will be reading five
          random articles, and will then be asked to rank the articles based
          on how much you enjoyed reading them.</h4>
      </Row>
      <br />
      <Row>
        <AppButton onClick={props.handleStart} label="Click here to start" />
      </Row>
    </Container>
  );
};

export default Start;
