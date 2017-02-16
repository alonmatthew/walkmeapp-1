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
    const requests = this.props.user.posts.map((p) => {
      return p.requested_by.map((w) => {
        return <p key={w._id}>
                requested by: {w.local.name}
                <button onClick={this.handleClick}>Accept</button>
              </p>
      })
    })

    return (
      <div>
        {requests}
      </div>
    )
  }
})

const Post = React.createClass({
  render: function() {
    const posts = this.props.user.posts.map((p) => {
      return(
          <h4 key={p._id}>
            {p.dog.name}
            {p.date}
            {p.requested_by ?
              ( <div>
                  <Walker user={this.props.user}/>
                </div> ) :
              ( <p>Finding a walker...</p> )
            }
          </h4>
      )
    })

    return(
      <div>
        {posts}
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
