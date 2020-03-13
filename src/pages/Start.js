import React from 'react';

import Button from '../components/Button';

const Start = (props) => {
  document.title = "ArticlesRanker";

  return (
    <section>
      <section>
        <h1>BBC Web Conding Test 2020 ArticlesRanker</h1>
      </section>
      <section>
        <p>Welcome to ArticlesRanker. In this app you will be reading five
          random articles, and will then be asked to rank the articles based
          on how much you enjoyed reading them.</p>
      </section>
      <section>
        <Button onClick={props.handleStart} label="Click here to start" />
      </section>
    </section>
  );
};

export default Start;
