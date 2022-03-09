// ActionProvider starter code
class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }

   greet = () => {
      const message = this.createChatBotMessage("Hello friend! ")
      this.addMessageToState(message);
   }

   handleDP = () => {
     const message = this.createChatBotMessage("Differential privacy (DP) is a system for publicly sharing information about a dataset while withholding information about individuals in the dataset.")
     this.addMessageToState(message)
   }

   handleEpsilon = () =>{
     const message = this.createChatBotMessage("Epsilon (Privacy budget) is a metric for privacy loss and it is used to determine amountof noise to be injected into the dataset.")
     this.addMessageToState(message)
   }

   addMessageToState = (message) =>{
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
   };
 }
 
 export default ActionProvider;