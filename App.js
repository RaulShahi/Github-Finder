import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import UserItem from "./components/users/UserItem";
import Users from "./components/users/Users";
import {  Route, Routes } from "react-router-dom";
import Loading from "./components/layouts/Loading";
import Search from "./components/users/Search";
import About from "./components/pages/about";
import UserDetails from "./components/users/UserDetails";
import axios from "axios";
import GithubState from "./store/github/GithubState";

const App = () => {
  let showData;
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleUser, setSingleUser]= useState({});
  const [repos, setRepos] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getData = async () => {
  //     const res = await axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );

  //     console.log(res.data);
  //     setUsers(res.data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);

  //Search Github users
  const fetchUsers = async (userData) => {
    setIsLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${userData}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setIsLoading(false);
  };

  // Get a single Github user
  const getUserDetails = async(userName)=>{
    setIsLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setSingleUser(res.data);
    setIsLoading(false);
  };

  //Get users repos
  const getUserRepos = async(userName)=>{
    setIsLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setIsLoading(false);
  };

  //Clears users from state
  const clearUsersHandler = () => {
    setUsers([]);
    setIsLoading(false);
  };

  if (isLoading) {
    showData = <Loading />;
  } else {
    showData = <Users users={users} isLoading={isLoading} />;
  }

  const homePage = (
    <Fragment>
      <Search onSubmit={fetchUsers} onClearUsers={clearUsersHandler} />
      {users && showData}
    </Fragment>
  );
  return (
    <GithubState>

    <div className="App">
      <Navbar title="Github Finder" />
      <div className="container">
        <Routes>
          <Route path="/" element={<Fragment>{homePage}</Fragment>} />
          <Route path="/about" element={<About />}/>
          <Route path="/user/:login" element={<UserDetails onGetUserDetails = {getUserDetails} user={singleUser} loading = {isLoading} onGetUserRepos = {getUserRepos} repos={repos}/> }/>
        </Routes>
      </div>
    </div>
    </GithubState>
  );
};

export default App;
