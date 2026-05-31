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
            console.error("Gagal menulis ke file");
            users.pop();
            return res.status(400).json({ message : "Terjadi kesalahan saat menyimpan data"})
        }

        res.status(201).json({
            message : "Registrasi berhasil",
            user : newUser
        });
    })
})

app.listen(port, () =>{
    console.log("Listening...")
})