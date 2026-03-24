export interface Conversation {
  id: string
  name: string
  initials: string
  subtitle: string
  time: string
  unread: boolean
  isQuote?: boolean
}

export interface Message {
  id: string
  sender: 'them' | 'me'
  senderInitials?: string
  text: string
  time: string
  date?: string
}

export const conversations: Conversation[] = [
  {
    id: '1',
    name: 'QR-2025-001',
    initials: 'QR',
    subtitle: 'VLSFO (RMG 380) • 500 MT • MV Pacific Star • Ha...',
    time: '10 min ago',
    unread: true,
    isQuote: true,
  },
  {
    id: '2',
    name: 'Kate Moswich',
    initials: 'KM',
    subtitle: 'Hello, I have a very urgent situation here. I would like...',
    time: '21 min ago',
    unread: true,
  },
  {
    id: '3',
    name: 'Ramiro Witting',
    initials: 'RW',
    subtitle: 'Hello, I have a very urgent situation here. I would like...',
    time: '37 min ago',
    unread: true,
  },
  {
    id: '4',
    name: 'QR-2025-001',
    initials: 'QR',
    subtitle: 'VLSFO (RMG 380) • 500 MT • MV Pacific Star • Ha...',
    time: '1 hour ago',
    unread: false,
    isQuote: true,
  },
  {
    id: '5',
    name: 'Elijah VonRueden',
    initials: 'EV',
    subtitle: 'Hello, I have a very urgent situation here. I would like...',
    time: '1 hour ago',
    unread: false,
  },
  {
    id: '6',
    name: 'Lois Keeling',
    initials: 'LK',
    subtitle: 'Hello, I have a very urgent situation here. I would like...',
    time: '1 hour ago',
    unread: false,
  },
]

