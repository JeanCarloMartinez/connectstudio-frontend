import React, { useState } from 'react';

const MessageInbox = ({ onNavigate }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const mockChats = [
    {
      id: 1,
      participant: 'Juan Pérez',
      lastMessage: 'Claro, nos vemos el martes a las 4pm.',
      messages: [
        { id: 1, sender: 'Juan Pérez', text: 'Hola, ¿podrías ayudarme con cálculo?' },
        { id: 2, sender: 'Me', text: 'Claro, ¿qué tema en específico?' },
        { id: 3, sender: 'Juan Pérez', text: 'Integrales definidas.' },
        { id: 4, sender: 'Me', text: 'Perfecto, ¿qué día te viene bien?' },
        { id: 5, sender: 'Juan Pérez', text: 'El martes a las 4pm.' },
        { id: 6, sender: 'Me', text: 'Claro, nos vemos el martes a las 4pm.' },
      ],
    },
    {
      id: 2,
      participant: 'María García',
      lastMessage: 'Gracias por tu ayuda con física!',
      messages: [
        { id: 1, sender: 'Me', text: 'Hola María, ¿necesitas ayuda con física?' },
        { id: 2, sender: 'María García', text: 'Sí, con las leyes de Newton.' },
        { id: 3, sender: 'Me', text: 'Ok, te explico en un momento.' },
        { id: 4, sender: 'María García', text: 'Gracias por tu ayuda con física!' },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const updatedChats = mockChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, { id: chat.messages.length + 1, sender: 'Me', text: newMessage }],
              lastMessage: newMessage,
            }
          : chat
      );
      // En un caso real, aquí se actualizaría el estado global o se enviaría a un backend
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, { id: selectedChat.messages.length + 1, sender: 'Me', text: newMessage }],
        lastMessage: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex">
      <div className="max-w-6xl mx-auto flex w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Panel de Chats */}
        <div className="w-1/3 border-r border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mensajes</h2>
          {mockChats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full text-left p-4 rounded-xl mb-3 transition-all duration-200 ${
                selectedChat && selectedChat.id === chat.id
                  ? 'bg-indigo-100 border border-indigo-300' // Color principal cambiado
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <h3 className="font-semibold text-gray-800">{chat.participant}</h3>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </button>
          ))}
        </div>

        {/* Área de Chat Seleccionado */}
        <div className="w-2/3 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">{selectedChat.participant}</h3>
              </div>
              <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                {selectedChat.messages.map(message => (
                  <div
                    key={message.id}
                    className={`mb-4 ${message.sender === 'Me' ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-xl max-w-[70%] ${
                        message.sender === 'Me'
                          ? 'bg-indigo-600 text-white' // Color principal cambiado
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-gray-200 flex items-center">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" // Color principal cambiado
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-4 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold" // Color principal cambiado
                >
                  Enviar
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500 text-lg">
              Selecciona un chat para empezar a conversar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;