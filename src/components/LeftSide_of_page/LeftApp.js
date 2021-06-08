import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, Tab } from "react-bootstrap";
import { AiOutlineCloseCircle, AiFillCaretDown } from "react-icons/all";
import Topleft from "./TopLeft";
import WhiteBoard from "./WhiteBoard";

function LeftApp() {
  // states are set for codingBoard,whiteboard,Notepad
  const [codingBoard, setCodingBoard] = useState(true);
  const [whiteBoard, setwhiteBoard] = useState(true);
  const [notepad, setNotePad] = useState(true);
  const [active, setActive] = useState("code");
  const [activeR, setActiveR] = useState("");

  // HandleThe remove of a tab changing the active tab
  const handleRemove = (name) => {
    if (name === "code") {
      setCodingBoard(false);
      if (active == "code") {
        if (whiteBoard[0] == true) {
          setActive("white");
        } else {
          setActive("note");
        }
      }
    } else if (name === "white") {
      setwhiteBoard(false);
      if (active == "white") {
        if (codingBoard[0] == true) {
          setActive("code");
        } else {
          setActive("note");
        }
      }
    } else if (name === "note") {
      setNotePad(false);
      if (active == "note") {
        if (codingBoard[0] == true) {
          setActive("code");
        } else {
          setActive("white");
        }
      }
    }
  };

  useEffect(() => {
    //Getting the reference to the codemirror editor
    //var myCodeMirror = document.querySelector(".CodeMirror").CodeMirror;
    //myCodeMirror.setSize("100%", "100%");

    if (
      codingBoard[1] == "right" ||
      whiteBoard[1] == "right" ||
      notepad[1] == "right"
    ) {
      //Selecting the resizer that is in the middle of both the editor and tabs
      const resizer = document.getElementById("dragMe");
      //Selecting the direction attribute of the resizer
      const direction = resizer.getAttribute("data-direction") || "horizontal";
      const prevSibling = resizer.previousElementSibling;
      const nextSibling = resizer.nextElementSibling;

      //The current position of mouse
      let x = 0;
      let y = 0;
      let prevSiblingHeight = 0;
      let prevSiblingWidth = 0;

      //Handle the mousedown event
      //that's triggered when user drags the resizer
      const mouseDownHandler = function (e) {
        //Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        const rect = prevSibling.getBoundingClientRect();
        prevSiblingHeight = rect.height;
        prevSiblingWidth = rect.width;

        //Attach the listeners to `document`
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        //How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        switch (direction) {
          case "vertical":
            //Mathematical formula for changing the height of the resize according to how much the user moves the mouse
            //Used for vertical dragging
            const h =
              ((prevSiblingHeight + dy) * 100) /
              resizer.parentNode.getBoundingClientRect().height;
            if (h > 15 && h < 81) {
              prevSibling.style.height = `${h}%`;
            }
            break;
          default:
            const w =
              ((prevSiblingWidth + dx) * 100) /
              resizer.parentNode.getBoundingClientRect().width;
            if (w > 15 && w < 81) {
              prevSibling.style.width = `${w}%`;
              nextSibling.style.width = `${100 - w}%`;
            }
            break;
        }

        //Options for the cursor type
        const cursor = direction === "horizontal" ? "col-resize" : "row-resize";
        resizer.style.cursor = cursor;
        document.body.style.cursor = cursor;

        prevSibling.style.userSelect = "none";
        prevSibling.style.pointerEvents = "none";

        nextSibling.style.userSelect = "none";
        nextSibling.style.pointerEvents = "none";
      };

      const mouseUpHandler = function () {
        resizer.style.removeProperty("cursor");
        document.body.style.removeProperty("cursor");

        prevSibling.style.removeProperty("user-select");
        prevSibling.style.removeProperty("pointer-events");

        nextSibling.style.removeProperty("user-select");
        nextSibling.style.removeProperty("pointer-events");

        //Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      //Attach the handler
      resizer.addEventListener("mousedown", mouseDownHandler);
    }
  }, [codingBoard, whiteBoard, notepad]);

  return (
    <div className="leftApp">
      <div style={{ width: "100%" }}>
        <Tab.Container transition={false} id="myTab" activeKey={active}>
          <Nav variant="tabs">
            {codingBoard ? (
              <Nav.Item>
                <div className="nav__item">
                  <Nav.Link
                    eventKey="code"
                    onClick={() => {
                      setActive("code");
                    }}
                  >
                    <p style={{ margin: "0px 2px 0px 0px" }}>Coding Board</p>
                  </Nav.Link>
                  <div className="icon__close">
                    <AiOutlineCloseCircle
                      onClick={() => {
                        handleRemove("code");
                      }}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
              </Nav.Item>
            ) : null}
            {whiteBoard ? (
              <Nav.Item>
                <div className="nav__item">
                  <Nav.Link
                    eventKey="white"
                    onClick={() => {
                      setActive("white");
                    }}
                  >
                    <p style={{ margin: "0px 2px 0px 0px" }}>White Board</p>
                  </Nav.Link>
                  <div className="icon__close">
                    <AiOutlineCloseCircle
                      onClick={() => {
                        handleRemove("white");
                      }}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
              </Nav.Item>
            ) : null}
            {notepad ? (
              <Nav.Item>
                <div className="nav__item">
                  <Nav.Link
                    eventKey="note"
                    onClick={() => {
                      setActive("note");
                    }}
                  >
                    <p style={{ margin: "0px 2px 0px 0px" }}>Notepad</p>
                  </Nav.Link>
                  <div className="icon__close">
                    <AiOutlineCloseCircle
                      onClick={() => {
                        handleRemove("note");
                      }}
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
              </Nav.Item>
            ) : null}
            {/* If nothing is selected do not show the add tab */}
            {codingBoard && whiteBoard && notepad ? null : (
              <NavDropdown title="+">
                {/* Only show if not open */}
                {codingBoard ? null : (
                  <>
                    <NavDropdown.Item onClick={() => setCodingBoard(true)}>
                      Coding Board
                    </NavDropdown.Item>
                  </>
                )}
                {whiteBoard ? null : (
                  <>
                    <NavDropdown.Item onClick={() => setwhiteBoard(true)}>
                      WhiteBoard
                    </NavDropdown.Item>
                  </>
                )}
                {notepad ? null : (
                  <>
                    <NavDropdown.Item onClick={() => setNotePad(true)}>
                      Notepad
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            )}
          </Nav>

          <Tab.Content style={{ height: "100%" }}>
            {codingBoard ? (
              <Tab.Pane className="tab__pane" eventKey="code">
                <Topleft />
              </Tab.Pane>
            ) : null}
            {whiteBoard ? (
              <Tab.Pane className="tab__pane" eventKey="white">
                <p style={{ color: "white" }}>WhiteBoard will be here</p>
              </Tab.Pane>
            ) : null}
            {notepad ? (
              <Tab.Pane className="tab__pane" eventKey="note">
                <WhiteBoard />
              </Tab.Pane>
            ) : null}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>

    // <div className="leftApp">
    //     {/* TopLeft is the part which contains the collaborative editor */}
    //     <Topleft />
    //     {/* Resizer */}
    //     <div className="resizer" id="dragMe" data-direction="vertical"></div>
    //     {/* BottomLeft is the part which contains the whiteboard and the notepad below the resizer */}
    //     <BottomLeft />
    // </div>
  );
}

export default LeftApp;
