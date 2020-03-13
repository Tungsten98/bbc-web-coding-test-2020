import React from 'react';

const List = (props) => {
  // No meaningful key name to use for these examples, so just label with
  // index as string
  const listItems = props.model.items.map((item, index) => {
    const key = index.toString();
    return <li key={key}>{item}</li>;
  });

  if (props.model.type === 'ordered') {
    return (<ol>{listItems}</ol>);
  }
  else {
    return (<ul>{listItems}</ul>);
  }
};

export default List;
