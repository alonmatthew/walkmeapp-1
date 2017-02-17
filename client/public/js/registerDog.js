const Dashboard = React.createClass({
  render: function() {
    return(
      <div style={{'backgroundColor':'#ffffff', 'marginTop': '5em', 'paddingLeft': '3em', 'paddingRight': '3em', 'paddingTop': '3em', 'paddingBottom': '5em', 'borderRadius': '15px'}}>
        <Info />
        <DogForm />
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    return(
      <div style={{'marginBottom': '2em'}}>
        <h1 className="text-center">Register Your Pup!</h1>
      </div>
    )
  }
})


const DogForm = React.createClass({
  render: function() {
    return(
      <div>
        <form method="POST" action="/owner/pets">
          <label>Name: </label><input className="form-control" type="text" name="name" /><br />
          <label>Breed: </label><input className="form-control" type="text" name="breed"/><br />
          <label>Age: </label><input className="form-control" type="number" min="1" max="20" name="age"/><br />
          <button className="btn btn-primary" type="submit">Register</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('register')
)
