const fs = require("fs");
const path = require("path");

function filter(dir1, dir2, gender) {
    let folder = [];
    // let folder2 = [];
    fs.readdir(dir1, (err, files) => {
        if (err) {
            console.log(err)
            return;
        }
            folder = files
            console.log(folder)
        folder.forEach(fileName => {

            fs.readFile( path.join(dir1,fileName), (err, data) =>{
                if (err) {
                    console.log(err)
                    return;}
                const user = JSON.parse(data.toString())
                console.log(user);

                if (user.gender === gender) {
                    console.log(user.name)
                    fs.rename(path.join(dir1,fileName), path.join(dir2,fileName), err1 => {
                        if (err1) {
                            console.log(err1);}
                    } )
                }
        })



                })


            })


}

console.log('hello world');

filter(__dirname + '/group1', __dirname + '/group2', 'male');
filter(path.join(__dirname, '/group2'), path.join(__dirname, '/group1'), 'female');
