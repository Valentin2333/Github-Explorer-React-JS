import React, { useState } from 'react';
import classes from './GitHubUserSearch.module.css'; 

const GitHubUserSearch = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Search input from the user
  const [allUsers, setAllUsers] = useState([]); // All fetched user data
  const [visibleUsers, setVisibleUsers] = useState([]); // Users to display
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state for handling API issues
  const [page, setPage] = useState(1); // Current page for pagination
  const [totalUsers, setTotalUsers] = useState(0); // Total users available from the search

 
  const fetchUsers = async (query, page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const newUsers = data.items;

      // Update total users available
      setTotalUsers(data.total_count);

      // Update all users state and visible users based on pagination
      setAllUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setVisibleUsers((prevVisible) => [
        ...prevVisible,
        ...newUsers,
      ]);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more users when button is clicked
  const loadMoreUsers = () => {
    const remainingUsers = totalUsers - visibleUsers.length;

    // If there are no remaining users, do nothing
    if (remainingUsers <= 0) return;

    // Fetch the next set of users
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(searchQuery, nextPage);
  };

  // Handle search when button is clicked
  const handleSearch = () => {
    setPage(1); // Reset to first page when a new query is made
    setAllUsers([]); // Clear previous users
    setVisibleUsers([]); // Clear visible users
    fetchUsers(searchQuery, 1); // Fetch users for the first page
  };

  // Determine if there are more users to load
  const hasMoreUsers = totalUsers > visibleUsers.length;
  const canLoadMore = visibleUsers.length <= 250;

  return (
    <div className={classes.container}>
      <div className={classes.searchBarContainer}>
        <input
          type="text"
          className={classes.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search GitHub users"
        />
        <button className={classes.searchButton} onClick={handleSearch}>Search</button>
      </div>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      <div className={classes.userList}>
        {visibleUsers.map((user) => (
          <div key={user.id} className={classes.userCard}>
            <img src={user.avatar_url} alt={user.login} className={classes.avatar} />
            <div className={classes.userInfo}>
              <p className={classes.username}>{user.login}</p>
              <p className={classes.userId}>({user.id})</p>
            </div>
          </div>
        ))}

        {!isLoading && hasMoreUsers && canLoadMore && (
          <div className={classes.loadMoreContainer}>
            <button className={classes.loadMoreButton} onClick={loadMoreUsers}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubUserSearch;