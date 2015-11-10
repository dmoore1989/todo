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
    return (<TodoListItem key={todo.id} todo={todo}/>);
  },

  todosChanged: function () {
      this.setState({ list: TodoStore.all() });
  },

  render: function  () {
    return (
      <div>
        { (this.state.list.map(this.listTitles)) }
      </div>
    );
  }
});

var TodoListItem = React.createClass({
  render: function() {
    return (
      <div>
        <div>{this.props.todo.title}</div>
        <div>{this.props.todo.body}</div>
      </div>
    );
  }
});
