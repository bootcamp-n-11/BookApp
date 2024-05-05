import fs from "node:fs"
import Joi from "joi"


function validation(admin) {
    const adminSchema = Joi.object({
        fullname: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(4)
            .max(16),
        username: Joi.string()
            .min(5)
            .max(15)
            .alphanum()
            .required(),
        age: Joi.number()
            .integer()
            .min(10),
        gmail: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        birth_year: Joi.number()
            .integer()
            .min(2000)
            .max(2021)
    })
    return adminSchema.validate(admin)
}

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
                        status: "Admin topilmadi"
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
    try {
        let result = validation(req.body)

        if (result.error) {
            res.status(400).send(result.error.details[0].message)
        } else {
            fs.readFile('./db/admin.json', 'utf8', (err, data) => {
                if (err) { throw (err) }
                data = JSON.parse(data)
                let newAdmin = {
                    id:data.length+1,
                    fullname : req.body.fullname,
                    username : req.body.username,
                    age : req.body.age,
                    gmail : req.body.gmail,
                    password : req.body.password,
                    birth_year: req.body.birth_year
                }


                data.push(newAdmin)
                data = JSON.stringify(data)
                fs.writeFileSync('./db/admin.json', data, err => {
                    if (err) { throw data }
                    else {
                        console.log("Malumotlar o'zgartildi")
                    }
                })
                
                data = JSON.parse(data)

                res.status(201).json({
                    status: "Ok",
                    data: data
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function editAdmin(req, res) {
    let id = req.params.id
    let result = validation(req.body)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } else {
        fs.readFile('./db/admin.json', 'utf8', (err, data) => {
            data = JSON.parse(data)
            data.forEach((element, index) => {
                if (id == element.id) {
                    data[index] = req.body
                }
            });
            data = JSON.stringify(data)
            fs.writeFileSync('./db/admin.json', data, err => {
                if (err) { throw data }
                else {
                    console.log("Malumotlar o'zgartildi")
                }
            })
            data = JSON.parse(data)
            res.status(200).json({
                status: "OK",
                data: data
            })
        }
        )
    }
}


export function deleteAdmin(req, res) {
    let id = req.params.id

    fs.readFile('./db/admin.json', 'utf8', (err, data) => {
        if (err) { throw err }

        data = JSON.parse(data)

        data.forEach((item, index) => {
            if (item.id == id) {
                data.splice(index, 1)
            }
        })
        data = JSON.stringify(data)

        fs.writeFileSync('./db/admin.json', data, err => {
            if (err) { throw data }
            else {
                console.log("Malumotlar o'zgartildi")
            }
        })
        data = JSON.parse(data)
        res.status(200).json({
            status: "OK",
            data: data
        })

    })
}