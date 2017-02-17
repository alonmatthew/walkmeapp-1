const Dashboard = React.createClass({
  render: function() {
    return(
      <div style={{'backgroundColor':'#ffffff', 'marginTop': '5em', 'paddingLeft': '3em', 'paddingRight': '3em', 'paddingTop': '3em', 'paddingBottom': '5em', 'borderRadius': '15px'}}>
        <Info />
        <LoginForm />
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    return(
      <div style={{'marginBottom': '2em'}}>
        <h3 className="text-center">Let your community help you!</h3>
      </div>
    )
  }
})

const LoginForm = React.createClass({
  render: function() {
    return(
        <form method="POST" action="/owner/login">
          <div className="form-group" >
            <label>Full Name: </label>
            <input className="form-control" type="text" name="name"/>
          </div>
          <div className="form-group" >
            <label>Password: </label>
            <input className="form-control" type="password" name="password"/>
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('login')
)
