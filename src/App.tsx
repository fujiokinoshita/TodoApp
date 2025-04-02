//２つの重要なフックをreactからインポートする
//useState: データの状態を管理するためのフック
//useRef: DOM要素への参照を作成するためのフック
//フックとはReactの機能の一つでコンポーネントに追加機能を付けるための仕組み
import { useState, useRef } from "react";

//App.cssというcssファイルをインポートする
import "./App.css";

// import { Todo } from "./Todo.tsx";

// Todoというコンポーネントを定義している
//propsは親コンポーネントから渡されるデータを受け取るためのもの
//親コンポーネントとは、このコンポーネントを呼び出しているコンポーネント
const Todo = (props) => {
  //削除ボタンがクリックされたときの処理を定義する関数
  const handleDeleteClick = () => {
    //親コンポーネントから渡された削除処理を実行する
    //props.onDeleteClick：親コンポーネントから渡された削除処理を実行する関数
    //props.todo.id：削除するtodoアイテムのid
    props.onDeleteClick(props.todo.id);
  };

  //チェックボックスがクリックされたときの処理を定義する関数
  const handleCheckboxChange = () => {
    //親コンポーネントから渡されたチェックボックス変更処理を実行する
    //props.onCheckboxChange：親コンポーネントから渡されたチェックボックス変更処理を実行する関数
    //props.todo.id：変更するtodoアイテムのid
    props.onCheckboxChange(props.todo.id);
  };

  //Todoコンポーネントが画面に表示する内容（JSX）を返している
  //「返す」とはコンポーネントが「このような内容を表示します」という意味
  return (
    //li要素：リストの項目を表す要素
    <li>
      {/* label要素:チェックボックスとそのラベルを表す要素 */}
      <label>
        {/* input要素:チェックボックスを表す要素 */}
        <input
          //チェックボックス（☐）を作るためのHTML属性
          //type: 入力要素の種類を指定
          //"checkbox": チェックボックス型を指定
          type="checkbox"
          //チェックボックスの状態（チェックされているかどうか）を設定している
          //「このTodoアイテムの完了状態に合わせて、チェックボックスの表示を更新しなさい」という指示
          //checked: チェックボックスの状態を指定する属性
          //props.todo.isCompleted: このTodoアイテムが完了しているかどうかの情報
          //isCompleted が true の場合 → チェックボックスにチェックが付く
          //isCompleted が false の場合 → チェックボックスにチェックが付かない
          checked={props.todo.isCompleted}
          //チェックボックスが変更された時の処理を指定している
          //onChange: チェックボックスの状態が変わった時に実行されるイベント
          //handleCheckboxChange: チェックボックスが変更された時に実行する関数
          //イベントとはユーザーがチェックボックスをクリックする動作などのこと
          onChange={handleCheckboxChange}
        />
        //Todoアイテムのタイトル（内容）を表示すしている
        {/* <span>: テキストを表示するためのHTMLタグ */}
        {/* {props.todo.title}: このTodoアイテムのタイトルを表示 */}
        <span>{props.todo.title}</span>
      </label>
      {/* //削除ボタンを作っている */}
      {/* //「クリックできる削除ボタンを作り、クリックされたらこのTodoアイテムを削除してください」という指示 */}
      {/* //<button>: クリックできるボタンを作るHTMLタグ */}
      {/* //onClick={handleDeleteClick}: ボタンがクリックされた時に実行する関数 */}
      {/* //Del: ボタンに表示するテキスト */}
      <button onClick={handleDeleteClick}>Del</button>
    </li>
  );
};

const AddForm = (props) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  const handleTextChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(title);
    setTitle("");
    inputRef.current.focus();
  };

  return (
    //フォームが送信された時の処理を指定している
    //<form>: フォーム（入力フォーム全体）を作るHTMLタグ
    //onSubmit: フォームが送信された時に実行されるイベント
    //handleSubmit: フォーム送信時に実行する関数
    <div>
      <form onSubmit={handleSubmit}>
        <input
          //テキスト入力欄を作るためのHTML属性
          //type: 入力要素の種類を指定
          //"text": テキスト入力型を指定
          type="text"
          //テキスト入力欄に表示する内容を設定する
          //value: テキスト入力欄の内容を指定する属性
          //{title}: 表示する文字列（この場合は title という変数の値）
          value={title}
          //テキスト入力欄の内容が変更された時の処理を指定している
          //「テキスト入力欄の内容が変更されたら、その内容を保存してください」という指示
          //onChange: テキスト入力欄の内容が変わった時に実行されるイベント
          //handleTextChange: テキストが変更された時に実行する関数
          onChange={handleTextChange}
          //テキスト入力欄を直接参照するためのコード
          //ref: 要素への参照を作成する属性
          //inputRef: テキスト入力欄への参照を保持する変数
          ref={inputRef}
        />
        {/* //追加ボタンを作るコード */}
        {/* //<button>: クリックできるボタンを作るHTMLタグ */}
        {/* //Add: ボタンに表示するテキスト */}
        <button>Add</button>
      </form>
    </div>
  );
};

function App() {
  const [todos, setTodos] = useState([]);

  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handlePurgeClick = () => {
    if (!confirm("Sure?")) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    updateTodos(newTodos);
  };

  const handleTodoDeleteClick = (id) => {
    if (!confirm("Sure?")) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    updateTodos(newTodos);
  };

  const handleTodoCheckboxChange = (id) => {
    const newTodos = todos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
      };
    });
    updateTodos(newTodos);
  };

  const handleAddFormSubmit = (title) => {
    const newTodos = [...todos];
    newTodos.push({
      id: Date.now(),
      title: title,
      isCompleted: false,
    });
    updateTodos(newTodos);
  };

  const todoItems = todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        onDeleteClick={handleTodoDeleteClick}
        onCheckboxChange={handleTodoCheckboxChange}
      />
    );
  });

  return (
    <>
      <div className="container">
        <h1>
          Todos
          <button onClick={handlePurgeClick}>Purge</button>
        </h1>
        <ul id="todos">{todoItems}</ul>
        <AddForm onSubmit={handleAddFormSubmit} />
      </div>
    </>
  );
}

export default App;
