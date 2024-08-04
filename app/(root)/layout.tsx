import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  console.log(userId, "INI USER ID ========================>");

  if (!userId) {
    redirect("sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  });

  console.log(store, "INI STORE ================>");

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
