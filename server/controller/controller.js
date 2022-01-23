var Userdb= require("../model/model")

//create and save new users
exports.create= (req,res)=>{
    //validate request
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty!"})
        return;
    }

    //create new user
    const user= new Userdb(
        {
            username:req.body.username,
            email:req.body.email,
            gender:req.body.gender,
            userstatus:req.body.userstatus
        }
    )
    
    //save new user
    user.save(user)
    .then(data => {
        res.redirect("/add-user")
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || "some error occured while creating a new user"
        })
    })
}
//read all users/single user
exports.find= (req,res)=>{
    if (req.query.id){
        const id=req.query.id

        Userdb.findById(id)
        .then(data => {
            if (!data){
                res.status(404).send({message:"Could not find user with id : "+id})
            } else {
                res.send(data)
            }
        })
        .catch (err => {
            res.status(500).send({message:"Error retrieving user with id : "+id})
        })
        
    } else {
        Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err =>
        {
            res.status(500).send({message:err.message || "Error occured while retrieving user "})
        })
    }   
}

//update user by id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

//delete a user
exports.delete= (req,res)=>{
    const id= req.params.id
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if (!data){
            res.status(404).send({message:"Cannot delete user, id may be missing"})
        }
        else{
            res.send({
                message:"User deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:"couldnt delete user with id="+id})
    })
}

