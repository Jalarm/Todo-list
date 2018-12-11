import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-app-form";

export default class App extends Component {
  maxID = 1;
  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    term: "",
    filter: "all"
  };
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxID++
    };
  }
  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray
      };
    });
  };
  addItem = text => {
    const newItems = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItems];
      return {
        todoData: newArray
      };
    });
  };
  togleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id),
      oldItem = arr[idx];
    const newItems = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItems, ...arr.slice(idx + 1)];
  }
  onTogleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.togleProperty(todoData, id, "important")
      };
    });
    console.log(id, "important");
  };
  onTogleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.togleProperty(todoData, id, "done")
      };
    });
    console.log(id, "Done");
  };
  onChangeSearch = term => {
    this.setState({ term });
  };
  onFilterChange = filter => {
    this.setState({ filter });
  };
  search = (items, tern) => {
    if (tern === 0) {
      return;
      items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(tern.toLowerCase()) > -1;
    });
  };
  filter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  };
  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onChangeSearch={this.onChangeSearch} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onTogleImportant={this.onTogleImportant}
          onTogleDone={this.onTogleDone}
          onChangeSearch={this.onChangeSearch}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
