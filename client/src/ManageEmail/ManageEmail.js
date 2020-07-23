import React, {useContext, useState} from "react";
import {Nav, NavItem, NavLink} from "reactstrap";
import {ReceiverContext} from "../context/receiverContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import EmailList from "./EmailList/EmailList";
import SelectReceiver from "./SelectReceiver/SelectReceiver";
import "./ManageEmail.scss";

function ManageEmail() {

  const receiverContext = useContext(ReceiverContext);
  const [activeTab, setActiveTab] = useState("inbox");

  return (
    <div className="manageEmail container-fluid">
      <SelectReceiver />
      {receiverContext.receiver && <>
        <Nav tabs className="mt-5">
          <NavItem>
            <NavLink
              className={activeTab === "inbox" ? "active" : ""}
              onClick={() => setActiveTab("inbox")}>
              Inbox
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "sent" ? "active" : ""}
              onClick={() => setActiveTab("sent")}>
              Sent
            </NavLink>
          </NavItem>
        </Nav>
        <EmailList filter={activeTab} allowDelete={activeTab === "inbox"}/>
      </>}
    </div>
  );
}

export default ManageEmail;
