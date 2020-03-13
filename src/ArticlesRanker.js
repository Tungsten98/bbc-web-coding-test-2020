import React from 'react';

import Articles from './pages/Articles';
import Finish from './pages/Finish';
import Ranker from './pages/Ranker';
import Start from './pages/Start';

// Styling imports
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

class ArticlesRanker extends React.Component {
  constructor() {
    super();

    this.appendTitle = this.appendTitle.bind(this);
    this.goToArticles = this.goToArticles.bind(this);
    this.goToRanker = this.goToRanker.bind(this);
    this.goToFinish = this.goToFinish.bind(this);

    this.articleTitles = [];
    this.viewStates = {
      START: <Start handleStart={this.goToArticles} />,
      ARTICLES: <Articles
                  updateTitleList={this.appendTitle}
                  handleDoneViewing={this.goToRanker}
                  />,
      RANKER: <Ranker
                titles={this.articleTitles}
                handleFinish={this.goToFinish}
                />,
      FINISH: <Finish handleRestart={this.goToArticles} />
    };

    this.state = {
      currentView: this.viewStates.START
    };
  }

  // Used to feed back the random article titles to the main application
  appendTitle(title) {
    this.articleTitles.push(title);
  }

  goToArticles() {
    this.setState({ currentView: this.viewStates.ARTICLES });
  }

  goToRanker() {
    this.setState({ currentView: this.viewStates.RANKER });
  }

  goToFinish() {
    this.articleTitles = [];
    this.setState({ currentView: this.viewStates.FINISH });
  }

  render() {
    return (
      <Container>
        {this.state.currentView}
      </Container>
    );
  }
}

export default ArticlesRanker;
