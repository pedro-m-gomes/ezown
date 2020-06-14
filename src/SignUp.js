import React, { useState } from "react";
import { TextInputField, Button, Pane } from "evergreen-ui";
import useApi from "./useApi";
import { API_BASE } from "./contants";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const { fetch: signUpRequest, loading, error } = useApi(API_BASE);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Pane
        width={400}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="default"
        padding={15}
      >
        <form
          style={{ width: 250 }}
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <TextInputField
            required
            label="Username"
            value={username}
            onChange={v => {
              setUsername(v.target.value);
            }}
          />
          <TextInputField
            required
            label="First Name"
            value={firstName}
            onChange={v => {
              setFirstName(v.target.value);
            }}
          />
          <TextInputField
            required
            label="Last Name"
            value={lastName}
            onChange={v => {
              setLastName(v.target.value);
            }}
          />
          <TextInputField
            required
            label="Email"
            value={email}
            onChange={v => {
              setEmail(v.target.value);
            }}
          />
          <TextInputField
            required
            type="password"
            label="Password"
            value={password}
            onChange={v => {
              setPassword(v.target.value);
            }}
          />
          <TextInputField
            required
            isInvalid={
              showErrors && confirmPassword && confirmPassword !== password
            }
            validationMessage={
              showErrors && confirmPassword && confirmPassword !== password
                ? "The passwords don't match"
                : undefined
            }
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={v => {
              setConfirmPassword(v.target.value);
            }}
          />
          <div>
            <Button
              onClick={() => {
                setShowErrors(true);
              }}
              disabled={!(Boolean(username) && Boolean(firstName) && Boolean(lastName) && Boolean(email) && Boolean(password))}
              appearance="primary"
              type="submit"
              onClick={() => {
                signUpRequest("user", {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Connection": "keep-alive"
                  },
                  body: JSON.stringify({ username, firstName, lastName, email, password, confirmPassword })
                });
              }}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Pane>
    </div>
  );
}
