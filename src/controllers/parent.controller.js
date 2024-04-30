import generateAccessToken from "../services/accessToken.service.js";
import { checkParentExist, createParent, findParentByUsername } from "../services/parent.services.js";
import { checkPasswordMatch, hashPassword } from "../services/password.service.js";
import { error, success } from "../utills/responseWrapper.js";

export async function registerParentController(req, res) {
    try {
      const studentId = req.params.studentId;
      const { username, firstname, lastname, phone, email, password, address } =
        req.body;
      const existingParent = await checkParentExist(username, email);
      const student = await findStudentById(studentId);
      if (!student) {
        return res.send(error(400, "student doesn't exists"));
      }
      if (existingParent && existingParent.username === username) {
        return res.send(error(400, "username already exists"));
      }
      if (existingParent && existingParent.email === email) {
        return res.send(error(400, "email already exists"));
      }
      const hashedPassword = await hashPassword(password);
      const parent = await createParent(
        username,
        firstname,
        lastname,
        phone,
        email,
        hashedPassword,
        address
      );
      const isChildExist = checkChildExist(parent.child, studentId);
      if (isChildExist) {
        return res.send(error(400, "child already linked with parent"));
      }
      student.parent = parent["_id"];
      parent.child.push(student["_id"]);
      await student.save();
      await parent.save();
  
      return res.send(success(201, "parent registered successfully!"));
    } catch (err) {
      return res.send(error(500, err.message));
    }
  }

export async function loginParentController(req,res){
    try {
        const {username , password} = req.body;
        const parent = await findParentByUsername(username);
        if(!parent){
            return res.send(error(404 , "parent is not registered"));
        }
        const matchPassword = await checkPasswordMatch(password , parent.password);
        if(!matchPassword){
            return res.send(error(404,"incorrect password"));
        }
        const accessToken = generateAccessToken({parentId:parent["_id"]});
        return res.send(success(200, {accessToken}));
    } catch (err) {
        return res.send(error(500, err.message));    
    }
}

export async function registerExistingParentController(req, res) {
    try {
      const studentId = req.params.studentId;
      const { parentId } = req.body;
      const parent = await findParentById(parentId);
      if (!parent) {
        return res.send(error(400, "parent doesn't exists"));
      }
      const student = await findStudentById(studentId);
      if (!student) {
        return res.send(error(400, "student doesn't exists"));
      }
      const isChildExist = checkChildExist(parent.child, studentId);
      if (isChildExist) {
        return res.send(error(400, "child already linked with parent"));
      }
      parent.child.push(studentId);
      student.parent = parentId;
      await parent.save();
      await student.save();
      return res.send(
        success(200, "student linked with existing parent successfully")
      );
  
      return res.send();
    } catch (err) {
      return res.send(error(500, err.message));
    }
  }