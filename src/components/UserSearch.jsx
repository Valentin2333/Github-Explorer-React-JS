import React, { useState, useEffect, useContext } from "react";
import classes from "./UserSearch.module.css";
import UserCard from "./UserCard";
import { ErrorContext } from "./ErrorContext";

export default function UserSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem("recentSearches")) || []);

  const { error, setError } = useContext(ErrorContext);
  const { isLoadMoreVisible, setIsLoadMoreVisible } = useContext(ErrorContext);

  function saveToRecentSearches(query) {
    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    searches = searches.filter((item) => item !== query);
    searches.unshift(query);
    if (searches.length > 5) {
      searches = searches.slice(0, 5);
    }
    localStorage.setItem("recentSearches", JSON.stringify(searches));
    setRecentSearches(searches);
  }

  async function fetchUsers(query, page = 1) {
    setIsLoading(true);
    setError(null);
    setIsLoadMoreVisible(false);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const newUsers = data.items;

      setTotalUsers(data.total_count);

      if (newUsers.length === 0) {
        setError("No users found for this search query.");
      } else {
        setVisibleUsers((prevVisible) => [...prevVisible, ...newUsers]);
        saveToRecentSearches(query);
      }
    } catch (error) {
      setError("Unable to fetch users.");
    } finally {
      setIsLoading(false);
      setIsLoadMoreVisible(true);
    }
  }

  function loadMoreUsers() {
    const remainingUsers = totalUsers - visibleUsers.length;

    if (remainingUsers <= 0) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(searchQuery, nextPage);
  }

  function handleSearch() {
    setPage(1);
    setVisibleUsers([]);
    fetchUsers(searchQuery, 1);
  }

  function handleRecentSearchClick(query) {
    setSearchQuery(query);
    setPage(1);
    setVisibleUsers([]);
    fetchUsers(query, 1);
  }

  const hasMoreUsers = totalUsers > visibleUsers.length;

  return (
    <div className={classes.container}>
      <div className={classes.searchBarContainer}>
        <input
          type="text"
          className={classes.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a username"
          disabled={error === "Unable to fetch users."}
        />
        <button
          className={classes.searchBtn}
          disabled={!searchQuery.trim() || error === "Unable to fetch users."}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {isLoading && <p className={classes["error-loading"]}>Loading...</p>}

      {visibleUsers.length === 0 && recentSearches.length > 0 && (
        <div className={classes.recentSearchesContainer}>
          <p className={classes.recentSearchesBiggerText}>
            Search for a username in the input above
          </p>
          <p className={classes.recentSearchesSmallerText}>or</p>
          <p className={classes.recentSearchesBiggerText}>
            Try one of your previous queries:
          </p>
          <ul>
            {recentSearches.map((query, index) => (
              <li key={index} className={classes.recentSearchItem}>
                <button
                  onClick={() => handleRecentSearchClick(query)}
                  disabled={error === "Unable to fetch users."}
                >
                  {query}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={classes.userList}>
        {visibleUsers.map((userProfile) => (
          <UserCard key={userProfile.id} user={userProfile} />
        ))}

        {!isLoading &&
          hasMoreUsers &&
          isLoadMoreVisible &&
          visibleUsers.length > 0 && (
            <div className={classes.loadMoreContainer}>
              <button
                className={classes.loadMoreButton}
                onClick={loadMoreUsers}
              >
                Load More
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
