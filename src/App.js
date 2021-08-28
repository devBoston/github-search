import React, { useState } from "react";

import "./App.css";
import { Form } from "semantic-ui-react";

import { Card, Icon, Image } from "semantic-ui-react";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [repoData, setRepoData] = useState([]);
  const [filteredLang, setFilteredLang] = useState([]);
  const [state, setState] = React.useState("");
  const [repoName, setRepoName] = React.useState("");

  const handleSearch = (e) => {
    setUserInput(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (event) => {
    console.log("what has been seelcted:", event.currentTarget);
    setState(event.target.value);
    console.log("state selection is:", state);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setError(null);
          setData(data);
          fetchRepoData();
        }
      });
  };

  const fetchRepoData = () => {
    fetch(`https://api.github.com/users/${userInput}/repos`)
      .then((res) => res.json())
      .then((data) => setRepoData(data))
      .then((data) => console.log("repo data:", repoData));
    mapRepoData();
  };

  const mapRepoData = () => {};

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setFilteredLang(uniqueNames);
  };

  const languageOptions = repoData.map((item) => item.language);
  console.log("languageOptions", languageOptions);

  const findNameByLang = repoData.map((item) => {
    item.language == state ? console.log(item.name) : console.log("not found");
  });

  const filteredLanguageOptions = languageOptions.filter(function (
    languageOptions
  ) {
    return languageOptions != null;
  });

  const uniqueNames = filteredLanguageOptions.filter(
    (val, id, array) => array.indexOf(val) === id
  );

  return (
    <div>
      <div className="navbar">Github Search</div>
      <div className="search">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              name="name"
              placeholder="Search user"
              onChange={handleSearch}
            />

            <Form.Button content="Search" onClick={handleSubmit}></Form.Button>
          </Form.Group>
        </Form>
      </div>

      {error ? (
        <div className="error">User not found</div>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" />
              {followers} followers
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" />
              {repos} repos
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" />
              {following} following
            </Card.Content>

            <Card.Content extra>
              <Select onChange={handleChange} fluid>
                {uniqueNames.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </Card.Content>
          </Card>
          <Card style={{ margin: "35px" }}>
            <Card.Header>
              {repoData.map((item) => {
                item.language == state ? (
                  <div>{item.name}</div>
                ) : (
                  console.log("null")
                );
              })}
            </Card.Header>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
