import NavButton from "components/Buttons/NavButton/index";
import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";

import DividerTop from "../../assets/divider-top.png";

const SearchBox = ({ ...rest }) => {
  return (
    <div>
      <input type="text" {...rest} className="search" />
    </div>
  );
};
export default SearchBox;
