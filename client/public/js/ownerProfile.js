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
    const sendStatusSearch = fetch(statusRoute, {credentials: 'same-origin'})

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

    sendStatusSearch.then(setUser)
  },


  render: function() {
    return(
      <div>
      <Jumbotron user={this.state.user}/>
      <Notifications user={this.state.user} posts={this.state.user.posts}/>
        <Info user={this.state.user} />
      </div>
    )
  }
})

const Jumbotron = React.createClass({
  render: function(){
    const user = this.props.user.local
    return(
    <div className="jumbotron">
      <div className="container">
        <h1>{user.name}'s Dashboard</h1><br />
      </div>
    </div>
    )
  }
})

const Notifications = React.createClass({
  render: function() {
    const user = this.props.user
    const requestedMessage = this.props.posts.map((p) => {
      return (
        <div key={p._id}>
          {p.requested_by.length && (<p>"You have a new request!"</p>)}
        </div>
      )
    })

    return (
      <div>
        <h1>Notifications</h1>
        {requestedMessage}
      </div>
    )
  }
})

const Info = React.createClass({
  render: function() {
    // console.log(this.props.user)
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
