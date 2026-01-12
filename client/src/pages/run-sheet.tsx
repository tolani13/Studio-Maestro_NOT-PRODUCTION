import { useStore, maskName, RunSheetSlot } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, ChevronDown, ChevronRight, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RunSheetPage() {
  const [match, params] = useRoute("/competitions/:id/run-sheet");
  const competitionId = params?.id;
  const competition = useStore((state) => state.competitions.find((c) => c.id === competitionId));
  const runSheet = useStore((state) => state.runSheet);
  
  const competitionRunSheet = runSheet
    .filter((s) => s.competitionId === competitionId)
    .sort((a, b) => a.orderNumber - b.orderNumber);

  const getRoutine = useStore((state) => state.getRoutine);
  const getDancers = useStore((state) => state.getDancersForRoutine);

  if (!competition) {
    return <div className="p-8">Competition not found</div>;
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
          <div className="space-y-1">
            <Link
              href="/competitions"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Competitions
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {competition.name} Run Sheet
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4" />
              {competition.location}
            </div>
          </div>
          <div className="bg-secondary/50 px-4 py-2 rounded-lg text-center md:text-right">
            <div className="text-2xl font-bold text-primary">{competitionRunSheet.length}</div>
            <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Total Acts
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        {/* Desktop View (Hidden on Mobile) */}
        <div className="hidden md:block">
           <Table>
            <TableHeader>
              <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead className="w-[100px]">Time</TableHead>
                <TableHead>Routine</TableHead>
                <TableHead>Dancers</TableHead>
                <TableHead className="w-[150px]">Stage</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitionRunSheet.map((slot) => (
                <RunSheetRow
                  key={slot.id}
                  slot={slot}
                  routine={getRoutine(slot.routineId)!}
                  dancers={getDancers(slot.routineId)}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View (Card List) */}
        <div className="md:hidden divide-y">
           {competitionRunSheet.map((slot) => (
              <RunSheetCard
                key={slot.id}
                slot={slot}
                routine={getRoutine(slot.routineId)!}
                dancers={getDancers(slot.routineId)}
              />
           ))}
        </div>
      </div>
    </div>
  );
}

function RunSheetRow({ slot, routine, dancers }: { slot: RunSheetSlot, routine: any, dancers: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const updateSlotNotes = useStore((state) => state.updateSlotNotes);
  const [notes, setNotes] = useState(slot.notes || "");

  const handleSave = () => {
    updateSlotNotes(slot.id, notes);
    // Optionally show a toast here
  };

  return (
    <>
      <TableRow
        className={cn(
          "cursor-pointer hover:bg-muted/50 transition-colors",
          expanded && "bg-muted/30 border-b-0"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell className="font-mono font-bold text-lg text-primary">
          #{slot.orderNumber}
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-semibold">{slot.time}</span>
            <span className="text-xs text-muted-foreground">{slot.day}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-base">{routine?.name}</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                {routine?.style}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {routine?.level}
              </span>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="text-xs text-muted-foreground max-w-[200px] truncate">
            {dancers.map(d => maskName(d.firstName, d.lastName)).join(", ")}
          </div>
        </TableCell>
        <TableCell>
          <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
            {slot.stage}
          </span>
        </TableCell>
        <TableCell>
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell colSpan={6} className="p-4 pt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pl-2">
                <div>
                   <h4 className="text-sm font-medium mb-2 text-muted-foreground">Performers</h4>
                   <div className="flex flex-wrap gap-2">
                     {dancers.map(d => (
                       <Link key={d.id} href={`/dancers/${d.id}`}>
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-background border hover:bg-accent cursor-pointer transition-colors">
                           {maskName(d.firstName, d.lastName)}
                         </span>
                       </Link>
                     ))}
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                     <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                     {notes !== slot.notes && (
                       <Button size="sm" variant="ghost" onClick={handleSave} className="h-6 text-xs text-primary">
                         <Save className="h-3 w-3 mr-1" />
                         Save
                       </Button>
                     )}
                   </div>
                   <Textarea
                     placeholder="Add notes for this performance (e.g. 'Watch spacing', 'Bring prop')..."
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     onBlur={handleSave}
                     className="min-h-[80px] bg-background resize-none focus-visible:ring-1"
                   />
                </div>
             </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function RunSheetCard({ slot, routine, dancers }: { slot: RunSheetSlot, routine: any, dancers: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const updateSlotNotes = useStore((state) => state.updateSlotNotes);
  const [notes, setNotes] = useState(slot.notes || "");

  const handleSave = () => {
    updateSlotNotes(slot.id, notes);
  };

  return (
    <div className="p-4 bg-card">
       <div className="flex gap-3" onClick={() => setExpanded(!expanded)}>
          <div className="flex flex-col items-center min-w-[3.5rem] pt-1">
             <span className="text-xl font-bold text-primary">#{slot.orderNumber}</span>
             <span className="text-xs font-mono text-muted-foreground text-center leading-tight mt-1">{slot.time}<br/>{slot.day.substring(0,3)}</span>
          </div>
          <div className="flex-1">
             <div className="flex justify-between items-start">
               <h3 className="font-semibold text-lg leading-tight">{routine?.name}</h3>
               {expanded ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
             </div>
             <div className="flex flex-wrap gap-2 mt-1 mb-2">
               <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal">{routine?.style}</Badge>
               <span className="text-xs text-muted-foreground flex items-center">{routine?.level} {routine?.type}</span>
             </div>
             <div className="text-xs text-muted-foreground line-clamp-1">
                {dancers.map(d => d.firstName).join(", ")}
             </div>
          </div>
       </div>

       {expanded && (
         <div className="mt-4 pt-4 border-t space-y-4 animate-in slide-in-from-top-2 duration-200">
             <div>
               <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Dancers</label>
               <div className="flex flex-wrap gap-2">
                 {dancers.map(d => (
                   <Link key={d.id} href={`/dancers/${d.id}`}>
                     <span className="inline-flex items-center px-2 py-1 rounded bg-secondary text-xs hover:bg-secondary/80 transition-colors">
                       {maskName(d.firstName, d.lastName)}
                     </span>
                   </Link>
                 ))}
               </div>
             </div>
             
             <div>
                <div className="flex justify-between items-center mb-1.5">
                   <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Notes</label>
                   {notes !== slot.notes && <span className="text-[10px] text-primary font-medium animate-pulse">Unsaved</span>}
                </div>
                <Textarea
                     placeholder="Add notes..."
                     value={notes}
                     onChange={(e) => setNotes(e.target.value)}
                     onBlur={handleSave}
                     className="min-h-[80px] bg-secondary/30 resize-none text-sm"
                   />
             </div>
         </div>
       )}
    </div>
  )
}
