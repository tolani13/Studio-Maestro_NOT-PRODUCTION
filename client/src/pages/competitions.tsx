import { useStore } from "@/lib/data";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ClipboardList } from "lucide-react";

export default function CompetitionsPage() {
  const competitions = useStore((state) => state.competitions);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Competitions</h1>
        <p className="text-muted-foreground">
          Upcoming events and run sheets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {competitions.map((comp) => (
          <Card key={comp.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-xl">{comp.name}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-2">
                <MapPin className="h-3.5 w-3.5" />
                {comp.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary/70" />
                <span>{comp.dates}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-secondary/20">
              <Link href={`/competitions/${comp.id}/run-sheet`} className="w-full">
                <Button className="w-full gap-2 font-medium" size="lg">
                  <ClipboardList className="h-4 w-4" />
                  View Run Sheet
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
