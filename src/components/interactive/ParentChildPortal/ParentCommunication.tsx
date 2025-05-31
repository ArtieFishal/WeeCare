import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePortal } from './PortalContext';
import { Message, Announcement, CalendarEvent } from './types';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

export default function ParentCommunication() {
  const { 
    childProfiles, 
    messages, 
    announcements, 
    calendarEvents,
    selectedChildId,
    saveMessage,
    saveAnnouncement,
    saveCalendarEvent
  } = usePortal();

  const [activeTab, setActiveTab] = useState("messages");
  const [newMessage, setNewMessage] = useState<Partial<Message>>({
    childId: selectedChildId || '',
    senderId: 'staff-1', // Default staff ID
    recipientId: '', // Will be set based on selected child's parent
    subject: '',
    content: '',
    read: false
  });
  
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    authorId: 'staff-1', // Default staff ID
    priority: 'normal',
    targetGroups: ['all'],
    publishDate: format(new Date(), 'yyyy-MM-dd'),
    readBy: []
  });
  
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endDate: format(new Date(Date.now() + 3600000), "yyyy-MM-dd'T'HH:mm"), // 1 hour later
    allDay: false,
    location: '',
    targetGroups: ['all'],
    requiresRsvp: false,
    reminders: []
  });

  // Filter messages for the selected child
  const filteredMessages = selectedChildId 
    ? messages.filter(msg => msg.childId === selectedChildId)
    : messages;

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.childId || !newMessage.subject || !newMessage.content) {
      alert('Please fill in all required fields');
      return;
    }

    // Find the primary contact for the selected child
    const childProfile = childProfiles.find(profile => profile.id === newMessage.childId);
    const primaryContact = childProfile?.contacts.find(contact => contact.primaryContact);
    
    if (!primaryContact) {
      alert('No primary contact found for this child');
      return;
    }

    const message: Message = {
      id: '',
      childId: newMessage.childId,
      senderId: newMessage.senderId || 'staff-1',
      recipientId: primaryContact.fullName, // Using name as ID for demo
      subject: newMessage.subject || '',
      content: newMessage.content || '',
      timestamp: new Date().toISOString(),
      read: false
    };

    saveMessage(message);
    
    // Reset form
    setNewMessage({
      childId: selectedChildId || '',
      senderId: 'staff-1',
      recipientId: '',
      subject: '',
      content: '',
      read: false
    });
  };

  // Handle creating a new announcement
  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content || !newAnnouncement.publishDate) {
      alert('Please fill in all required fields');
      return;
    }

    const announcement: Announcement = {
      id: '',
      title: newAnnouncement.title || '',
      content: newAnnouncement.content || '',
      authorId: newAnnouncement.authorId || 'staff-1',
      timestamp: new Date().toISOString(),
      priority: newAnnouncement.priority as 'normal' | 'important' | 'urgent' || 'normal',
      targetGroups: newAnnouncement.targetGroups || ['all'],
      publishDate: newAnnouncement.publishDate || format(new Date(), 'yyyy-MM-dd'),
      expiryDate: newAnnouncement.expiryDate,
      readBy: []
    };

    saveAnnouncement(announcement);
    
    // Reset form
    setNewAnnouncement({
      title: '',
      content: '',
      authorId: 'staff-1',
      priority: 'normal',
      targetGroups: ['all'],
      publishDate: format(new Date(), 'yyyy-MM-dd'),
      readBy: []
    });
  };

  // Handle creating a new calendar event
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const event: CalendarEvent = {
      id: '',
      title: newEvent.title || '',
      description: newEvent.description || '',
      startDate: newEvent.startDate || '',
      endDate: newEvent.endDate || '',
      allDay: newEvent.allDay || false,
      location: newEvent.location || '',
      targetGroups: newEvent.targetGroups || ['all'],
      requiresRsvp: newEvent.requiresRsvp || false,
      reminders: newEvent.reminders || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveCalendarEvent(event);
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: format(new Date(Date.now() + 3600000), "yyyy-MM-dd'T'HH:mm"),
      allDay: false,
      location: '',
      targetGroups: ['all'],
      requiresRsvp: false,
      reminders: []
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parent Communication</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Message List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {filteredMessages.length > 0 ? (
                      <div className="space-y-4">
                        {filteredMessages.map(message => (
                          <div key={message.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">{message.subject}</h3>
                              <span className="text-sm text-gray-500">
                                {new Date(message.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{message.content}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                              <span>To: {message.recipientId}</span>
                              <span>{message.read ? 'Read' : 'Unread'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4">No messages found</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* New Message Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Send New Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Child</label>
                        <Select 
                          value={newMessage.childId} 
                          onValueChange={(value) => setNewMessage({...newMessage, childId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a child" />
                          </SelectTrigger>
                          <SelectContent>
                            {childProfiles.map(child => (
                              <SelectItem key={child.id} value={child.id}>
                                {child.basicInfo.fullName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <Input 
                          value={newMessage.subject} 
                          onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                          placeholder="Message subject"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <Textarea 
                          value={newMessage.content} 
                          onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                          placeholder="Type your message here..."
                          rows={5}
                        />
                      </div>
                      
                      <Button onClick={handleSendMessage}>Send Message</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Announcements List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Announcements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {announcements.length > 0 ? (
                      <div className="space-y-4">
                        {announcements.map(announcement => (
                          <div key={announcement.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">{announcement.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded ${
                                announcement.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                announcement.priority === 'important' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {announcement.priority}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{announcement.content}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                              <span>Published: {new Date(announcement.timestamp).toLocaleDateString()}</span>
                              <span>For: {announcement.targetGroups.join(', ')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4">No announcements found</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* New Announcement Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Announcement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input 
                          value={newAnnouncement.title} 
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                          placeholder="Announcement title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <Textarea 
                          value={newAnnouncement.content} 
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                          placeholder="Announcement content..."
                          rows={5}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Priority</label>
                        <Select 
                          value={newAnnouncement.priority as string} 
                          onValueChange={(value) => setNewAnnouncement({
                            ...newAnnouncement, 
                            priority: value as 'normal' | 'important' | 'urgent'
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="important">Important</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Publish Date</label>
                        <Input 
                          type="date"
                          value={newAnnouncement.publishDate} 
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, publishDate: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiry Date (Optional)</label>
                        <Input 
                          type="date"
                          value={newAnnouncement.expiryDate} 
                          onChange={(e) => setNewAnnouncement({...newAnnouncement, expiryDate: e.target.value})}
                        />
                      </div>
                      
                      <Button onClick={handleCreateAnnouncement}>Create Announcement</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calendar Events List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {calendarEvents.length > 0 ? (
                      <div className="space-y-4">
                        {calendarEvents.map(event => (
                          <div key={event.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">{event.title}</h3>
                              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                                {event.allDay ? 'All Day' : 'Timed'}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{event.description}</p>
                            <div className="mt-2 text-sm">
                              <p>
                                <strong>When:</strong> {new Date(event.startDate).toLocaleDateString()} 
                                {!event.allDay && ` ${new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                                {' - '}
                                {new Date(event.endDate).toLocaleDateString() !== new Date(event.startDate).toLocaleDateString() && 
                                  `${new Date(event.endDate).toLocaleDateString()} `}
                                {!event.allDay && `${new Date(event.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                              </p>
                              {event.location && <p><strong>Where:</strong> {event.location}</p>}
                            </div>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                              <span>For: {event.targetGroups.join(', ')}</span>
                              <span>{event.requiresRsvp ? 'RSVP Required' : 'No RSVP Needed'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4">No events found</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* New Event Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input 
                          value={newEvent.title} 
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          placeholder="Event title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <Textarea 
                          value={newEvent.description} 
                          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                          placeholder="Event description..."
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="allDay"
                          checked={newEvent.allDay}
                          onChange={(e) => setNewEvent({...newEvent, allDay: e.target.checked})}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="allDay" className="text-sm font-medium">All Day Event</label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date/Time</label>
                          <Input 
                            type={newEvent.allDay ? "date" : "datetime-local"}
                            value={newEvent.startDate} 
                            onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">End Date/Time</label>
                          <Input 
                            type={newEvent.allDay ? "date" : "datetime-local"}
                            value={newEvent.endDate} 
                            onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <Input 
                          value={newEvent.location} 
                          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                          placeholder="Event location"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="requiresRsvp"
                          checked={newEvent.requiresRsvp}
                          onChange={(e) => setNewEvent({...newEvent, requiresRsvp: e.target.checked})}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="requiresRsvp" className="text-sm font-medium">Requires RSVP</label>
                      </div>
                      
                      <Button onClick={handleCreateEvent}>Create Event</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
