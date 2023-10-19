import { Router } from "express";
import {
  createProfile,
  deleteOne,
  getUserProfile,
  updateOne,
  viewAll,
  viewOne,
} from "../controller/profileController";
import multer from "multer"

const upload = multer().single("avatar")
const router = Router();

router.route("/:userID/create-profile").post(upload,createProfile);
router.route("/find-profiles").get(viewAll);
router.route("/:profileID/find-profile").get(viewOne);
router.route("/:profileID/delete-profile").delete(deleteOne);
router.route("/:profileID/update-profile").patch(updateOne);
router.route("/:userID/:profileID/view-user-profile").get(getUserProfile);

export default router;
