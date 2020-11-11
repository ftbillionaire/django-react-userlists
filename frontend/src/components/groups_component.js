import React from 'react';

export default class Groups extends React.Component{
    constructor(){
      super();
      this.state = {
        data:[],
        users: [],
        activeName: '',
        activeDescr: ''
      };
      this.fetchTasks = this.fetchTasks.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.deleteGroup = this.deleteGroup.bind(this);
      this.updateGroup = this.updateGroup.bind(this);
      this.checkUser = this.checkUser.bind(this);
    }
    fetchTasks(){
      fetch('172.23.0.1:80/api/groups/')
        .then(response=>response.json())
        .then(result=>this.setState({
          data: result
        })).catch(error=>console.log(error))
    }
    componentDidMount(){
      fetch('http://172.23.0.1:80/api/groups/')
        .then(response=>response.json())
        .then(result=>{
          this.setState({data:result});
          console.log(result);
        })

      fetch('http://172.23.0.1:80/api/users/')
        .then(response=>response.json())
        .then(result=>{
          this.setState({users:result});
          console.log(result);
        })
    }
    handleChange(e){
      console.log(e.target.name + ': ' + e.target.value);
      if(e.target.name === 'name'){
        this.setState({
          activeName: e.target.value
        })
      }
      else if(e.target.name === 'description'){
        this.setState({
          activeDescr: e.target.value
        })
      }
    }

    handleSubmit(){
      fetch('http://172.23.0.1:80/api/groups/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name':this.state.activeName, 'description':this.state.activeDescr})
      }).then(result=>{
          this.fetchTasks();
          console.log(result);
      }).catch(error=>console.log(error))
    }

    deleteGroup(obj){
      fetch(`http://http://172.23.0.1:80/api/groups/delete/${obj.id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(result=>{
        this.fetchTasks();
        console.log(result);
      }).catch(error=>console.log(error))
    }

    updateGroup(obj){
      fetch(`http://172.23.0.1:80/api/groups/update/${obj.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name':this.state.activeName, 'description': this.state.activeDescr})
      }).then(result=>{
        this.fetchTasks();
        console.log(result);
      })
    }

    // checks if users are in group
    checkUser(obj){
      let groups_list = [];
      this.state.users.map(user=>{
        user.groups.map(group => groups_list.push(group))
        return true;
      });
      if(groups_list.includes(obj.id)){
        return <button onClick={()=>this.deleteGroup(obj)} type="button" className="mr-2 btn btn-danger" disabled>Delete</button>
      }
      return <button onClick={()=>this.deleteGroup(obj)} type="button" className="mr-2 btn btn-danger">Delete</button>
    }

    render(){
      return (
        <div>
          <h1 className="mt-3">Groups</h1>
          <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
            Add group
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add group</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input onChange={this.handleChange} className="form-control" type="text" name="name" placeholder="Name" required></input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="group-description">Description</label>
                      <textarea onChange={this.handleChange} className="form-control" id="description" name="description" rows="3"></textarea>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <table className="mt-3 table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(group=>{
                let data_t = {};
                let group_id = {};
                data_t['data-target'] = `#${group.name}`;
                group_id['id'] = `${group.name}`;
                return (
                  <tr key={group.name}>
                    <td>{group.id}</td>
                    <td>{group.name}</td>
                    <td>{group.description}</td>
                    <td>
                      {this.checkUser(group)}
                      <button type="button" className="btn btn-info" data-toggle="modal" {...data_t}>
                        Edit
                      </button>
                      <div className="modal fade" {...group_id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Edit group</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <form onSubmit={()=>this.updateGroup(group)} id="groupEditForm">
                                <div className="form-group">
                                  <label htmlFor="name">Name</label>
                                  <input onChange={this.handleChange} className="form-control" type="text" name="name" placeholder={group.name} required></input>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="group-description">Description</label>
                                  <textarea onChange={this.handleChange} className="form-control" id="description" name="description" rows="3"></textarea>
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