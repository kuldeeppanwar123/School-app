import {
  checkAttendanceAlreadyMarked,
  checkHolidayEvent,
  createAttendance,
} from "../services/attendance.service.js";
import { error, success } from "../utills/responseWrapper.js";

export async function markAttendanceController(req, res) {
  try {
    // console.log(req.body,req.teacherId,req.params.sectionId);
    // const{studentId , sectionId,isPresent} = req.body;
    const { present, absent } = req.body;
    const sectionId = req.params.sectionId;
    const classTeacherId = req.teacherId;
    const adminId = req.adminId;
    const date = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = daysOfWeek[date.getDay()];
    if (day === "Sunday") {
      return res.send(error(400, "today is sunday"));
    }
    const currDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const holidayEvent = await checkHolidayEvent({ currDate, adminId });
    if (holidayEvent) {
      return res.send(error(400, "today is scheduled as holiday!"));
    }
    present.map(async (student) => {
      const createdAttendance = await createAttendance({
        currDate,
        day,
        isPresent: student.isPresent,
        studentId: student._id,
        sectionId,
        classTeacherId,
        adminId,
      });
    });
    absent.map(async (student) => {
      const createdAttendance = await createAttendance({
        currDate,
        day,
        isPresent: student.isPresent,
        studentId: student._id,
        sectionId,
        classTeacherId,
        adminId,
      });
    });
    return res.send(success(200, "attendance marked sucessfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
}

// export async function markAttendanceController(req,res){
//     try {
//         const{studentId , sectionId,isPresent} = req.body;
//         const classTeacherId = req.classTeacherId;
//         const adminId = req.adminId;
//         const date = new Date();
//         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         const day = daysOfWeek[date.getDay()];
//         if(day==="Sunday"){
//             return res.send(error(400,"today is sunday"));
//         }
//         const currDate = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
//         const holidayEvent = await checkHolidayEvent({currDate,adminId});
//         if(holidayEvent){
//             return res.send(error(400,"today is scheduled as holiday!"));
//         }
//         const attendance = await checkAttendanceAlreadyMarked({studentId,currDate});
//         if(attendance){
//             attendance["isPresent"] = isPresent;
//             await attendance.save();
//             return res.send(success(400,"attendance updated successfully"));
//         }
//         const createdAttendance = await createAttendance({currDate,day,isPresent,studentId,sectionId,classTeacherId,adminId});
//         return res.send(success(200,"attendance marked sucessfully"));
//     } catch (err) {
//         return res.send(error(500,err.message));
//     }
// }
