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
        posts: []
      }
    }
  },

  componentWillMount: function() {
    const statusRoute = '/walker/status'
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
      <div>
        <div>
          <Post user={this.state.user} />
        </div>
        <div>
          <StartButton />
          <StopButton />
        </div>
        <Map />
      </div>
    )
  }
})

const Post = React.createClass({
  render: function() {
    const posts = this.props.user.posts.map((p) => {
      return <div key={p._id}>
              <h4>
              {p.dog.name}<br/>
              {p.date}<br/>
              {p.owner.local.address}
              </h4>
            </div>

    })
    return (
      <div>
        <h1 className="text-center">Current Walk</h1>
        {posts}
      </div>
    )
  }
})

const StartButton = React.createClass({
  render: function() {
    return (
      <button className="btn btn-success" style={{'marginRight': '.5em'}}><a href="" style={{'color': '#ffffff'}}>Start</a></button>
    )
  }
})

const StopButton = React.createClass({
  render: function() {
    return (
      <button className="btn btn-danger"><a href="" style={{'color': '#ffffff'}}>Stop</a></button>
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
      <div id='map-canvas' style={{'height':'300px', 'width': '100%', 'paddingRight': '1em' }}></div>
    </div>
    )
  }


})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
