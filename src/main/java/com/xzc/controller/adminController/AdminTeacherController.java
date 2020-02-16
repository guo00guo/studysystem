package com.xzc.controller.adminController;

import com.xzc.model.TSPageBean;
import com.xzc.model.Teacher;
import com.xzc.model.User;
import com.xzc.service.TeacherService;
import com.xzc.service.UserService;
import com.xzc.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by 郭超 on 2018/5/25.
 */
@Controller
public class AdminTeacherController {

    @Autowired
    TeacherService teacherService;
    @Autowired
    UserService userService;

    @GetMapping("/adminGetAllTeacher/{queryName}/{currentPage}")
    public String getAllTeacher(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        System.out.println("adminGetAllTeacher");
//        System.out.println("queryName  " + queryName);
        List<Teacher> teacherByNames = null;
        Integer count = 0;
        Integer totalPage = 0;
        Integer pageSize = 2;       //初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1;        //当前页
        }
        //queryName为null则是查找全部
        if(!queryName.equals("null")){
            if (queryName.equals("findAllTeacher")) {
                System.out.println("findAllTeacher  ");
                teacherByNames = teacherService.findAllTeacherByPage(currentPage, pageSize);
                count = teacherService.findAllTeacher().size();//教师用户总数
                queryName = "null";
            } else {
                teacherByNames = teacherService.findTeacherByPageByName(currentPage, pageSize, queryName);//查找当前页指定用户名教师
                count = teacherService.findTeacherByName(queryName).size();//指定用户名教师的总数
            }
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            model.addAttribute("totalCount", count); //教师用户总数
            model.addAttribute("currentCount", teacherByNames.size()); //教师用户当前显示数
            model.addAttribute("queryName",queryName);
            model.addAttribute("teachers", teacherByNames);
        }else{
//            List<User> allTeacher = teacherService.findAllTeacher();  //查找所有教师用户
            count = teacherService.findAllTeacher().size();
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            if(currentPage > totalPage){
                currentPage = totalPage;
            }
            teacherByNames = teacherService.findAllTeacherByPage(currentPage, pageSize);
//            System.out.println("teacherByNames.size() " + teacherByNames.size());
            model.addAttribute("totalCount", count); //教师用户总数
            model.addAttribute("currentCount", teacherByNames.size()); //教师用户当前显示数
            model.addAttribute("queryName",queryName);
            model.addAttribute("teachers", teacherByNames);
//            System.out.println("userid  " +teacherByNames.get(0).getUserId());
        }
        model.addAttribute("totalPage", totalPage);          //总页数
        model.addAttribute("currentPage", currentPage);      //当前页
        return "admin_teacher_managerment";
    }

    //ajax查询教师
    @GetMapping("/ajaxSerachTeacher/{queryName}/{currentPage}")
    @ResponseBody
    public TSPageBean ajaxSerachTeacher(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        List<Teacher> teacherByNames;
        TSPageBean tsPageBean = new TSPageBean();
        Integer count = 0;

        Integer pageSize = 2;//初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1; //当前页
        }
        if (queryName.equals("findAllTeacher")) {
            teacherByNames = teacherService.findAllTeacherByPage(currentPage, pageSize);//分页查找教师
            count = teacherService.findAllTeacher().size();//教师总数
            queryName = "null";
        } else {
            teacherByNames = teacherService.findTeacherByPageByName(currentPage, pageSize, queryName);//查找当前页指定用户名教师
            count = teacherService.findTeacherByName(queryName).size();//指定用户名教师的总数
        }
        Integer totalPage = (int) Math.ceil(count * 1.0 / pageSize);
        tsPageBean.setCount(count);
        tsPageBean.setCurrentPage(currentPage);
        tsPageBean.setPageSize(pageSize);
        tsPageBean.setTotalPage(totalPage);
        tsPageBean.setCurrentCount(teacherByNames.size());//当前页面热搜数量
        tsPageBean.setTeacherList(teacherByNames);
        tsPageBean.setTopSerachName(queryName);
        return tsPageBean;
    }

    //删除教师
    @DeleteMapping("/deleteAllTeacher/{ids}")
    public String deleteAllTeacher(@PathVariable("ids") String ids){
        String[] sid = ids.split("_");
        for (int i = 0; i < sid.length; i++) {
            teacherService.deleteTeacherByUserId(Integer.parseInt(sid[i]));//通过userId删除T_Teacher表中的教师
            userService.deleteStudentByUserId(Integer.parseInt(sid[i]));//通过userId删除t_user表中的教师
        }
        return "redirect:/adminGetAllTeacher/null/1";
    }

    //查看教师信息
    @GetMapping("/adminToLookTeacherPage/{userId}/{queryName}/{currentPage}")
    public String adminToLookTeacherPage(@PathVariable("userId") Integer userId, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage, Model model){
        Teacher teacherUser = teacherService.selectTeByUserId(userId);
        model.addAttribute("teacher", teacherUser);
        return "admin_teacher_look";
    }

    //查看教师信息
    @GetMapping("/adminToLookTeacher/{queryName}/{currentPage}")
    public String adminToLookTeacher(@PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage){

        return "redirect:/adminGetAllTeacher" + queryName +"/" + currentPage;
    }

    @RequestMapping("/teacherExport")
    public void export(HttpServletResponse response){
        //模拟从数据库获取需要导出的数据
        List<User> allTeacher = teacherService.findAllTeacher();
        //导出操作
        FileUtil.exportExcel(allTeacher,"教师信息表","草帽一伙",User.class,"教师.xls",response);
    }

    @RequestMapping("/teacherImport")
    public String topSearchImport(){
        String filePath = "D:\\海贼王.xls";
        //解析excel，
        List<User> allTeacher = FileUtil.importExcel(filePath,1,1,User.class);
        //也可以使用MultipartFile,使用 FileUtil.importExcel(MultipartFile file, Integer titleRows, Integer headerRows, Class<T> pojoClass)导入
        System.out.println("导入数据一共【"+allTeacher.size()+"】行");
        //TODO 保存数据库
        return "redirect:/adminGetAllTeacher/null/1";
    }

}
