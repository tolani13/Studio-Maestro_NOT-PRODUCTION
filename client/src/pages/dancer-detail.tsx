import { useStore, maskName } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, ArrowLeft } from "lucide-react";

export default function DancerDetailPage() {
  const [match, params] = useRoute("/dancers/:id");
  const dancerId = params?.id;
  const dancer = useStore((state) => state.dancers.find((d) => d.id === dancerId));
  const allRoutines = useStore((state) => state.routines);
  
  const routines = allRoutines
    .filter((r) => r.dancerIds.includes(dancerId!))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!dancer) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p>Dancer not found.</p>
        <Link href="/dancers" className="mt-4 text-primary hover:underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <Link
        href="/dancers"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dancers
      </Link>

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {dancer.firstName[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {maskName(dancer.firstName, dancer.lastName)}
              </h1>
              <div className="text-muted-foreground flex items-center gap-2 mt-1">
                <span className="inline-flex items-center">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  Age {dancer.age}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {routines.length} Routines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Routines</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {routines.map((routine) => (
            <Link key={routine.id} href={`/routines/${routine.id}`}>
              <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-primary/40">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium text-primary">
                      {routine.name}
                    </CardTitle>
                    <Badge variant="outline">{routine.style}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Music className="h-3.5 w-3.5" />
                      {routine.type}
                    </div>
                    <div>{routine.level}</div>
                    <div>{routine.duration} min</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {routines.length === 0 && (
             <div className="col-span-full py-8 text-center text-muted-foreground border border-dashed rounded-lg">
               No routines assigned yet.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
