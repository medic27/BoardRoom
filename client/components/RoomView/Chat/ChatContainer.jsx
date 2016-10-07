import React from 'react';
import ChatForm from './ChatForm.jsx';
import ChatWindow from './ChatWindow.jsx';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    //this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  // handleMessageSubmit(message) {
  //   const { messages } = this.state;
  //   messages.push(message);
  //   this.setState({ messages });
  // }


  render() {
    return (
      <div>
        <ChatWindow messages={this.props.messages || []} />
        <ChatForm
          onChatMessageSubmit={this.props.onChatMessageSubmit}
        />
      </div>
    );
  }
}
