import React from 'react';

class ArticlesRanker extends React.Component {

  constructor(props) {
    super(props);

    // Bind methods
    this.generateRandomArticleSequence
      = this.generateRandomArticleSequence.bind(this)

    const articleSequence = this.generateRandomArticleSequence();
    const currentArticleIndex = 0;
    const currentArticleData
      = this.fetchArticleData(articleSequence[currentArticleIndex]);

    // Initialise state
    this.state = {
      articleSequence: articleSequence,
      currentArticleIndex: currentArticleIndex,
      currentArticleData: currentArticleData,
      nextArticleData: undefined
    }
  }

  // Functions for generating the randomised article list and fetching the
  // required data
  generateRandomArticleSequence() {

  }

  fetchArticleData(article_num) {

  }

  // Functions for rendering article components
  renderImage() {

  }

  renderHeading() {

  }

  renderParagraph() {

  }

  renderUnorderedList() {

  }

  renderArticle() {

  }

  render() {
    return;
  }
}

export default ArticlesRanker;
