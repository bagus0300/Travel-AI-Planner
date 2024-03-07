"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useAuth} from "@clerk/nextjs";
import {useTransition} from "react";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {generatePlanAction} from "@/lib/actions/generateplanAction";

export const formSchema = z.object({
  promptText: z.string().min(1, "I can't use my AI powers without your imagination"),
});

export type formSchemaType = z.infer<typeof formSchema>;

const NewPlanForm = () => {
  const {isSignedIn} = useAuth();
  if (!isSignedIn) return null;

  const [pending, startTransaction] = useTransition();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promptText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransaction(async () => {
      const planId = await generatePlanAction(values);

      if (planId === null) {
        console.log("Error received from server action");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="promptText"
          render={({field}) => (
            <FormItem>
              <FormLabel>Put your imagination</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 3 days trip to Mathura" {...field} disabled={pending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          aria-label="generate plan"
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Generating Travel Plan...</span>
            </>
          ) : (
            <span>Generate Plan</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewPlanForm;
