var connection = require('../connection');

function Todo() {

//GET FUNCTION
    this.get = function(res)   {
        connection.acquire(function(err, con)   {     //acquiring the connection, query and sent result as response
            if(err){
                console.error(err);
            }
            con.query('select * from todo_list', function(err, result)  {   //function -> internal callback of node
                con.release();
                res.send(result);
            });
        });
    };

    //CREATE FUNCTION
    this.create = function(name, res)    {
        connection.acquire(function(err, con)   {
            con.query('insert into todo_list (name) VALUES  (?)', [name], function(err, result)  { //mapping keys in todo object to the column names
                con.release();
                console.log(name);
                if(err) {
                    console.log(err);
                    res.send({status: 1, message: "TODO creation failed"});
                }
                else{
                    res.send({status: 0, message: "TODO created successfully"});
                }
            });
        });
    };

    //UPDATE FUNCTION
    this.update = function(todo, res)   {
        connection.acquire(function(err, con)   {
            con.query('update todo_list set ? where id = ?', [todo, todo.id], function(err, result)    {
                con.release();
                if(err) {
                    console.log(err);
                    res.send({status: 1, message: "Update Failed"});
                    }
                    else{
                        res.send({status: 0, message: "Update Completed"});
                    }
            });
        });
    };

    //DELETE FUNCTION
    this.delete = function(id, res)   {
        connection.acquire(function(err, con)   {
            con.query('delete from todo_list where id = ?', [id], function(err, result) {
                con.release();
                if(err) {
                    console.log(err);
                    res.send({status: 1, message: "Delete Failed"});
                }   
                else{
                    res.send({status: 0, message: "Delete Success"});
                }
            });
        });
    }


    
}

module.exports = new Todo();