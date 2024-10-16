import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { token } = req.query;

  // Check if the token matches the secret token
  if (!token || token !== process.env.SECRET_TOKEN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Define the file path using the current working directory
  const filePath = path.join(process.cwd(), 'private', 'Personal Letter-Judy.pdf');

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Read the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Set the response headers for inline PDF viewing
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename=Personal Letter-Judy.pdf');

      // Send the file data
      return res.send(data);
    });
  });
}
