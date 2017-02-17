const Dashboard = React.createClass({
  render: function() {
    return(
      <div style={{'backgroundColor':'#ffffff', 'marginTop': '5em', 'paddingLeft': '3em', 'paddingRight': '3em', 'paddingTop': '3em', 'paddingBottom': '5em', 'borderRadius': '15px'}}>
        <Info />
        <WalkerForm />
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    return(
      <div style={{'marginBottom': '2em'}}>
        <h1 className="text-center">Help your community of pups!</h1>
      </div>
    )
  }
})

const WalkerForm = React.createClass({
  render: function() {
    return(
        <form method="POST" action="/walker/signup">
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
