import React from "react";
import FoodContainer3DComponent from "./components/FoodContainer3D";

// This file serves as a bridge to import the component from the components folder
const FoodContainer3D = (props) => {
  return <FoodContainer3DComponent {...props} />;
};

export default FoodContainer3D;
