import React, { useState } from "react";
import { TextInputField, Button, Pane, Text, Alert } from "evergreen-ui";
import { Link } from "react-router-dom";
import useApi from "./useApi";
import { API_BASE } from "./contants";

export default function Notes() {
  const [username, setUsername] = useState("");
  const { fetch: getNoteRequest, loading, error, data } = useApi(API_BASE);

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

          <TextInputField
            required
            label="username"
            value={username}
            onChange={v => {
              setUsername(v.target.value);
            }}
          />
          <div>
            <Button
              isLoading={loading}
              disabled={!Boolean(username)}
              appearance="primary"
              type="submit"
              onClick={() => {
                getNoteRequest("notes/" + username, {
                  method: "GET",
                  mode: "cors",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Connection": "keep-alive",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                  },
                });
              }}
            >
              Get Note
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
        </Pane>
      </div>
    </div>
  );
}
