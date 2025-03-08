
import { CompanyValuationChart } from "@/components/dashboard/CompanyValuationChart";
import { AIModelDominance } from "@/components/dashboard/AIModelDominance";
import { AccuracyRankings } from "@/components/dashboard/AccuracyRankings";
import { MarketShareChart } from "@/components/dashboard/MarketShareChart";
import { IndustryCitations } from "@/components/dashboard/IndustryCitations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Statistics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">AI Statistics</h1>
        
        <Tabs defaultValue="models">
          <TabsList>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="companies">AI Companies</TabsTrigger>
            <TabsTrigger value="economy">AI Economy</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total AI Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">876</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Valuation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1.4T</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32.7%</div>
            <p className="text-xs text-muted-foreground">+5.4% from last year</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CompanyValuationChart />
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <AIModelDominance />
        </Card>
        
        <Card className="md:col-span-1 lg:col-span-2">
          <AccuracyRankings />
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <MarketShareChart />
        </Card>
        
        <Card>
          <IndustryCitations />
        </Card>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More Statistics</Button>
      </div>
    </div>
  );
}
