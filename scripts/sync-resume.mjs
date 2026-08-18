import fs from "fs";
import path from "path";

const sourceResume = path.resolve(process.cwd(), "resume", "Daud_Resume.pdf");
const targetDir = path.resolve(process.cwd(), "public", "resume");
const targetResume = path.resolve(targetDir, "Daud_Resume.pdf");

try {
  if (fs.existsSync(sourceResume)) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(sourceResume, targetResume);
    console.log("✓ Resume successfully synced to public/resume/Daud_Resume.pdf");
  }
} catch (error) {
  console.warn("Warning: Could not sync resume automatically:", error);
}
