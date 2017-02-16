const Dashboard = React.createClass({
  render: function() {
    return(
      <div>
        <Info />
        <OwnerForm />
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    return(
      <div>
        <h1 className="text-center">Let your community help you!</h1>
      </div>
    )
  }
})

const OwnerForm = React.createClass({
  render: function() {
    return(
        <form method="POST" action="/owner/signup">
          <div className="form-group" >
            <label>Full Name: </label>
            <input className="form-control" type="text" name="name"/>
          </div>
          <div className="form-group" >
            <label>Address: </label>
            <input className="form-control" type="text" name="address"/>
          </div>
          <div className="form-group" >
            <label>Street Address: </label>
            <input className="form-control" type="password" name="password"/>
          </div>
          <button className="btn btn-primary" type="submit">Sign In</button>
        </form>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('signIn')
)