export const messageThreads: Record<string, { contact: { name: string; company: string; initials: string }; messages: Message[] }> = {
  '1': {
    contact: { name: 'QR-2025-001', company: 'Quote Request', initials: 'QR' },
    messages: [
      {
        id: 'm1',
        sender: 'them',
        senderInitials: 'QR',
        text: 'New quote request received for VLSFO (RMG 380), 500 MT.\n\nVessel: MV Pacific Star\nPort: Hamburg\nDelivery: 15.10.2025\n\nPlease review and provide pricing.',
        time: '10 minutes ago',
        date: 'Friday, 12.09.2025',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'We\'ve reviewed the request. Checking current VLSFO availability at Hamburg port.',
        time: '8 minutes ago',
      },
    ],
  },
  '2': {
    contact: { name: 'Kate Moswich', company: 'Marine Fuel Ltd', initials: 'KM' },
    messages: [
      {
        id: 'm1',
        sender: 'them',
        senderInitials: 'KM',
        text: 'Urgent delivery required for scheduled voyage. Please confirm availability and pricing ASAP.',
        time: '10 minutes ago',
        date: 'Friday, 12.09.2025',
      },
      {
        id: 'm2',
        sender: 'them',
        senderInitials: 'KM',
        text: 'Hi Kate,\n\nAvailability confirmed for the scheduled voyage. Current pricing details are as follows:\n\n– [Fuel type / Quantity / Price per MT]\n\nPlease confirm if you\'d like us to proceed with the nomination.',
        time: '16:24',
        date: 'Thursday, 11.09.2025',
      },
      {
        id: 'm3',
        sender: 'me',
        text: 'Thank you, Kate. We\'re checking current pricing for and will get back to you shortly.',
        time: '16:18',
      },
      {
        id: 'm4',
        sender: 'them',
        senderInitials: 'KM',
        text: 'We\'ve received your request and reached out to our suppliers for confirmation. We\'ll revert with availability and pricing as soon as possible.',
        time: '16:02',
      },
    ],
  },
  '3': {
    contact: { name: 'Ramiro Witting', company: 'Pacific Shipping Co.', initials: 'RW' },
    messages: [
      {
        id: 'm1',
        sender: 'them',
        senderInitials: 'RW',
        text: 'Hello, I have a very urgent situation here. I would like to request a quote for MGO delivery at Rotterdam port.\n\nVessel: MV Northern Spirit\nQuantity: 350 MT\nDelivery window: October 20-22, 2025',
        time: '37 minutes ago',
        date: 'Friday, 12.09.2025',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Hello Ramiro, thank you for reaching out. We can accommodate your request. Let me check MGO availability at Rotterdam for those dates.',
        time: '35 minutes ago',
      },
      {
        id: 'm3',
        sender: 'them',
        senderInitials: 'RW',
        text: 'That would be great. Please also let me know if you have VLSFO available. We might need 200 MT as well.',
        time: '30 minutes ago',
      },
    ],
  },
  '4': {
    contact: { name: 'QR-2025-001', company: 'Quote Request', initials: 'QR' },
    messages: [
      {
        id: 'm1',
        sender: 'them',
        senderInitials: 'QR',
        text: 'Quote request update: VLSFO (RMG 380) • 500 MT • MV Pacific Star\n\nStatus: Awaiting supplier confirmation\nPort: Hamburg\nDelivery: 15.10.2025',
        time: '1 hour ago',
        date: 'Thursday, 11.09.2025',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Confirmed. We have allocated stock for this order. Final pricing will be sent within 2 hours.',
        time: '55 minutes ago',
      },
      {
        id: 'm3',
        sender: 'them',
        senderInitials: 'QR',
        text: 'Thank you for the quick response. The fleet manager has been notified.',
        time: '50 minutes ago',
      },
    ],
  },
  '5': {
    contact: { name: 'Elijah VonRueden', company: 'Atlantic Bunkers Inc.', initials: 'EV' },
    messages: [
      {
        id: 'm1',
        sender: 'them',
        senderInitials: 'EV',
        text: 'Hello, I have a very urgent situation here. I would like to discuss bulk pricing for our Q4 fuel requirements.\n\nWe\'re looking at approximately 2,500 MT across HSFO and VLSFO for Singapore and Rotterdam.',
        time: '1 hour ago',
        date: 'Wednesday, 10.09.2025',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Hi Elijah, thanks for reaching out. Bulk orders of that volume typically qualify for our tiered pricing. Let me prepare a detailed breakdown.',
        time: '58 minutes ago',
      },
      {
        id: 'm3',
        sender: 'them',
        senderInitials: 'EV',
        text: 'Perfect. Could you also include delivery scheduling options? We need flexibility around delivery windows.',
        time: '45 minutes ago',
      },
      {
        id: 'm4',
        sender: 'me',
        text: 'Absolutely. I\'ll include flexible delivery windows in the proposal. We can accommodate 3-5 day delivery windows for both ports.',
        time: '40 minutes ago',
      },
    ],
  },
  '6': {
    contact: { name: 'Lois Keeling', company: 'Global Maritime Services', initials: 'LK' },
    messages: [
      {
        id: 'm1',
        sender: 'them',
        senderInitials: 'LK',
        text: 'Hello, I have a very urgent situation here. I would like to inquire about your Bio Fuel B30 product availability.\n\nOur fleet is transitioning to greener fuel options and we need a reliable supplier for Rotterdam and Antwerp.',
        time: '1 hour ago',
        date: 'Wednesday, 10.09.2025',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Hi Lois, great to hear about your fleet\'s sustainability initiative! We have Bio Fuel B30 readily available at both Rotterdam and Antwerp.\n\nCurrent stock levels are strong, and we can support regular scheduled deliveries.',
        time: '55 minutes ago',
      },
      {
        id: 'm3',
        sender: 'them',
        senderInitials: 'LK',
        text: 'That\'s encouraging. Can you send over the latest specifications and pricing for Bio B30? We need ISO 8217 compliance documentation as well.',
        time: '48 minutes ago',
      },
    ],
  },
}
