import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Y4XkAgir6dct@ep-polished-feather-a4piaotw-pooler.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require'
  }
});
