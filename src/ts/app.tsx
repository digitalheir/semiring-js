import * as React from "react";
import {render} from "react-dom";
import {} from "material-components-web";
import {SemiringDemo} from "./components/SemiringDemo";

const mountPoint = document.getElementById("mount-point");
if (mountPoint) render(
        <SemiringDemo/>,
        mountPoint
    );
