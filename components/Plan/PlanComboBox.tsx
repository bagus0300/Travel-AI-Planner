"use client";

import * as React from "react";
import {Check, CheckIcon, ChevronsUpDown} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {usePathname, useRouter} from "next/navigation";

export default function PlanComboBox() {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const planId = pathname.split("/")[2];
  const plans = useQuery(api.plan.getComboBoxPlansForAUser, {});

  if (!plans || !plans.length)
    return <div className="w-[300px] h-8 rounded-md bg-stone-200 animate-pulse" />;

  const getDisplayTitle = () => {
    const label = plans?.find((plan) => plan._id === planId)?.nameoftheplace ?? "Select Plan";
    return label;
  };

  return (
    <div className="sm:flex hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
            size="sm"
          >
            {getDisplayTitle()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Select Travel Plan..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {plans.map((plan) => (
                  <CommandItem
                    key={plan._id}
                    value={plan.nameoftheplace}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      let updatedUrl = pathname.replace(/\/plans\/[^\/]+/, "/plans/" + plan._id);
                      router.push(updatedUrl);
                    }}
                    className="cursor-pointer"
                  >
                    {plan.nameoftheplace}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        status === plan.nameoftheplace ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
