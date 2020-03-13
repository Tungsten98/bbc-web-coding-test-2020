import React from 'react';

// Represents one option to select in the Ranker table
const RankerOption = (props) => (
  <button onClick={(event) => (props.onClick(event, props.articleTitle))}>
    <table>
      <tbody>
        <tr>
          <td>{props.articleTitle}</td>
          <td>{props.rank ? props.rank.toString() : ''}</td>
        </tr>
      </tbody>
    </table>
  </button>
);

export default RankerOption;
