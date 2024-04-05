import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useStore } from '../../store';
import UserList from "./UserList";

const MainView: React.FC = () => {
  const { usersStore } = useStore();
  
  const handleSetPage = (page: number) => {
    usersStore.setPage(page);
    usersStore.loadUsers();
  };
  
  useEffect(() => {
    usersStore.loadUsers();
  }, [usersStore]);


  return <Observer>{() => {
    const {
      users,
      isLoading,
      page,
      totalPagesCount
    } = usersStore;

    return (
      <div className="col-md-12">
        <UserList
          users={users}
          loading={isLoading}
          totalPagesCount={totalPagesCount}
          currentPage={page}
          onSetPage={handleSetPage}
        />
      </div>
    );
  }}</Observer>
};

export default MainView;
