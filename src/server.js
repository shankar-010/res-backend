// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/authRoutes');
// const resumeRoutes = require('./routes/resumeRoutes');
// const errorHandler = require('./middleware/error');
// const winston = require('winston');
// const path = require('path');

// const app = express();

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/auth', authRoutes);
// app.use('/api/resumes', resumeRoutes);

// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     logger.info(`Server running on port ${PORT}`);
//   });
// }).catch((error) => {
//   logger.error('Unable to connect to the database:', error);
// });


// require('dotenv').config();
// const express = require('express');
// const { Pool } = require('pg');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// app.use(express.json());

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });

// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Same API endpoints as before (GET /api/resumes, POST /api/resumes, etc.)
// app.get('/api/resumes', async (req, res) => {
//   try {
//     const { userId } = req.query;
//     const result = await pool.query('SELECT * FROM resumes WHERE user_id = $1', [userId]);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/api/resumes/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);
//     res.json(result.rows[0] || null);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/api/resumes', async (req, res) => {
//   try {
//     const { userId, title, personalInfo, education, experience, skills, summary, template } = req.body;
//     const result = await pool.query(
//       'INSERT INTO resumes (user_id, title, personal_info, education, experience, skills, summary, template) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
//       [userId, title, JSON.stringify(personalInfo), JSON.stringify(education), JSON.stringify(experience), skills, summary, template]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/api/resumes/profile-picture', upload.single('profilePicture'), (req, res) => {
//   res.json({ filename: req.file.filename });
// });

// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server running on port ${process.env.PORT || 5000}`);
// });
//new 1


// const express = require('express');
// const app = express();
// const cors = require('cors');
// const fs = require('fs');

// app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(express.json());

// // In-memory store (replace with database in production)
// let resumes = [];

// app.post('/api/resumes', (req, res) => {
//   const resume = { ...req.body, id: Date.now() }; // Simple ID generation
//   resumes.push(resume);
//   res.status(201).json(resume);
// });

// app.get('/api/resumes/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const resume = resumes.find(r => r.id === id);
//   if (resume) {
//     res.json(resume);
//   } else {
//     res.status(404).json({ error: 'Resume not found' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const app = express();
// const cors = require('cors');

// const corsOptions = {
//   origin: 'http://localhost:4200',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// // Use body-parser with increased limit
// app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB

// let resumes = [];
// let users = [];

// app.post('/api/resumes', (req, res) => {
//   console.log('Received POST request for /api/resumes:', req.body);
//   const resume = { ...req.body, id: Date.now() };
//   resumes.push(resume);
//   res.status(201).json(resume);
// });

// app.get('/api/resumes', (req, res) => {
//   const userId = req.query.userId ? parseInt(req.query.userId) : null;
//   const userResumes = userId ? resumes.filter(r => r.userId === userId) : resumes;
//   res.json(userResumes);
// });

// app.get('/api/resumes/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const resume = resumes.find(r => r.id === id);
//   if (resume) res.json(resume);
//   else res.status(404).json({ error: 'Resume not found' });
// });

// app.put('/api/resumes/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = resumes.findIndex(r => r.id === id);
//   if (index !== -1) {
//     resumes[index] = { ...resumes[index], ...req.body };
//     res.json(resumes[index]);
//   } else {
//     res.status(404).json({ error: 'Resume not found' });
//   }
// });

// app.delete('/api/resumes/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const initialLength = resumes.length;
//   resumes = resumes.filter(r => r.id !== id);
//   if (resumes.length < initialLength) res.status(204).send();
//   else res.status(404).json({ error: 'Resume not found' });
// });

// app.get('/api/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const user = users.find(u => u.id === id) || { id, name: 'Default User' };
//   res.json(user);
// });

// app.put('/api/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex(u => u.id === id);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...req.body };
//     res.json(users[index]);
//   } else {
//     const newUser = { id, ...req.body };
//     users.push(newUser);
//     res.status(201).json(newUser);
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB

let resumes = [];
let users = [];

app.post('/api/resumes', (req, res) => {
  console.log('Received POST request for /api/resumes:', req.body);
  const resume = { ...req.body, id: Date.now() };
  resumes.push(resume);
  res.status(201).json(resume);
});

app.get('/api/resumes', (req, res) => {
  const userId = req.query.userId ? parseInt(req.query.userId) : null;
  const userResumes = userId ? resumes.filter(r => r.userId === userId) : resumes;
  res.json(userResumes);
});

app.get('/api/resumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resume = resumes.find(r => r.id === id);
  if (resume) res.json(resume);
  else res.status(404).json({ error: 'Resume not found' });
});

app.put('/api/resumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = resumes.findIndex(r => r.id === id);
  if (index !== -1) {
    resumes[index] = { ...resumes[index], ...req.body };
    res.json(resumes[index]);
  } else {
    res.status(404).json({ error: 'Resume not found' });
  }
});

app.delete('/api/resumes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = resumes.length;
  resumes = resumes.filter(r => r.id !== id);
  if (resumes.length < initialLength) res.status(204).send();
  else res.status(404).json({ error: 'Resume not found' });
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id) || { id, name: 'Default User' };
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    const newUser = { id, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

// ❌ REMOVE this on Vercel
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ ADD this for Vercel
module.exports = app;
