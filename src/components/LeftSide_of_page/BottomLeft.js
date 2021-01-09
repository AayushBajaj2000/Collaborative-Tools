import React from 'react';
import TabFile from "./TabFile";

// Component which contains the Different tabs for the whiteboard and the notepad
function BottomLeft() {
    return (
        <div
        style={{
          flex: "1 1 0%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Main component which contains the tabs for each thing*/}
        <TabFile />
      </div>
    )
}

export default BottomLeft
