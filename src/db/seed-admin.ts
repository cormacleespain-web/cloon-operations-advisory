import bcrypt from "bcryptjs";

import { db } from "./index";
import { adminUsers } from "./schema";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!email || !password) {
    console.error(
      "Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD in .env.local before running this script."
    );
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("ADMIN_INITIAL_PASSWORD must be at least 12 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db
    .insert(adminUsers)
    .values({ email, passwordHash })
    .onConflictDoUpdate({
      target: adminUsers.email,
      set: { passwordHash, updatedAt: new Date() },
    });

  console.log(`Admin user ready: ${email}`);
  console.log("You can now remove ADMIN_INITIAL_PASSWORD from .env.local.");
}

main().then(() => process.exit(0));
