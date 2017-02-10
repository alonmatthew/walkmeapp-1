const Dashboard = React.createClass({

  getInitialState: function() {
    return {
      userStatus: false
    }
  },

  componentWillMount: function() {


    const statusRoute = '/owner/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})

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


    sendSearch.then(setUserStatus)

  },

  render: function() {
    return(
      <NavBar userStatus={this.state.userStatus}/>
    )
  }
})

const NavBar = React.createClass({


  render: function() {
    var navbar;
    const isLoggedIn = this.props.userStatus
    if(!!isLoggedIn) {
          navbar = <div>
                    <a href="/walker/profile">Profile</a>
                    <a href="/owner/profile">Profile</a>
                  </div>
    } else {
          navbar = <div>
                    <a href="/owner/signup">Sign up as owner</a>
                    <a href="/walker/signup">Sign up as walker</a><br />
                    <a href="/walker/login">Login as walker</a>
                    <a href="/owner/login">Login as owner</a>
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
  document.getElementById('root')
)
