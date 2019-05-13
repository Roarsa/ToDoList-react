import React from 'react';
import PropTypes from 'prop-types';
import deleteAllimg from './img/deleteAll.png';
import deleteAllimgHov from './img/deleteAllHover.png';
import completeAllimg from './img/completeAll.png';
import completeAllimgHov from './img/completeAllHover.png';
import completeAllimgAct from './img/completeAll-2.png';
import styles from './Logo.sass';

class Logo extends React.PureComponent {
  render() {
    const { flagOfCompleted, complete, deleteAll } = this.props;
    /* TODO
      почему тут classnames не использузешь. в других местах жи используешь
    */
    const classChecked = flagOfCompleted
      ? `${styles.checkedItems} ${styles.checkedItemsComplete}`
      : `${styles.checkedItems}`;
    return (
      <div className={styles.todoListLogo}>
        <h1> Todos</h1>{' '}
        <div
          role="button"
          tabIndex="-1"
          className={classChecked}
          onClick={complete}
          onKeyDown={complete}
        >
          {/* TODO
            зачем тебе тут (и во многих местах) эти пробелы '{}'
          */}
          {' '}
          <img alt="" className={styles.completeImg} src={completeAllimg} />{' '}
          <img alt="" className={styles.completeImgHov} src={completeAllimgHov} />{' '}
          <img alt="" className={styles.completeImgAct} src={completeAllimgAct} />
        </div>{' '}
        <div
          role="button"
          tabIndex="-1"
          className={styles.clearItems}
          onClick={deleteAll}
          onKeyDown={deleteAll}
        >
          {' '}
          <img alt="" className={styles.deleteImg} src={deleteAllimg} />{' '}
          <img alt="" className={styles.deleteImgHov} src={deleteAllimgHov} />
        </div>
      </div>
    );
  }
}

Logo.propTypes = {
  complete: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
  flagOfCompleted: PropTypes.bool.isRequired,
};

export default Logo;
