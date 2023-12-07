import React, { useState, useEffect } from 'react';
import './UpdateRequest.css';

const userDataDummy = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    isAuthenticated: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 18,
    isAuthenticated: true,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 12,
    isAuthenticated: true,
  },
  {
    id: 4,
    name: 'Alice Williams',
    age: 40,
    isAuthenticated: true,
  },
  {
    id: 5,
    name: 'Charlie Brown',
    age: 50,
    isAuthenticated: true,
  },
  {
    id: 6,
    name: 'Eva Martinez',
    age: 23,
    isAuthenticated: true,
  },
];

const UpdateRequest = () => {
  const [users, setUsers] = useState([]);
  const [dummyUsers, setDummyUsers] = useState([...userDataDummy]);
  const [loading, setLoading] = useState(true);
  const [updateFormData, setUpdateFormData] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDummyDataMessage, setShowDummyDataMessage] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
        setShowDummyDataMessage(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        setDummyUsers(userDataDummy);
        setShowDummyDataMessage(true);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleUpdateForm = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [userId]: selectedUserId === userId ? {} : { ...dummyUsers.find((user) => user.id === userId) },
    }));
  };

  const handleUpdateFormDataChange = (userId, field, value) => {
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [userId]: { ...prevFormData[userId], [field]: value },
    }));
  };

  const handleUpdateUser = async (e, userId) => {
    e.preventDefault();
    const { name, age, isAuthenticated } = updateFormData[userId];

    try {
      await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, isAuthenticated }),
      });

      setDummyUsers((prevDummyUsers) =>
        prevDummyUsers.map((user) =>
          user.id === userId
            ? { ...user, ...(name && { name }), ...(age && { age }), ...(isAuthenticated !== undefined && { isAuthenticated }) }
            : user
        )
      );

      setUpdateFormData((prevFormData) => {
        const { [userId]: omit, ...rest } = prevFormData;
        return rest;
      });

      setSelectedUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="update-request-container">
      <h2 className="update-request-heading">Update Users</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user.id} className={`user-container ${selectedUserId === user.id ? 'open' : ''}`}>
              <span className="user-info">
                <span className="user-name" onClick={() => handleToggleUpdateForm(user.id)}>
                  {user.name}
                </span>
              </span>
              {selectedUserId !== user.id && (
                <div className="button-container">
                  <button
                    className="toggle-button"
                    onClick={() => handleToggleUpdateForm(user.id)}
                  >
                    Toggle Update
                  </button>
                </div>
              )}
              {selectedUserId === user.id && (
                <form onSubmit={(e) => handleUpdateUser(e, user.id)} className="update-form">
                  <div className="form-fields">
                    <label htmlFor={`newName_${user.id}`}>New Name:</label>
                    <input
                      type="text"
                      id={`newName_${user.id}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.id]?.name || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.id, 'name', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.id}`}>New Age:</label>
                    <input
                      type="number"
                      id={`newAge_${user.id}`}
                      placeholder="Enter new age"
                      value={updateFormData[user.id]?.age || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.id, 'age', e.target.value)}
                    />
                    <label htmlFor={`newIsAuthenticated_${user.id}`}>Toggle Authentication:</label>
                    <select
                      id={`newIsAuthenticated_${user.id}`}
                      value={updateFormData[user.id]?.isAuthenticated || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.id, 'isAuthenticated', e.target.value)}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                  <div className="form-fields">
                    <button type="submit" className="update-button">
                      Update
                    </button>
                    <button type="button" className="close-button" onClick={() => handleToggleUpdateForm(user.id)}>
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {showDummyDataMessage && <p>No users available from the API. Displaying dummy data:</p>}
          {dummyUsers.map((user) => (
            <div key={user.id} className={`user-container ${selectedUserId === user.id ? 'open' : ''}`}>
              <span className="user-info">
                <span className="user-name" onClick={() => handleToggleUpdateForm(user.id)}>
                  {user.name}
                </span>
              </span>
              {selectedUserId !== user.id && (
                <div className="button-container">
                  <button
                    className="toggle-button"
                    onClick={() => handleToggleUpdateForm(user.id)}
                  >
                    Toggle Update
                  </button>
                </div>
              )}
              {selectedUserId === user.id && (
                <form onSubmit={(e) => handleUpdateUser(e, user.id)} className="update-form">
                  <div className="form-fields">
                    <label htmlFor={`newName_${user.id}`}>New Name:</label>
                    <input
                      type="text"
                      id={`newName_${user.id}`}
                      placeholder="Enter new name"
                      value={updateFormData[user.id]?.name || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.id, 'name', e.target.value)}
                    />
                    <label htmlFor={`newAge_${user.id}`}>New Age:</label>
                    <input
                      type="number"
                      id={`newAge_${user.id}`}
                      placeholder="Enter new age"
                      value={updateFormData[user.id]?.age || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.id, 'age', e.target.value)}
                    />
                    <label htmlFor={`newIsAuthenticated_${user.id}`}>Toggle Authentication:</label>
                    <select
                      id={`newIsAuthenticated_${user.id}`}
                      value={updateFormData[user.id]?.isAuthenticated || ''}
                      onChange={(e) => handleUpdateFormDataChange(user.id, 'isAuthenticated', e.target.value)}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                  <div className="form-fields">
                    <button type="submit" className="update-button">
                      Update
                    </button>
                    <button type="button" className="close-button" onClick={() => handleToggleUpdateForm(user.id)}>
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateRequest;
