import React from 'react';
import AddBlock from '../AddBLock/AddBlock';
import Logo from '../Logo/Logo';
import Type from '../Type/Type';
import ToDoItems from '../ToDoItems/ToDoItems';
import styles from './ToDoList.sass';

export default class ToDoList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: this.getFromLocal().items,
      flagOfCompleted: this.getFromLocal().flagOfCompleted,
      type: this.getFromLocal().type,
      editId: -1,
    };
    this.currentId = this.getFromLocal().currentId;
  }

  componentDidMount() {
    document.body.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        this.setState({
          editId: -1,
        });
      }
    });
  }

  getFromLocal = () => {
    const flagOfCompleted = JSON.parse(localStorage.getItem('flagOfCompleted'))
      ? JSON.parse(localStorage.getItem('flagOfCompleted'))
      : false;
    const items = JSON.parse(localStorage.getItem('items'))
      ? JSON.parse(localStorage.getItem('items'))
      : [];
    const type = JSON.parse(localStorage.getItem('type'))
      ? JSON.parse(localStorage.getItem('type'))
      : 'all';
    const currentId = JSON.parse(localStorage.getItem('currentId'))
      ? JSON.parse(localStorage.getItem('currentId'))
      : 0;
    return {
      flagOfCompleted,
      items,
      type,
      currentId
    };
  };

  setToLocal = () => {
    const { items, type, flagOfCompleted } = this.state;
    localStorage.setItem('currentId', JSON.stringify(this.currentId));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('type', JSON.stringify(type));
    localStorage.setItem('flagOfCompleted', JSON.stringify(flagOfCompleted));
  };

  isCompleted = () => {
    const { items } = this.state;
    let num = 0;
    for (let i = 0; i < items.length; i++) {
      num = items[i].isDone ? num + 1 : num;
    }
    return num === items.length && num !== 0;
  };

  newItem = (task) => {
    if (task.trim() !== '') {
      this.setState(
        (state) => {
          return {
            items: state.items.concat({
              id: this.currentId + 1,
              task,
              isDone: false,
            }),
          };
        },
        () => {
          this.currentId += 1;
          this.setToLocal();
        },
      );
    }
  };

  deleteItem = (id) => {
    this.setState(
      (prevState) => {
        const itemsCopy = prevState.items;
        return {
          items: itemsCopy.filter(item => item.id !== id),
        };
      },
      () => {
        this.setState(
          {
            flagOfCompleted: this.isCompleted(),
          },
          this.setToLocal(),
        );
      },
    );
  };

  renameItem = (id, text) => {
    const { items } = this.state;
    const list = items.map((item) => {
      if (item.id === id) {
        item.task = text;
      }
      return item;
    });
    this.setState(
      {
        items: list,
      },
      this.setToLocal,
    );
  };

  changeItemState = (id) => {
    const { items } = this.state;
    const list = items.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    this.setState(
      {
        items: list,
      },
      () => {
        this.setState(
          {
            flagOfCompleted: this.isCompleted(),
          },
          this.setToLocal,
        );
      },
    );
  };

  completeAll = () => {
    const { items, flagOfCompleted } = this.state;
    if (items.length) {
      const list = items.map((item) => {
        item.isDone = !flagOfCompleted;
        return item;
      });
      this.setState(
        {
          items: list,
          flagOfCompleted: !flagOfCompleted,
        },
        this.setToLocal,
      );
    }
  };

  deleteAll = () => {
    const { items } = this.state;
    const newList = items.filter(item => !item.isDone);
    this.setState(
      {
        items: newList,
        flagOfCompleted: false,
      },
      this.setToLocal,
    );
  };

  changeType = (typeName) => {
    this.setState(
      {
        type: typeName,
      },
      this.setToLocal,
    );
  };

  changeEditId = (id) => {
    const { items, editId } = this.state;
    let neededItem;
    for (let i = 0; i < items.length; i++) {
      if (id === items[i].id) {
        neededItem = items[i];
      }
    }
    this.setState({
      editId: editId === -1 ? id : -1,
    });
    if (neededItem.task.trim() === '') {
      this.deleteItem(id);
    }
  };

  render() {
    const {
      editId, items, type, flagOfCompleted,
    } = this.state;
    const todoList = items.filter((item) => {
      if (type === 'active') {
        if (!item.isDone) {
          return item;
        }
      } else if (type === 'complete') {
        if (item.isDone) {
          return item;
        }
      }
      return item;
    });
    const ntype = (items.length !== 0) && (
      <Type changeType={this.changeType} type={type} />
    );

    return (
      <div className={styles.container}>
        <div className={styles.todoList}>
          <Logo
            deleteAll={this.deleteAll}
            complete={this.completeAll}
            flagOfCompleted={flagOfCompleted}
          />{' '}
          <AddBlock add={this.newItem} /> {ntype}{' '}
          <ToDoItems
            type={type}
            editId={editId}
            items={todoList}
            checkChange={this.changeItemState}
            deleteItem={this.deleteItem}
            changeEditId={this.changeEditId}
            rename={this.renameItem}
          />{' '}
        </div>{' '}
      </div>
    );
  }
}
