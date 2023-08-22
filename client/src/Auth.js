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

  const returningUserInputs = (
    <>
      <label className="mb-4">
        <div className="mr-3">Email:</div>
        <input
          className="rounded bg-zinc-300 focus:outline-none caret-black px-2 py-1 text-black w-full"
          value={email}
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="mb-4">
        <div className="mr-3">Password:</div>
        <input
          className="rounded bg-zinc-300 focus:outline-none caret-black px-2 py-1 text-black w-full"
          value={password}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </>
  );

  const newUserInputs = (
    <>
      <label className="mb-4">
        <div className="mr-3">Confirm Password:</div>
        <input
          className="rounded w-full bg-zinc-300 focus:outline-none caret-black px-2 py-1 text-black"
          type="password"
          value={passwordConfirmation}
          name="password_confirmation"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </label>
      <label className="mb-4">
        <div className="mr-3">Username:</div>
        <input
          className="rounded w-full bg-zinc-300 focus:outline-none caret-black px-2 py-1 text-black"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="mb-4">
        <div className="mr-3">First Name:</div>
        <input
          className="rounded w-full bg-zinc-300 focus:outline-none caret-black px-2 py-1 text-black"
          type="text"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <button className="mb-5 bg-emerald-400 rounded p-2" type="submit">
        Continue
      </button>
      <div className="text-red-500 text-xs">
        {errors ? errors.errors.map((e) => <li>{e}</li>) : null}
      </div>

      <button
        onClick={() => {
          setNewUser(false);
          setErrors();
        }}
      >
        Been here before?{" "}
        <span className="underline underline-offset-2 text-emerald-400">
          Log in
        </span>
      </button>
    </>
  );

  const continueButton = (
    <button className="mb-5 bg-emerald-400 rounded p-2" type="submit">
      Continue
    </button>
  );

  const signUpButton = (
    <button
      className=""
      onClick={() => {
        setNewUser(true);
        setErrors();
      }}
    >
      New here?{" "}
      <span className=" underline underline-offset-2 text-emerald-400">
        Sign up
      </span>
    </button>
  );

  const errorRender = (
    <div>
      {errors
        ? errors.errors.map((e) => <li className="text-red-500 mb-3">{e}</li>)
        : null}
    </div>
  );

  return (
    <>
      {/* <div className="w-screen h-screen z-0 bg-no-repeat bg-fixed bg-[url('https://3.bp.blogspot.com/-HcabgU2G8SI/V6EXnr4JDHI/AAAAAAAAGrM/W34Dy1pZDB8VPgCv68NsAGjkNTUkUeyZgCLcB/s1600/TM14_web.jpg')]"></div> */}
      <div className="grid place-content-center bg-cover p-20 w-screen h-screen z-0">
        <div className="flex w-80 py-16 px-10 place-content-center rounded bg-zinc-900">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {returningUserInputs}
            {newUser ? (
              newUserInputs
            ) : (
              <>
                {continueButton}
                {errorRender}
                {signUpButton}
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
