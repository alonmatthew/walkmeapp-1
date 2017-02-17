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
