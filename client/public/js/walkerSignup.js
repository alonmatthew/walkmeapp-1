const Dashboard = React.createClass({
  render: function() {
    return(
      <WalkerForm />
    )
  }
})

const WalkerForm = React.createClass({
  render: function() {
    return(
      <div>
        <form method="POST" action="/walker/signup">
          Full Name: <input type="text" name="name"/><br />
          Street Address: <input type="text" name="address" /><br />
          Password: <input type="password" name="password"/><br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
