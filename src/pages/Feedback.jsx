import React, { Component } from 'react';

// Componentes
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <section>
        <Header />
        <h2 data-testid="feedback-text"> Página: Feedback </h2>
      </section>
    );
  }
}

export default Feedback;
