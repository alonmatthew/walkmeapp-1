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

const Walker = React.createClass({
  render: function() {
    console.log("rendering walker component")
    console.log(this.props.user)
    const posts = this.props.user.posts.map((p) => {
      return (
      p.requested_by.map((w) => {
        console.log(w.local.name)
        return (
            <p key={w._id}>requested by: {w.local.name}</p>
        )
      })
      )
    })
    return (
      <div>{posts}</div>
    )
  }
})

const Post = React.createClass({
  handleClick: function(p){
    // console.log("accept button clicked")
    const posts = this.props.user.posts.map((p) => {
      // console.log('this is line 40');
      // console.log(p._id)
      return(
        fetch('/owner/post/' + p._id, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'PATCH',
          body: JSON.stringify( { accepted: true } )
        }).then((res) => res.json()
            .then((jsonData) => {
              console.log(jsonData.accepted)
            }))
      )
  })
  },

  render: function() {
    const user = this.props.user
    const posts = this.props.user.posts.map((p) => {
      return(
          <li key={p._id}>
            <a href={'/owner/walk/' + p._id}>{p.content}</a>
            {p.requested_by ?
              ( <div>
                  <button onClick={this.handleClick}>Accept</button>
                  <Walker user={user}/>
                </div> ) :
              ( <p>Finding a walker...</p> )
            }
          </li>
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
