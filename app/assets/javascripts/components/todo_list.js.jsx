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
        < TodoForm />
      </div>
    );
  }
});

var TodoListItem = React.createClass({
  handleDestroy: function(e){
    TodoStore.destroy(this.props.todo.id);
  },

  render: function() {
    return (
      <div>
        <div>{this.props.todo.title}</div>
        <div>{this.props.todo.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function () {
    return { title: "", body: ""};
  },

  updateBody: function (e) {
    this.setState({body: e.currentTarget.value});
  },

  updateTitle: function (e) {
    this.setState({title: e.currentTarget.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    TodoStore.create({title: this.state.title, body: this.state.body, done: false});
    this.setState({body: "", title: ""});
    // debugger
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.updateTitle} value={this.state.title}/>
        <input onChange={this.updateBody} value={this.state.body}/>
        <button>Submit</button>
      </form>
    );
  }
});
