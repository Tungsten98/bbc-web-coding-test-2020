import React from 'react';
import axios from 'axios';

import Button from '../components/Button';
import RankerOption from '../components/RankerOption';

class Ranker extends React.Component {
  constructor(props) {
    super(props);

    this.titles = this.props.titles;
    this.numArticles = this.props.titles.length;

    // Bind methods
    this.postRankings = this.postRankings.bind(this);
    this.handleRankerOptionClick = this.handleRankerOptionClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    // Set up dictionary to hold rank state
    let ranks = {};
    for (let title of this.titles) {
      ranks[title] = undefined;
    }

    this.state = {
      currentRank: 1,
      ranks: ranks
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
      ranks: ranks
    });
  }

  async postRankings() {
    try {
      // Verify that all articles have been given a rank
      for (let articleTitle of this.titles) {
        if (this.state.ranks[articleTitle] === undefined) {
          throw new Error("Not all articles are given a rank yet.");
        }
      }

      // POST the rankings to the server
      const response = await axios.post('/api/ranking', this.state.ranks);
      if (response.status !== 200) {
        throw new Error(
          "An unknown error has occured when submitting rankings");
      }
    } catch (error) {
      console.error(error);
    }

  }

  handleSubmitClick(mouseClickEvent) {
    mouseClickEvent.preventDefault();
    this.postRankings();
  }

  render() {
    const articleTitles = this.titles.map((title) => {
      return (
        <tr key={title}>
          <td>
            <RankerOption
              articleTitle={title}
              rank={this.state.ranks[title]}
              onClick={this.handleRankerOptionClick}
              />
          </td>
        </tr>
      );
    });

    return (
      <form>
        <table>
          <tbody>
            {articleTitles}
          </tbody>
        </table>
        <Button onClick={this.postRankings} label="Submit rankings" />
      </form>
    );
  }
}

export default Ranker;
