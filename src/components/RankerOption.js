import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Represents one option to select in the Ranker table
const RankerOption = (props) => (
  <Button onClick={(event) => (props.onClick(event, props.articleTitle))}>
    <Row>
      <Col md="auto">{props.articleTitle}</Col>
      <Col md="auto">{props.rank ? props.rank.toString() : ''}</Col>
    </Row>
  </Button>
);

export default RankerOption;
