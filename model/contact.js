"use strict"

const contacts = [{
    prenom:'Bill',
    nom:'Gates',
    id:123
},{
    prenom:'Steve',
    nom:'Jobs',
    id:321
}]

class Contact{

    constructor(contact){
        this._contact = contact; //  _contact = _ = private
    }

    save(cb){
        process.nextTick(() => {
            this._contact.id = contacts[contacts.length - 1].id +1;
            contacts.push(this._contact);
            console.log(this._contact);
            cb(false, this._contact);
        })
    }

    static find(cb){
        //cb(false, contacts);  Synchrone
        /*setTimeout(() =>{     //Asynch
            cb(false, contacts);
        },0);
        setImmediate(()=>{
            cb(false, contacts);
        },0);*/
        process.nextTick(() => { // Asynch
            cb(false, contacts);
        });
    }

    static findById(id, cb){
        process.nextTick(() => { // Asynch
            let contact = contacts.find(c => c.id === Number(id));
            cb(false, contact);
        });
    }

}

module.exports = Contact;