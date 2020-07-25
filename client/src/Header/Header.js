import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ReceiverContext } from "../context/receiverContext";
import "./Header.scss";

function Header() {
  const { receiver } = useContext(ReceiverContext);

  return (
    <nav className=" header navbar navbar-dark bg-light">
      <h4>MeMail</h4>
      <div className="d-flex align-items-center">
        {receiver && <div>Logged in as {receiver}</div>}
        <Link className="addMailPlusIcon ml-2" to={"/compose"}>
          <FontAwesomeIcon icon={faPlusSquare} />
        </Link>
      </div>
    </nav>
  );
}

export default Header;
