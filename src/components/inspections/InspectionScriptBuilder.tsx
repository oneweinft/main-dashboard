import { useState } from "react";
import {
  Plus, Trash2, GripVertical, Save, Copy, Send, ChevronDown, ChevronUp,
  Home, Bath, Bed, UtensilsCrossed, Sofa, Car, Trees, DoorOpen, Lightbulb,
  Droplets, Wind, Flame, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export interface InspectionCheckItem {
  id: string;
  label: string;
  required: boolean;
}

export interface RoomScript {
  id: string;
  name: string;
  icon: string;
  instructions: string;
  checkItems: InspectionCheckItem[];
  estimatedMinutes: number;
  expanded: boolean;
}

const roomIcons: Record<string, React.ElementType> = {
  home: Home, bath: Bath, bed: Bed, kitchen: UtensilsCrossed,
  living: Sofa, garage: Car, outdoor: Trees, entry: DoorOpen,
  laundry: Droplets, hvac: Wind, hotwater: Flame, safety: ShieldCheck,
  lighting: Lightbulb,
};

const defaultRooms: RoomScript[] = [
  {
    id: "r1", name: "Front Entry & Exterior", icon: "entry", estimatedMinutes: 3, expanded: false,
    instructions: "Start at the front of the property. Pan the camera slowly across the front facade, driveway, letterbox, and entry path. Check for visible damage, garden condition, and external lighting.",
    checkItems: [
      { id: "c1", label: "Front door condition (locks, hinges, paint)", required: true },
      { id: "c2", label: "External walls & gutters visible", required: true },
      { id: "c3", label: "Garden / lawn condition", required: false },
      { id: "c4", label: "Letterbox & street number visible", required: false },
    ],
  },
  {
    id: "r2", name: "Living Room", icon: "living", estimatedMinutes: 3, expanded: false,
    instructions: "Enter the living area. Show the full room with a slow 360° pan. Focus on walls, ceiling, flooring, and windows. Point out any marks, damage, or items needing attention.",
    checkItems: [
      { id: "c5", label: "Walls — marks, holes, or damage", required: true },
      { id: "c6", label: "Ceiling — stains, cracks, or mould", required: true },
      { id: "c7", label: "Flooring condition", required: true },
      { id: "c8", label: "Windows & blinds operational", required: true },
      { id: "c9", label: "Light fittings working", required: false },
    ],
  },
  {
    id: "r3", name: "Kitchen", icon: "kitchen", estimatedMinutes: 4, expanded: false,
    instructions: "Show the kitchen benchtops, splashback, sink, and tapware. Open cupboards briefly. Show oven, cooktop, rangehood, and dishwasher if present. Run the tap to demonstrate water flow.",
    checkItems: [
      { id: "c10", label: "Benchtops & splashback clean and undamaged", required: true },
      { id: "c11", label: "Sink & tapware — no leaks or damage", required: true },
      { id: "c12", label: "Oven & cooktop working", required: true },
      { id: "c13", label: "Rangehood & exhaust fan", required: false },
      { id: "c14", label: "Cupboard doors & drawers functional", required: false },
      { id: "c15", label: "Dishwasher operational (if applicable)", required: false },
    ],
  },
  {
    id: "r4", name: "Bedroom 1 (Main)", icon: "bed", estimatedMinutes: 3, expanded: false,
    instructions: "Enter the main bedroom. Slow pan of walls, ceiling, flooring. Open wardrobe/robe to show condition. Check windows and blinds.",
    checkItems: [
      { id: "c16", label: "Walls, ceiling & flooring", required: true },
      { id: "c17", label: "Built-in wardrobe / robe condition", required: true },
      { id: "c18", label: "Windows, locks & blinds", required: true },
      { id: "c19", label: "Power points & light switches", required: false },
    ],
  },
  {
    id: "r5", name: "Bathroom", icon: "bath", estimatedMinutes: 4, expanded: false,
    instructions: "Show the full bathroom. Focus on tiles, grout, shower screen, tapware, toilet, and vanity. Run the shower briefly. Check for mould or water damage around the shower and ceiling.",
    checkItems: [
      { id: "c20", label: "Tiles & grout — no cracks or mould", required: true },
      { id: "c21", label: "Shower screen & tapware", required: true },
      { id: "c22", label: "Toilet — flush test, seat condition", required: true },
      { id: "c23", label: "Vanity & mirror", required: true },
      { id: "c24", label: "Exhaust fan operational", required: true },
      { id: "c25", label: "Towel rails & hooks", required: false },
    ],
  },
  {
    id: "r6", name: "Laundry", icon: "laundry", estimatedMinutes: 2, expanded: false,
    instructions: "Show the laundry tub, tapware, and any appliance connections. Check for leaks under the tub. Show walls and flooring.",
    checkItems: [
      { id: "c26", label: "Laundry tub & tapware", required: true },
      { id: "c27", label: "Hot & cold water connections", required: true },
      { id: "c28", label: "Dryer vent (if applicable)", required: false },
    ],
  },
  {
    id: "r7", name: "Safety & Compliance", icon: "safety", estimatedMinutes: 2, expanded: false,
    instructions: "Locate all smoke alarms and press the test button on each. Show the electrical switchboard. Confirm safety switch is labelled.",
    checkItems: [
      { id: "c29", label: "Smoke alarm — test each one", required: true },
      { id: "c30", label: "Safety switch — identified on switchboard", required: true },
      { id: "c31", label: "Fire extinguisher / blanket (if applicable)", required: false },
    ],
  },
];

let idCounter = 200;
const genId = () => `r${++idCounter}`;
const genCheckId = () => `c${++idCounter}`;

export default function InspectionScriptBuilder({
  onSendToRenter,
}: {
  onSendToRenter?: (rooms: RoomScript[]) => void;
}) {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<RoomScript[]>(defaultRooms);
  const [propertyLabel, setPropertyLabel] = useState("15 High St, QLD");

  const totalMinutes = rooms.reduce((s, r) => s + r.estimatedMinutes, 0);
  const totalChecks = rooms.reduce((s, r) => s + r.checkItems.length, 0);

  const toggleExpand = (id: string) =>
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, expanded: !r.expanded } : r)));

  const updateRoom = (id: string, patch: Partial<RoomScript>) =>
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const removeRoom = (id: string) => setRooms((prev) => prev.filter((r) => r.id !== id));

  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: genId(), name: "New Room", icon: "home", instructions: "", estimatedMinutes: 3,
        checkItems: [{ id: genCheckId(), label: "Check item", required: true }],
        expanded: true,
      },
    ]);
  };

  const addCheckItem = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, checkItems: [...r.checkItems, { id: genCheckId(), label: "", required: false }] }
          : r
      )
    );
  };

  const updateCheckItem = (roomId: string, checkId: string, patch: Partial<InspectionCheckItem>) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? { ...r, checkItems: r.checkItems.map((c) => (c.id === checkId ? { ...c, ...patch } : c)) }
          : r
      )
    );
  };

  const removeCheckItem = (roomId: string, checkId: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, checkItems: r.checkItems.filter((c) => c.id !== checkId) } : r
      )
    );
  };

  const handleSend = () => {
    onSendToRenter?.(rooms);
    toast({
      title: "Script Sent to Renter",
      description: `Room-by-room inspection guide (${rooms.length} rooms, ${totalChecks} items) sent for ${propertyLabel}.`,
    });
  };

  const handleSave = () => {
    toast({ title: "Script Saved", description: `Template saved with ${rooms.length} rooms.` });
  };

  const RoomIcon = ({ icon }: { icon: string }) => {
    const Icon = roomIcons[icon] || Home;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Room-by-Room Inspection Script
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Create step-by-step instructions for the renter to follow during virtual Zoom/Teams inspection
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {rooms.length} rooms · {totalChecks} checks · ~{totalMinutes} min
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Select value={propertyLabel} onValueChange={setPropertyLabel}>
            <SelectTrigger className="w-56 h-8 text-xs">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 High St, QLD">15 High St, QLD</SelectItem>
              <SelectItem value="24 Casterly Rock, NSW">24 Casterly Rock, NSW</SelectItem>
              <SelectItem value="8 Park Ave, VIC">8 Park Ave, VIC</SelectItem>
              <SelectItem value="56 Elm Cres, VIC">56 Elm Cres, VIC</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="text-xs gap-1 h-8" onClick={handleSave}>
            <Save className="h-3 w-3" /> Save
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1 h-8" onClick={() => toast({ title: "Copied", description: "Script copied to clipboard." })}>
            <Copy className="h-3 w-3" /> Copy
          </Button>
          <Button size="sm" className="text-xs gap-1 h-8" onClick={handleSend}>
            <Send className="h-3 w-3" /> Send to Renter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {rooms.map((room, idx) => (
          <div key={room.id} className="rounded-lg border border-border bg-card">
            {/* Room header */}
            <button
              className="w-full flex items-center gap-2 p-3 text-left hover:bg-muted/50 transition-colors"
              onClick={() => toggleExpand(room.id)}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                <RoomIcon icon={room.icon} />
              </span>
              <span className="text-sm font-medium text-foreground flex-1 truncate">
                {idx + 1}. {room.name}
              </span>
              <Badge variant="outline" className="text-[10px] shrink-0">
                ~{room.estimatedMinutes} min · {room.checkItems.length} items
              </Badge>
              {room.expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>

            {/* Expanded content */}
            {room.expanded && (
              <div className="px-3 pb-3 space-y-3 border-t border-border pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, { name: e.target.value })}
                    placeholder="Room name"
                    className="text-sm h-8"
                  />
                  <Select value={room.icon} onValueChange={(v) => updateRoom(room.id, { icon: v })}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(roomIcons).map((k) => (
                        <SelectItem key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={room.estimatedMinutes}
                      onChange={(e) => updateRoom(room.id, { estimatedMinutes: parseInt(e.target.value) || 1 })}
                      className="w-16 h-8 text-xs"
                      min={1}
                    />
                    <span className="text-xs text-muted-foreground">min</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeRoom(room.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                    PM Instructions for Renter
                  </label>
                  <Textarea
                    value={room.instructions}
                    onChange={(e) => updateRoom(room.id, { instructions: e.target.value })}
                    className="text-xs min-h-[60px] resize-none"
                    placeholder="Tell the renter exactly what to show and how to move the camera..."
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 block">
                    Checklist Items
                  </label>
                  <div className="space-y-1.5">
                    {room.checkItems.map((ci) => (
                      <div key={ci.id} className="flex items-center gap-2">
                        <Checkbox
                          checked={ci.required}
                          onCheckedChange={(v) => updateCheckItem(room.id, ci.id, { required: !!v })}
                        />
                        <Input
                          value={ci.label}
                          onChange={(e) => updateCheckItem(room.id, ci.id, { label: e.target.value })}
                          className="flex-1 h-7 text-xs"
                          placeholder="Check item description..."
                        />
                        {ci.required && <Badge className="text-[9px] bg-primary/10 text-primary border-primary/20 shrink-0">Required</Badge>}
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeCheckItem(room.id, ci.id)}>
                          <Trash2 className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs mt-1 gap-1 h-7" onClick={() => addCheckItem(room.id)}>
                    <Plus className="h-3 w-3" /> Add Check Item
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button variant="outline" className="w-full text-sm gap-2" onClick={addRoom}>
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </CardContent>
    </Card>
  );
}
