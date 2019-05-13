import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddBlock.sass';

const AddBlock = ({ add }) => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.root}>
      <form
        className={styles.newTask}
        onSubmit={(event) => {
          add(value);
          setValue('');
          event.preventDefault();
        }}
      >
        <input
          className={styles.text}
          placeholder="I need to do..."
          value={value}
          /* TODO
            можно ж без фигурных скобок. () => setValue(event.target.value)
            пройдись по коду у тебя во многих местах такая запись. исправь везде
          */
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button className={styles.add} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

AddBlock.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddBlock;
