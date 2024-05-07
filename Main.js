// register.js
const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('./Db');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password , mobile, username } = req.body;

        // Insert user into database
        db.query('INSERT INTO users_info (name, email, password, mobile , username) VALUES (?, ?, ?,?,?)', [name, email, password, mobile , username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        db.query('SELECT * FROM users_info WHERE username = ?', [username], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            if (result.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            else{
                if(password == result[0].password){
                    return res.status(200).json({message : 'Login Successfully'})
                }
                else{
                    return res.status(401).json({message: 'Invalid credentials'})
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/fetchData/:languageName', async (req, res) => {
    const { languageName } = req.params;
  
      // Query to fetch data based on language name
      const query = {
        text: 'SELECT pdf_name FROM language_ext WHERE language_name = $1',
        values: [languageName]
      };
  
      // Execute the query
    //   const result = await pool.query(query);
     db.query('SELECT * FROM language_ext WHERE language_name = ?', [languageName] , async (err, result) =>{
        if(result){
      res.status(200).json(result);
    } else{
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  });

  router.get('/fetchQuestions/:languageName', async (req, res) => {
    const { languageName } = req.params;
  
  
      // Execute the query
    //   const result = await pool.query(query);
     db.query('SELECT * FROM questions_ext WHERE language_name = ?', [languageName] , async (err, result) =>{
        if(result){
      res.status(200).json(result);
    } else{
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  });

router.get('/scoreUpdate/:languageName/:score/:username', async (req, res) => {
    const { score , username, languageName } = req.params;
  
  
      // Execute the query
    //   const result = await pool.query(query);
     db.query('Insert into user_course_mapping values (default, ?,?,?)', [languageName , username,score] , async (err, result) =>{
        if(result){
      res.status(200).json(result);
    } else{
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  });

  router.get('/getScore/:username', async (req, res) => {
    const { username } = req.params;
  
  
      // Execute the query
    //   const result = await pool.query(query);
     db.query('Select * from user_course_mapping where user_name= ?', [ username] , async (err, result) =>{
        if(result){
      res.status(200).json(result);
    } else{
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  });



module.exports = router;
