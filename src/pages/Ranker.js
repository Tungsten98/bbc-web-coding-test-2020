import React from 'react';

import RankerOption from '../components/RankerOption';

class Ranker extends React.Component {
  constructor(props) {
    super(props);

    this.titles = this.props.titles;
    this.numArticles = this.props.titles.length;

    // Bind methods
    this.handleRankerOptionClick = this.handleRankerOptionClick.bind(this);

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
    })
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
      <table>
        <tbody>
          {articleTitles}
        </tbody>
      </table>
    );
  }
}

export default Ranker;
