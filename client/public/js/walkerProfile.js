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
    const sendSearch = fetch(postRoute, {credentials: 'same-origin'})
    const sendStatusSearch = fetch(statusRoute, {credentials: 'same-origin'})

    var self = this

    function setPosts(data) {
      data.json().then((jsonData) => {
        // console.log(jsonData.posts)
        console.log(jsonData)
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
    sendSearch.then(setPosts)

  },

  render: function() {
    // console.log(this.state.user)
    return(
      <div>
        <Notifications posts={this.state.posts} user={this.state.user}/>
        <PostList posts={this.state.posts} user={this.state.user}/>
      </div>
    )
  }
})

// const NavBar = React.createClass({
//   render: function() {
//     return(
//       <div>
//         <ul>
//           <li><a href="/">Home</a></li>
//           <li><a href="/walker/logout">Logout</a></li>
//         </ul>
//       </div>
//     )
//   }
// })

const PostList = React.createClass({
  handleRequest: function(p) {
    const posts = this.props.posts.map((p) => {
      const user = this.props.user
      return(
        fetch('/walker/post/' + p._id, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'PATCH',
          body: JSON.stringify( { requested_by: user } )
        }).then((res) => res.json()
            .then((jsonData) => {
              // console.log(jsonData.requested_by)
            }))
      )
  })
},

  render: function() {
    const feed = this.props.posts
    const posts = this.props.posts.map((p) => {
      return(
        <div key={p._id}>
        <h1>Available Walks</h1>
        {p.walker && (<p></p>) }
        {!p.walker && (
          <li>
          <a href={'/walker/post/' + p._id}>{p.dog.name} {p.date}</a><br/>
          Owner: {p.owner.local.name}<br/>
          {p.content}<br/>
          <button onClick={this.handleRequest}>Request</button>
          </li>
        )}
        </div>
      )
    })
    return(
      <ul>{posts}</ul>
    )
  }
})

const Notifications = React.createClass({

  render: function() {
    const user = this.props.user
    const acceptedMessage = this.props.posts.map((p) => {
      return (
        <div key={p._id}>
          {p.walker === user._id && (<p>"You've been accepted for a walk!"</p>)}
        </div>
      )
    })

      return (
        <div>
          <h1>Notifications</h1>
          {acceptedMessage}
        </div>
      )
  }
})

const Info = React.createClass({
  render: function() {
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
