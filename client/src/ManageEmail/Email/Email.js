import React, {useState} from "react";
import moment from "moment";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import "./Email.scss";

function Email(props) {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  return (
    <div className="email card row justify-content-center">
      <div className="card-body">
        <div className="card-title">
          <div className="card-subtitle text-muted">Sender: {props.mail.sender}</div>
          <div className="card-subtitle text-muted">Receiver: {props.mail.receiver}</div>
          <div className="card-subtitle text-muted mb-2">Subject: {props.mail.subject}</div>
          <div className="card-subtitle text-muted">Sent {moment(props.mail.creation_date).fromNow()}</div>
        </div>

        <div className="card-text">Message: {props.mail.message}</div>
      </div>
      {props.allowDelete && (
        isProcessingRequest
          ? <LoadingIndicator className="deleteMail" />
          : <button onClick={() => {
              setIsProcessingRequest(true);
              props.deleteMail(props.mail.id).catch((error) => {
                setIsProcessingRequest(false);
                return Promise.reject(error);
              });
            }} className="deleteMail btn">&times;</button>
        )}
    </div>
  );
}

export default Email;
