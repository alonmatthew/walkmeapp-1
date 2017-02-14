const Dashboard = React.createClass({
  getInitialState: function() {
    return{
      user: {
        posts: []
      }
    }
  },

  componentWillMount: function() {
    const statusRoute = '/owner/status'
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
      <Post user={this.state.user} />
    )
  }
})

const Post = React.createClass({
  render: function() {
    const posts = this.props.user.posts.map((p) => {
      return(
        <li key={p._id}>{p.content}</li>
      )
    })
    return(
      <div>
        <ul>{posts}</ul>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
