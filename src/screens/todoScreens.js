import Header from "../component/header/header";
import Todo from "../component/todo/todo";

export default function TodoScreens() {
  return (
    <>
      <div className="app-todo">
        <Header />
        <Todo />
      </div>
    </>
  );
}
