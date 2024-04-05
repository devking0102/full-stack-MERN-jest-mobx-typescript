import UserPreview from './UserPreview';
import ListPagination from '../common/ListPagination';
import LoadingSpinner from '../common/LoadingSpinner';
import React from 'react';
import { Table } from 'react-bootstrap';

const UserList: React.FC<any> = props => {
  if (props.loading && props.users.length === 0) {
    return (
      <LoadingSpinner />
    );
  }

  if (props.users.length === 0) {
    return (
      <div className="user-preview">
        No users are here... yet.
      </div>
    );
  }

  return (
    <div>
      <Table responsive striped hover bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map((user: any) => {
              return (
                <UserPreview user={user} />
              );
            })
          }
        </tbody>
      </Table>

      <ListPagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default UserList;
