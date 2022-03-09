// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase()
      
      if(lowercase.includes("hello")){
        this.actionProvider.greet();
      }

      if(lowercase.includes("differential privacy") || lowercase.includes("dp")){
        this.actionProvider.handleDP();
      }

      if(lowercase.includes("epsilon") || lowercase.includes("privacy budget")){
        this.actionProvider.handleEpsilon();
      }
    }
  }
  
  export default MessageParser;