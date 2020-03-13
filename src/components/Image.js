import React from 'react';

// The Image component
class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageSrc: undefined };

    this.imgSrc = this.props.model.url;
    this.height = this.props.model.height;
    this.width = this.props.model.width;
    this.altText = this.props.model.altText;
  }

  render() {
    // Modern browsers will automatically handle redirects
    // from src
    return (
      <img
        src={this.imgSrc}
        height={this.height}
        width={this.width}
        alt={this.altText}
        />
    );
  }
}

export default Image;
