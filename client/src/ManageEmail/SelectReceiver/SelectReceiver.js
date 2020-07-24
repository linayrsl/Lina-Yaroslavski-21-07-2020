import React, {useContext} from "react";
import {ReceiverContext} from "../../context/receiverContext";

function SelectReceiver(props) {

  const receiverContext = useContext(ReceiverContext);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      receiverContext.setReceiver(event.target.elements["user"].value);
    }} className="form-inline mt-5">
      <label htmlFor="user" className="col-form-label mr-2">User Id:</label>
      <input type="text" className="form-control mr-1" id="user" name="user" defaultValue={receiverContext.receiver || ""}/>
      <button type="submit" className="btn btn-dark mt-1 mt-sm-0">Impersonate</button>
    </form>
  );
}

export default SelectReceiver;
