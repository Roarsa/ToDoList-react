import React from 'react';
import PropTypes from 'prop-types';
import deleteImg from './img/deleteItem.png';
import deleteImgHov from './img/deleteItemHover.png';
import styles from './Task.sass';

class Task extends React.PureComponent {
  render() {
    const {
      editId,
      item,
      changeEditId,
      deleteItem,
      rename,
      checkChange,
    } = this.props;
    const inputText = editId === item.id ? (
      <input
        className={styles.task}
        value={item.task}
        onChange={event => rename(item.id, event.target.value)}
        onBlur={() => {
          changeEditId(item.id);
        }}
        onKeyPress={(event) => {
          if (event.keyCode === 13) {
            changeEditId(item.id);
          }
        }}
      />
    ) : (
      <p className={styles.task} onDoubleClick={() => changeEditId(item.id)}>
          {' '}
          {item.task}
        </p>
    );
    return (
      <div key={item.id} className={styles.item}>
        <input
          type="checkbox"
          id={item.id}
          checked={item.isDone}
          onChange={() => checkChange(item.id)}
        />{' '}
        <label htmlFor={item.id} />{' '}
        <form
          onSubmit={(event) => {
            changeEditId(item.id);
            event.preventDefault();
          }}
        >
          {' '}
          {inputText}
        </form>{' '}
        <button
          type="button"
          className={styles.itemMenuDelete}
          onClick={() => deleteItem(item.id)}
        >
          <img className={styles.deleteImg} alt="" src={deleteImg} />{' '}
          <img className={styles.deleteImgHov} alt="" src={deleteImgHov} />
        </button>
      </div>
    );
  }
}

Task.propTypes = {
  changeEditId: PropTypes.func.isRequired,
  checkChange: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  rename: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  editId: PropTypes.number.isRequired,
};

export default Task;
