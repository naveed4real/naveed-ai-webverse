
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, Mail, Trash2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  replied: boolean;
  created_at: string;
}

interface ContactManagerProps {
  onUpdate: () => void;
}

const ContactManager = ({ onUpdate }: ContactManagerProps) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Success", description: "Message status updated" });
      fetchMessages();
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleReplyToggle = async (id: string, replied: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ replied })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Success", description: `Marked as ${replied ? 'replied' : 'not replied'}` });
      fetchMessages();
      onUpdate();
    } catch (error) {
      console.error('Error updating reply status:', error);
      toast({
        title: "Error",
        description: "Failed to update reply status",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Message deleted successfully" });
      fetchMessages();
      onUpdate();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      });
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    // Mark as read if it's unread
    if (message.status === 'unread') {
      handleStatusUpdate(message.id, 'read');
    }
  };

  const filteredMessages = messages.filter(message => {
    if (statusFilter === 'all') return true;
    return message.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'destructive';
      case 'read': return 'secondary';
      case 'replied': return 'default';
      default: return 'outline';
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <Card className="bg-portfolio-dark border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white">Contact Messages</CardTitle>
            <CardDescription className="text-gray-300">Manage incoming contact form messages</CardDescription>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className="border border-white/10 rounded-lg p-4 bg-white/5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">{message.name}</h3>
                    <Badge variant={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    {message.replied && (
                      <Badge variant="outline">Replied</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mb-1">{message.email}</p>
                  <p className="text-sm font-medium mb-2 text-white">{message.subject}</p>
                  <p className="text-sm text-gray-300 line-clamp-2">{message.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(message.created_at).toLocaleDateString()} at {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewMessage(message)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Select
                    value={message.status}
                    onValueChange={(value) => handleStatusUpdate(message.id, value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant={message.replied ? "default" : "outline"}
                    onClick={() => handleReplyToggle(message.id, !message.replied)}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(message.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
              <DialogDescription>
                Full message from {selectedMessage?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div>
                  <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
                </div>
                <div>
                  <strong>Subject:</strong> {selectedMessage.subject}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <div>
                  <strong>Message:</strong>
                  <div className="mt-2 p-3 bg-gray-50 rounded border">
                    {selectedMessage.message}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedMessage.replied ? "default" : "outline"}
                    onClick={() => handleReplyToggle(selectedMessage.id, !selectedMessage.replied)}
                  >
                    {selectedMessage.replied ? 'Mark as Not Replied' : 'Mark as Replied'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                  >
                    Reply via Email
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContactManager;
