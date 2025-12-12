import { connectDB } from "@/lib/db";
import user from "@/models/user";

import bcrypt from "bcrypt";

export const createDefaultAdmin = async () => {
  await connectDB();

  const adminEmail = "admin@example.com";

  const existingAdmin = await user.findOne({ email: adminEmail });
  if (existingAdmin) return "Admin already exists";

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const adminuser = await user.create({
    full_name: "Admin user",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
    location: {
      province: "Default Province",
      district: "Default District",
      municipality: "Default Municipality",
      wardNumber: 1,
      pollingCenter: "Default Polling Center",
    },
  });

  console.log(" Default admin created:", adminuser.email);
};

createDefaultAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
