const Dashboard = React.createClass({

  getInitialState: function() {
    return {
      userStatus: false,
      user: {}
    }
  },

  componentWillMount: function() {


    const statusRoute = '/owner/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})
    const sendUserSearch = fetch(statusRoute, {credentials: 'same-origin'})
    // console.log(sendSearch)

    var self = this

    function setUserStatus(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          userStatus: jsonData.status
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

    sendUserSearch.then(setUser)
    sendSearch.then(setUserStatus)

  },

  render: function() {
    return(
      <NavBar userStatus={this.state.userStatus} user={this.state.user}/>
    )
  }
})

const NavBar = React.createClass({

  render: function() {
    var navbar;
    const isLoggedIn = this.props.userStatus
    const user = this.props.user
    if(!!isLoggedIn) {
          navbar = <div className="btn btn-group">
                    { user.local.owner ? ( <button><a href="/owner/profile">Profile</a></button> ) :
                      ( <button><a href="/walker/profile">Profile</a></button> )
                    }
                  </div>
    } else {
          navbar = <div className="btn btn-group">
                    <button><a href="/walker/login">Login as walker</a></button>
                    <button><a href="/owner/login">Login as owner</a></button>
                    <a href="/owner/signup">Sign up as owner</a>
                    <a href="/walker/signup">Sign up as walker</a><br />
                  </div>
      }

    return(
      <div>
        {navbar}
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('connect')
)
