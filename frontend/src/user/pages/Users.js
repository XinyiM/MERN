import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // fetch('http://localhost:3000/')
  // if only fetch request: the page will get re-rendered 
  // when sth on the page changes, 
  // So it will get into infinite loop.
  // ===> use React Hook

  useEffect(() => {
    // Note! do not turn this function into async way
    // Reason: useEffect doesnt want a funciton that returns a promise 
    // but the async function always returns a promise

    // Solution: define a new function in the userEffect and make it async
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users/');
        setLoadedUsers(responseData.users);
      } catch (err) { }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
