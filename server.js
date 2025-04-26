import express from 'express'
const app = express()
app.use(express.json())


const Port = 5000
const users =[
    {username: "alice", age:25, email:"alice@example.com"},
    {username: "bob", age:30, email:"bob@example.com"},
    {username: "charlie", age:28, email:"charlie@example.com"}
]

app.post('/post', (res,req)=>{
    const {username,age,email}=req.body
    if(username.trim()==='' ||age.trim()==='' ||email.trim()===''){
        return res.status(404).json("User parameter cannot be empty")
    }

    const existuser = users.some(user=>user.email===email)
    if(existuser){
        return res.status(404).json({message:"user already exist"})
    }
    else{
        users.push({username,age,email})
       return  res.status(201).json({result:"success" , message:"user created succesfully"})
    }
})
app.get('/', (req,res)=>{
if(!users){
    return res.status(404).json({message:"user not found"})
}
else{
return res.status(200).json({message:users})
}
})



app.listen(Port, ()=>{
    console.log(`Server is running at http://localhost:${Port}`)
})