import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

class ToDoItems extends React.PureComponent {
  render() {
    const {
      editId,
      type,
      items,
      checkChange,
      changeEditId,
      deleteItem,
      rename,
    } = this.props;
    /* TODO
      itemLst - нормально нельзя писать а? :) 
    */
    const itemLst = items.reverse().filter((item) => {
      return (
        type === 'all'
        || (type === 'active' && item.isDone === false)
        || (type === 'complete' && item.isDone === true)
      );
    });
    return (
      <div>
        {' '}
        {itemLst.map((item) => {
          return (
            <Task
              editId={editId}
              key={item.id}
              items={items}
              item={item}
              checkChange={checkChange}
              deleteItem={deleteItem}
              changeEditId={changeEditId}
              rename={rename}
            />
          );
        })}{' '}
      </div>
    );
  }
}

ToDoItems.propTypes = {
  changeEditId: PropTypes.func.isRequired,
  checkChange: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  rename: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  editId: PropTypes.number.isRequired,
};

export default ToDoItems;
