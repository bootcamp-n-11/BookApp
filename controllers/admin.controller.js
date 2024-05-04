import fs from "node:fs"


export function getAllAdmins(req, res) {
    try {
        fs.readFile('./db/admin.json', 'utf8', (err, data) => {
            if (err) { console.log(err) }
            data = JSON.parse(data)
            // console.log(data)
            res.status(200).json({
                status: "OK",
                data: data
            });
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({
            status: "OK",
            data: "Adminlarni chiqarishda xatolik bor"
        });
        res.end()
    }

}


export function getOneAdmin(req, res) {
    try {
        let id = req.params.id
        fs.readFile('./db/admin.json', 'utf8', (err, data) => {
            if (err) { throw (err) }
            else {
                data = JSON.parse(data)
                console.log(data)
                const admin = data.find(item => item.id == id)
                if (admin) {
                    res.status(200).json({
                        status: "OK",
                        data: admin
                    })
                } else {
                    console.log(err)
                    res.status(404).send({
                        status: "Admin to'pilmadi"
                    })
                }

            }
        })
    } catch (err) {
        console.log(err)
        res.status(404).send({
            status: "Xatolik yuzaga keldi"
        })
    }

}


export function createAdmin(req, res) {
    try{
        let { fullname, age, gmail } = req.body
        if (!fullname || !age || !gmail) {
            res.status(403).send({
                status: "Chala malumotlar"
            })
        } else {
            fs.readFile('./db/admin.json', 'utf8', (err, data) => {
                if (err) { throw (err) }
                data = JSON.parse(data)
                let newAdmin = { "id": data.length + 1, ...req.body }
                
                data.push(newAdmin)
                data = JSON.stringify(data)
                fs.writeFileSync('./db.admin.json', data, err => {
                    if (err) { throw (err) }
                })
                data = JSON.parse(data)
    
                res.status(201).json({
                    status:"Ok",
                    data:data
                })
            })
        }
    } catch(err){
        console.log(err)
    }
}

export function editAdmin(req, res){
    let id = req.params.id
    let { fullname, age, gmail } = req.body

    fs.readFile('./db/admin.json', 'utf8', (err, data)=>{
        if (!fullname || !age || !gmail) {
            res.status(403).send({
                status: "Chala malumotlar"
            })
        } else {
            data = JSON.parse(data)
            data.forEach((element, index)=> {
                if(id == element.id){
                    data[index].fullname = fullname
                    data[index].age = age
                    data[index].gmail = gmail
                }
            });
            data = JSON.stringify(data)
            fs.writeFileSync('./db/admin.json', data, err=>{
                if(err){throw data}
                else {
                    console.log("Malumotlar o'zgartildi")
                }
            })
            data = JSON.parse(data)
            res.status(200).json({
                status:"OK",
                data : data
            })
        }
    })
}


export function deleteAdmin(req, res){
    let id = req.params.id

    fs.readFile('./db/admin.json', 'utf8', (err, data)=>{
        if(err){throw err}

        data = JSON.parse(data)
        
        data.forEach((item, index)=>{
            if(item.id == id){
                data.splice(index, 1)
            }
        })
        data = JSON.stringify(data)
        
        fs.writeFileSync('./db/admin.json', data, err=>{
            if(err){throw data}
            else {
                console.log("Malumotlar o'zgartildi")
            }
        })
        data = JSON.parse(data)
        res.status(200).json({
            status:"OK",
            data : data
        })
        
    })
}