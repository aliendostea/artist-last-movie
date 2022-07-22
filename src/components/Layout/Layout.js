import { Fragment } from "react";

const Layout = (props) => {
  return (
    <Fragment>
      <main className="main-content">{props.children}</main>
    </Fragment>
  );
};

export default Layout;
