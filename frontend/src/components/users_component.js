import React from 'react';
import '/app/frontend/src/App.css';
export default class Users extends React.Component{
    constructor(){
      super();
      this.state={
        data:[],
        groups: [],
        activeUsername: '',
        activeGroup: ''
      };
      this.fetchTasks = this.fetchTasks.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
    }

    fetchTasks(){
        fetch("http://172.23.0.1:80/api/users/")
        .then(response=>response.json())
        .then(result=> {
            this.setState({data:result})
        }).catch(error=>console.log(error))
    }

    componentDidMount(){
      fetch("http://172.23.0.1:80/api/users/")
        .then(response=>response.json())
        .then(result=> {
          this.setState({data:result});
          console.log(result)
        }).catch(error=>console.log(error))
      
      fetch("http://172.23.0.1:80/api/groups/")
        .then(response=>response.json())
        .then(result=> {
          this.setState({groups:result});
          console.log(result);
        }).catch(error=>console.log(error))
    }

    handleChange(e){
      console.log(e.target.name, ': ', e.target.value)
      if (e.target.name === 'Username') {
        this.setState({
            activeUsername: e.target.value
        });   
      }
      else if(e.target.name === 'Group'){
        let options = e.target.options;
        let value = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({
          activeGroup: value
        });
      }
    }
  
    handleSubmit(){
      fetch('http://172.23.0.1:80/api/users/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username':this.state.activeUsername, 'groups':this.state.activeGroup})
        }
      )
      .then(result=>{
          this.fetchTasks()
          console.log(result)
        }).catch(error=>console.log(error))
    }

    updateUser(obj){
        fetch(`http:/172.23.0.1:80/api/users/update/${obj.id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':this.state.activeUsername, 'groups':this.state.activeGroup})
        })
        .then(response=>{
          this.fetchTasks()
          console.log(response)
        }).catch(error=>console.log(error))
    }

    deleteUser(obj){
        fetch(`http://172.23.0.1:80/api/users/delete/${obj.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=>{
            this.fetchTasks()
            console.log(response)
        }).catch(error=>console.log(error))
    }

    // set group for displaying in table
    setGroup(obj){
      let groups_names = []
      let groups_id = []
      this.state.groups.map(group => {
        groups_names.push(group.name)
        groups_id.push(group.id)
        return true
      })

      if(groups_id.includes(obj)){
        let indNew = groups_id.indexOf(obj);
        return ' | ' + groups_names[indNew] + ' | ';
      }
      return 'None';
    }
  
    render(){
      return (
        <div className='main'>

          {/* User navigation */}
          <h1 className="mt-3">Users</h1>
          <button type="button" className="btn btn-success" data-toggle="modal" data-target="#addModal">
            Add user
          </button>
          <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add user</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">

                  {/* AddUser form */}
                  <form id="userAddForm" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input onChange={this.handleChange} className="form-control" name="Username" type="text" placeholder="Username" required></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="groups">Groups (shift CTRL to choose multiple)</label>
                      <select multiple className="form-control" id="group-selector" onChange={this.handleChange} name="Group" required>
                        {this.state.groups.map(group=>{
                          return <option key={group.name.toString()} value={group.id}>{group.name}</option>
                        })}
                      </select>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">Add</button>
                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>

          {/* Table view */}
          <table className="mt-3 table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Create</th>
                <th scope="col">Groups</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>

              {/* User Row */}
              {this.state.data.map(user => {

                // Variables that declare new attributes
                let data_t = {};
                let user_id = {};
                data_t['data-target']=`#${user.username}`;
                user_id['id']=`${user.username}`;

                return (
                  <tr key={user.username.toString()}>
                    <td>{user.username}</td>
                    <td>{user.date_joined.slice(0, 10)}</td>
                    <td style={{fontWeight: 'bold'}}>
                      {user.groups.map(group=>{
                        return this.setGroup(group)
                      })}
                    </td>
                    <td>
                      <button type="button" className="mr-2 btn btn-danger" onClick={() => this.deleteUser(user)}>Delete</button>
                      <button type="button" className="btn btn-info" data-toggle="modal" {...data_t}>Edit</button>
                      <div className="modal fade" {...user_id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Edit user</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <form id="userEditForm" onSubmit={()=>this.updateUser(user)}>
                                <div className="form-group">
                                  <label htmlFor="username">Username</label>
                                  <input onChange={this.handleChange} className="form-control" name="Username" type="text" placeholder={user.username} required></input>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="groups">Groups (press CTRL to choose multiple)</label>
                                  <p>*bold groups are those you are currently in</p>
                                  <select multiple className="form-control" id="group-selector" onChange={this.handleChange} name="Group" required>
                                    {this.state.groups.map(group=>{
                                      if(user.groups.includes(group.id)){
                                        return <option style={{fontWeight: 'bold'}} key={group.name.toString()} value={group.id}>{group.name}</option>
                                      }
                                      return <option key={group.name.toString()} value={group.id}>{group.name}</option>
                                    })}
                                  </select>
                                </div>
                                <div className="modal-footer">
                                  <button type="submit" className="btn btn-info">Edit</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }