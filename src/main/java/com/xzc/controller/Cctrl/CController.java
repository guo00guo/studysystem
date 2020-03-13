package com.xzc.controller.Cctrl;

import com.xzc.model.*;
import com.xzc.service.CourseService;
import com.xzc.service.StudentService;
import com.xzc.util.Result;
import com.xzc.util.UserCF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recommand/Course")
public class CController {

    @Autowired
    CourseService courseService;

    @Autowired
    StudentService studentService;

    @Autowired
    UserCF userCF;

    @RequestMapping(value = "/updateStudentById", method = RequestMethod.POST)
    public Result updateUserById(User user, MultipartFile file) {
        System.out.println("StudentController.updateStudentById");
        System.out.println(user.toString());
        Integer i = studentService.updateUserById(user,file);

        if (i < 1) {
            return Result.error();
        }
        else{
            User newUser = studentService.selectUserById(user.getUserId());
            return Result.success(newUser);
        }
    }

    @RequestMapping(value = "/changeStudentPassWord")
    public Result changePassWord(Integer userId, String oldPassword, String newPassword) {
        System.out.println("StudentController.changePassWord");
        Integer i = studentService.changePassWord(userId, oldPassword, newPassword);
        if (i < 1) {
            return Result.error(i, "原始密码输入不正确！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getAllSelectCourseByUserId")
    public List<SelectCourse> getAllSelectCourseByUserId(Integer userId) {
        return studentService.getAllSelectCourseByUserId(userId);
    }

    //根据studentId获取推荐课程
    @RequestMapping(value = "/getRecommendCourseByUserId")
    public ArrayList<Course> getRecommendCourseByUserId(Integer userId) {
        ArrayList<Integer> recommendResult = userCF.getRecommendResult(userId);
        System.out.println("recommendResult.toString() = " + recommendResult.toString());
        ArrayList<Course> recommendCourses = new ArrayList<Course>();
        for (Integer courseId:recommendResult) {
            System.out.println("courseId = " + courseId);
            Course recommendCourse = courseService.getCourseAndUnitAndKPByCourseId(courseId);
            System.out.println("recommendCourse = " + recommendCourse.toString());
            recommendCourses.add(recommendCourse);
        }
        System.out.println("recommendCourses.size() = " + recommendCourses.size());
        return recommendCourses;
    }

    @RequestMapping(value = "/addCourseToSelectCourseByCourseId")
    public Result addCourseToSelectCourseByCourseId(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = studentService.addCourseToSelectCourseByCourseId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/judgeSelectCourseByCourseIdAndUserId")
    public Result judgeSelectCourseByCourseIdAndUserId(Integer courseId, Integer userId) {
        System.out.println("courseId ==== userId      " + courseId + "   " + userId);
        Integer i = studentService.judgeSelectCourseByCourseIdAndUserId(courseId, userId);

        if(i == -1){
            return Result.error(-1, "已经加入学习列表，去看看别的课程吧！");
        }
        return Result.success(i);
    }

    @RequestMapping(value = "/getCourseAndUnitAndKpAndRecourseByCourseId")
    public Result getCourseAndUnitAndKpAndRecourseByCourseId(Integer courseId) {
        List<CourseUnit> unitList = studentService.getCourseAndUnitAndKpAndRecourseByCourseId(courseId);
        if(unitList == null || unitList.size() == 0){
            return Result.error(-1, "获取课程信息失败！");
        }
        return Result.success(unitList);
    }

    @RequestMapping(value = "/getResourceByCourseKPId")
    public Result getResourceByCourseKPId(Integer courseKPId) {
        List<Resource> resourceList = studentService.getResourceByCourseKPId(courseKPId);

        if(resourceList == null || resourceList.size() == 0){
            return Result.error(-1, "获取资源失败！");
        }
        return Result.success(resourceList);
    }

    //返回所有已开课程，以分页的形式
    @RequestMapping("/getAllCourseWithPage")
    public Pager getAllCourseWithPage(Integer currentPage, Integer pageSize) {
        Map<String,Object> pageInfo = new HashMap<String,Object>();
        pageInfo.put("currentPage", currentPage);
        pageInfo.put("pageSize", pageSize);
        pageInfo.put("flag", "yes");

        //获取课程数据
        List<Course> courseList = courseService.getAllCourseWithPage(pageInfo);

        Map<String, String> parmas = new HashMap<String, String>();
        parmas.put("flag", "yes");

        //获取课程总数
        Integer courseCount = courseService.countCourse(parmas);

        System.out.println("currentPage=   " + currentPage);
        System.out.println("pageSize=   " + pageSize);
        System.out.println("courseCount=   " + courseCount);

        //构造pager对象
        Pager pager = new Pager();
        pager.setList(courseList);
        pager.setPageSize(pageSize);
        pager.setPageNo(currentPage);
        pager.setRowsTotal(courseCount);

        return pager;
    }


    //返回所有已开课程，以分页的形式
    @RequestMapping("/getCourseByCourseSortTwos")
    public Pager getCourseByCourseSortTwos(Integer currentPage, Integer pageSize, @RequestParam(value = "courseTwoIds")ArrayList<Integer> courseTwoIds) {
        Map<String,Object> pageInfo = new HashMap<String,Object>();
        pageInfo.put("currentPage", currentPage);
        pageInfo.put("pageSize", pageSize);
        pageInfo.put("flag", "yes");
        pageInfo.put("courseTwoIds", courseTwoIds);

        //获取课程数据
        List<Course> courseList = courseService.getCourseByCourseTwoIdsWithPage(pageInfo);

        Map<String, Object> parmas = new HashMap<String, Object>();
        parmas.put("flag", "yes");
        parmas.put("courseTwoIds", courseTwoIds);

        //获取课程总数
        Integer courseCount = courseService.countCourseByCourseTwoIds(parmas);

        System.out.println("currentPage=   " + currentPage);
        System.out.println("pageSize=   " + pageSize);
        System.out.println("courseCount=   " + courseCount);

        //构造pager对象
        Pager pager = new Pager();
        pager.setList(courseList);
        pager.setPageSize(pageSize);
        pager.setPageNo(currentPage);
        pager.setRowsTotal(courseCount);

        return pager;
    }

    //返回所有已开课程，以分页的形式
    @RequestMapping("/getCourseByCourseSortTwo")
    public Pager getCourseByCourseSortTwo(Integer currentPage, Integer pageSize, Integer courseTwoId) {
        Map<String,Object> pageInfo = new HashMap<String,Object>();
        pageInfo.put("currentPage", currentPage);
        pageInfo.put("pageSize", pageSize);
        pageInfo.put("flag", "yes");
        pageInfo.put("courseTwoId", courseTwoId);

        //获取课程数据
        List<Course> courseList = courseService.getCourseByCourseTwoIdWithPage(pageInfo);

        Map<String, Object> parmas = new HashMap<String, Object>();
        parmas.put("flag", "yes");
        parmas.put("courseTwoId", courseTwoId);

        //获取课程总数
        Integer courseCount = courseService.countCourseByCourseTwoId(parmas);

        System.out.println("currentPage=   " + currentPage);
        System.out.println("pageSize=   " + pageSize);
        System.out.println("courseCount=   " + courseCount);

        //构造pager对象
        Pager pager = new Pager();
        pager.setList(courseList);
        pager.setPageSize(pageSize);
        pager.setPageNo(currentPage);
        pager.setRowsTotal(courseCount);

        return pager;
    }


    //返回关键词搜索已开课程
    @RequestMapping("/getCourseByCourseName")
    public List<Course> getCourseByCourseNameSearch(String courseName) {
        System.out.println(courseName);

        //获取课程数据
        List<Course> courseList = courseService.getCourseByCourseName(courseName);
        return courseList;
    }

    //返回关键词搜索已开课程
    @RequestMapping("/getCourseNumByCourseName")
    public Integer getCourseNumByCourseName(String courseName) {

        //获取课程总数
        return courseService.countCourseByCourseName(courseName);
    }


    @RequestMapping("/getCourseDetailByCourseId")
    public Result getCourseDetailByCourseId(Integer courseId){

        //获取课程信息
        Course course = courseService.getCourseAndUnitAndKPByCourseId(courseId);

        if(course == null){
            return Result.error();
        }

//        CourseSortOne courseSortOne = courseService.getCourseSortOneByCourseSortOneId(courseSortTwo.getCourseSortOneId());
//
//        int count = courseService.getCountStudentsByCourseId(courseId);
//
//        CourseDetail courseDetail = new CourseDetail();
//        courseDetail.setCourseSortTwo(courseSortTwo);
//        courseDetail.setCourseSortOne(courseSortOne);
//        courseDetail.setCourse(course);
//        courseDetail.setUser(user);
//        courseDetail.setCount(count);
//
//        return Result.success(courseDetail);
        //获取课程二分类信息
        CourseSortTwo courseSortTwo = courseService.getCourseSortTwoByCourseSortTwoId(course.getCourseSortTwoId());

        //获取一级分类信息
        CourseSortOne courseSortOne = courseService.getCourseSortOneByCourseSortOneId(courseSortTwo.getCourseSortOneId());

        //获取教师信息
        User user = courseService.getTeacherInfoByCourseId(course.getCourseId());

        //获取课程学习人数信息
        int count = courseService.getCountStudentsByCourseId(courseId);

        CourseDetail courseDetail = new CourseDetail();
        courseDetail.setCourseSortTwo(courseSortTwo);
        courseDetail.setCourseSortOne(courseSortOne);
        courseDetail.setCourse(course);
        courseDetail.setUser(user);
        courseDetail.setCount(count);

        return Result.success(courseDetail);
    }

    //根据用户ID获取推荐课程
    @RequestMapping("/getRecommendCourse")
    public List<Course> getRecommendCourse(Integer userId) {
        //获取课程数据
        List<Course> courseList = courseService.getCourseByUserId(userId);
        return courseList;
    }

    //根据课程ID获取选课信息
    @RequestMapping("/getSelectCourseByCourseID")
    public List<SelectCourse> getSelectCourseByCourseID(Integer courseId) {
        //获取课程数据
        List<SelectCourse> courseList = courseService.getSelectCourseByCourseID(courseId);
        return courseList;
    }


}

