const express = require("express");
app = express();
const cors = require("cors");
//MIDDLWARE
app.use(cors());
app.use(express.json());
const pool = require("./db");

        //ROUTES //


// create a todo
app.post("/todos",async(req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.json(newTodo.rows[0]);
        console.log(description);
    } catch (error) {
        console.error(error.message);
    } 
})
// get all todos
app.get("/Alltodos",async(req,res)=>{
    try {
        const Alltodos = await pool.query("SELECT * FROM todo");
        res.json(Alltodos.rows);
    } catch (error) {
        console.error(error.message);
    } 
})
//get a todo
app.get('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const onetodos = await pool.query("SELECT  * FROM todo WHERE todo_id = $1",[id]);
        res.json(onetodos.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})
//update a todo
app.put('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const Updatetodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("todo updated successefily");
    } catch (error) {
        console.log(error.message)
    }
})
//delete a todo
app.delete('/todos/:id',async (req,res) => {
try {
    const {id} = req.params
    const deletedtodo = await pool.query("delete from todo where todo_id = $1 ",[id]);
    res.json("deleted successifuly")
} catch (error) {
    console.error(error.message);
}
})

port=5000;
app.listen(port, ()=>{
    console.log(`server is started on port ${port}`)
})
app.get('/', (req, res)=>{
    res.send("server is started")
})
