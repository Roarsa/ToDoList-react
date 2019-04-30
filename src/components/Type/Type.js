import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Type.sass';

class Type extends React.PureComponent {
  render() {
    const { type, changeType } = this.props;
    const classAll = classNames(styles.type, {
      [styles.chosen]: type === 'all',
    });
    const classComplete = classNames(styles.type, {
      [styles.chosen]: type === 'complete',
    });
    const classActive = classNames(styles.type, {
      [styles.chosen]: type === 'active',
    });
    return (
      <div className={styles.root}>
        <button
          type="button"
          className={classAll}
          onClick={() => {
            changeType('all');
          }}
        >
          All{' '}
        </button>{' '}
        <button
          type="button"
          className={classActive}
          onClick={() => {
            changeType('active');
          }}
        >
          Active{' '}
        </button>{' '}
        <button
          type="button"
          className={classComplete}
          onClick={() => {
            changeType('complete');
          }}
        >
          Completed{' '}
        </button>{' '}
      </div>
    );
  }
}

Type.propTypes = {
  changeType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Type;
