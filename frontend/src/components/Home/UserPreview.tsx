import React from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Button } from 'react-bootstrap';

const UserPreview: React.FC<any> = props => {
  const history = useHistory()
  const { usersStore } = useStore();
  const { user} = props;
  const selectUser = (id: string) => {
    usersStore.selectUser(id)
    history.replace('/answer')
  }
  return <Observer>{() => {
    
    return (
      <tr>
        <td>{user.firstName} {user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
        <td>{user.birth}</td>
        <td><Button variant="success" onClick={() => {selectUser(`${user._id}`)}}>Select User</Button></td>
      </tr>
    );
  }}</Observer>
};


export default UserPreview;