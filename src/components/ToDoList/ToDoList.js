import React from 'react';
import AddBlock from '../AddBLock/AddBlock';
import Logo from '../Logo/Logo';
import Type from '../Type/Type';
import ToDoItems from '../ToDoItems/ToDoItems';
import styles from './ToDoList.sass';

export default class ToDoList extends React.PureComponent {
  /* TODO
    попробуй совсем без constructor
    я тебе вроде показывал как можно компонент без конструктора
    объявить
  */

  constructor(props) {
    super(props);
    this.state = {
      items: this.getFromLocal().items,
      /* TODO
        ну что за безобразные назавания:
        - type что такое. filterType давай
        - flagOfCompleted вообще отвратительно :)
        - editId более менее. но давай лучше currentEditId. так более осмысленно звучит
      */
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

  /* TODO
    давай сделаем отдельную абстаркцию модуль. который будет использовать localStorage
  */
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

  /* TODO
    ты везде при изменение state сохраняешь состояние в local storage через
    эту функцию и везде тебе приходится ее вызывать. не есть хорошо жи. попробуй сделать 
    функцию которая будет на вход принимать то что надо в состоянии поменять и всегда сохранять
    это в localStorage и вызывай эту функцию вместо
    постоянныхsetState и setToLocal (кстати тоже дурацкое название:))
  */
  setToLocal = () => {
    /* TODO
      ануксь сократи этот код (напиши в одну строку всё) подсказка - Object.keys
    */
    const { items, type, flagOfCompleted } = this.state;
    localStorage.setItem('currentId', JSON.stringify(this.currentId));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('type', JSON.stringify(type));
    localStorage.setItem('flagOfCompleted', JSON.stringify(flagOfCompleted));
  };

  /* TODO
    эт че за безобразие. в одну строку давай без всяких циклов.
    у массивов в js не только map, filter и reduce есть.
  */
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
      /* TODO
        когда проходимся через map и другие методы работы с массивом
        не меняем текущие элементы, а всегда возвращаем новые. если у тебя тот 
        id которые тебе нужен бери из старого item то что тебе нужно и возвращай новый
        item с новым task. используй для этого ... (spread operator). давай не позорь меня
      */
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
      /* TODO
        тоже самое что выше писал
      */
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
    /* TODO
      после объявлений переменных и деструктуризаций лучше вставлять пустую строку.
      типо
      const { items, flagOfCompleted } = this.state
      -пустая строка-
      и дальше калякаешь ...
      пройдись везде по коду поправь эти моменты

      так код логически разделенней получается и читать легче
    */
  
    const { items, flagOfCompleted } = this.state;
    /* TODO
      давай если есть возможность не использовать неявное приведение выражений
      то не использовать. адекватные линтер тебе будет ругаться на это.
      js такие вещи умеет но код неоднозначным становится. лучше items.length === 0
    */
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
    /* TODO
      зачем тебе здесь искать нужный item и его текст
      если ты на уровне компонента Task знаешь пустой текст или нет и
      можешь там же вызвать deleteItem с id если надо
      тут ненужные вычисления у тебя (поиск по id внутри коллекции items)
      тем более через цикл. за циклы буду бить. не надо их использовать нигде там
      где можно не использовать.
    */
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
    /* TODO
      давай такую деструктуризацию (где много переменных)
      вертикальной делать

      const {
        editId,
        items,
        type,
        flagOfCompleted,
      } = this.state;
    */
    const {
      editId, items, type, flagOfCompleted,
    } = this.state;

    /* TODO
      давай ка это в отдельную функцию вынесем
      что то типо getVisibleTodos (название можешь сама придумать)
    */
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

    /* TODO
      что за название такое ntype
      и зачем это в отдельную переменную выносить?
      перенеси это в внутрь jsx кода в return (...)
    */
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
