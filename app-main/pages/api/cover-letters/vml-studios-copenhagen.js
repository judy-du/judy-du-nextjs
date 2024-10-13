import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { token } = req.query;

  // Check if the token matches the secret token
  if (token !== process.env.SECRET_TOKEN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Define the file path using the current working directory
  const filePath = path.join(process.cwd(), 'private', 'Personal Letter-Judy.pdf');

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Personal Letter-Judy.pdf');

    // Send the file
    res.send(data);
  });
}
