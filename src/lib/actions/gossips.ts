"use server";

import { z } from "zod";
import gossips from "../requests/gossips";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  comments: z.array(z.string()),
  imageUrl: z.string().optional(),
  author: z.string(),
  likes: z.array(z.string()),
  createdAt: z.string(),
});

const CreateGossip = FormSchema.omit({
  id: true,
  comments: true,
  imageUrl: true,
  author: true,
  likes: true,
  createdAt: true,
});

export async function createGossip(formData: FormData) {
  const session = await getServerSession(authOptions);
  const { title, content } = CreateGossip.parse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  await gossips.create({ title, content }, session);
  revalidatePath(paths.dashboard.gossips);
  redirect(paths.dashboard.gossips);
}

export async function deleteGossip(id: string) {
  await gossips.remove(id);
  revalidatePath(paths.dashboard.gossips);
}
