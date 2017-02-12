const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      user: {
        local: {
          name: ''
        },
        dogs: [],
        posts: []
      }
    }
  },

  componentWillMount: function() {

    const statusRoute = '/owner/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})

    // console.log(sendSearch)

    var self = this

    function setUser(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          user: jsonData.user
        })
      })
    }


    sendSearch.then(setUser)

  },


  render: function() {
    return(
      <div>
        <NavBar />
        <Info user={this.state.user} />
      </div>
    )
  }
})

const NavBar = React.createClass({
  render: function() {
    return(
      <div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/owner/logout">Logout</a></li>
        </ul>
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    console.log(this.props)
    const user = this.props.user.local
    const dogs = this.props.user.dogs.map((d) => {
      return(
        <li key={d._id}>{d.name} <br/> Breed: {d.breed} <br/> Age: {d.age}</li>
      )
    })
    return(
      <div>
        <a href="/owner/post">Request a Walk</a><br/>
        <h1>{user.name}s Dashboard</h1><br />
        <h3>{user.name}</h3><br />
        <h1>Your Pets</h1>
        <ul>{dogs}</ul>
        <a href="/owner/pets">Register your dog</a>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
