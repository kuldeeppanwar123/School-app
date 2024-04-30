import express from 'express';
import { getAllSectionsController, registerSectionController } from '../controllers/section.controller.js';
import { adminAuthentication } from '../middlewares/admin.authentication.middleware.js';
import { registerSectionValidation } from '../middlewares/section.validation.middleware.js';

const sectionRouter = express.Router();
/**
 * @swagger
 * /section/register:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: To register a class-section
 *     description: This API will register a class-section. The coordinator will manage one section of students.
 *     tags:
 *       - Section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cordinatorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: section registered successfully
 *       400:
 *         description: Unauthorized request
 *       500:
 *         description: Server error
 */
sectionRouter.post("/register",adminAuthentication,registerSectionValidation,registerSectionController);

/**
 * @swagger
 * /section/all:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: get list of all sections.
 *     description: get list of all sections along with students list and cordinator.
 *     tags:
 *       - Section
 *     responses:
 *       200:
 *         description: Teacher marked as coordinator successfully
 *       400:
 *         description: Unauthorized request
 *       500:
 *         description: Server error
 */
 sectionRouter.get("/all",schoolAuthentication, getAllSectionsController );

export default sectionRouter;