const Dashboard = React.createClass({
  render: function() {
    return(
      <NavBar />
    )
  }
})

const NavBar = React.createClass({
  render: function() {
    return(
      <div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/owner/post">Find a Walker</a></li>
          <li><a href="/owner/logout">Logout</a></li>
        </ul>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
