import React from 'react';
import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Button } from 'react-bootstrap';

const UserPreview: React.FC<any> = props => {
  const history = useHistory()
  const { usersStore } = useStore();
  const { user, index } = props;
  const selectUser = async (id: string) => {
    usersStore.selectUser(id).then(() => {
      history.push('/answer')
    })
  }
  return <Observer>{() => {
    
    return (
      <tr>
        <td className='align-middle text-center'>{usersStore.page * 10 + index + 1}</td>
        <td className='align-middle text-center'>{user.firstName} {user.lastName}</td>
        <td className='align-middle text-center'>{user.email}</td>
        <td className='align-middle text-center'>{user.gender}</td>
        <td className='align-middle text-center'>{user.birth}</td>
        <td className='align-middle text-center'><Button variant="success" onClick={() => {selectUser(`${user._id}`)}}>Select User</Button></td>
      </tr>
    );
  }}</Observer>
};


export default UserPreview;