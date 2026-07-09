import { db } from "./index";
import { users } from "./schema";

async function main() {
  await db
    .insert(users)
    .values({ email: "founder@cloonoperations.com", name: "Cloon Operations Advisory" })
    .onConflictDoNothing();
  console.log("Seed complete");
}

main().then(() => process.exit(0));
