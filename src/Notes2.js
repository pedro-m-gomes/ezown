import React, { useState } from "react";
import { TextInputField, Button, Pane, Text, Alert, Textarea } from "evergreen-ui";
import { Link } from "react-router-dom";
import useApi from "./useApi";
import { API_BASE } from "./contants";

export default function Notes() {
  const [userId, setUserId] = useState("1");
  const [name, setName] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [body, setBody] = useState("");
  const { fetch: addNoteRequest, loading, error, data } = useApi(API_BASE);

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
            label="name"
            value={name}
            onChange={v => {
              setName(v.target.value);
            }}
          />
          <TextInputField
            label="creationDate"
            value={creationDate}
            onChange={v => {
              setCreationDate(v.target.value);
            }}
          />
          <TextInputField
            label="updateDate"
            value={updateDate}
            onChange={v => {
              setUpdateDate(v.target.value);
            }}
          /> 
          <Textarea
            required
            label="body"
            name="Note"
            placeholder="What's in your mind?"
            value={body}
            onChange={v => {
              setBody(v.target.value);
            }}
          />
                    <div>
            <Button
              isLoading={loading}
              disabled={!Boolean(name)}
              appearance="primary"
              type="submit"
              onClick={() => {
                addNoteRequest("note", {
                  method: "POST",
                  mode: "cors",
                  cache: "no-cache",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Connection": "keep-alive",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                  },
                  body: JSON.stringify({ userId, name, body })
                });
              }}
            >
              Add Note
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
