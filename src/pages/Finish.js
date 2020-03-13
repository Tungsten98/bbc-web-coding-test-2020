import React from 'react';

import Button from '../components/Button';

const Finish = (props) => {
  document.title = "ArticlesRanker";

  return (
    <section>
      <section>
        <h1>Your rankings have been submitted</h1>
      </section>
      <section>
        <Button onClick={props.handleRestart} label="Start again" />
      </section>
    </section>
  );
};

export default Finish;
