const Dashboard = React.createClass({

  getInitialState: function() {
    return{
      posts: []
    }
  },

  componentWillMount: function() {

    const postRoute = '/api/posts'
    const sendSearch = fetch(postRoute, {credentials: 'same-origin'})

    var self = this

    function setPosts(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          posts: jsonData.posts
        })
      })
    }

    sendSearch.then(setPosts)

  },

  render: function() {
    return(
      <NavBar />,
      <Posts posts={this.state.posts} />
    )
  }
})

const NavBar = React.createClass({
  render: function() {
    return(
      <div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/walker/logout">Logout</a></li>
        </ul>
      </div>
    )
  }
})

const Posts = React.createClass({
  render: function() {
    var posts = this.props.posts.map((p) => {
      return(
        <li key={p._id}>{p.content}</li>
      )
    })
    return(
      <ul>{posts}</ul>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
