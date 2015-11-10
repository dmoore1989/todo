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
        < TodoSteps todo={this.props.todo} />
        <button onClick={this.handleDestroy}>Delete</button>
      </div>
    );
  }
});

var TodoSteps = React.createClass({
  getInitialState: function() {
    return ({steps: []});
  },

  componentDidMount: function(){
    StepStore.addChangedHandler(this.stepsChanged);
    StepStore.fetch(this.props.todo.id);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.stepsChanged);
  },

  stepsChanged: function () {
    this.setState({ steps: StepStore.all(this.props.todo.id) });
  },

  renderSteps: function(){
    return this.state.steps.map(function(step){
      return (<li>{step.step}</li>);
    });
  },

  render: function () {
    return(
      <div>
        <ul>
         {this.state.steps.map(function(step){
          return (<li>
            {step.step}
            < StepDeleteButton step={step}/>
            < StepToggleButton step={step}/>
            </li>);
        }.bind(this))
        }
        </ul>
        < StepForm todo={this.props.todo} />
      </div>
    );
  }
});

var StepForm = React.createClass({
  getInitialState: function () {
    return { step: ""};
  },


  updateStep: function (e) {
    this.setState({step: e.currentTarget.value});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    StepStore.create({step: this.state.step, todo_id: this.props.todo.id, done: false});
    this.setState({step: ""});
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.updateStep} value={this.state.step}/>
        <button>Submit</button>
      </form>
    );
  }
});

var StepDeleteButton = React.createClass({
  handleDestroy: function (e) {
    StepStore.destroy(this.props.step);
  },

  render: function () {
    return <button onClick={this.handleDestroy}>Delete</button>;
  }
});

var StepToggleButton = React.createClass({
  getInitialState: function () {
    return {done: this.props.step.done};
  },

  handleToggle: function (e) {
    StepStore.toggleDone(this.props.step);
    this.setState({done: !(this.state.done)});
  },

  stepDone: function(){
    return (this.state.done) ? "Undo" : "Done";
  },

  render: function () {
    return <button onClick={this.handleToggle}>{this.stepDone()}</button>;
  }
});
