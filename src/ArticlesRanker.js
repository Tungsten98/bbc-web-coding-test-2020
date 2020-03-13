import React from 'react';

import Articles from './pages/Articles';
import Ranker from './pages/Ranker';

class ArticlesRanker extends React.Component {
  constructor() {
    super();

    this.appendTitle = this.appendTitle.bind(this);
    this.goToRanker = this.goToRanker.bind(this);

    this.articleTitles = [];
    this.viewStates = {
      ARTICLES: <Articles
                  updateTitleList={this.appendTitle}
                  handleDoneViewing={this.goToRanker}
                  />,
      RANKER: <Ranker titles={this.articleTitles}/>
    };

    this.state = {
      currentView: this.viewStates.ARTICLES
    };
  }

  // Used to feed back the random article titles to the main application
  appendTitle(title) {
    this.articleTitles.push(title);
  }

  goToRanker() {
    this.setState({ currentView: this.viewStates.RANKER });
  }

  render() {
    return this.state.currentView;
  }
}

export default ArticlesRanker;
