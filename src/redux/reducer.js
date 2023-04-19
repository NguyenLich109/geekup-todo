import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
  users: [],
  todos: [],
  completed: {},
  statusCompleted: false,
  statusTodo: false,
};

export const getUser = createAsyncThunk("todo/getUser", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
});

export const getTodo = createAsyncThunk("todo/getTodo", async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}/todos`
  );
  data.sort((a, b) => {
    if (a.completed === false && b.completed === true) {
      return -1;
    }
  });
  return data;
});

export const assignTodo = createAsyncThunk("todo/assignTodo", async (data) => {
  const filterFalse = data.filter((dt) => dt.completed === false);
  const filterTrue = data.filter((dt) => dt.completed === true);
  const retult = filterFalse.concat(filterTrue);
  return retult;
});

export const updateCompleted = createAsyncThunk(
  "todo/update",
  async ({ id }) => {
    const { data } = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed: true }
    );

    return { data };
  }
);

const reducer = createReducer(initalState, (builder) => {
  builder.addCase(getUser.fulfilled, (state, action) => {
    state.users = action.payload;
  });
  builder.addCase(getTodo.pending, (state, action) => {
    state.statusTodo = true;
  });
  builder.addCase(getTodo.fulfilled, (state, action) => {
    state.todos = action.payload;
    state.statusTodo = false;
  });
  builder.addCase(assignTodo.fulfilled, (state, action) => {
    state.todos = action.payload;
  });
  builder.addCase(updateCompleted.pending, (state, action) => {
    state.statusCompleted = true;
  });
  builder.addCase(updateCompleted.fulfilled, (state, action) => {
    const findIndex = state.todos.findIndex(
      (todo) => todo.id === action.payload.data.id
    );
    state.statusCompleted = false;
    state.completed = action.payload.data;
    state.todos[findIndex].completed = true;
  });
});

export default reducer;
