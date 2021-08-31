import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

const BASE_STATE = {
  name: '',
  tel: '',
};
export default class ContactForm extends Component {
  state = {
    ...BASE_STATE,
  };
  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  resetState = () => {
    this.setState({ ...BASE_STATE });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    event.target.reset();
    this.resetState();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
            className={s.input}
            value={this.name}
            placeholder="Name Surname"
            onChange={this.handleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
          />
        </label>
        <label className={s.label}>
          Tel
          <input
            type="tel"
            name="tel"
            className={s.input}
            placeholder="774-333-22"
            onChange={this.handleInputChange}
            value={this.tel}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            required
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
