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
        console.log(jsonData.user)
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
        <Jumbotron user={this.state.user}/>
        <Notifications posts={this.state.posts} user={this.state.user}/>
        <PostList posts={this.state.posts} user={this.state.user}/>
        <Map />
      </div>
    )
  }
})

const Jumbotron = React.createClass({
  render: function(){
    const user = this.props.user.local
    return(
    <div className="jumbotron" style={{'backgroundColor': '#ffffff','marginTop': '1em','marginBottom': '1em'}}>
      <div className="container">
        <h1 className="text-center">{user.name}'s Dashboard</h1><br />
      </div>
    </div>
    )
  }
})


const PostList = React.createClass({
  onRequest: function(p){
    const user = this.props.user
    fetch('/walker/post/' + p._id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'PATCH',
      body: JSON.stringify({user_id: user._id})
    }).then((res) => res.json()
        .then((jsonData) => {
          console.log(jsonData.requested_by)
        }))
  },

  render: function(){
    const posts = this.props.posts.map((p) => {
      return (<Post key={p._id} post={p} onRequest={this.onRequest} />)

    })

    return(
      <div style={{'backgroundColor':'#ffffff', 'padding': '1em', 'marginBottom': '1em'}}>
        <h1 className="text-center">Available Walks</h1>
        <ul>{posts}</ul>
      </div>
    )
  }

})

const Post = React.createClass({
  getInitialState : function() {
      return { showMe : false }
  },

  handleClick: function(p) {
    this.props.onRequest(this.props.post)
    this.setState({ showMe : true} )
  },

  render: function() {
    // const feed = this.props.posts
    // const posts = this.props.posts.map((p) => {
      const p = this.props.post
      return(
        <div key={p._id}>
        {p.walker && (<div></div>) }
        {!p.walker && (
          <li>
          <a href={'/walker/post/' + p._id}>{p.dog.name} {p.date}</a>
          Owner: {p.owner.local.name}
          {p.content}<br/>
          { this.state.showMe ?
            (<p style={{'color':'#003300'}}>Request Made!</p>) :
              (<button onClick={this.handleClick}>Request</button>)
          }
          </li>
          )}
        </div>
      )
    // })
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
        <div className="" style={{'backgroundColor':'#ffffff', 'padding': '1em', 'marginBottom': '1em'}}>
          <h1 className="text-center">Notifications</h1>
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

const Map = React.createClass({

  getInitialState: function() {
    return {
      map: {},
      map_marker: {},
      lat: null,
      lng: null,
      lineCoordinatesArray: []
    }
  },


  initializeMap: function() {
    var self = this
    console.log("Google Maps Initialized")
    console.log(self.state.lat, self.state.lng)
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: {lat: self.state.lat, lng : self.state.lng, alt: 0}
    });

    var map_marker = new google.maps.Marker({position: {lat: self.state.lat, lng: self.state.lng}, map: map});
    map_marker.setMap(map);
  },

componentDidMount: function() {

  var coords = {}
  // sets your location as default
  if (navigator.geolocation) {
    console.log(this)
      navigator.geolocation.getCurrentPosition((position) => {


        this.setState({
          lat: position.coords["latitude"],
          lng: position.coords["longitude"]
        }, () => this.initializeMap())
        return;

      },
      (error) => {
        console.log("Error: ", error)
      },
      {enableHighAccuracy: true}
    );
  }





  // moves the marker and center of map
  function redraw() {
    map.setCenter({lat: lat, lng : lng, alt: 0})
    map_marker.setPosition({lat: lat, lng : lng, alt: 0})
    pushCoordToArray(lat, lng)

    var lineCoordinatesPath = new google.maps.Polyline({
      path: lineCoordinatesArray,
      geodesic: true,
      strokeColor: '#2E10FF',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    lineCoordinatesPath.setMap(map)
  }

},

  render: function() {

    return(
    <div id='map' style={{'backgroundColor':'#ffffff', 'padding': '1em', 'marginBottom': '1em'}}>
    <h1 className="text-center">Find Nearby Walks</h1>
      <div id='map-canvas' style={{'height':'300px', 'width': '100%', 'paddingRight': '1em' }}></div>
    </div>
    )
  }


})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
