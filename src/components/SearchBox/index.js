import NavButton from "components/Buttons/NavButton/index";
import Web3Context from "contexts/Web3Context";
import { useContext, useEffect, useState, Fragment } from "react";
import "./style.css";

import DividerTop from "../../assets/divider-top.png";

const SearchBox = ({ icon, ...rest }) => {
  return (
    <div className="search flex">
      {icon && <img src={icon} className="w-8 h-8 my-auto mr-3" />}
      <input type="text" {...rest} className="search-box overflow-auto" />
    </div>
  );
};
export default SearchBox;
