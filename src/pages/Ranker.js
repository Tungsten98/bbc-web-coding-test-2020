import React from 'react';
import axios from 'axios';

import AppButton from '../components/Button';
import RankerOption from '../components/RankerOption';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Ranker extends React.Component {
  constructor(props) {
    super(props);

    this.titles = this.props.titles;
    this.numArticles = this.props.titles.length;
    this.handleFinish = this.props.handleFinish;

    // Bind methods
    this.postRankings = this.postRankings.bind(this);
    this.handleRankerOptionClick = this.handleRankerOptionClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    // Set up dictionary to hold rank state
    let ranks = {};
    for (let title of this.titles) {
      ranks[title] = undefined;
    }

    document.title = "ArticlesRanker";

    this.state = {
      currentRank: 1,
      ranks: ranks,
      displayNotCompleteError: false
    }
  }

  handleRankerOptionClick(mouseClickEvent, selectedArticleTitle) {
    mouseClickEvent.preventDefault();

    let ranks = this.state.ranks;

    const prevRank = ranks[selectedArticleTitle];
    let nextRank = undefined;
    if (prevRank === undefined) {
      // Update the article entry's rank
      ranks[selectedArticleTitle] = this.state.currentRank;
      nextRank = this.state.currentRank + 1;
    }
    else {
      ranks[selectedArticleTitle] = undefined;
      // Cascade the effect of removing the rank
      for (let articleTitle of this.titles) {
        if (ranks[articleTitle] && ranks[articleTitle] >= prevRank) {
          ranks[articleTitle]--;
        }
      }
      nextRank = this.state.currentRank - 1;
    }

    this.setState({
      currentRank: nextRank,
      ranks: ranks,
      displayNotCompleteError: false
    });
  }

  async postRankings() {
    try {
      // POST the rankings to the server
      const response = await axios.post('/api/ranking', this.state.ranks);
      if (response.status !== 200) {
        throw new Error(
          "An unknown error has occured when submitting rankings");
      }
      else {
        this.handleFinish();
      }
    } catch (error) {
      console.error(error);
    }

  }

  handleSubmitClick(mouseClickEvent) {
    mouseClickEvent.preventDefault();

    // Verify that all articles have been given a rank
    for (let articleTitle of this.titles) {
      if (this.state.ranks[articleTitle] === undefined) {
        this.setState({ displayNotCompleteError: true });
        return;
      }
    }

    this.postRankings();
  }

  render() {
    const articleTitles = this.titles.map((title) => {
      return (
        <Container key={title}>
          <Row>
            <RankerOption
              articleTitle={title}
              rank={this.state.ranks[title]}
              onClick={this.handleRankerOptionClick}
              />
          </Row>
          <br />
        </Container>
      );
    });

    return (
      <Container>
        <br />
        <br />
        <Container>
          <h1>Rank the articles</h1>
        </Container>
        <br />
        <Container>
          <p>Click on the article titles to assign a rank. Click on the title
              again to remove the rank. Click on 'Submit rankings' once
              you have ranked all the articles.</p>
        </Container>
        <br />
        <Container>
          <form>
            <Container>
              {articleTitles}
            </Container>
            <br />
            <span className="text-danger">
              {this.state.displayNotCompleteError &&
                "Please give a rank to all articles"}
            </span>
            <br />
            <br />
            <AppButton onClick={this.handleSubmitClick} label="Submit rankings" />
          </form>
          <br />
        </Container>
      </Container>
    );
  }
}

export default Ranker;
