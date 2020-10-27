import { Router } from "express";
import db from "../knex";
import { DatabaseError } from "../errors/general.errors";
import { Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await db.raw(`
    CREATE TABLE fhirAuth (
      id serial NOT NULL PRIMARY KEY,
      code TEXT,
      refresh_token TEXT,
      access_token TEXT,
      token_type TEXT,
      expires_in integer,
      scope TEXT

    );
      `);
    return res.status(200).json({
      success: true,
      response: "TABLES CREATED",
    });
  } catch (err) {
    console.log("error", err);
    throw new DatabaseError();
  }
});

export default router;
