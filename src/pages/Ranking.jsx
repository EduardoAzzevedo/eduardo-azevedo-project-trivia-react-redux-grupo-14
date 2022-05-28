import React from 'react';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    return (
      <h2 data-testid="ranking-title"> Hello world </h2>
    );
  }
}

export default connect()(Ranking);
