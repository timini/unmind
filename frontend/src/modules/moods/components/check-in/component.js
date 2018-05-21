import React, { PureComponent } from 'react';
import { isNil } from 'ramda';

import { propTypes, defaultProps } from './props';

export class CheckIn extends PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  constructor(props) {
    super(props);
    this.saveMood = this.saveMood.bind(this);
    this.saveFeeling = this.saveFeeling.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }
  saveMood(ev) {
    const { value } = ev.target;
    this.props.saveField({ fieldName: 'mood', value });
  }
  saveFeeling(ev) {
    const { value } = ev.target;
    this.props.saveField({ fieldName: 'feeling', value });
  }
  saveComment(ev) {
    const { value } = ev.target;
    this.props.saveField({ fieldName: 'comment', value });
    this.props.nextPage();
  }
  nextPage(ev) {
    this.props.nextPage();
  }
  previousPage(ev) {
    this.props.previousPage();
  }
  renderButton(disabled) {
    return (
      <button disabled={disabled} onClick={this.nextPage}>
        next
      </button>
    );
  }
  renderMoodForm() {
    const { mood } = this.props.values;
    const options = ['1', '2', '3', '4', '5', '6', '7'].map(option => (
      <div key={option}>
        <input
          type="radio"
          name="mood"
          id={`mood-${option}`}
          onClick={this.saveMood}
          checked={option === mood}
          value={option}
        />
        <label htmlFor={`mood-${option}`}>{option}</label>
      </div>
    ));
    return (
      <div>
        {options}
        {this.renderButton(isNil(mood))}
      </div>
    );
  }
  renderFeelingForm() {
    const { feeling } = this.props.values;
    const feelings = ['depressed', 'optimistic', 'bored', 'happy'].map(
      option => (
        <div key={option}>
          <input
            type="radio"
            name="feeling"
            id={`feeling-${option}`}
            onClick={this.saveFeeling}
            checked={option === feeling}
            value={option}
          />
          <label htmlFor={`feeling-${option}`}>{option}</label>
        </div>
      )
    );
    return (
      <div>
        {feelings}
        {this.renderButton(isNil(feeling))}
      </div>
    );
  }
  renderCommentForm() {
    return (
      <div>
        <input type="text" />
        <button onClick={this.saveComment}>finish</button>
      </div>
    );
  }
  renderComplete() {
    this.props.saveForm();
    setTimeout(() => this.props.history.push('/insights'), 1000);
    return <div>complete!</div>;
  }
  renderForm() {
    const { page } = this.props;
    switch (page) {
      case 1:
        return this.renderMoodForm();
      case 2:
        return this.renderFeelingForm();
      case 3:
        return this.renderCommentForm();
      case 4:
        return this.renderComplete();
      default:
        return null;
    }
  }
  render() {
    // dont show the backbutton on the first page or the 'complete' page
    const previousButton =
      this.props.page !== 1 && this.props.page !== 4 ? (
        <button onClick={this.previousPage}>back</button>
      ) : null;
    return (
      <div>
        {this.renderForm()}
        {previousButton}
      </div>
    );
  }
}

export default CheckIn;
