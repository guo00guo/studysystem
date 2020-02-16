package com.xzc.controller.adminController;

import com.xzc.model.*;
import com.xzc.service.CourseAndTeacherService;
import com.xzc.service.CourseSortOneService;
import com.xzc.service.CourseSortTwoService;
import com.xzc.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by 郭超 on 2018/5/18.
 */

@Controller
public class AdminCourseController {

    @Autowired
    private CourseAndTeacherService courseAndTeacherService;
    @Autowired
    private CourseSortOneService courseSortOneService;
    @Autowired
    private CourseSortTwoService courseSortTwoService;

    //进入后台管理界面首页
    @GetMapping("/AdminToMainHtml")
    public String AdminToMainHtml(){
        return "admin_main";
    }

    //这个函数获取所有课程
//    @GetMapping("/adminGetAllCourseOnly")

    //这个函数获取所有课程
    @GetMapping("/adminGetAllCourse/{queryName}/{currentPage}")
    public String getAllCourse(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        System.out.println("adminGetAllCourse--课程管理");
        List<CourseExt> courseByNames = null;
        Integer count = 0;
        Integer totalPage = 0;
        Integer pageSize = 6;       //初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1;        //当前页
        }
        //queryName为null则是查找全部
        if(!queryName.equals("null")){
            if (queryName.equals("findAllCourse")) {
                courseByNames = courseAndTeacherService.findAllCourseExtByPage(currentPage, pageSize);
                count = courseAndTeacherService.getCourseAndTeacher().size();//课程总数
                queryName = "null";
            } else {
                courseByNames = courseAndTeacherService.findAllCourseExtByPageByName(currentPage, pageSize, queryName);
                count = courseAndTeacherService.findCourseExtByName(queryName).size();//课程总数
            }
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            model.addAttribute("totalCount", count); //课程总数
            model.addAttribute("currentCount", courseByNames.size()); //课程当前显示数
            model.addAttribute("queryName",queryName);
            model.addAttribute("courseAndTeacher", courseByNames);
        }else{
            count = courseAndTeacherService.getCourseAndTeacher().size();
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            if(currentPage > totalPage){
                currentPage = totalPage;
            }
            courseByNames = courseAndTeacherService.findAllCourseExtByPage(currentPage, pageSize);
            model.addAttribute("totalCount", count); //课程用户总数
            model.addAttribute("currentCount", courseByNames.size()); //课程用户当前显示数
            model.addAttribute("queryName",queryName);
            model.addAttribute("courseAndTeacher", courseByNames);
        }
        model.addAttribute("totalPage", totalPage);          //总页数
        model.addAttribute("currentPage", currentPage);      //当前页
        return "admin_course_managerment";
    }

    //ajax查询课程
    @GetMapping("/ajaxSerachCourse/{queryName}/{currentPage}")
    @ResponseBody
    public TSPageBean ajaxSerachCourse(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        List<CourseExt> courseByNames;
        TSPageBean tsPageBean = new TSPageBean();
        Integer count = 0;
        Integer pageSize = 6;//初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1; //当前页
        }
        if (queryName.equals("findAllCourse")) {
            courseByNames = courseAndTeacherService.findAllCourseExtByPage(currentPage, pageSize);
            count = courseAndTeacherService.getCourseAndTeacher().size();//课程总数
            queryName = "null";
        } else {
            courseByNames = courseAndTeacherService.findAllCourseExtByPageByName(currentPage, pageSize, queryName);
//            count = courseAndTeacherService.findCourseExtByName(queryName).size();//课程总数
            count = courseByNames.size();//课程总数
        }
        Integer totalPage = (int) Math.ceil(count * 1.0 / pageSize);

        tsPageBean.setCount(count);
        tsPageBean.setCurrentPage(currentPage);
        tsPageBean.setPageSize(pageSize);
        tsPageBean.setTotalPage(totalPage);
        tsPageBean.setCurrentCount(courseByNames.size());//当前页面热搜数量
        tsPageBean.setCourseList(courseByNames);
        tsPageBean.setTopSerachName(queryName);
        System.out.println("tsPageBean.toString() = " + tsPageBean.toString());
        return tsPageBean;
    }


    @GetMapping("/adminToLookCoursePage/{id}/{queryName}/{currentPage}")
    public String adminToLookCoursePage(Model model, @PathVariable("id") Integer id, @PathVariable("queryName") String queryName,
                                        @PathVariable("currentPage") Integer currentPage){
        CourseExt Course = courseAndTeacherService.getCourseAndTeacherById(id);
        List<CourseSortOne> allCourseSortOne = courseSortOneService.getAllCourseSortOne();
        CourseSortOne courseSortOne = Course.getCourseSortTwoExt().getCourseSortOne();
        List<CourseSortTwo> courseSortTwo = courseSortTwoService.getCourseSortTwoAndCourse(courseSortOne.getCourseSortOneId());
        model.addAttribute("course",Course);
        model.addAttribute("allCourseSortOne",allCourseSortOne);
        model.addAttribute("courseSortTwo",courseSortTwo);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("queryName", queryName);
        return "admin_course_look";
    }

    @DeleteMapping("/deleteAllCourse/{ids}")
    public String deleteCourseByID(@PathVariable("ids") String ids, Model model){
        String[] sid = ids.split("_");
        for (int i = 0; i < sid.length; i++) {
//            System.out.println(sid[i]);
            int num = courseAndTeacherService.deleteCourseExtById(Integer.parseInt(sid[i]));
            System.out.println("num" + num);
        }
        return "redirect:/adminGetAllCourse/null/1";
    }

//    @PostMapping("/addCourse")
//    public String addCourse(){
//        return "redirect:/adminGetAllCourse/null/1";
//    }

    @RequestMapping("/courseExport")
    public void courseExport(HttpServletResponse response){
        //模拟从数据库获取需要导出的数据
        List<CourseExt> course = courseAndTeacherService.getCourseAndTeacher();
        //导出操作
        FileUtil.exportExcel(course,"课程信息表","草帽一伙",CourseExt.class,"课程.xls",response);
    }

    @RequestMapping("/courseImport")
    public String courseImport(){
        String filePath = "D:\\海贼王.xls";
        //解析excel，
        List<CourseExt> course = FileUtil.importExcel(filePath,1,1,CourseExt.class);
        //也可以使用MultipartFile,使用 FileUtil.importExcel(MultipartFile file, Integer titleRows, Integer headerRows, Class<T> pojoClass)导入
        System.out.println("导入数据一共【"+course.size()+"】行");
        //TODO 保存数据库
        return "redirect:/adminGetAllStudent/null/1";
    }

}
