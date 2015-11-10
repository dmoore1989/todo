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
  getInitialState: function(){
    return {visible: false};
  },

  revealBody: function () {
    this.setState({visible: !(this.state.visible)});
  },

  render: function() {
    if (this.state.visible) {
      return (
        <div>
          <div onClick={this.revealBody}>{this.props.todo.title}</div>
          < TodoDetailView todo={this.props.todo}/>
          < DoneButton todo={this.props.todo} />
        </div>
      );
    } else { return (
      <div>
        <div onClick={this.revealBody}>{this.props.todo.title}</div>
        < DoneButton todo={this.props.todo} />
      </div>);
    }
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

var DoneButton = React.createClass({

  handleDone: function () {
    TodoStore.toggleDone(this.props.todo.id);
  },

  generateButtonText: function () {
    var text = (this.props.todo.done) ? "Undo" : "Done";
    return text;
  },

  render: function () {
    return (
      <button onClick={this.handleDone}>{this.generateButtonText()}</button>
    );
  }
});

var TodoDetailView = React.createClass({

  handleDestroy: function(e){
    TodoStore.destroy(this.props.todo.id);
  },

  render: function(){
    return (
      <div>
        <div>{this.props.todo.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }
});

var TodoSteps = React.createClass({
  
  render: function () {
    return(
      <ul>
        <li></li>
      </ul>
    );
  }
});
