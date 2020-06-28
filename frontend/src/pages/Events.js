import React, { Component } from "react";
import "./Events.css";
import Modal from "../components/modal/Modal";
import Backdrop from "../components/backdrop/Backdrop";

class EventsPage extends Component {

  state = {
    creating:false
  };

  startCreateEventHandler = () =>{
    this.setState({creating:true});
  };

  modalConfirmHandler = () =>{
    this.setState({creating:false});
  }

  modalCancelHandler = () =>{
      this.setState({creating:false});
  }

  render() {
    return (
      <React.Fragment>
        {this.state.creating &&  
            <Backdrop></Backdrop>
        }  
        {this.state.creating &&  
        <Modal title="Add Event!" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
          <p>MOdal</p>
        </Modal>
        }
        <div className="events-control">
          <h1>Events</h1>
          <p>Add your Events!</p>
          <button className="create-event" onClick={this.startCreateEventHandler}>Create Event</button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
