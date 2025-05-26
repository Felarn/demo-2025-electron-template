# electron-demo-2025

An Electron application with React

### Development

ER diagram: [ERD.pdf](/database/ERD.pdf) or [ERD-nice.png](/database/ERD-nice.png) \
Database connection settings in: [dbconfig.json](/dbconfig.json) \
Script to set the database to default state: [reset_database.sql](/database/reset_database.sql). \
The script drops tables, then recreates and fills them with data provided in resources for exam.

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
