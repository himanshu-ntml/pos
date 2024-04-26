import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useVenueSettings } from "@/hooks/useVenueSettings";

import StopList from "./StopList";

export default function VenueDetails() {
  const { venueSettings } = useVenueSettings();
  console.log("VenueDetails", venueSettings);
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">Venue Details</CardTitle>
          <CardDescription>{new Date().toDateString()}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="icon" variant="outline" className="h-8 gap-1">
            <GearIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Venue Address</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Aces Court</span>
              <span>North Drive</span>
              <span>TW3 1AH, London</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Venue Manager</div>
            <div className="text-muted-foreground">Stasik Sebastik</div>
          </div>
        </div>
        <Separator className="my-4" />
        <StopList />
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Other Information</div>
          <p className="text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, dolores!
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
}
