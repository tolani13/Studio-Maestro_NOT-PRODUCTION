import { useStore } from "@/lib/data";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Users } from "lucide-react";
import { useState } from "react";

export default function RoutinesPage() {
  const routines = useStore((state) => state.routines);
  const [search, setSearch] = useState("");

  const filteredRoutines = routines.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.style.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Routines</h1>
        <p className="text-muted-foreground">
          Browse all studio routines and performances.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search routines (name, style)..."
          className="pl-9 bg-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoutines.map((routine) => (
          <Link key={routine.id} href={`/routines/${routine.id}`}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer group active:scale-[0.98] transition-transform">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-1">
                  <Badge variant="secondary" className="font-normal text-xs">
                    {routine.style}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {routine.duration}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {routine.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>{routine.dancerIds.length} Dancers</span>
                  </div>
                  <span>{routine.level} {routine.type}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
         {filteredRoutines.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No routines found.
          </div>
        )}
      </div>
    </div>
  );
}
