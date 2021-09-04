import React, { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    userData();
  }, []);

  async function userData() {
    let user = await fetch("http://localhost:4000/person");
    user = await user.json();
    setData(user);
    setId(user[0].id);
    setName(user[0].name);
    setEmail(user[0].email);
    setPhone(user[0].phone);
  }
  const removeUser = (id) => {
    fetch(`http://localhost:4000/person/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
      });
      userData();
    });
  };
  function getUser(id) {
    let selectedUser = data[id - 1];
    setId(selectedUser.id);
    setName(selectedUser.name);
    setEmail(selectedUser.email);
    setPhone(selectedUser.phone);
  }
  console.log(data);

  function updateInfo() {
    let info = { name, email, phone };
    fetch(`http://localhost:4000/person/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
      });
      userData();
    });
  }
  return (
    <div className="App">
      <h1>User Database</h1>
      <table border="1">
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>E-Mail</td>
            <td>Phone</td>
            <td>Operation</td>
            <td>Update</td>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <button onClick={() => removeUser(item.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => getUser(item.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        onChange={(e) => setId(e.target.value)}
        type="text"
        value={id}
      ></input>
      <br></br>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
      ></input>
      <br></br>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        value={email}
      ></input>
      <br></br>
      <input
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        value={phone}
      ></input>
      <br></br>
      <button onClick={updateInfo}>Submit</button>
    </div>
  );
}

export default App;
