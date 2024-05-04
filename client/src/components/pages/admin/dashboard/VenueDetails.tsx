import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import StopList from "./StopList";

import { useQuery } from "@tanstack/react-query";
import { getVenueSettings } from "@/api/venueSettings";
import { VenueSettings } from "@server/src/schemas";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";

export default function VenueDetails() {
  const {
    data: venueSettings,
    isLoading,
    isError,
  } = useQuery<VenueSettings>({
    queryKey: ["venueSettings"],
    queryFn: getVenueSettings,
  });
  if (isError) return <Error message="Fail to fetch venue settings" />;
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Venue Details
          </CardTitle>
          <CardDescription>{new Date().toDateString()}</CardDescription>
        </div>
      </CardHeader>
      {isLoading ? (
        <Loading />
      ) : (
        <CardContent className="p-6 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <div className="font-semibold">Address</div>
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{venueSettings?.address}</span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Website</div>
              <div className="text-muted-foreground">
                {venueSettings?.website}
              </div>
            </div>
            <div>
              <div className="font-semibold">Phone Number</div>
              <div className="text-muted-foreground">
                {venueSettings?.phone}
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <StopList />
          <Separator className="my-4" />
          <section className="grid gap-3">
            <div className="font-semibold">Capacity Information</div>

            <div className="flex justify-evenly">
              <div>
                <p className="font-semibold">Capacity</p>
                <p className="text-muted-foreground">
                  {venueSettings?.capacity}
                </p>
              </div>
              <div>
                <p className="font-semibold">Amenities</p>
                <p className="text-muted-foreground">
                  {venueSettings?.amenities}
                </p>
              </div>
              <div>
                <p className="font-semibold">Service Fee</p>
                <p className="text-muted-foreground">
                  {venueSettings?.serviceFee}
                </p>
              </div>
            </div>
          </section>
        </CardContent>
      )}
      {venueSettings?.updatedAt && (
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime="2023-11-23">
              {format(venueSettings.updatedAt, "dd MMM yy")}
            </time>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
