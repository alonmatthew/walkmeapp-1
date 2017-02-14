const Dashboard = React.createClass({
  getInitialState: function() {
    console.log(this.props)
    return {
      post: {
        owner: {
          local: {
            name: '',
            address: ''
          }
        },
        dog: {
          name: '',
          age: '',
          breed: ''
        },
        date: '',
        notes: ''
      }
      }
  },

  componentWillMount: function(){

    const statusRoute = '/walker/status'
    const sendSearch = fetch(postRoute, {credentials: 'same-origin'})
    const sendStatusSearch = fetch(statusRoute, {credentials: 'same-origin'})
      // console.log(sendStatusSearch)

      var self = this

      function setUser(data) {
        data.json().then((jsonData) => {
          // console.log(jsonData)
          // self.setState({
          //   user:jsonData.user
          // })
        })
      }

      sendStatusSearch.then(setUser)
  },

  render: function() {
    return (
      <div>
        <PostInfo />
      </div>
    )
  }
})

const PostInfo = React.createClass({
  render: function() {
    // var post = Post.findById(req.params)
    // console.log(post)

  return(
    <div>
    <h1>Test</h1>
    </div>
  )
}
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
