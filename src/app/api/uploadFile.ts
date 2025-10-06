// pages/api/uploads.ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File as FormidableFile } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads");

// ensure dir
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err: any, fields: any, files: any) => {
    if (err) {
      console.error("Upload error", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    const fileArr: any[] = [];
    const pushFile = (f: FormidableFile) => {
      const relPath = `/uploads/${path.basename(f.filepath)}`;
      fileArr.push({
        name: f.originalFilename,
        url: relPath,
        size: f.size,
        mimeType: f.mimetype,
      });
    };

    if (Array.isArray(files.file)) {
      (files.file as FormidableFile[]).forEach(pushFile);
    } else if (files.file) {
      pushFile(files.file as FormidableFile);
    }

    return res.status(200).json({ files: fileArr });
  });
}
