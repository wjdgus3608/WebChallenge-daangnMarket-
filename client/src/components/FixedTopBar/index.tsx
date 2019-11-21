import * as React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '~constants';
// @ts-ignore
import LogoImage from '~assets/logo-basic.svg';
import {useState} from "react";

function FixedTopBar(props:any) {
  const [selectedCategory,setCategory]=useState(props.category);
  const handleClick=()=>{
    props.filterClick();
  };
  return (
    <nav className="navbar nav-global fixed-top navbar-expand-sm">
      <div className="container">
        <Link to={PAGE_PATHS.PRODUCT_LISTS}>
          <img className="img-brand" alt="당근마켓" width="132"
               src={LogoImage} />
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" hidden={selectedCategory==-1?true:false}>
            <button className={"btn-filter "+(props.filterBtnState?'active':'')} onClick={handleClick}>
              <i className="material-icons ic-filter">filter_list</i>
            </button>
          </li>
          <li className="nav-item">
            <Link to={{pathname:PAGE_PATHS.PRODUCT_REGISTRATION, state:{category:selectedCategory}}}>
              <i className="material-icons ic-create">create</i>
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  );
}



export default FixedTopBar;
