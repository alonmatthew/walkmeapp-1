const Dashboard = React.createClass({
  getInitialState: function() {
    return{
      user: {
        local: {
          name: ''
        }
      },
      posts: []
    }
  },

  componentWillMount: function() {

    const statusRoute = '/walker/status'
    const postRoute = '/api/posts'
    // const sendSearch = fetch(postRoute, {credentials: 'same-origin'})
    const sendStatusSearch = fetch(statusRoute, {credentials: 'same-origin'})

    // fetch('/walker/status', {credentials: 'same-origin'}).then((data) => {
    //   data.json().then((jsonData) => {
    //     console.log(jsonData)
    //
    //   })
    // })

    var self = this

    function setPosts(data) {
      data.json().then((jsonData) => {
        // console.log(jsonData)
        self.setState({
          posts: jsonData.posts
        })
      })
    }

    function setUser(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          user: jsonData.user
        })
      })
    }

    sendStatusSearch.then(setUser)
    // sendSearch.then(setPosts)

  },

  render: function() {
    console.log(this.state.user)
    return(
      <div>
        <NavBar />
        <Info user={this.state.user} />
        <Posts posts={this.state.posts} />
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

const Info = React.createClass({
  render: function() {
    // console.log(this.props)
    const user = this.props.user.local
    return(
      <div>
        <h1>{user.name}s Info</h1><br />
        <h3>{user.name}</h3><br />
      </div>
    )
  }
})



ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
