import React from 'react';
import axios from 'axios';

import AppButton from '../components/Button';
import Heading from '../components/Heading';
import Image from '../components/Image';
import List from '../components/List';
import Paragraph from '../components/Paragraph';

// Helper functions
const fetchArticleData = async (article_num) => {
  try {
    const requestURL = `/api/article-${article_num}`;
    const response = await axios.get(requestURL);
    return await response.data;

  }
  catch (error) {
    console.error(`Error could not load article: ${error.message}`)
    return {
      title: '',
      body: []
    };
  }
}

const pickComponentForDataModel = (id, data) => {
  let key = undefined;
  let component = undefined;

  switch (data.type) {
    case 'heading':
      key = `${id}-heading`;
      component = <Heading key={key} model={data.model} />;
      break;
    case 'paragraph':
      key = `${id}-paragraph`;
      component = <Paragraph key={key} model={data.model} />;
      break;
    case 'image':
      key = `${id}-image`;
      component = <Image key={key} model={data.model} />;
      break;
    case 'list':
      key = `${id}-list`;
      component = <List key={key} model={data.model} />;
      break;
    default:
      console.error(`Error: component for type ${data.type} not implemented.`);
  }

  return component;
};

// The Articles page component
class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.handleDoneViewing = this.props.handleDoneViewing;
    this.updateTitleList = this.props.updateTitleList;

    // Bind methods
    this.preloadNextArticle = this.preloadNextArticle.bind(this);
    this.moveToNextArticle = this.moveToNextArticle.bind(this);
    this.handleNextArticleButton = this.handleNextArticleButton.bind(this);

    this.emptyArticleDataTemplate = {
      title: '',
      body: []
    };
    // We use these to hold our current index and next article's data
    // We leave these outside of the component state as it does not directly
    // influence the rendering
    this.currentArticleNum = 1;
    this.nextArticleData = this.emptyArticleDataTemplate;

    // Initialise state
    this.state = {
      currentArticleData: this.emptyArticleDataTemplate
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchArticleData(this.currentArticleNum);

      this.setState({ currentArticleData: data });

      // Render the title
      document.title = data.title;

      // Update the list of titles in the main application
      this.updateTitleList(data.title);
    }
    catch (error) {
      console.error(`Error unable to load article: ${error.message}`);
    }

    this.preloadNextArticle();
  }

  async preloadNextArticle() {
    const nextArticleNum = this.currentArticleNum + 1;
    if (nextArticleNum > 5) {
      this.nextArticleData = this.emptyArticleDataTemplate;
    }
    else {
      try {
        this.nextArticleData = await fetchArticleData(nextArticleNum);
        this.updateTitleList(this.nextArticleData.title);
      }
      catch (error) {
        console.error(`Error unable to load article: ${error.message}`);
        this.nextArticleData = this.emptyArticleDataTemplate;
      }
    }
  }

  moveToNextArticle() {
    this.currentArticleNum++;
    this.setState({
      currentArticleData: this.nextArticleData
    });

    // Render the title
    document.title = this.nextArticleData.title;

    if (this.currentArticleNum <= 5) {
      this.preloadNextArticle();
    }
    else {
      this.handleDoneViewing();
    }
  }

  handleNextArticleButton(mouseClickEvent) {
    mouseClickEvent.preventDefault();
    this.moveToNextArticle();
  }

  render() {
    let articleComponents = this.state.currentArticleData.body.map(
      (data, index) => (pickComponentForDataModel(index, data)));

    return (
      <article>
        <br />
        <br />
        {articleComponents}
        <br />
        <AppButton label="Next" onClick={this.handleNextArticleButton} />
        <br />
        <br />
      </article>
    );
  }
}

export default Articles;
