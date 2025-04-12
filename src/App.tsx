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
  const handleCheckboxChange = (e) => {
    //親コンポーネントから渡されたチェックボックス変更処理を実行する
    //props.onCheckboxChange：親コンポーネントから渡されたチェックボックス変更処理を実行する関数
    //props.todo.id：変更するtodoアイテムのid
    props.onCheckboxChange(props.todo.id);
  };

  // Todoコンポーネントが画面に表示する内容（JSX）を返している
  // 「返す」とはコンポーネントが「このような内容を表示します」という意味
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
        {/* Todoアイテムのタイトル（内容）を表示すしている */}
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
// 新しいTodoアイテムを追加するためのフォームコンポーネントを定義するコード
// const AddForm: AddFormという名前のコンポーネントを作る
// (props): 親コンポーネントから渡されるデータを受け取る
// =>: アロー関数でコンポーネントを定義
const AddForm = (props) => {
  // テキスト入力欄の内容を管理するための状態を定義するコード
  // useState(""): 空の文字列（""）を初期値とする状態を作る
  // title: 現在の入力内容を保持する変数
  // setTitle: 入力内容を更新するための関数
  const [title, setTitle] = useState("");
  const [isOverMaxLength, setIsOverMaxLength] = useState(false);

  // テキスト入力欄を直接操作するための参照を作成するコード
  // inputRef: テキスト入力欄への参照を保持する変数
  // useRef(null): 新しい参照を作成（初期値はnull）
  // nullは最初は「まだ参照先が決まっていない」という意味
  const inputRef = useRef(null);
  // テキスト入力フィールドの値が変更されたときに呼び出されるイベントハンドラ関数
  // イベントハンドラ関数とは、ユーザーの操作（イベント）が発生したときに実行される関数のこと
  // eはイベントオブジェクトを表すパラメータ
  // イベントオブジェクトとは、ユーザーの操作（イベント）に関する情報を含むオブジェクト
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length >= 10) {
      setIsOverMaxLength(true);
      return;
    }

    setIsOverMaxLength(false);
    setTitle(e.target.value);

    // ユーザーが入力フィールドに入力した新しい値で状態を更新するコード
    // 入力された新しい値でtitleという状態変数を更新している
    // e.currentTarget - イベントが発生した要素（この場合は入力フィールド）を参照している
    // e.currentTarget.value - その入力フィールドに現在入力されている値（テキスト）を取得している
    // setTitle() - ReactのuseStateフックから取得した状態更新関数
  };
  // フォームが送信されたときに実行されるイベントハンドラ関数の定義
  const handleSubmit = (e) => {
    // フォーム送信時のデフォルト動作（ページリロード）を防止
    // ページリロードが発生した場合、コンポーネントの状態（state）がリセットされタスクリストが消える
    e.preventDefault();
    // 親コンポーネントに対して新しいTodoアイテムのタイトルを送信するためのもの
    // ユーザーが入力したTodoのタイトルを親コンポーネントに渡し、新しいTodoアイテムを追加するためのもの
    props.onSubmit(title);
    // setTitle("");は状態更新関数で、テキスト入力欄の内容を空にするためのもの
    // これにより、ユーザーは新しいTodoを追加するための準備が整う
    setTitle("");
    // テキスト入力欄にフォーカスを当てるためのもの
    // inputRefは、useRefフックを使って作成された参照オブジェクト
    // useRefは、Reactのフックの一つで、DOM要素への参照を保持するために使用されます
    // inputRef.currentは、inputRefが指している現在のDOM要素を表します。この場合、テキスト入力欄の<input>要素です
    // focus()は、DOM要素にフォーカスを当てるためのメソッドで、呼び出すことでユーザーがその要素に直接入力できる状態になる
    inputRef.current.focus();
  };

  return (
    //フォームが送信された時の処理を指定している
    //<form>: フォーム（入力フォーム全体）を作るHTMLタグ
    //onSubmit: フォームが送信された時に実行されるイベント
    //handleSubmit: フォーム送信時に実行する関数
    <form onSubmit={handleSubmit}>
      {/* テキスト入力欄を作成するための要素 */}
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
      <button disabled={isOverMaxLength}>Add</button>
    </form>
  );
};
// Reactアプリケーションの主要なコンポーネントを定義するためのもの
function App() {
  // useStateは、Reactのフックの一つで、関数コンポーネント内で状態を管理するために使用される
  // todosは、現在の状態を保持する変数で、この場合、todosはTodoアイテムのリストを表している。初期値として空の配列[]が設定されているため、最初はTodoアイテムが存在しない状態
  // setTodosは、todosの状態を更新するための関数。この関数を呼び出すことで、todosの値を変更し、コンポーネントを再レンダリングさせることができる
  const [todos, setTodos] = useState([]);
  // Todoリストの新しい状態を受け取り、その状態をsetTodosを使って更新するための関数を定義している
  // updateTodosは、引数newTodosを受け取るアロー関数。この関数は、Todoリストの新しい状態を受け取り、それを適切に処理している
  // newTodosは、更新後のTodoアイテムのリストを表す配列。この配列は、Todoアイテムの追加、削除、または変更を行った結果として生成される
  const updateTodos = (newTodos) => {
    // ReactのuseStateフックを使用して定義された状態更新関数setTodosを呼び出すコードで、todosという状態変数の値をnewTodosに更新する役割
    // setTodosは、useStateフックによって提供される関数で、todosの状態を更新するために使用される。この関数を呼び出すことで、Reactはコンポーネントを再レンダリングし、新しい状態を反映させる。
    // newTodosは、更新後のTodoアイテムのリストを表す配列。この配列は、Todoアイテムの追加、削除、または変更を行った結果として生成される。
    setTodos(newTodos);
    // JavaScriptのlocalStorageを使用して、newTodosという配列を文字列に変換して保存するためのコード
    // localStorage: ウェブブラウザにデータを保存するためのAPIで、ユーザーのブラウザにデータを永続的に保存できる。データはブラウザを閉じても保持される。
    // API（Application Programming Interface）とは、異なるソフトウェアアプリケーション同士が相互に通信し、機能やデータをやり取りするためのインターフェースのこと。
    // setItem(key, value): localStorageにデータを保存するためのメソッド。keyは保存するデータの名前、valueは保存するデータの内容。
    // メソッドとは、オブジェクト指向プログラミングにおいて、特定のオブジェクトに関連付けられた関数のこと。
    // JSON.stringify(newTodos): newTodosという配列をJSON形式の文字列に変換する。localStorageは文字列しか保存できないため、オブジェクトや配列を保存する際には、まず文字列に変換する必要がある。
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  // 特定のアクション（この場合はボタンのクリック）に応じて実行される処理を定義するためのアロー関数。このような関数を使用することで、ユーザーインターフェースの操作に対する反応を簡単に実装できる。
  const handlePurgeClick = () => {
    // JavaScriptにおける条件文の一部で、ユーザーに確認ダイアログを表示し、その結果に基づいて処理を制御するために使用される。
    // confirm("Sure?"): confirmメソッドは、ブラウザに確認ダイアログを表示する。このダイアログには、指定されたメッセージ（この場合は "Sure?"）が表示され、ユーザーは「OK」または「キャンセル」を選択できる。confirmメソッドは、ユーザーが「OK」を選択した場合は true を、キャンセルを選択した場合は false を返す。
    // !:この演算子は論理否定を表します。confirmメソッドの結果が false の場合、! 演算子によって true に変換されます。つまり、ユーザーが「キャンセル」を選択した場合に条件が成立します。
    // if 文: 条件が true の場合に実行されるブロックを定義します。この場合、ユーザーが「キャンセル」を選択した場合に、ブロック内の処理が実行される。
    // 引数とは、関数やメソッドに渡される値のことを指す。引数は、関数が実行される際にその関数に必要なデータを提供するために使用される。引数を使うことで、関数の動作を柔軟に変更したり、異なるデータに対して同じ処理を行ったりすることができる。
    if (!confirm("Sure?")) {
      // JavaScriptや他のプログラミング言語において、関数の実行を終了し、呼び出し元に制御を戻すための文
      return;
    }
    // JavaScriptにおける配列のメソッドfilterを使用して、新しい配列を作成するためのコード
    // const newTodos: newTodosという名前の新しい定数を宣言している。この定数には、filterメソッドによって生成された新しい配列が格納される。
    // todos.filter(...): todosは元の配列で、filterメソッドを呼び出している。filterメソッドは、配列の各要素に対して指定された条件を評価し、その条件を満たす要素だけを含む新しい配列を返している。
    // (todo) => { ... }: これはアロー関数で、filterメソッドに渡されるコールバック関数。todoは、todos配列の各要素を表している。この関数内で、各todoが条件を満たすかどうかを判断している。
    // コールバック関数とは、別の関数に引数として渡され、その関数の実行が完了した後に呼び出される関数のこと
    const newTodos = todos.filter((todo) => {
      // JavaScriptにおける条件式の一部で、todoオブジェクトのisCompletedプロパティがfalseであるかどうかを判断し、その結果を返すためのコード
      // todo.isCompleted: todoオブジェクトのisCompletedプロパティにアクセスする。このプロパティは、Todoアイテムが完了しているかどうかを示すブール値（trueまたはfalse）を持っている。
      // === false: isCompletedプロパティの値がfalseであるかどうかを比較する。===演算子は、値と型の両方が一致する場合にtrueを返している。
      // return: 条件式の結果（trueまたはfalse）を返している。この結果は、filterメソッドなどのコールバック関数内で使用され、配列の要素をフィルタリングするために利用される。
      return todo.isCompleted === false;
    });
    // newTodosという配列を引数としてupdateTodosという関数を呼び出すコード
    // updateTodos: これは関数の名前で、通常はTodoリストの状態を更新するための処理を行う関数。この関数は、引数として渡された新しいTodoリストを使用して、アプリケーションの状態を更新している。
    // newTodos: これは、更新されたTodoアイテムの配列。newTodosには、通常、フィルタリングや追加、削除などの操作を経て生成されたTodoアイテムのリストが格納されている。
    updateTodos(newTodos);
  };
  // JavaScriptにおけるアロー関数の定義で、特定のTodoアイテムを削除するための処理を行う関数を宣言している。
  // const handleTodoDeleteClick: handleTodoDeleteClickという名前の定数を宣言し、これにアロー関数を割り当てている。この関数は、Todoアイテムを削除するための処理を行っている。
  // (id): この部分は、関数が1つの引数idを受け取ることを示している。idは、削除対象のTodoアイテムを一意に識別するための識別子。
  const handleTodoDeleteClick = (id) => {
    // JavaScriptにおける条件文の一部で、ユーザーに確認ダイアログを表示し、その結果に基づいて処理を制御するために使用される
    // confirm("Sure?"): confirmメソッドは、ブラウザに確認ダイアログを表示する。このダイアログには、指定されたメッセージ（この場合は "Sure?"）が表示され、ユーザーは「OK」または「キャンセル」を選択できる。confirmメソッドは、ユーザーが「OK」を選択した場合は true を、キャンセルを選択した場合は false を返す。
    if (!confirm("Sure?")) {
      return;
    }
    // JavaScriptにおける配列のメソッドfilterを使用して、新しい配列を作成するためのコード
    // const newTodos: newTodosという名前の新しい定数を宣言する。この定数には、filterメソッドによって生成された新しい配列が格納される。
    // todos.filter(...): todosは元の配列で、filterメソッドを呼び出している。filterメソッドは、配列の各要素に対して指定された条件を評価し、その条件を満たす要素だけを含む新しい配列を返す。
    // (todo) => { ... }: これはアロー関数で、filterメソッドに渡されるコールバック関数。todoは、todos配列の各要素を表します。この関数内で、各todoが条件を満たすかどうかを判断している
    const newTodos = todos.filter((todo) => {
      // JavaScriptにおける条件式の一部で、todoオブジェクトのidプロパティが指定されたidと異なるかどうかを判断し、その結果を返すためのコード
      // todo.id: todoオブジェクトのidプロパティにアクセスします。このプロパティは、特定のTodoアイテムを一意に識別するための識別子。
      // !==: これは厳密な不等価演算子。左辺と右辺の値が異なる場合にtrueを返す。型も比較されるため、型が異なる場合もtrueになる。
      // id: これは、削除またはフィルタリングの対象となるTodoアイテムの識別子。この引数は、関数の引数として渡されることが一般的。
      // todoオブジェクトのidプロパティが指定されたidと異なるかどうかを判断し、その結果を返すための条件式
      return todo.id !== id;
    });
    // newTodosという配列を引数としてupdateTodosという関数を呼び出すコード
    // Todoリストの状態を更新するための関数を呼び出すコード
    updateTodos(newTodos);
  };
  // JavaScriptにおけるアロー関数の定義で、特定のTodoアイテムのチェックボックスの状態を変更するための処理を行う関数を宣言している
  // 特定のTodoアイテムのチェックボックスの状態を変更するためのアロー関数を定義するコード
  // const handleTodoCheckboxChange: handleTodoCheckboxChangeという名前の定数を宣言し、これにアロー関数を割り当てている。この関数は、Todoアイテムのチェックボックスの状態を変更するための処理を行う。
  // (id): この部分は、関数が1つの引数idを受け取ることを示している。idは、変更対象のTodoアイテムを一意に識別するための識別子。
  const handleTodoCheckboxChange = (id) => {
    // JavaScriptにおける配列のメソッドmapを使用して、新しい配列を作成するためのコード
    // const newTodos: newTodosという名前の新しい定数を宣言する。この定数には、mapメソッドによって生成された新しい配列が格納される。
    // todos.map(...): todosは元の配列で、mapメソッドを呼び出している。mapメソッドは、配列の各要素に対して指定された関数を実行し、その結果を新しい配列として返す。
    const newTodos = todos.map((todo) => {
      return {
        // JavaScriptにおけるオブジェクトリテラルの一部で、オブジェクトのプロパティを定義するための構文
        // id: これは、オブジェクトのプロパティ名。このプロパティは、オブジェクトが持つ識別子を表す。
        // todo.id: これは、todoオブジェクトのidプロパティにアクセスする。todoは、通常、配列の要素として渡されるオブジェクトで、そのidプロパティの値を新しいオブジェクトのidプロパティに割り当てる。
        // ,: カンマは、オブジェクトリテラル内で複数のプロパティを区切るために使用される
        id: todo.id,
        // JavaScriptにおけるオブジェクトリテラルの一部で、オブジェクトのプロパティを定義するための構文
        // title: これは、オブジェクトのプロパティ名。このプロパティは、オブジェクトが持つタイトルを表す
        // todo.title: これは、todoオブジェクトのtitleプロパティにアクセスしている。todoは、通常、配列の要素として渡されるオブジェクトで、そのtitleプロパティの値を新しいオブジェクトのtitleプロパティに割り当てる。
        // ,: カンマは、オブジェクトリテラル内で複数のプロパティを区切るために使用される
        title: todo.title,
        // JavaScriptにおける三項演算子（条件演算子）を使用して、isCompletedプロパティの値を条件に基づいて設定するためのコード
        // isCompleted: これは、オブジェクトのプロパティ名。このプロパティは、Todoアイテムが完了しているかどうかを示すブール値（trueまたはfalse）を持つ
        // todo.id === id: この部分は、todoオブジェクトのidプロパティが、指定されたidと一致するかどうかを比較している。この条件がtrueの場合、isCompletedプロパティの値が反転される。
        // ?: 三項演算子の条件部分を開始する。条件がtrueの場合、?の後に続く式が評価される。
        // !todo.isCompleted: 条件がtrueの場合、todo.isCompletedの値を反転させる。つまり、trueならfalseに、falseならtrueに変わる
        // :: 条件がfalseの場合、:の後に続く式が評価される
        // todo.isCompleted: 条件がfalseの場合、todo.isCompletedの値がそのまま使用される
        // ,: カンマは、オブジェクトリテラル内で複数のプロパティを区切るために使用される
        isCompleted: todo.id === id,
      };
    });
    // Todoアイテムのリストを更新するための関数呼び出し。この関数を使用することで、新しいTodoアイテムのリストを引数として渡し、既存のリストを更新することができる。これにより、アプリケーションの状態を管理し、ユーザーインターフェースを更新することが容易になる
    updateTodos(newTodos);
  };
  // 新しいTodoアイテムを追加するための関数を定義するためのコード
  // この関数は、引数としてtitleを受け取り、新しいTodoアイテムを作成して既存のリストに追加する処理を行う
  const handleAddFormSubmit = (title) => {
    // todos配列のコピーを作成するためのコード
    // スプレッド演算子（...）を使用することで、元の配列の要素を新しい配列に展開し、独立したコピーを作成することができる。これにより、元の配列を変更せずに、新しい配列を操作することができる。
    const newTodos = [...todos];
    // newTodos配列に新しいTodoアイテムを追加するためのコード
    // newTodos: これは、操作対象の配列の名前。この配列に新しい要素を追加する
    // .push(): これは、配列の末尾に新しい要素を追加するためのメソッド。pushメソッドは、配列の長さを1増やし、新しい要素を配列の最後に追加する。
    newTodos.push({
      // オブジェクトのidプロパティに現在のタイムスタンプを設定するためのコード
      // Date.now(): これは、JavaScriptのDateオブジェクトのメソッドで、現在の日時をミリ秒単位で返す
      id: Date.now(),
      // オブジェクトのtitleプロパティに、関数に渡されたtitle引数の値を設定するためのコード。これにより、新しいTodoアイテムのタイトルを、関数に渡された値に設定することができる
      title: title,
      // オブジェクトのisCompletedプロパティにfalseを設定するためのコード。これにより、新しいTodoアイテムの初期状態が「未完了」であることを示す
      isCompleted: false,
    });
    // Todoアイテムのリストを更新するための関数呼び出し
    updateTodos(newTodos);
  };
  // todos配列の各要素に対して処理を行い、新しい配列todoItemsを作成するためのコード
  // mapメソッドを使用することで、元の配列を変更せずに、新しい配列を作成することができる
  // const todoItems: これは、新しい配列を格納するための変数名。mapメソッドの結果がこの変数に代入される
  // todos: これは、操作対象の配列。この配列の各要素に対して処理を行う
  // .map(): これは、配列の各要素に対して指定された関数を実行し、その結果を新しい配列として返すメソッド。mapメソッドは、元の配列を変更せずに、新しい配列を作成する。
  // (todo) => {: これは、アロー関数の構文。todoは、mapメソッドが配列の各要素を処理する際に使用する引数。この関数は、各todo要素に対して実行される。
  const todoItems = todos.map((todo) => {
    // 関数から値を返すための構文
    return (
      // Todoという名前のReactコンポーネントを呼び出すための開始タグ
      <Todo
        // Reactコンポーネントのkeyプロパティに、現在のTodoアイテムの一意のIDを設定するためのコード。keyを使用することで、Reactは各要素を効率的に更新できる
        // key: これは、Reactがリスト内の各要素を一意に識別するために使用するプロパティ
        // =: これは、プロパティに値を代入するための演算子
        // {todo.id}: これは、JavaScriptの式を評価するための構文。todo.idは、現在のTodoアイテムの一意のIDを指定している
        key={todo.id}
        // Reactコンポーネントのtodoプロパティに、現在のTodoアイテムのデータを設定するためのコード。このプロパティを使用することで、Todoコンポーネントは、各Todoアイテムのデータにアクセスできるようになる
        todo={todo}
        // 、ReactコンポーネントのonDeleteClickプロパティに、削除ボタンがクリックされたときに実行される関数を設定するためのコード
        // onDeleteClick: これは、Todoコンポーネントに渡されるプロパティ名。このプロパティには、削除ボタンがクリックされたときに実行される関数が含まれている。
        // =: これは、プロパティに値を代入するための演算子。ここでは、onDeleteClickプロパティにhandleTodoDeleteClick関数の値を代入している
        // {handleTodoDeleteClick}: これは、JavaScriptの式を評価するための構文。handleTodoDeleteClickは、Todoアイテムを削除するための関数
        onDeleteClick={handleTodoDeleteClick}
        // ReactコンポーネントのonCheckboxChangeプロパティに、チェックボックスが変更されたときに実行される関数を設定するためのコード。このプロパティを使用することで、Todoコンポーネントは、チェックボックスが変更されたときにhandleTodoCheckboxChange関数を呼び出すことができる
        // onCheckboxChange: これは、Todoコンポーネントに渡されるプロパティ名。このプロパティには、チェックボックスが変更されたときに実行される関数が含まれる
        // =: これは、プロパティに値を代入するための演算子。ここでは、onCheckboxChangeプロパティにhandleTodoCheckboxChange関数の値を代入している。
        // {handleTodoCheckboxChange}: これは、JavaScriptの式を評価するための構文。handleTodoCheckboxChangeは、Todoアイテムの完了状態を変更するための関数。
        onCheckboxChange={handleTodoCheckboxChange}
      />
    );
  });
  // 関数から値を返すための構文
  return (
    // Reactのフラグメントを表す構文
    // フラグメントは、複数の要素をグループ化するために使用される。フラグメントを使用することで、余分なDOMノードを追加せずに、複数の要素をレンダリングすることができる。
    <>
      {/* HTMLの<div>要素で、className属性を使用してCSSクラスを指定している */}
      <div className="container">
        {/* ページやセクションの主要な見出しを示す要素 */}
        <h1>
          {/* アプリケーションの主要なタイトル */}
          Todos
          {/* Reactコンポーネント内で使用されるボタン要素で、ユーザーがクリックすることで特定のアクションを実行するためのもの */}
          {/* <button>は、ユーザーがクリックできるボタンを作成するためのHTML要素 */}
          {/* onClickは、ボタンがクリックされたときに実行されるイベントハンドラを指定するための属性 */}
          {/* handlePurgeClickは、ボタンがクリックされたときに実行される関数で、通常はTodoリストから完了したアイテムを削除するなどの処理を行う */}
          <button onClick={handlePurgeClick}>Purge</button>
        </h1>
        {/* Todoリストを表示するための無秩序リストを作成する要素 */}
        {/* id="todos"は、Todoリストを一意に識別するための属性であり、CSSスタイルの適用やJavaScriptでの操作を容易にする役割 */}
        {/* todoItemsは、Todoリストの各アイテムを表すReactコンポーネントの配列 */}
        <ul id="todos">{todoItems}</ul>
        {/* AddFormは、ユーザーが新しいTodoアイテムを追加するための入力フィールドとボタンを含むコンポーネント */}
        {/* onSubmitは、AddFormコンポーネントに渡されるプロパティ（props）で、フォームが送信されたときに実行される関数 */}
        {/* handleAddFormSubmitは、親コンポーネント（Appコンポーネントなど）で定義された関数で、入力されたTodoのタイトルを受け取り、新しいTodoアイテムをリストに追加する処理を行う */}
        <AddForm onSubmit={handleAddFormSubmit} />
      </div>
    </>
  );
}
// JavaScriptのモジュールシステムにおいて、Appコンポーネントをデフォルトエクスポートするための構文。この構文を使用することで、他のモジュールからAppコンポーネントをインポートして使用することができる
// export default App;
