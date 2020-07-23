import React from "react";
import "./Email.scss";

function Email(props) {

  return (
    <div className="email card row justify-content-center">
      <div className="card-body">
        <div className="card-title">
          <div className="card-subtitle text-muted">Sender: {props.mail.sender}</div>
          <div className="card-subtitle text-muted">Receiver: {props.mail.receiver}</div>
          <div className="card-subtitle text-muted">Subject: {props.mail.subject}</div>
        </div>

        <div className="card-text">Message: {props.mail.message}</div>
      </div>
      {props.allowDelete &&
      <button onClick={() => props.deleteMail(props.mail.id)} className="deleteMail btn">&times;</button>}
    </div>
  );
}

export default Email;
