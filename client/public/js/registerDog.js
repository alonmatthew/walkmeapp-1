const Dashboard = React.createClass({
  render: function() {
    return(
      <DogForm />
    )
  }
})

const DogForm = React.createClass({
  render: function() {
    return(
      <div>
        <form method="POST" action="/owner/pets">
          Name: <input type="text" name="name"/><br />
          Breed : <input type="text" name="breed"/><br />
          Age: <input type="number" min="1" max="20" name="age"/><br />
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
