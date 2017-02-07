const Dashboard = React.createClass({
  render: function() {
    return(
      <OwnerForm />
    )
  }
})

const OwnerForm = React.createClass({
  render: function() {
    return(
      <div>
        <form>
          First Name: <input type="text" /><br />
          Last Name: <input type="text" /><br />
          Password: <input type="password" />
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
