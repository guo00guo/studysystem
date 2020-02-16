package com.xzc.controller.adminController;

import com.xzc.model.CourseSortOne;
import com.xzc.model.CourseSortTwo;
import com.xzc.model.TSPageBean;
import com.xzc.service.CourseSortOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AdminCourseSortOneController {

    @Autowired
    CourseSortOneService courseSortOneService;

    //这个函数获取所有一级分类
    @GetMapping("/adminGetAllCourseSortOne/{queryName}/{currentPage}")
    public String getAllCourseSortOne(Model model, @PathVariable("queryName") String queryName,
                                      @PathVariable("currentPage") Integer currentPage) {
        System.out.println("adminGetAllCourseSortOne--课程一级分类");
        List<CourseSortOne> courseSortOneByPage = null;
        Integer count = 0;
        Integer totalPage = 0;
        Integer pageSize = 4;       //初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1;        //当前页
        }
        //queryName为null则是查找全部
        if (!queryName.equals("null")) {
            if (queryName.equals("findAllCourseSortOne")) {
                System.out.println("findAllCourseSortOne  ");
                courseSortOneByPage = courseSortOneService.findAllByPage(currentPage, pageSize);
                count = courseSortOneService.getAllCourseSortOne().size();//教师用户总数
                queryName = "null";
            } else {
                courseSortOneByPage = courseSortOneService.findByPageByName(currentPage, pageSize, queryName);//查找当前页指定用户名教师
                count = courseSortOneService.findByName(queryName).size();//指定用户名教师的总数
            }
            model.addAttribute("currentCount", courseSortOneByPage.size()); //课程分类当前显示数
            model.addAttribute("courseSortOnes", courseSortOneByPage);//搜索出的结果
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            model.addAttribute("totalCount", count); //课程分类总数
            model.addAttribute("queryName", queryName);
        } else {
            count = courseSortOneService.count();
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            List<CourseSortOne> allQuery = courseSortOneService.getAllCourseSortOne();
            courseSortOneByPage = courseSortOneService.findAllByPage(currentPage, pageSize);
            model.addAttribute("totalCount", count); //课程分类总数
            model.addAttribute("currentCount", courseSortOneByPage.size()); //课程分类当前显示数
            model.addAttribute("allQuery", allQuery);
            model.addAttribute("courseSortOnes", courseSortOneByPage);
        }
        model.addAttribute("totalPage", totalPage);          //总页数
        model.addAttribute("currentPage", currentPage);      //当前页
        return "admin_courseSort_management";
    }

    //ajax查询课程分类
    @GetMapping("/ajaxSerachCourseSortOne/{queryName}/{currentPage}")
    @ResponseBody
    public TSPageBean ajaxSerachCourseSortOne(Model model, @PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage) {
        List<CourseSortOne> courseortOneByNames;
        TSPageBean tsPageBean = new TSPageBean();
        Integer count = 0;
        Integer pageSize = 4;//初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1; //当前页
        }
        if (queryName.equals("findAllCourseSortOne")) {
            courseortOneByNames = courseSortOneService.findAllByPage(currentPage, pageSize);
            count = courseSortOneService.getAllCourseSortOne().size();//课程分类总数
            queryName = "null";
        } else {
            courseortOneByNames = courseSortOneService.findByPageByName(currentPage, pageSize, queryName);
            count = courseSortOneService.findByName(queryName).size();//关键字时课程分类总数
        }
        Integer totalPage = (int) Math.ceil(count * 1.0 / pageSize);
        tsPageBean.setCount(count);
        tsPageBean.setCurrentPage(currentPage);
        tsPageBean.setPageSize(pageSize);
        tsPageBean.setTotalPage(totalPage);
        tsPageBean.setCurrentCount(courseortOneByNames.size());//当前页面分类数量
        tsPageBean.setCourseSortOneList(courseortOneByNames);
        tsPageBean.setTopSerachName(queryName);
        return tsPageBean;
    }

    /*跳转到修改页面*/
    @GetMapping("/toEditCourseSortPage/{id}/{queryName}/{currentPage}")
    public String toEditPage(@PathVariable("id") Integer id, @PathVariable("queryName") String queryName,
                             @PathVariable("currentPage") Integer currentPage, Model model) {
        System.out.println("currentPage  " + currentPage);
        CourseSortOne courseSortOne = courseSortOneService.findById(id);
        List<CourseSortTwo> sortTwos = courseSortOneService.findSortTwoBySortOneId(id);
        model.addAttribute("queryName", queryName);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("courseSortOne", courseSortOne);
        model.addAttribute("sortTwos", sortTwos);
        System.out.println("sortTwos.size()  " + sortTwos.size());
        return "admin_courseSort_edit";
    }

    /*修改*/
    @PutMapping("/courseSortOne/{queryName}/{currentPage}")
    public String editCourseSortOne(@PathVariable("queryName")String  queryName, @PathVariable("currentPage") Integer currentPage, CourseSortOne courseSortOne) {
        courseSortOneService.editCourseSortOne(courseSortOne);
        return "redirect:/adminGetAllCourseSortOne/"+ queryName+"/"+currentPage;
    }

    //到添加界面
    @GetMapping("/toAddCourseSortOnePage/{queryName}/{currentPage}")
    public String toAddCourseSortOnePage(@PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage, Model model) {
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("queryName", queryName);
        return "admin_courseSort_edit";
    }

    //增加  currentPage不需要用到
    @PostMapping("/courseSortOne/{queryName}/{currentPage}")
    public String addCourseSortOne(@PathVariable("queryName") String queryName, @PathVariable("currentPage") Integer currentPage, CourseSortOne courseSortOne) {
        int i = courseSortOneService.addCourseSortOne(courseSortOne);
        return "redirect:/adminGetAllCourseSortOne/" + queryName + "/" + currentPage;
    }

    //删除（单个删除或者批量删除）
    @DeleteMapping("/deleteAllCourseSortOne/{ids}")
    public String deleteAll(@PathVariable("ids") String ids) {
        String[] sid = ids.split("_");
        if(sid[0].equals("null")){
            System.out.println("add  to adminGetAllCourseSortOne");
        }else{
            for (int i = 0; i < sid.length; i++) {
                courseSortOneService.deleteCourseSortOneById(Integer.parseInt(sid[i]));
            }
        }
        return "redirect:/adminGetAllCourseSortOne/null/1";
//        return "redirect:/adminGetAllCourseSortOne/" + queryName + "/" + currentPage;
    }
}
