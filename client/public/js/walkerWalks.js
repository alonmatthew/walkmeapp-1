const Dashboard = React.createClass({
  getInitialState: function() {
    return{
      user: {
        posts: []
      }
    }
  },

  componentWillMount: function() {
    const statusRoute = '/walker/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})

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
      <div className="">
        <Post user={this.state.user} />
      </div>
    )
  }
})

const Post = React.createClass({
  render: function() {
    const posts = this.props.user.posts.map((p) => {
      return <div key={p._id}>
              <h4>
              {p.dog.name}<br/>
              {p.date}<br/>
              {p.owner.local.address}
              </h4>
            </div>

    })
    return (
      <div>
        <h1 className="text-center">Scheduled Walks</h1>
        {posts}
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
