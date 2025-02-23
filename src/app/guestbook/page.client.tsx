"use client";

import { useActionState } from "react";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, Textarea } from "@heroui/react";

import { InsertGuestbookEntrySchema } from "@/db/schema/guestbook-entries";

import { createGuestbookEntry } from "./actions";

export default function GuestbookClient() {
  const [lastResult, action] = useActionState(createGuestbookEntry, undefined);
  const [form, fields] = useForm({
    // Sync the results of last submission.
    lastResult,

    // Reuse the validation logic on the client.
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InsertGuestbookEntrySchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form
      className="mt-4 flex flex-col gap-2"
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
    >
      <Textarea
        label="Message"
        key={fields.message.key}
        name={fields.message.name}
        placeholder="Leave a message..."
        className="w-full"
        isInvalid={!fields.message.valid}
        errorMessage={fields.message.errors}
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
