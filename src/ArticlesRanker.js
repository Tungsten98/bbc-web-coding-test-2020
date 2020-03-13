import React from 'react';
import axios from 'axios';

import Heading from './components/Heading';
import Paragraph from './components/Paragraph';
import Image from './components/Image';
import List from './components/List';

// Helper functions
// Generate the randomised article list and fetching the required data
const generateRandomArticleSequence = () => {
  // Define the article numbers
  let randomArray = [1, 2, 3, 4, 5];

  // Shuffle them to get a random ordering
  // Start iterator from end of array
  let randomArrayIterator = 5;
  while (randomArrayIterator > 0) {
    // Generate a random index
    let indexToSwap = Math.floor(Math.random() * randomArrayIterator);
    randomArrayIterator--;

    // Swap the element at the iterator with the element at the index
    let valueToSwap = randomArray[randomArrayIterator];
    randomArray[randomArrayIterator] = randomArray[indexToSwap];
    randomArray[indexToSwap] = valueToSwap;
  }

  return randomArray;
}

const fetchArticleData = async (article_num) => {
  try {
    const requestURL = `/article-${article_num}`;
    const response = await axios.get(requestURL);
    return await response.data;

  } catch (error) {
    console.warn(`Error could not load article: ${error.message}`)
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
      console.warn(`Error: component for type ${data.type} not implemented.`);
  }

  return component;
};

// The ArticlesRanker app component
class ArticlesRanker extends React.Component {
  constructor() {
    super();
    this.articleSequence = generateRandomArticleSequence();

    const emptyArticleDataTemplate = {
      title: '',
      body: []
    };

    // Initialise state
    this.state = {
      currentArticleIndex: 0,
      currentArticleData: emptyArticleDataTemplate,
      nextArticleData: emptyArticleDataTemplate
    };
  }

  async componentDidMount() {
    const data = await fetchArticleData(this.articleSequence[
      this.state.currentArticleIndex]);

    this.setState({ currentArticleData: data });

    // Render the title
    document.title = this.state.currentArticleData.title;
  }

  render() {
    let articleComponents = this.state.currentArticleData.body.map(
      (data, index) => (pickComponentForDataModel(index, data)));

    return <article>{articleComponents}</article>;
  }
}

export default ArticlesRanker;
