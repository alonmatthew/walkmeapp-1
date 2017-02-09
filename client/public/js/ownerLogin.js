const Dashboard = React.createClass({
  render: function() {
    return(
      <LoginForm />
    )
  }
})

const LoginForm = React.createClass({
  render: function() {
    return(
      <div>
        <form method="POST" action="/owner/login">
          Full Name: <input type="text" name="name"/><br />
          Password: <input type="password" name="password"/><br />
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
