const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const Scholarship = require('./scholarship-model')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

async function main() {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Scholarseek");
    console.log("Connected to DB")
}

main().catch(err => console.log(err))
app.listen(3000, () => {
  console.log('Server Running at http://localhost:3000/')
})

const midwareFunc = (req, res, next) => {
  let jwtToken
  const auth = req.headers['authorization']
  if (auth !== undefined) {
    jwtToken = auth.split(' ')[1]
  }
  if (jwtToken === undefined) {
    res.status(401)
    res.send('Invalid JWT Token')
  } else {
    jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async (error, payload) => {
      if (error) {
        res.status(401)
        res.send('Invalid JWT Token')
      } else {
        req.user_id = payload.user_id
        next()
      }
    })
  }
}

// app.post('/register/', async (request, response) => {
//   const {username, password, email} = request.body
//   const hashedPassword = await bcrypt.hash(password, 10)
//   const selectUserQuery = `SELECT * FROM user WHERE username = '${username}'`
//   const dbUser = await db.get(selectUserQuery)
//   if (dbUser === undefined) {
//     if (password.length < 6) {
//       response.status(400)
//       response.send('Password is too short')
//     } else {
//       const createUserQuery = `
//       INSERT INTO 
//         user (username, name, password, gender) 
//       VALUES 
//         (
//           '${username}',
//           '${hashedPassword}', 
//           '${email}'
//         )`
//       const dbResponse = await db.run(createUserQuery)
//       const newUserId = dbResponse.lastID
//       response.status(200)
//       response.send(`User created successfully with ID: ${newUserId}`)
//     }
//   } else {
//     response.status(400)
//     response.send('User already exists')
//   }
// })

// app.post('/login/', async (req, res) => {
//   const {username, password} = req.body
//   const dbquery = `
//   SELECT * FROM user
//   WHERE username='${username}'`
//   const dbuser = await db.get(dbquery)
//   if (dbuser === undefined) {
//     res.status(400)
//     res.send('Invalid user')
//   } else {
//     const checkPw = await bcrypt.compare(password, dbuser.password)
//     if (checkPw) {
//       const payload = {
//         username: username,
//         user_id: dbuser.user_id,
//       }
//       const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
//       res.send({jwtToken})
//     } else {
//       res.status(400)
//       res.send('Invalid password')
//     }
//   }
//   console.log(dbuser)
// })

app.get('/', (req, res) => {
    res.send('Welcome to the Scholarship Finder API')
})

app.get('/scholarships/', async (req, res) => {
    try {
        // Fetch scholarships from the database
        const scholarships = await Scholarship.find()
        let links = []
        scholarships.forEach(scholarship => {
            if (scholarship.Links) {
                links.push(JSON.parse(scholarship.Links.replace(/'/g, '"')))
            }
        })
        res.status(200).json(scholarships)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch scholarships' })
    }
})