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
  "use server";

  const session = await getServerSession(authOptions);

  const file: File | null = formData.get("gossipCover") as unknown as File;

  const { title, content } = CreateGossip.parse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  const data = new FormData();
  data.append("title", title);
  data.append("content", content);
  if (file) data.append("gossipCover", file);

  await gossips.create(data, session);

  revalidatePath(paths.dashboard.gossips);
  redirect(paths.dashboard.gossips);
}

export async function deleteGossip(id: string) {
  "use server";

  await gossips.remove(id);
  revalidatePath(paths.dashboard.gossips);
}
