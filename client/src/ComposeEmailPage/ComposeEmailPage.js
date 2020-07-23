import React from "react";
import EmailForm from "./EmailForm/EmailForm";
import {Link} from "react-router-dom";

function ComposeEmailPage() {
  return (
    <div className="container-fluid">
      <div className={"row justify-content-center mt-5"}>
        <div className={"col-sm-6"}>
      <Link to="/manage">&#8592; Back</Link></div>
      </div>
      <EmailForm />
    </div>
  );
}

export default ComposeEmailPage;
