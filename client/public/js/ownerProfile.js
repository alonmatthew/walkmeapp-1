const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      user: {
        local: {
          name: ''
        },
        dogs: [],
        posts: []
      }
    }
  },

  componentWillMount: function() {

    const statusRoute = '/owner/status'
    const sendStatusSearch = fetch(statusRoute, {credentials: 'same-origin'})

    // console.log(sendSearch)

    var self = this

    function setUser(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          user: jsonData.user
        })
      })
    }

    sendStatusSearch.then(setUser)
  },


  render: function() {
    return(
      <div>
        <Jumbotron user={this.state.user}/>
        <Notifications user={this.state.user} posts={this.state.user.posts}/>
        <Pets user={this.state.user} />
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

const Notifications = React.createClass({
  render: function() {
    const user = this.props.user
    const requestedMessage = this.props.posts.map((p) => {
      return (
        <div key={p._id} >
          {p.requested_by.length ? (<a href="/owner/walks">"You have a new request!"</a>) : (<p></p>)}
        </div>
      )
    })

    return (
      <div style={{'backgroundColor':'#ffffff', 'padding': '1em', 'marginBottom': '1em'}}>
        <h1 className="text-center">Notifications</h1>
        {requestedMessage}
      </div>
    )
  }
})

const RequestButton = React.createClass({
  render: function() {
    return (
      <button className="btn btn-default"><a href="/owner/post">Request a Walk!</a></button>
    )
  }
})

const Pets = React.createClass({
  render: function() {
    // console.log(this.props.user)
    const user = this.props.user.local
    const dogs = this.props.user.dogs.map((d) => {
      return(
        <li key={d._id}>{d.name} <br/> Breed: {d.breed} <br/> Age: {d.age}</li>
      )
    })
    return(
      <div style={{'backgroundColor':'#ffffff', 'padding': '1em', 'marginBottom': '1em'}}>
        <h1 className="text-center">Your Pets</h1>
        <ul>{dogs}</ul>
        <button className="btn btn-default"><a href="/owner/pets">Register your dog</a></button>
        <RequestButton />
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
