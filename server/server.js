const users = require('./users.json')
const express = require('express');
const cors = require('cors');
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
            name : matchedUser.password,
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


app.listen(port, () =>{
    console.log("Listening...")
})