import { useStore, maskName } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Calendar } from "lucide-react";
import { format, parse } from "date-fns";

export default function RoutineDetailPage() {
  const [match, params] = useRoute("/routines/:id");
  const routineId = params?.id;
  const routine = useStore((state) => state.routines.find((r) => r.id === routineId));
  const allDancers = useStore((state) => state.dancers);
  const allRunSheet = useStore((state) => state.runSheet);
  const getCompetition = useStore((state) => state.getCompetition);

  const dancers = routine 
    ? allDancers.filter((d) => routine.dancerIds.includes(d.id))
    : [];
    
  const slots = allRunSheet.filter((s) => s.routineId === routineId);

  if (!routine) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p>Routine not found.</p>
        <Link href="/routines" className="mt-4 text-primary hover:underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <Link
        href="/routines"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Routines
      </Link>

      <div className="flex flex-col space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className="text-sm px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90">
              {routine.style}
            </Badge>
            <span className="text-muted-foreground text-sm font-mono bg-secondary px-2 py-0.5 rounded">
              {routine.duration}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {routine.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {routine.level} {routine.type}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dancers Section */}
        <Card className="h-fit">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">Dancers ({dancers.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dancers.map((dancer) => (
                <Link key={dancer.id} href={`/dancers/${dancer.id}`}>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
                      {dancer.firstName[0]}
                    </div>
                    <span className="font-medium text-sm">
                      {maskName(dancer.firstName, dancer.lastName)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Section */}
        <Card className="h-fit">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">Performances</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {slots.map((slot) => {
                const competition = getCompetition(slot.competitionId);
                return (
                  <Link key={slot.id} href={`/competitions/${slot.competitionId}/run-sheet`}>
                  <div
                    className="flex flex-col border rounded-lg p-3 bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-semibold text-primary">
                          #{slot.orderNumber}
                        </span>
                        <span className="text-sm font-mono text-muted-foreground">
                          {slot.time} - {slot.day}
                        </span>
                    </div>
                    <div className="text-sm font-medium">{competition?.name || "Unknown Competition"}</div>
                    <div className="text-xs text-muted-foreground mt-1">{slot.stage}</div>
                  </div>
                  </Link>
                );
              })}
              {slots.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  No upcoming performances scheduled.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
