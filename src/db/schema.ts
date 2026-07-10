import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Admin CMS ---

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// key = hero | services | approach | about | positioning | contact | navigation | footer | settings
export const contentSections = pgTable("content_sections", {
  key: text("key").primaryKey(),
  draft: jsonb("draft"),
  published: jsonb("published"),
  draftSavedAt: timestamp("draft_saved_at"),
  publishedAt: timestamp("published_at"),
});

export const contentRevisions = pgTable(
  "content_revisions",
  {
    id: serial("id").primaryKey(),
    sectionKey: text("section_key").notNull(),
    data: jsonb("data").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("revisions_section_idx").on(t.sectionKey, t.createdAt)]
);

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  pathname: text("pathname").notNull().unique(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  alt: text("alt").notNull().default(""),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// identifier = "email:<address>" or "ip:<address>"
export const loginAttempts = pgTable("login_attempts", {
  identifier: text("identifier").primaryKey(),
  count: integer("count").notNull().default(0),
  resetAt: timestamp("reset_at").notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  adminUserId: integer("admin_user_id")
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
