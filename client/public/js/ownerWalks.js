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
        <UserPostsList user={this.state.user} />
        <PostList user={this.state.user} />
      </div>
    )
  }
})

const UserPostsList = React.createClass({

  render: function() {
    const userPosts = this.props.user.posts.map((p) => {
      return(<div key={p._id}>
                <h4>{p.dog.name}</h4>
                <p>{p.content}</p>
                <p>{p.date}</p>
                <UserPosts key={p._id} user={this.props.user} post={p}/>
              </div>)
    })
    return (
      <div>
        <h1 className="text-center">Your Posts</h1>
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
        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
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
              <p>requested by: {w.local.fName}
              <button className="btn btn-default" onClick={this.handleClick}>Accept</button>
              <button className="btn btn-danger">Decline</button></p>
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
          <div key={p._id}>
          <h4>{p.dog.name}</h4>
            <p>{p.content}</p>
            <p>{p.date}</p>
            {p.requested_by.length ?
              ( <div>
                  <Requests user={this.props.user} post={p}/>
                </div> ) :
              ( <p>Finding a walker...</p> )
            }
        </div>
      )
    })

    return(
      <div>
        <h1 className="text-center">Your Requests</h1>
        {posts}
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
