var TodoList = React.createClass({
  getInitialState: function () {
    return { list: TodoStore.all() };
  },

  componentDidMount: function(){
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  listTitles: function (todo) {
    return <li key={todo.id}>{todo.title}</li>;
  },

  todosChanged: function () {
      this.setState({ list: TodoStore.all() });
  },

  render: function  () {
    return (
      <ul>
        { (this.state.list.map(this.listTitles)) }
      </ul>
    );
  }
});
