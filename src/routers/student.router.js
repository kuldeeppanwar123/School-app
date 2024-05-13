import express from "express";
import { addToSectionStudentController, deleteStudentController, registerStudentController } from "../controllers/student.controller.js";
import { adminAuthentication } from "../middlewares/authentication/admin.authentication.middleware.js";
import { classTeacherAuthentication } from "../middlewares/authentication/classTeacher.authentication.middleware.js";
import { addToSectionStudentValidation, deleteStudentValidation, registerStudentValidation } from "../middlewares/validation/student.validation.middleware.js";

const studentRouter = express.Router();

/**
 * @swagger
 * /student/register:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Register a student
 *     description: This API will register a student with their details.it requires classTeacher login token.
 *     tags:
 *       - Student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rollNumber:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: ["Male", "Female", "Non-binary", "Other"]
 *               age:
 *                 type: number
 *                 minimum: 3
 *                 maximum: 100
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student registered successfully
 *       400:
 *         description: Unauthorized request
 *       500:
 *         description: Server error
 */
studentRouter.post("/register",classTeacherAuthentication,registerStudentValidation, registerStudentController);


/**
 * @swagger
 * /student/{studentId}:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: delete student
 *     description: This api will delete student from database.it requires admin login token.
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: student deleted successfully
 *       400:
 *         description: Unauthorized request
 *       500:
 *         description: Server error
 */
studentRouter.delete("/:studentId",adminAuthentication, deleteStudentValidation, deleteStudentController);

export default studentRouter;