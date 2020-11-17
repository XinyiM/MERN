import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

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
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users/');
        // with fetch(), the default request type is GET request 
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData.users);
      } catch (err) {
        setIsLoading(false);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} /> }
    </React.Fragment>
  );
};

export default Users;
