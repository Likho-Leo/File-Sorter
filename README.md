# 📁 File Sorter

A Node.js automation script that automatically sorts your Downloads folder into subfolders organized by file type.

## What It Does

Scans your Downloads folder and moves files into the following subfolders:

| Folder | File Types |
|---|---|
| Images | .jpg, .jpeg, .png, .gif, .webp, .svg |
| Videos | .mp4, .mkv, .mov, .avi |
| Music | .mp3, .wav, .flac, .aac |
| Documents | .pdf, .docx, .doc, .txt, .xlsx, .pptx |
| Archives | .zip, .rar, .7z |
| Code | .js, .html, .css, .json, .py |
| Others | Anything that doesn't match the above |

## Requirements

- [Node.js](https://nodejs.org/) v18 or higher

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Likho-Leo/file-sorter.git
   cd file-sorter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Usage

Run the script manually whenever you want to sort your Downloads folder:

```bash
node sorter.js
```

## Adding More File Types

To add support for more extensions, update the `folderMap` object in `sorter.js`:

```javascript
const folderMap = {
    Images: ['.jpg', '.jpeg', '.png'],
    // Add a new category
    Ebooks: ['.epub', '.mobi'],
};
```

## What I Learned

Built as a beginner automation project to learn:
- Node.js file system module (`fs`)
- Path handling with the `path` module
- Reading, organizing, and moving files programmatically
- Debugging real errors in a Node.js script
