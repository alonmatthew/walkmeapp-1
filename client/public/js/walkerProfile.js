var testCoords = [
  {lat:34.0071634,lng:-118.49089},
  {lat:34.007234,lng:-118.5238122},
  {lat:34.0010124,lng:-118.487983},
  {lat:34.0129709,lng:-118.4974042},
]

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
            {p.dog.name}<br/>
          {p.dog.breed}<br/>
            {p.date}<br/>
            Owner: {p.owner.local.name}<br/>
            Note: {p.content}<br/>
          { this.state.showMe ?
            (<p style={{'color':'#003300'}}>Request Made!</p>) :
              (<button className="btn btn-default" onClick={this.handleClick}>Request</button>)
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
        <div  style={{'backgroundColor':'#ffffff', 'padding': '1em', 'marginBottom': '1em'}}>
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
      lineCoordinatesArray: []
    }
  },


  initializeMap: function() {
    var self = this
    console.log("Google Maps Initialized")
    console.log(self.state.lat, self.state.lng)



    const map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      // center: {lat: self.state.lat, lng : self.state.lng, alt: 0}
      center: this.state.lineCoordinatesArray[0]
    })

    const lineCoordinatesPath = new google.maps.Polyline({
      path: self.state.lineCoordinatesArray,
      geodesic: true,
      strokeColor: '#2E10FF',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });



    self.setState({
      map,
      lineCoordinatesPath
    }, () => {
      var map_marker = new google.maps.Marker({position: self.state.lineCoordinatesArray[0], map: map});
      map_marker.setMap(self.state.map);
      lineCoordinatesPath.setMap(self.state.map)
      setInterval(() => {
        var testCoord = testCoords.pop()
        self.pushCoordToArray(testCoord.lat, testCoord.lng)
        // self.pushCoordToArray(lat, lng)
      }, 5000)
    })
  },

pushCoordToArray: function(lat, lng){
  this.setState({
    lineCoordinatesArray:[
      ...this.state.lineCoordinatesArray,
      {lat: lat, lng: lng}
    ]
  }, this.redraw)
  // this.state.lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn))
},

redraw: function() {
  // map.setCenter({lat: lat, lng : lng, alt: 0})
  // map_marker.setPosition(this.state.lineCoordinatesArray[0])
  // this.pushCoordToArray({lat, lng})
  //
  //
  //
  // var lineCoordinatesPath = new google.maps.Polyline({
  //   path: lineCoordinatesArray,
  //   geodesic: true,
  //   strokeColor: '#2E10FF',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2
  // });
  //
  // lineCoordinatesPath.setMap(this.state.map)
  // google.maps.event.trigger(this.state.map, 'resize')
  this.state.lineCoordinatesPath.setPath(this.state.lineCoordinatesArray)
},


componentDidMount: function() {

  var coords = {}
  // sets your location as default
  if (navigator.geolocation) {
    console.log(this)
      navigator.geolocation.getCurrentPosition((position) => {

        // if(this.state.map.mapTypeId) {
          this.setState({
            lineCoordinatesArray: [
              {lat: position.coords["latitude"],lng: position.coords["longitude"]},
              {lat: 34.019495, lng: -118.491381}
            ]
          }, () => this.initializeMap())
          return;
        // }
      },
      (error) => {
        console.log("Error: ", error)
      },
      {enableHighAccuracy: true}
    );
  }

  // moves the marker and center of map

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
