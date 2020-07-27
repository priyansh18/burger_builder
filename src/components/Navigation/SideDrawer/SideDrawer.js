import React from "react";
import NavigationItems from "./../NavigationItems/NavigationItems";
import Logo from "./../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import BackDrop from "./../../UI/BackDrop/BackDrop";

const SideDrawer = ({ closed, show,isAuth }) => {
  // console.log("Open", show);
  // console.log("Closed", closed);
  let attachedClasses = [classes.SideDrawer, classes.Close];
  // console.log(attachedClasses);
  if (show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <div>
      <BackDrop show={show} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </div>
  );
};

export default SideDrawer;
