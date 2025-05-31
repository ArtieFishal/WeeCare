import React, { useState } from 'react';

const ParentCommunicationPortal: React.FC = () => {
  const [messageType, setMessageType] = useState('announcement');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [customAttachment, setCustomAttachment] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [sentMessages, setSentMessages] = useState<Array<{
    id: string;
    type: string;
    title: string;
    content: string;
    recipients: string[];
    attachments: string[];
    date: string;
    scheduled: string;
    responses: number;
  }>>([
    {
      id: '1',
      type: 'announcement',
      title: 'Summer Program Registration Open',
      content: 'Registration for our summer program is now open! Space is limited, so please register by May 30th.',
      recipients: ['all_parents'],
      attachments: ['Summer Program Schedule.pdf', 'Registration Form.pdf'],
      date: '2025-05-15',
      scheduled: '',
      responses: 12
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Closed for Staff Development Day',
      content: 'Reminder that the center will be closed this Friday, May 23rd for staff professional development.',
      recipients: ['all_parents'],
      attachments: [],
      date: '2025-05-18',
      scheduled: '',
      responses: 24
    }
  ]);
  
  const messageTypes = [
    { id: 'announcement', label: 'Announcement', icon: '📢' },
    { id: 'reminder', label: 'Reminder', icon: '⏰' },
    { id: 'newsletter', label: 'Newsletter', icon: '📰' },
    { id: 'event', label: 'Event', icon: '🎉' },
    { id: 'individual', label: 'Individual Message', icon: '✉️' }
  ];
  
  const recipientGroups = [
    { id: 'all_parents', label: 'All Parents', count: 45 },
    { id: 'infant_room', label: 'Infant Room Parents', count: 8 },
    { id: 'toddler_room', label: 'Toddler Room Parents', count: 12 },
    { id: 'preschool_room', label: 'Preschool Room Parents', count: 15 },
    { id: 'prek_room', label: 'Pre-K Room Parents', count: 10 }
  ];
  
  const commonAttachments = [
    'Monthly Calendar.pdf',
    'Lunch Menu.pdf',
    'Permission Slip.pdf',
    'Newsletter Template.pdf',
    'Parent Handbook.pdf',
    'Health Form.pdf'
  ];
  
  const handleToggleRecipient = (recipientId: string) => {
    if (selectedRecipients.includes(recipientId)) {
      setSelectedRecipients(selectedRecipients.filter(id => id !== recipientId));
    } else {
      setSelectedRecipients([...selectedRecipients, recipientId]);
    }
  };
  
  const handleAddAttachment = () => {
    if (customAttachment && !attachments.includes(customAttachment)) {
      setAttachments([...attachments, customAttachment]);
      setCustomAttachment('');
    }
  };
  
  const handleRemoveAttachment = (attachment: string) => {
    setAttachments(attachments.filter(a => a !== attachment));
  };
  
  const handleToggleAttachment = (attachment: string) => {
    if (attachments.includes(attachment)) {
      setAttachments(attachments.filter(a => a !== attachment));
    } else {
      setAttachments([...attachments, attachment]);
    }
  };
  
  const handleSendMessage = () => {
    if (!messageTitle || !messageContent || selectedRecipients.length === 0) {
      alert('Please fill in all required fields (title, message, and recipients)');
      return;
    }
    
    const newMessage = {
      id: Date.now().toString(),
      type: messageType,
      title: messageTitle,
      content: messageContent,
      recipients: [...selectedRecipients],
      attachments: [...attachments],
      date: new Date().toISOString().split('T')[0],
      scheduled: scheduledDate,
      responses: 0
    };
    
    setSentMessages([newMessage, ...sentMessages]);
    
    // Reset form
    setMessageTitle('');
    setMessageContent('');
    setSelectedRecipients([]);
    setAttachments([]);
    setScheduledDate('');
    
    alert(scheduledDate 
      ? `Message scheduled to be sent on ${scheduledDate}` 
      : 'Message sent successfully!');
  };
  
  const handleClearForm = () => {
    if (confirm('Clear all message data? This cannot be undone.')) {
      setMessageTitle('');
      setMessageContent('');
      setSelectedRecipients([]);
      setAttachments([]);
      setScheduledDate('');
    }
  };
  
  const getMessageTypeIcon = (type: string) => {
    return messageTypes.find(t => t.id === type)?.icon || '';
  };
  
  const getMessageTypeLabel = (type: string) => {
    return messageTypes.find(t => t.id === type)?.label || type;
  };
  
  const getRecipientCount = (recipientIds: string[]) => {
    if (recipientIds.includes('all_parents')) {
      return recipientGroups.find(g => g.id === 'all_parents')?.count || 0;
    }
    
    return recipientIds.reduce((total, id) => {
      const group = recipientGroups.find(g => g.id === id);
      return total + (group?.count || 0);
    }, 0);
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="interactive-element p-4 border border-input rounded-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="mr-2">💬</span> Parent Communication Portal
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-card rounded-lg p-4 mb-6">
            <h4 className="font-bold mb-4">Compose Message</h4>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {messageTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setMessageType(type.id)}
                    className={`p-2 rounded-md transition-colors flex flex-col items-center justify-center ${
                      messageType === type.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <span className="text-xl mb-1">{type.icon}</span>
                    <span className="text-xs">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
                placeholder="Enter message title"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
                placeholder="Enter your message here..."
                rows={6}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Recipients</label>
              <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto mb-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {recipientGroups.map(group => (
                    <label key={group.id} className="flex items-center space-x-2 p-1 hover:bg-background rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(group.id)}
                        onChange={() => handleToggleRecipient(group.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{group.label} ({group.count})</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {selectedRecipients.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Sending to {getRecipientCount(selectedRecipients)} recipients
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Attachments</label>
              <div className="bg-muted p-3 rounded-md max-h-40 overflow-y-auto mb-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {commonAttachments.map(attachment => (
                    <label key={attachment} className="flex items-center space-x-2 p-1 hover:bg-background rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={attachments.includes(attachment)}
                        onChange={() => handleToggleAttachment(attachment)}
                        className="rounded"
                      />
                      <span className="text-sm">{attachment}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customAttachment}
                  onChange={(e) => setCustomAttachment(e.target.value)}
                  placeholder="Add custom attachment"
                  className="flex-1 p-2 border border-input rounded-l-md bg-background"
                />
                <button
                  onClick={handleAddAttachment}
                  disabled={!customAttachment}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-r-md hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {attachments.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {attachments.map(attachment => (
                    <span 
                      key={attachment} 
                      className="bg-muted px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      {attachment}
                      <button 
                        onClick={() => handleRemoveAttachment(attachment)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Schedule (Optional)</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border border-input rounded-md bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave blank to send immediately
              </p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleClearForm}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                disabled={!messageTitle || !messageContent || selectedRecipients.length === 0}
              >
                {scheduledDate ? 'Schedule Message' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-card rounded-lg p-4">
            <h4 className="font-bold mb-4">Recent Messages</h4>
            
            {sentMessages.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {sentMessages.map(message => (
                  <div key={message.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{getMessageTypeIcon(message.type)}</span>
                        <h5 className="font-medium">{message.title}</h5>
                      </div>
                      <span className="text-xs bg-primary/20 dark:bg-primary/40 px-2 py-0.5 rounded-full">
                        {getMessageTypeLabel(message.type)}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-2 line-clamp-2">{message.content}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {message.recipients.map(recipient => (
                        <span 
                          key={recipient} 
                          className="bg-background px-2 py-0.5 rounded-full text-xs"
                        >
                          {recipientGroups.find(g => g.id === recipient)?.label || recipient}
                        </span>
                      ))}
                    </div>
                    
                    {message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {message.attachments.map(attachment => (
                          <span 
                            key={attachment} 
                            className="bg-background px-2 py-0.5 rounded-full text-xs flex items-center"
                          >
                            📎 {attachment}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>
                        {message.scheduled 
                          ? `Scheduled for ${formatDate(message.scheduled)}` 
                          : `Sent ${formatDate(message.date)}`}
                      </span>
                      <span>{message.responses} responses</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No messages sent yet</p>
            )}
            
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => alert('Communication report generated!')}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentCommunicationPortal;
