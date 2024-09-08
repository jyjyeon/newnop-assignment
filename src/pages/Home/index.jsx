import React, { useEffect, useState } from "react";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "../../utils/localStorageUtils";
import "./style.css";
import Card from "../../components/Card";
import SearchBar from "../../components/SearchBar";
import Error from "../Error";
import Loading from "../Loading";
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from "react-icons/vsc";

export default function Profile({ setUserData }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  //get user info
  useEffect(() => {
    const localData = loadDataFromLocalStorage("userData");
    if (localData.length > 0) {
      setUsers(localData);
      setFilteredUsers(localData);
      setIsLoaded(true);
    } else {
      const fetchData = async () => {
        try {
          const res = await fetch("https://randomuser.me/api/?results=50");
          const result = await res.json();
          setUsers(result.results);
          setFilteredUsers(result.results);
          saveDataToLocalStorage("userData", result.results); // 로컬 스토리지에 데이터 저장
          setIsLoaded(true);
        } catch (error) {
          setError(error);
          setIsLoaded(true);
        }
      };
      fetchData();
    }
  }, [setUserData]);

  //search users by name
  const handleSearch = (input) => {
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(input)
    );
    setFilteredUsers(filtered);
  };

  //sort users by name (asc/dec)
  const handleSort = () => {
    const sorted = [...filteredUsers].sort((a, b) => {
      const name1 = `${a.name.first} ${a.name.last}`.toLowerCase();
      const name2 = `${b.name.first} ${b.name.last}`.toLowerCase();

      if (sortOrder === "asc") {
        return name1.localeCompare(name2);
      } else {
        return name2.localeCompare(name1);
      }
    });
    setFilteredUsers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //get users in current page
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  //handle page change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    return <Error error={error} />;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="title">HELLO PEOPLE</div>
        <div className="banner">
          <SearchBar onSearch={handleSearch} />
          <button className="sort-button" onClick={handleSort}>
            Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
          </button>
        </div>
        <div className="user-card-container">
          {currentUsers.map((user, index) => (
            <Card key={index} userData={user} />
          ))}
        </div>
        <div className="pagination">
          <VscTriangleLeft
            className="icon"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <p>
            Page <strong>{currentPage}</strong> of {totalPages}
          </p>
          <VscTriangleRight
            className="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      </>
    );
  }
}
