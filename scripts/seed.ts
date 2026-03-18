import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { questions } from "../src/db/schema";
import questionsData from "../data/questions.json";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log(`Seeding ${questionsData.length} questions...`);

  for (const q of questionsData) {
    await db.insert(questions).values({
      category: q.category,
      question: q.question,
      choices: q.choices,
      answerIndex: q.answer_index,
      explanation: q.explanation,
    });
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
