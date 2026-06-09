# File Sorter

A Node.js automation script that automatically sorts your Downloads folder into subfolders organized by file type. Supports instant sorting via watch mode and scheduled sorting via Windows Task Scheduler.

## Features

- Sorts files into subfolders by file type
- Watch mode — detects and sorts new files the moment they arrive
- Task Scheduler support — runs automatically on a schedule
- Catch-all `Others` folder for unrecognized file types
- Skips subfolders it already created so re-runs are safe
- Logs a summary of how many files were moved

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

### Run manually
Sorts all existing files in your Downloads folder once and exits:
```bash
node sorter.js
```

### Watch mode
Keeps running in the background and sorts new files the moment they appear:
```bash
node sorter.js
```
Watch mode starts automatically alongside the manual sort.

## Automatic Scheduling (Windows Task Scheduler)

To have the script run automatically every day without opening a terminal:

1. Press **Windows + S** and search for **Task Scheduler**, open it
2. Click **Create Basic Task** on the right panel
3. Give it a name like `File Sorter`
4. Set the trigger to **Daily** at your preferred time
5. For the action select **Start a Program**
6. In the **Program/script** field enter:
   ```
   node
   ```
7. In the **Add arguments** field enter the full path to your script:
   ```
   C:\Users\YourUsername\Desktop\file-sorter\sorter.js
   ```
8. Click **Finish**

> Replace `YourUsername` with your actual Windows username.

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
- Watch mode using the `chokidar` package
- Debugging real errors in a Node.js script
- Scheduling scripts with Windows Task Scheduler

## Link To Demo
https://youtu.be/aDUA0dntZTE
