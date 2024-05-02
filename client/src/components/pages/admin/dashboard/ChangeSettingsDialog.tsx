import { GearIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVenueSettings, updateVenueSettings } from "@/api/venueSettings";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";
import {
  NewVenueSettings,
  VenueSettings,
  venueSettingsSchema,
} from "@server/src/schemas";
import { useEffect, useState } from "react";
import { formatFieldName } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function ChangeVenueSettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    data: venueSettings,
    isLoading,
    isError,
  } = useQuery<VenueSettings>({
    queryKey: ["venueSettings"],
    queryFn: getVenueSettings,
  });
  const settingsFields = Object.keys(venueSettings ?? []);

  const updateSettings = useMutation({
    mutationFn: updateVenueSettings,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["venueSettings"] });
      toast({
        title: "Success",
        description: "Venue settings updated",
      });
    },
  });

  const form = useForm<NewVenueSettings>({
    resolver: zodResolver(venueSettingsSchema),
    defaultValues: venueSettings,
  });
  useEffect(() => {
    if (venueSettings) {
      form.reset(venueSettings);
    }
  }, [venueSettings]);

  function onSubmit(values: NewVenueSettings) {
    console.log("SUbmitting venue settings: ", values);
    updateSettings.mutate(values);
  }
  const fields = settingsFields
    .filter((v) => !["id", "createdAt", "updatedAt"].includes(v))
    .map((settingField) => (
      <FormField
        key={settingField}
        control={form.control}
        name={settingField as keyof NewVenueSettings}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize">
              {formatFieldName(settingField)}
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder={settingField}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));

  if (isError) return <Error message="Cannot load Venue settings" />;

  return (
    <div className="ml-auto flex items-center gap-1">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" className="h-8 gap-1">
            <GearIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[calc(100%-2rem)] overflow-y-auto">
          {isLoading && <Loading />}
          <DialogHeader>
            <DialogTitle>Change Venue Settings </DialogTitle>
            <DialogDescription>
              Love the shope love the customers
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {fields}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <DialogFooter>{JSON.stringify(form.formState.errors)}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
