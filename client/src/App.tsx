import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";

// Pages
import DancersPage from "@/pages/dancers";
import DancerDetailPage from "@/pages/dancer-detail";
import RoutinesPage from "@/pages/routines";
import RoutineDetailPage from "@/pages/routine-detail";
import CompetitionsPage from "@/pages/competitions";
import RunSheetPage from "@/pages/run-sheet";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/competitions" />} />
        
        <Route path="/dancers" component={DancersPage} />
        <Route path="/dancers/:id" component={DancerDetailPage} />
        
        <Route path="/routines" component={RoutinesPage} />
        <Route path="/routines/:id" component={RoutineDetailPage} />
        
        <Route path="/competitions" component={CompetitionsPage} />
        <Route path="/competitions/:id/run-sheet" component={RunSheetPage} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
