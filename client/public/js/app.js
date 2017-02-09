const Dashboard = React.createClass({
  render: function() {
    return(
      <div>
        <a href="/owner/signup">Sign up as owner</a>
        <a href="/walker/signup">Sign up as walker</a><br />
        <a href="/walker/login">Login as walker</a>
        <a href="/owner/login">Login as owner</a>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
