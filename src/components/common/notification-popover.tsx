import { BellRing, CheckCircle, Clock, Info, X, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/utils/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message received',
    message: 'You have a new message from John Doe regarding the project update.',
    time: '5 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Task completed',
    message: 'The task "Update documentation" has been marked as completed.',
    time: '1 hour ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'System maintenance',
    message: 'Scheduled maintenance will occur tonight at 11 PM EST.',
    time: '2 hours ago',
    read: true,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Failed login attempt',
    message: 'There was a failed login attempt on your account from an unknown device.',
    time: '3 hours ago',
    read: true,
    type: 'error',
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getNotificationBg = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'warning':
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'error':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    default:
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
  }
};

export function NotificationPopover() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="group relative mr-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-colors duration-200 hover:border-(--color-primary)/30 hover:bg-muted/50"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <BellRing className="z-0 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            {unreadCount > 0 && (
              <span className="-top-2 -right-2 absolute z-10 flex h-4 w-4 items-center justify-center rounded-full bg-(--color-primary) font-medium text-[10px] text-white shadow-sm">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0" sideOffset={4}>
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <BellRing className="mb-2 h-8 w-8" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={cn(
                    'relative flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50',
                    !notification.read && 'font-semibold',
                    getNotificationBg(notification.type)
                  )}
                  onClick={() => markAsRead(notification.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      markAsRead(notification.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex shrink-0 items-start pt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-6 w-6 p-0 opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                    onClick={e => {
                      e.stopPropagation();
                      clearNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="border-t p-2">
            <Button variant="ghost" className="w-full justify-center text-sm" size="sm">
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
