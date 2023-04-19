import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Select, List, Typography, Button } from "antd";
import {
  PoweroffOutlined,
  MinusSquareOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./index.scss";
import {
  assignTodo,
  getTodo,
  getUser,
  updateCompleted,
} from "../../redux/reducer";

export default function Todo() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.todo.users);
  const todos = useSelector((state) => state.todo.todos);
  const statusTodo = useSelector((state) => state.todo.statusTodo);
  const statusCompleted = useSelector((state) => state.todo.statusCompleted);
  const completed = useSelector((state) => state.todo.completed);

  const [data, setData] = useState([]);
  const [itemUser, setItemUser] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [numberCompleted, setNumberCompleted] = useState(0);
  const [check, setCheck] = useState("");
  const [check1, setCheck1] = useState("");
  const [idTodo, setIdTodo] = useState("");

  // cap nhat trang thai completed cua todos vao kho data
  useEffect(() => {
    if (completed !== check1 && todos.length > 0 && completed) {
      const filterData = data?.filter((dt) => dt.id !== completed.userId);
      setData([...filterData, { id: completed.userId, datas: todos }]);
      setCheck1(completed);
    }
  }, [completed, data, todos]);

  //get todos
  useEffect(() => {
    if (completed) {
      dispatch(assignTodo(todos));
    }
  }, [completed, dispatch]);

  //get users
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // render user ra ngoai
  useEffect(() => {
    if (users) {
      users?.forEach((user) => {
        setItemUser((item) => [...item, { value: user.id, label: user.name }]);
      });
    }
  }, [users]);

  //luu todos vao kho luu tru
  useEffect(() => {
    const find = data.find((dt) => dt.id === idUser);
    if (!find && todos.length > 0 && todos !== check) {
      setData((data) => [...data, { id: idUser, datas: todos }]);
      setCheck(todos);
    }
  }, [todos, idUser, data]);

  // dem cac viec hoan thanh
  useEffect(() => {
    if (todos) {
      const filter = todos.filter((todo) => todo.completed === true);
      setNumberCompleted(filter.length);
    }
  }, [todos]);

  // get todolist
  const handleSubmit = (id) => {
    const find = data.find((dt) => dt.id === id);
    if (find) {
      dispatch(assignTodo(find.datas));
    } else {
      setIdUser(id);
      dispatch(getTodo(id));
    }
  };

  return (
    <div className="container">
      <div>
        <Divider
          orientation="left"
          orientationMargin="0"
          className="container-text"
        >
          User
        </Divider>
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder=""
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          options={itemUser}
          onChange={(e) => handleSubmit(e)}
        />
        <Divider
          orientation="left"
          orientationMargin="0"
          className="container-text"
        >
          Tasks
        </Divider>
        <div>
          <List
            style={{ height: "500px", overflow: "auto" }}
            loading={statusTodo ? true : false}
            bordered
            dataSource={todos}
            renderItem={(item) => (
              <List.Item>
                <div>
                  {!item.completed ? (
                    <MinusSquareOutlined style={{ color: "orange" }} />
                  ) : (
                    <CheckCircleOutlined style={{ color: "#25d425" }} />
                  )}{" "}
                  {item.title}
                </div>
                {!item.completed && (
                  <Button
                    size="small"
                    onClick={() => {
                      dispatch(assignTodo(todos));
                      dispatch(updateCompleted({ id: item.id }));
                      setIdTodo(item.id);
                    }}
                    loading={
                      statusCompleted && idTodo === item.id ? true : false
                    }
                  >
                    Mark done
                  </Button>
                )}
              </List.Item>
            )}
          />
        </div>
        <div style={{ marginTop: "12px", fontSize: "0.9rem" }}>
          Done {numberCompleted}/{todos.length} tasks
        </div>
      </div>
    </div>
  );
}
