const Dashboard = React.createClass({
  render: function() {
    return(
      <div style={{'backgroundColor':'#ffffff', 'marginTop': '5em', 'paddingLeft': '3em', 'paddingRight': '3em', 'paddingTop': '3em', 'paddingBottom': '5em', 'borderRadius': '15px'}}>
        <Info />
        <OwnerForm />
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    return(
      <div style={{'marginBottom': '2em'}}>
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
            <label>First Name: </label>
            <input className="form-control" type="text" name="fName"/>
          </div>
          <div className="form-group" >
            <label>Last Name: </label>
            <input className="form-control" type="text" name="lName"/>
          </div>
          <div className="form-group" >
            <label>Email: </label>
            <input className="form-control" type="text" name="email"/>
          </div>
          <div className="form-group" >
            <label>Birthday: </label>
            <input className="form-control" type="text" name="birthday"/>
          </div>
          <div className="form-group" >
            <label>Phone Number: </label>
            <input className="form-control" type="text" name="phoneNumber"/>
          </div>
          <div className="form-group" >
            <label>Address 1: </label>
            <input className="form-control" type="text" name="address1"/>
          </div>
          <div className="form-group" >
            <label>Address 2: </label>
            <input className="form-control" type="text" name="address2"/>
          </div>
          <div className="form-group" >
            <label>City: </label>
            <input className="form-control" type="text" name="city"/>
          </div>
          <div className="form-group" >
            <label>State: </label>
            <input className="form-control" type="text" name="state"/>
          </div>
          <div className="form-group" >
            <label>Zip Code: </label>
            <input className="form-control" type="text" name="zip"/>
          </div>
          <div className="form-group" >
            <label>Password: </label>
            <input className="form-control" type="password" name="password"/>
          </div>
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('signIn')
)
