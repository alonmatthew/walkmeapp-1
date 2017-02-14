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

  // showInfo: function() {
  //
  // },

  componentWillMount: function() {

    const statusRoute = '/walker/status'
    const postRoute = '/api/posts'
    const sendSearch = fetch(postRoute, {credentials: 'same-origin'})
    const sendStatusSearch = fetch(statusRoute, {credentials: 'same-origin'})

    fetch('/walker/status', {credentials: 'same-origin'}).then((data) => {
      data.json().then((jsonData) => {
        console.log(jsonData)

      })
    })

    var self = this

    function setPosts(data) {
      data.json().then((jsonData) => {
        console.log(jsonData.posts)
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
    console.log(this.state.user)
    return(
      <div>
        <NavBar />
        <Info user={this.state.user} />
        <PostList posts={this.state.posts} />
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

const PostList = React.createClass({
  // showPost: function(evt){
  //   evt.preventDefault
  //   this.props.showInfo
  // },

  handleClick: function(p) {
    console.log("request button clicked");
    const posts = this.props.posts.map((p) => {
      console.log('this is line 90');
      console.log(p._id)
      return(
        fetch('/walker/post/' + p._id}, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method:'PATCH',
          body: JSON.stringify( { requested: true } )
        }).then((res) => res.json()
            .then((jsonData) => {
              console.log(jsonData.requested)
            }))
      )
  })
},

  render: function() {
    var posts = this.props.posts.map((p) => {
      console.log(p._id)
      return(
        <li key={p._id}>
        <a href={'/walker/post/' + p._id}>{p.content} {p.date}</a>
        <button onClick={this.handleClick}>Request</button>
          <a href={'/walker/post/' + p._id}>
            {p.dog.name}<br/>
            {p.dog.breed}<br/>
            {p.dog.age}<br/>
            {p.owner.local.name}<br/>
            {p.date}<br/>
            {p.content}<br/>
          </a>
        </li>
      )
    })
    return(
      <ul>{posts}</ul>
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
