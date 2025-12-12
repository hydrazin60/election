import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";
import VoterSchema from "../models/VoterSchema";
import Location from "../models/location";

// Interfaces
interface IVoterJSON {
  serial_no: number;
  voter_id: number;
  full_name: string;
  age: number;
  gender: "male" | "female" | "other";
  spouse_name?: string | null;
  parent_name?: string | null;
}

// Paths to JSON files
const locationPath = path.join(__dirname, "../data/location.json");
const voterPath = path.join(__dirname, "../data/voter.json");

// MongoDB connection string
const MONGO_URI =
  "mongodb+srv://sureshkhdk45_db_user:ePoTjpqOsDqvNMjV@election.gvh3rav.mongodb.net/election?retryWrites=true&w=majority";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Read JSON files
    const locationData = JSON.parse(fs.readFileSync(locationPath, "utf-8"));
    const voterData = JSON.parse(
      fs.readFileSync(voterPath, "utf-8")
    ) as IVoterJSON[];

    // Insert locations
    const insertedLocations = await Location.insertMany(locationData);
    console.log(`✅ Inserted ${insertedLocations.length} locations`);

    // Map voters to first location ID (or modify to map correctly if multiple locations)
    const firstLocationId = insertedLocations[0]._id;
    const votersWithLocation = voterData.map((voter) => ({
      ...voter,
      location: firstLocationId,
    }));

    // Insert voters
    const insertedVoters = await VoterSchema.insertMany(votersWithLocation);
    console.log(`✅ Inserted ${insertedVoters.length} voters`);

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
