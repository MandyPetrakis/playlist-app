import { useCurrentUser } from "./Context";
import { useState } from "react";

export default function Auth({ setShowLogIn }) {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (newUser === true) {
      const user = {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        username: username,
        first_name: firstName,
      };
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user);
            setShowLogIn(false);
          });
        } else {
          r.json().then((e) => {
            setErrors(e);
          });
        }
      });
    } else {
      const user = {
        email: email,
        password: password,
      };
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            console.log("user", user);
            setCurrentUser(user);
            setShowLogIn(false);
          });
        } else {
          r.json().then((e) => {
            setErrors(e);
          });
        }
      });
    }
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setUsername("");
    setFirstName("");
  }

  return (
    <>
      <div className="login-wrapper">
        <form className="flex-column" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              value={email}
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {newUser ? (
            <>
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={passwordConfirmation}
                  name="password_confirmation"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label>
                First Name:
                <input
                  type="text"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <button type="submit">Continue</button>
              {errors ? errors.errors.map((e) => <li>{e}</li>) : null}

              <button
                onClick={() => {
                  setNewUser(false);
                  setErrors();
                }}
              >
                I've been here before.
              </button>
            </>
          ) : (
            <>
              <button type="submit">Continue</button>
              {errors ? errors.errors.map((e) => <li>{e}</li>) : null}
              <button
                onClick={() => {
                  setNewUser(true);
                  setErrors();
                }}
              >
                I'm new here.
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
