import React from 'react'

const ChatBotIframe: React.FC = () => {
   return (
      <iframe
         src="https://udify.app/chatbot/q8IhlWyFvq8S3CRI"
         style={{ width: '100%', height: '100%', minHeight: '700px' }}
         frameBorder="0"
         allow="microphone"
         title="Udify Chatbot"
      />
   )
}

export default ChatBotIframe
