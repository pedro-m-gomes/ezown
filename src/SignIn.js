import React, { useState, useEffect } from "react";
import { TextInputField, Button, Pane, Text, Alert } from "evergreen-ui";
import { Link, Redirect } from "react-router-dom";
import useApi from "./useApi";
import { API_BASE } from "./contants";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { fetch: signInRequest, loading, error, data } = useApi(API_BASE);

  useEffect(() => {
    console.log(data);
    if(data) {
      localStorage.setItem('token', data.jwt);
    }
  }, [data]);

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
        width={300}
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
          {error && (
            <Alert
              intent="danger"
              title="We weren’t able to save your changes"
              padding={1}
            />
          )}

          {data && (
            <Redirect to="/note2"
            />
          )}

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
            type="password"
            label="Password"
            value={password}
            onChange={v => {
              setPassword(v.target.value);
            }}
          />
          <div>
            <Button
              isLoading={loading}
              disabled={!(Boolean(username) && Boolean(password))}
              appearance="primary"
              type="submit"
              onClick={() => {
                signInRequest("authenticate", {
                  method: "POST",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ username, password })
                });
              }}
            >
              Log in
            </Button>
          </div>
        </form>
      </Pane>
      <div style={{ padding: 7 }}>
        <Pane
          width={300}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="default"
          padding={15}
        >
          <Text size={300}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Text>
          <Text size={300}>
            Note? <Link to="/note2">Note</Link>
          </Text>
        </Pane>
      </div>
    </div>
  );
}
