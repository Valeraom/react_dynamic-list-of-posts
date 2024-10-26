import { useEffect, useState } from 'react';
import { User } from '../types';
import * as usersService from '../api/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const loadUsers = () => {
    usersService
      .getUsers()
      .then(res => {
        const preparedUsers = res.map(user => {
          const { id, name, email, phone } = user;

          return {
            id,
            name,
            email,
            phone,
          };
        });

        setUsers(preparedUsers);
      })
      .catch(() => setErrorMessage('Something went wrong'));
  };

  useEffect(loadUsers, []);

  return { users, errorMessage, selectedUser, setSelectedUser };
};
