import React, { Fragment } from "react";
import { useEffect } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

const UserDetails = (props) => {
  const params = useParams();
  useEffect(() => {
    props.onGetUserDetails(params.login);
    props.onGetUserRepos(params.login);
  }, []);

  const {
    name,
    avatar_url: avatarURL,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
  } = props.user;

  if (props.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable: {hireable ? "Yes" : "Not Currently"}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatarURL}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location:{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          {/* <Link to={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </Link> */}
          <a href={html_url}>Visit Github Profile</a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong>
                  {login}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-white">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={props.repos}></Repos>
    </Fragment>
  );
};

export default UserDetails;
