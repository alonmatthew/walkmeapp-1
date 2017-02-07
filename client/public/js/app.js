const Dashboard = React.createClass({
  render: function() {
    return(
      <div>
        <a href="/owner/signup">Sign up as owner</a>
        <a href="/walker/signup">Sign up as walker</a>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
