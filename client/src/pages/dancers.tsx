import { useStore, maskName } from "@/lib/data";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function DancersPage() {
  const dancers = useStore((state) => state.dancers);
  const [search, setSearch] = useState("");

  const filteredDancers = dancers.filter((d) =>
    `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dancers</h1>
        <p className="text-muted-foreground">
          Manage your roster and view individual schedules.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search dancers..."
          className="pl-9 bg-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDancers.map((dancer) => (
          <Link key={dancer.id} href={`/dancers/${dancer.id}`}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer active:scale-[0.98] transition-transform">
              <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {dancer.firstName[0]}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {maskName(dancer.firstName, dancer.lastName)}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Age {dancer.age}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {filteredDancers.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No dancers found.
          </div>
        )}
      </div>
    </div>
  );
}
