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
      <h1 className="text-center">Your Pup's Last Walk</h1>
      <div id='map-canvas' style={{'height':'300px', 'width': '100%', 'paddingRight': '1em' }}></div>
    </div>
    )
  }


})


ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
