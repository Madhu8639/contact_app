import asynchandler from "express-async-handler"
import Contact from "../models/contactModel.js"
//@desc Get all contacts
//@route Get /api/contacts
//@access private 
const getContacts = asynchandler(async (req,res) => {
    const contacts = await Contact.find({user_id:req.user.id})
    res.json(contacts);
})
//@desc Get  contact
//@route Get /api/contacts
//@access private
const getContact = asynchandler(async (req,res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    res.json(contacts);
})
//@desc create contact
//@route Get /api/contacts
//@access private
const createContact = asynchandler(async (req,res) => {
    console.log("this is the request", req.body)
    const {name, email, phone} = req.body 
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.json(contacts);
})
//@desc update contact
//@route Get /api/contacts
//@access private
const updateContact = asynchandler(async (req,res) => {
    const contacts = await Contact.findById(req.params.id)
    console.log(contacts)
    if (!contacts){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    console.log(contacts.id)

    if(contacts.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error(" Users don't have permissions")
    }
    console.log(contacts)
    const updated_contacts = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updated_contacts)
    res.json({message:"hi"});
})
//@desc delete contact
//@route Get /api/contacts
//@access private
const deleteContact = asynchandler(async (req,res) => {
    const contacts = await Contact.findById(req.params.id)
    if (!contacts){
        res.status(404)
        throw new Error("Contact Not Found")
    }

    if(contacts.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error(" Users don't have permissions")
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json(contacts);
})

export {getContacts,getContact,updateContact,deleteContact,createContact}