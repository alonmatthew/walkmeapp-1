const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      post: {
        owner: {
          local: {
            name: '',
            address: ''
          }
        },
        dog: '',
        age: '',
        breed: '',
        date: '',
        notes: ''
      }
      }
    }
  },

  render: function() {
    return (
      <div>
        <Post />
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
