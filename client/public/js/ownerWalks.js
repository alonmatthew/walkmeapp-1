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
  handleClick: function(p){
    console.log("accept button clicked")
    const posts = this.props.user.posts.map((p) => {
      console.log('this is line 40');
      console.log(p._id)
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
    const posts = this.props.user.posts.map((p) => {
      return(
        <li key={p._id}><a href={'/owner/walk/' + p._id}>
      {p.content}</a><button onClick={this.handleClick}>Accept</button></li>
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
