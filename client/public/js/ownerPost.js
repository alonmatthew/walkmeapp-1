const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      user: {
        local: {
          name: ''
        },
        dogs: []
      }
    }
  },

  componentWillMount: function() {

    const statusRoute = '/owner/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})

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


    sendSearch.then(setUser)

  },

  render: function() {
    return (
      <div>
        <PostForm user={this.state.user}/>
      </div>
    )
  }
})

const PostForm = React.createClass({
  render: function() {
    const dogs = this.props.user.dogs.map((d) => {
      return(
        <option key={d._id} value="{d.name}">{d.name}</option>
      )
    })

    return(
      <div>
        <form method="POST" action="/owner/post">
          Notes to the walker: <input name="content" />
          <select>{dogs}</select>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
