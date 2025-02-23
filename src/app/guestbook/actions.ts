"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { parseWithZod } from "@conform-to/zod";
import { getServerSession } from "next-auth";

import options from "@/config/auth";
import db from "@/db";
import guestbookEntries, {
  InsertGuestbookEntrySchema,
} from "@/db/schema/guestbook-entries";
import requireAuth from "@/utils/require-auth";

export async function createGuestbookEntry(
  prevState: unknown,
  formData: FormData,
) {
  // Make sure the user is logged in.
  await requireAuth();

  // Parse the form data.
  const submission = parseWithZod(formData, {
    schema: InsertGuestbookEntrySchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const session = (await getServerSession(options))!;

  // Once we know it's a valid guestbook entry...
  await db.insert(guestbookEntries).values({
    userId: session.user?.id,
    message: submission.value.message,
  });

  revalidatePath("/guestbook");
  redirect("/guestbook");
}
