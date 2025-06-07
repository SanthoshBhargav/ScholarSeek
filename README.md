# ScholarSeek

Discover the right scholarships tailored to your goals—fast, simple, and personalized.

## Tech Stack

• **Backend:** JavaScript (Node.js)  
• **Web Scraping:** Python (Jupyter Notebook)  
• **Frontend:** HTML, CSS, JavaScript  
• **Database:** MongoDB  
• **Data Format:** JSON

## Run Locally
### First clone the repo
```bash
git clone https://github.com/SanthoshBhargav/ScholarSeek.git
cd ScholarSeek
```

### Run backend
```bash
cd backend
npm i 
npm start
```
### Run frontend
Then open a new terminal and
```bash
cd scholarship-finder
npm i
npm run dev
````
## MongoDB Setup

 Ensure MongoDB is installed and running on your system.
   - Download from: [MongoDB Community Server](https://www.mongodb.com/try/download/community)

##  Import Scraped Scholarship Data

1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. Create a new Database named: `Scholarseek`
4. Create a new Collection named: `scholarships`
5. Click on **"Add Data"** → **"Import JSON"**
6. Select the file: `Scholarseek.scholarships.json`
7. Click **Import**
   
