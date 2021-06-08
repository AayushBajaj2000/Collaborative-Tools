import React, { useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { useStateValue } from "../../StateProvider";
import { useParams } from "react-router";

Quill.register("modules/cursors", QuillCursors);

function WhiteBoard() {
  let { roomID } = useParams();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      `${roomID}`,
      ydoc
    );
    const ytext = ydoc.getText("quill");

    var toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: ["white"] }],
      ["clean"], // remove formatting button
    ];

    const editor = new Quill("#test", {
      modules: {
        cursors: true,
        toolbar: toolbarOptions,
        history: {
          userOnly: true,
        },
      },
      placeholder: "Start collaborating...",
      theme: "snow", // or 'bubble'
    });

    const binding = new QuillBinding(ytext, editor);

    const cursors = editor.getModule("cursors");
    cursors.createCursor(0, user, "green");

    user
      ? provider.awareness.setLocalStateField("user", {
          name: `${user}`,
          color: "green",
        })
      : provider.awareness.setLocalStateField("user", {
          name: "Aayush",
          color: "green",
        });
  }, []);
  return (
    <div id="white_container">
      <div id="test">
        <p>Hello World!</p>
        <p>
          Some initial <strong>bold</strong> text
        </p>
        <p>
          <br />
        </p>
      </div>
    </div>
  );
}

export default WhiteBoard;
