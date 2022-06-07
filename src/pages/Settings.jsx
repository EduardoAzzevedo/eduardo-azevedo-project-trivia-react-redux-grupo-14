import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import triviaImg from '../imagens/trivia.png';
import './style/Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      type: '',
      isLoading: true,
    };
  }

  onFetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    const { trivia_categories: categories } = data;
    this.setState({ categories: [...categories] }, () => {
      this.setState({ isLoading: false });
    });
  }

  componentDidMount = () => {
    const { settings } = this.props;
    const { category, difficulty, type } = settings;
    this.setState({ category, difficulty, type });
    this.onFetchCategories();
  }

  onHandleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { category, difficulty, type } = this.state;
      const { dispatch } = this.props;
      if (category !== '') dispatch(actions.changeCategory(category));
      if (difficulty !== '') dispatch(actions.changeDifficulty(difficulty));
      if (type !== '') dispatch(actions.changeType(type));
    });
  }

  onRenderCategories = () => {
    const { categories } = this.state;
    const options = categories.map((category, index) => {
      const { id, name } = category;
      return (<option key={ index } value={ id }>{ name }</option>);
    });
    return options;
  }

  onRenderForm = () => {
    const { categories, category, difficulty, type } = this.state;

    return (
      <form className="settings-forms">
        <label htmlFor="inputCategory">
          Category:
          <select
            name="category"
            id="inputCategory"
            onChange={ this.onHandleChange }
            value={ category }
          >
            <option value="any">Any Category</option>
            { categories.length > 0 && this.onRenderCategories() }
          </select>
        </label>
        <label htmlFor="inputDifficulty">
          Difficulty:
          <select
            name="difficulty"
            id="inputDifficulty"
            onChange={ this.onHandleChange }
            value={ difficulty }
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label htmlFor="inputType">
          Type:
          <select
            name="type"
            id="inputType"
            onChange={ this.onHandleChange }
            value={ type }
          >
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </label>
      </form>
    );
  }

  render() {
    const { isLoading } = this.state;
    const { history } = this.props;

    return (
      <>
        <div className="trivia-container">
          <img className="trivia-img" src={ triviaImg } alt="trivia" />
        </div>
        <header>
          <h1 data-testid="settings-title">
            Settings
          </h1>
        </header>
        <main>
          <button
            className="back-button"
            type="button"
            onClick={ () => history.push('/') }
          >
            Go Home
          </button>
          { isLoading ? <h2>Loaging...</h2> : this.onRenderForm() }
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});

Settings.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape),
  settings: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Settings);
