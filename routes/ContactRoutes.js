import express from "express"
const router = express.Router()
import { getContact,getContacts,updateContact,deleteContact,createContact } from "../controllers/contactControllers.js";
import validateToken from "../middleware/validateTokenHandler.js";

router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


export default router