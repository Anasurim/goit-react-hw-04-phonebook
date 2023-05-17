import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../ContactForm/ContactFor.module.css';

export function ContactForm({ onSubmit }) {
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setContact(prevContact => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(contact);

    resetForm();
  };

  const resetForm = () => {
    setContact({ name: '', number: '' });
  };

  const { name, number } = contact;

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.formLabel}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={css.formInput}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.formLabel}>
        Phone
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          className={css.formInput}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.formButton}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};
