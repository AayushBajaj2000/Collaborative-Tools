import React, { useEffect } from 'react';

import BottomLeft from "./BottomLeft";
import Topleft from "./TopLeft";

function LeftApp() {
    useEffect(() => {
        
        // Getting the reference to the codemirror editor
        var myCodeMirror = document.querySelector(".CodeMirror").CodeMirror;
        myCodeMirror.setSize("100%","100%");

        //Selecting the resizer that is in the middle of both the editor and tabs
        const resizer = document.getElementById("dragMe");
        //Selecting the direction attribute of the resizer
        const direction = resizer.getAttribute("data-direction") || "horizontal";
        const prevSibling = resizer.previousElementSibling;
        const nextSibling = resizer.nextElementSibling; 
    
        // The current position of mouse
        let x = 0;
        let y = 0;
        let prevSiblingHeight = 0;
        let prevSiblingWidth = 0;

        // Handle the mousedown event
        // that's triggered when user drags the resizer
        const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        const rect = prevSibling.getBoundingClientRect();
        prevSiblingHeight = rect.height;
        prevSiblingWidth = rect.width;

        // Attach the listeners to `document`
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
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
            prevSibling.style.width = `${w}%`;
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

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        };

        //Attach the handler
        resizer.addEventListener("mousedown",mouseDownHandler);

    }, []);

    return (
        <div className="leftApp">
            {/* TopLeft is the part which contains the collaborative editor */}
            <Topleft />
            {/* Resizer */}
            <div className="resizer" id="dragMe" data-direction="vertical"></div>
            {/* BottomLeft is the part which contains the whiteboard and the notepad below the resizer */}
            <BottomLeft />    
        </div>
    )
}

export default LeftApp
