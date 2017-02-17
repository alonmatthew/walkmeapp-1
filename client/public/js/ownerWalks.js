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
      <div className="container">
      <PostList user={this.state.user} />
      <UserPostsList user={this.state.user} />
      </div>
    )
  }
})

const UserPostsList = React.createClass({

  render: function() {
    const userPosts = this.props.user.posts.map((p) => {
      return(<div key={p._id}>
                <h3>{p.dog.name}</h3>
                <p>{p.content}</p>
                <p>{p.date}</p>
                <UserPosts key={p._id} user={this.props.user} post={p}/>
              </div>)
    })
    return (
      <div className="col-md-6">
        <h1>Your Posts</h1>
        {userPosts}
      </div>
    )
  }
})

const UserPosts = React.createClass({
  handleDelete: function(p, evt) {
    evt.preventDefault()
    const post = this.props.post
    return (
      fetch('/owner/post/' + post._id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:'DELETE',
        body: { p }
      }).then((res) => res.json()
          .then((jsonData) => {
            console.log(jsonData)
          }))
    )
  },

  render: function() {
    const userPosts = this.props.user.posts.map((p) => {
      return(<div key={p._id}></div>)
    })
    return (
      <div>
        {userPosts}
        <button className="btn btn-default" onClick={this.handleDelete}>Delete</button>
      </div>
    )
  }
})

const Requests = React.createClass({
  handleClick: function(p, evt){
    evt.preventDefault()
    const posts = this.props.user.posts.map((p) => {
      return p.requested_by.map((w) => {
      return(
        fetch('/owner/post/' + p._id, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'PATCH',
          body: JSON.stringify( { accepted: true, walker: w } )
        }).then((res) => res.json()
            .then((jsonData) => {
              console.log(jsonData.accepted)
            }))
      )
    })
  })
  },

  render: function() {
    const post = this.props.post
    const requests = post.requested_by.map((w) => {
      return (<div key={w._id}>
              <p>requested by: {w.local.name}
              <button className="btn btn-default" onClick={this.handleClick}>Accept</button></p>
            </div>)
    })

    return (
      <div>
        {requests}
      </div>
    )
  }
})

const PostList = React.createClass({
  render: function() {
    const posts = this.props.user.posts.map((p) => {
      return(
          <h4 key={p._id}>
            {p.dog.name}
            {p.date}
            {p.requested_by.length ?
              ( <div>
                  <Requests user={this.props.user} post={p}/>
                </div> ) :
              ( <p>Finding a walker...</p> )
            }
          </h4>
      )
    })

    return(
      <div className="col-md-6">
        {posts}
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
