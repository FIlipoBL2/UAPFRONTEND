const users = require('./users.json')
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path')

const app = express();


const port = 8080


// menggunakan middleware cors untuk konek dengan client
app.use(cors());
// menambahkan middleware ini agar bisa membaca JSON dari body request
app.use(express.json());

app.post('/api/login', (req, res)=>{
    const { email, password } = req.body;
    // mencari user yang menggunakan email dan password yang sama   
    const matchedUser = users.find(u => u.email === email && u.password === password)

    if(matchedUser){
        const token = `${matchedUser.id}`
        const dataUser = {
            id : matchedUser.id,
            username : matchedUser.username,
            name : matchedUser.name,
            password : matchedUser.password
        }
        res.status(200).json({
            message: "Login berhasil",
            token : token,
            user : dataUser
        })
    }else{
        res.status(401).json({
            message: "Login gagal",
        })
    }
})

app.post('/api/register', (req, res)=>{
    const { username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({ message : "Semua field harus diisi!"});
    }
    const existingUser = users.find(u => u.email === email);

    if(existingUser){
        return res.status(400).json({message : "Email sudah terdaftar!"});
    }

    const newId = users.length === 0 ? 101 : users[users.length-1].id+1 
    const newUser = {
        id : newId,
        username : username,
        email : email,
        password : password
    }
    users.push(newUser)

    const filePath = path.join(__dirname, 'users.json');

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if(err){
            console.error("Failed to write into file");
            users.pop();
            return res.status(400).json({ message : "There was a problem saving the data"})
        }

        res.status(201).json({
            message : "Registrasion successfull",
            user : newUser
        });
    })
})

app.put('/api/users/:id/password', (req, res) => {
  const id = parseInt(req.params.id);
  const { oldPassword, newPassword } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (users[userIndex].password !== oldPassword) {
    return res.status(401).json({ message: "Old Password is incorrect" });
  }

  users[userIndex].password = newPassword;

  const filePath = path.join(__dirname, 'users.json');
  fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      users[userIndex].password = oldPassword; // rollback
      return res.status(500).json({ message: "Failed to save data" });
    }
    res.status(200).json({ message: "Password successfuly changed" });
  });
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  const filePath = path.join(__dirname, 'users.json');
  fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete data" });
    }
    res.status(200).json({ message: "Akun successfully deleted" });
  });
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
});

// GETS REVIEWS
const reviews = require('./reviews.json');
// FOR GAME PAGE
app.get('/api/reviews', (req, res) => {
  res.status(200).json({ reviews });
});
// FOR PROFILE
app.get('/api/reviews/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userReviews = reviews.filter(r => r.userId === userId);
  res.status(200).json({ reviews: userReviews });
});
//======================

// POST REVIEWS
app.post('/api/reviews', (req, res) => {
  const { gameId, userId, score, text } = req.body;

  const newId = reviews.length === 0 ? 1 : reviews[reviews.length - 1].id + 1;
  const newReview = { id: newId, gameId, userId, score, text };
  reviews.push(newReview);

  const filePath = path.join(__dirname, 'reviews.json');
  fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
    if (err) {
      reviews.pop();
      return res.status(500).json({ message: "Failed to save review" });
    }
    res.status(201).json({ message: "Review Successfully saved", review: newReview });
  });
});
//======================

// DELETE REVIEWS
app.delete('/api/reviews/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reviews.findIndex(r => r.id === id);

  if (index === -1) return res.status(404).json({ message: "Review Not Found" });

  const deleted = reviews.splice(index, 1);
  const filePath = path.join(__dirname, 'reviews.json');
  fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
    if (err) {
      reviews.splice(index, 0, deleted[0]);
      return res.status(500).json({ message: "Failed to delete review" });
    }
    res.status(200).json({ message: "Review Successfuly Deleted" });
  });
});
//======================

// KEEP AT BOTTOM
app.listen(port, () =>{
    console.log("Listening...")
})