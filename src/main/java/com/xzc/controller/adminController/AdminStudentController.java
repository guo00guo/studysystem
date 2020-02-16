package com.xzc.controller.adminController;

import com.xzc.model.Student;
import com.xzc.model.TSPageBean;
import com.xzc.model.User;
import com.xzc.service.StudentService;
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
public class AdminStudentController {

    @Autowired
    UserService userService;
    @Autowired
    StudentService studentService;

    @GetMapping("/adminGetAllStudent/{queryName}/{currentPage}")
    public String getAllStudent(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        System.out.println("adminGetAllStudent");
//        System.out.println("queryName  " + queryName);
        List<Student> studentByNames = null;
        Integer count = 0;
        Integer totalPage = 0;
        Integer pageSize = 6;       //初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1;        //当前页
        }
        //queryName为null则是查找全部
        if(!queryName.equals("null")){
            if (queryName.equals("findAllStudent")) {
                System.out.println("findAllStudent  ");
                studentByNames = userService.findAllStudentByPage(currentPage, pageSize);
                count = userService.findAllUser().size();//学习者用户总数
                queryName = "null";
            } else {
                studentByNames = userService.findStudentByPageByName(currentPage, pageSize, queryName);//查找当前页指定用户名学习者
                count = userService.findStudentByName(queryName).size();//指定用户名学习者的总数
            }
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            model.addAttribute("totalCount", count); //学习者用户总数
            model.addAttribute("currentCount", studentByNames.size()); //学习者用户当前显示数
            model.addAttribute("queryName",queryName);
            model.addAttribute("students", studentByNames);
        }else{
            List<User> allStudent = userService.findAllUser();  //查找所有学习者用户
            count = allStudent.size();
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            if(currentPage > totalPage){
                currentPage = totalPage;
            }
            studentByNames = userService.findAllStudentByPage(currentPage, pageSize);
//            System.out.println("studentByNames.size() " + studentByNames.size());
            model.addAttribute("totalCount", count); //学习者用户总数
            model.addAttribute("currentCount", studentByNames.size()); //学习者用户当前显示数
            model.addAttribute("queryName",queryName);
            model.addAttribute("students", studentByNames);
//            System.out.println("userid  " +studentByNames.get(0).getUserId());
        }
        model.addAttribute("totalPage", totalPage);          //总页数
        model.addAttribute("currentPage", currentPage);      //当前页
        return "admin_student_managerment";
    }

    //ajax查询学习者
    @GetMapping("/ajaxSerachStudent/{queryName}/{currentPage}")
    @ResponseBody
    public TSPageBean ajaxSerachStudent(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        List<Student> studentByNames;
        TSPageBean tsPageBean = new TSPageBean();
        Integer count = 0;

        Integer pageSize = 6;//初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1; //当前页
        }
        if (queryName.equals("findAllStudent")) {
            studentByNames = userService.findAllStudentByPage(currentPage, pageSize);//分页查找学习者
            count = userService.findAllUser().size();//学习者总数
            queryName = "null";
        } else {
            studentByNames = userService.findStudentByPageByName(currentPage, pageSize, queryName);//查找当前页指定用户名学习者
            count = userService.findStudentByName(queryName).size();//指定用户名学习者的总数
        }
        Integer totalPage = (int) Math.ceil(count * 1.0 / pageSize);
        tsPageBean.setCount(count);
        tsPageBean.setCurrentPage(currentPage);
        tsPageBean.setPageSize(pageSize);
        tsPageBean.setTotalPage(totalPage);
        tsPageBean.setCurrentCount(studentByNames.size());//当前页面热搜数量
        tsPageBean.setStudentList(studentByNames);
        tsPageBean.setTopSerachName(queryName);
        return tsPageBean;
    }

    //删除学习者
    @DeleteMapping("/deleteAllStudent/{ids}")
    public String deleteAllStudent(@PathVariable("ids") String ids){
        String[] sid = ids.split("_");
        for (int i = 0; i < sid.length; i++) {
            studentService.deleteStudentByUserId(Integer.parseInt(sid[i]));//通过userId删除T_Student表中的学习者
            userService.deleteStudentByUserId(Integer.parseInt(sid[i]));//通过userId删除t_user表中的学习者
        }
        return "redirect:/adminGetAllStudent/null/1";
    }

    //查看学习者信息
    @GetMapping("/adminToLookStudentPage/{userId}/{queryName}/{currentPage}")
    public String adminToLookStudentPage(@PathVariable("userId") Integer userId, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage, Model model){
        Student studentUser = studentService.selectStuByUserId(userId);
        model.addAttribute("student", studentUser);
        return "admin_student_look";

    }

    //查看学习者信息
    @GetMapping("/adminToLookStudent/{queryName}/{currentPage}")
    public String adminToLookStudent(@PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage){

        return "redirect:/adminGetAllStudent" + queryName +"/" + currentPage;
    }

    @RequestMapping("/studentExport")
    public void studentExport(HttpServletResponse response){
        //模拟从数据库获取需要导出的数据
        List<User> allStudent = userService.findAllUser();
        //导出操作
        FileUtil.exportExcel(allStudent,"学习者信息表","草帽一伙",User.class,"学习者.xls",response);
    }

    @RequestMapping("/studentImport")
    public String studentImport(){
        String filePath = "D:\\海贼王.xls";
        //解析excel，
        List<User> allStudent = FileUtil.importExcel(filePath,1,1,User.class);
        //也可以使用MultipartFile,使用 FileUtil.importExcel(MultipartFile file, Integer titleRows, Integer headerRows, Class<T> pojoClass)导入
        System.out.println("导入数据一共【"+allStudent.size()+"】行");
        //TODO 保存数据库
        return "redirect:/adminGetAllStudent/null/1";
    }
}
