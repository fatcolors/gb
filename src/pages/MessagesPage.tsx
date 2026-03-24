import { useState } from 'react'
import { Search, Filter, Phone, Mail, Paperclip, Send } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import { conversations, messageThreads } from '../data/messages'
import { cn } from '../lib/utils'

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState('2')
  const thread = messageThreads[selectedId]

  return (
    <>
      <PageHeader
        title="Messages"
        description="Communicate with customers"
        badge={3}
      />

      <div className="flex flex-1 gap-0 min-h-0 bg-white border border-brand-50 rounded-2xl overflow-hidden">
        {/* Conversation List */}
        <div className="w-[360px] border-r border-brand-50 flex flex-col">
          <div className="flex items-center gap-2 p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-300" />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-brand-50 rounded-lg placeholder:text-brand-300 focus:outline-none focus:border-brand-300"
              />
            </div>
            <button className="p-2 border border-brand-50 rounded-lg bg-white hover:bg-brand-25 cursor-pointer">
              <Filter className="w-4 h-4 text-brand-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={cn(
                  'w-full text-left px-4 py-3 flex gap-3 border-l-2 cursor-pointer bg-transparent border-b border-brand-50',
                  selectedId === conv.id
                    ? 'border-l-orange-500 bg-orange-500/5'
                    : 'border-l-transparent hover:bg-brand-25'
                )}
              >
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {conv.isQuote ? '⟲' : (conv.initials || conv.name.substring(0, 2))}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-brand-800 truncate">{conv.name}</span>
                    <span className="text-xs text-brand-300 whitespace-nowrap ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-brand-300 truncate mt-0.5">{conv.subtitle}</p>
                </div>
                {conv.unread && (
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {thread ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-semibold">
                    {thread.contact.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-brand-800">{thread.contact.name}</h3>
                    </div>
                    <p className="text-xs text-brand-300 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success-500 inline-block" />
                      {thread.contact.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-brand-25 rounded-lg cursor-pointer bg-transparent border-none">
                    <Phone className="w-5 h-5 text-brand-300" />
                  </button>
                  <button className="p-2 hover:bg-brand-25 rounded-lg cursor-pointer bg-transparent border-none">
                    <Mail className="w-5 h-5 text-brand-300" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {thread.messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.date && (
                      <div className="text-center text-xs text-brand-300 mb-4">{msg.date}</div>
                    )}
                    <div className={cn('flex gap-3', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                      {msg.sender === 'them' && (
                        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          {msg.senderInitials}
                        </div>
                      )}
                      <div
                        className={cn(
                          'max-w-[70%] rounded-xl px-4 py-3 text-sm leading-5',
                          msg.sender === 'me'
                            ? 'bg-brand-25 text-brand-800'
                            : 'bg-white border border-brand-50 text-brand-800'
                        )}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <p className={cn(
                          'text-xs mt-2',
                          msg.sender === 'me' ? 'text-right text-brand-300' : 'text-brand-300'
                        )}>
                          {msg.time}
                        </p>
                      </div>
                      {msg.sender === 'me' && (
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
                          alt=""
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-6 py-4 border-t border-brand-50 flex items-center gap-3">
                <button className="p-2 hover:bg-brand-25 rounded-lg cursor-pointer bg-transparent border-none">
                  <Paperclip className="w-5 h-5 text-brand-300" />
                </button>
                <input
                  type="text"
                  placeholder="Type your message"
                  className="flex-1 px-4 py-2.5 text-sm bg-white border border-brand-50 rounded-lg placeholder:text-brand-300 focus:outline-none focus:border-brand-300"
                />
                <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-lg hover:bg-orange-500 cursor-pointer border-none">
                  Send <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-brand-300">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </>
  )
}
