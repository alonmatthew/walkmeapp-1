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
  // setMapState: function(){
  //
  // }

  // componentWillMount: function() {



  // function pubs() {
  //   pubnub = PUBNUB.init({
  //     publish_key: 'pub-c-3a56cc93-eb87-425e-b7f5-d24a96c06c7d',
  //     subscribe_key: 'sub-c-9f14d376-ee2b-11e6-8bf6-02ee2ddab7fe'
  //   })
  //
  //   pubnub.subscribe({
  //     channel: "mymaps",
  //     message: function(message, channel) {
  //       console.log(message)
  //       lat = message['lat']
  //       lng = message['lng']
  //       //custom method
  //       redraw()
  //     },
  //     connect: function() {console.log("PubNub Connected")}
  //   })
  // }

  // function pushCoordToArray(latIn, lngIn) {
  //   lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn))
  // }


// },

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

        // calls PubNub
        // pubs()


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

      // console.log("Google Maps Initialized")
      // var map = new google.maps.Map(document.getElementById('map-canvas'), {
      //   zoom: 15,
      //   center: {lat: this.state.lat,
      //           lng : this.state.lng, alt: 0}
      // })
      //
      // var map_marker = new google.maps.Marker({position: {lat: this.state.lat, lng: this.state.lng}, map: this.state.map})
      // map_marker.setMap(map)

    return(
    <div id='map' className="container" style={{'backgroundColor':'#a8dcd1', 'padding': '1em', 'marginLeft': '1em','marginRight': '1em'}}>
      <div id='map-canvas' style={{height:'400px', width: '100%', 'marginRight': '1em'}}></div>
    </div>
    )
  }


})







  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.google !== this.props.google) {
  //     this.loadMap();
  //   }
  // }
  //
  // loadMap() {
  //   if (this.props && this.props.google) {
  //     // google is available
  //     const {google} = this.props;
  //     const maps = google.maps;
  //
  //     const mapRef = this.refs.map;
  //     const node = ReactDOM.findDOMNode(mapRef);
  //
  //     let zoom = 14;
  //     let lat = 37.774929;
  //     let lng = -122.419416;
  //     const center = new maps.LatLng(lat, lng);
  //     const mapConfig = Object.assign({}, {
  //       center: center,
  //       zoom: zoom
  //    })
  //    this.map = new maps.Map(node, mapConfig);
  //   }
  //   // ...
  // }
  //
  // // render() {
  // //
  // //   // ...
  // // }
// }

ReactDOM.render(
  <Map />,
  document.getElementById('map')
)
