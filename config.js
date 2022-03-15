// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import Botmodified from './Botmodified.png';

const config = {
  botName: "Elsa",
  initialMessages: [createChatBotMessage(`Hello. What do you want to learn`, {
    widget: "options"
  })],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      
    }
  ]
}

export default config