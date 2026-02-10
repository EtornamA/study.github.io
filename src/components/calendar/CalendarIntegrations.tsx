import { useState, useEffect } from "react";
import { Mail, Calendar as CalendarIcon, Check, X, ExternalLink, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Event } from "@/types";
import { addDays, startOfDay } from "date-fns";
import { toast } from "sonner";

interface Integration {
  id: 'google' | 'outlook';
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  connected: boolean;
  email?: string;
  lastSynced?: Date;
}

export function CalendarIntegrations() {
  const { events, addEvent } = useAppStore();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'google',
      name: 'Google Calendar',
      description: 'Sync events from your Google Calendar',
      icon: CalendarIcon,
      color: 'bg-blue-500',
      connected: false,
    },
    {
      id: 'outlook',
      name: 'Outlook Calendar',
      description: 'Sync events from your Outlook/Microsoft 365 calendar',
      icon: Mail,
      color: 'bg-orange-500',
      connected: false,
    },
  ]);

  // Generate fake synced events when integration is connected
  useEffect(() => {
    integrations.forEach(integration => {
      if (integration.connected && integration.lastSynced) {
        // Check if we already added events for this integration
        const existingSyncedEvents = events.filter(e => 
          e.title.includes(integration.name) || e.title.includes('Synced')
        );
        
        if (existingSyncedEvents.length === 0) {
          // Add some fake synced events
          const today = startOfDay(new Date());
          const fakeEvents: Partial<Event>[] = [
            {
              id: `${integration.id}-event-1`,
              classId: 'synced-calendar',
              userId: 'user-1',
              title: `[${integration.name}] Team Meeting`,
              date: today,
              startTime: '10:00',
              endTime: '11:00',
              type: 'lecture',
              location: 'Synced from ' + integration.name,
              notes: [],
              createdAt: new Date(),
            },
            {
              id: `${integration.id}-event-2`,
              classId: 'synced-calendar',
              userId: 'user-1',
              title: `[${integration.name}] Project Review`,
              date: addDays(today, 1),
              startTime: '14:00',
              endTime: '15:00',
              type: 'lecture',
              location: 'Synced from ' + integration.name,
              notes: [],
              createdAt: new Date(),
            },
          ];
          
          fakeEvents.forEach(event => {
            if (event.id && event.classId && event.userId && event.title && event.date && event.startTime && event.endTime && event.type) {
              addEvent(event as Event);
            }
          });
        }
      }
    });
  }, [integrations, events, addEvent]);

  const toggleConnection = (id: 'google' | 'outlook') => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newConnected = !integration.connected;
        const integrationName = integration.name;
        
        if (newConnected) {
          toast.success(`${integrationName} connected successfully!`, {
            description: "Your calendar events are now syncing.",
          });
        } else {
          toast.info(`${integrationName} disconnected`, {
            description: "Calendar sync has been disabled.",
          });
        }
        
        return {
          ...integration,
          connected: newConnected,
          email: newConnected ? `john.adams@${id === 'google' ? 'gmail' : 'outlook'}.com` : undefined,
          lastSynced: newConnected ? new Date() : undefined,
        };
      }
      return integration;
    }));
  };

  const syncCalendar = (id: 'google' | 'outlook') => {
    const integration = integrations.find(i => i.id === id);
    if (!integration || !integration.connected) return;
    
    setIntegrations(integrations.map(integration => {
      if (integration.id === id && integration.connected) {
        toast.success(`Syncing ${integration.name}...`, {
          description: "Calendar events are being updated.",
        });
        return {
          ...integration,
          lastSynced: new Date(),
        };
      }
      return integration;
    }));
    
    // Simulate sync delay
    setTimeout(() => {
      toast.success(`${integration.name} synced successfully!`, {
        description: "Your calendar is up to date.",
      });
    }, 1000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Integrations</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Calendar Integrations</SheetTitle>
          <SheetDescription>
            Connect your external calendars to sync events automatically
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} className={cn(
                "transition-all",
                integration.connected && "border-primary/50 bg-primary/5"
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-white",
                        integration.color
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={integration.connected ? "default" : "secondary"}>
                      {integration.connected ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Connected
                        </span>
                      ) : (
                        "Not connected"
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {integration.connected ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Account</span>
                        <span className="font-medium">{integration.email}</span>
                      </div>
                      {integration.lastSynced && (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Last synced</span>
                            <span className="font-medium">
                              {integration.lastSynced.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Synced events</span>
                            <span className="font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              {events.filter(e => e.title.includes(integration.name) || e.title.includes('Synced')).length}
                            </span>
                          </div>
                        </>
                      )}
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={integration.connected}
                            onCheckedChange={() => toggleConnection(integration.id)}
                          />
                          <span className="text-sm font-medium">Sync enabled</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => syncCalendar(integration.id)}
                          className="gap-2"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Sync now
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleConnection(integration.id)}
                        className="w-full gap-2 text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => toggleConnection(integration.id)}
                      className="w-full gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Connect {integration.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This is a demo integration. In a production environment, 
            this would connect to your actual Google Calendar or Outlook account using OAuth.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

