package com.xzc.controller.adminController;

import com.xzc.model.TSPageBean;
import com.xzc.model.TopSerach;
import com.xzc.service.TopSerachService;
import com.xzc.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by 郭超 on 2018/5/20.
 */
@Controller
public class AdminTopSeracherController {
    @Autowired
    public TopSerachService topSerachService;

    //查找热搜（包括分页查找热搜）
    @GetMapping("/findTopSerachByName/{topSerachName}/{currentPage}")
    public String findTopSerachByName(Model model, @PathVariable("topSerachName") String topSerachName, @PathVariable("currentPage") Integer currentPage) {
        System.out.println("findTopSerachByName");
        List<TopSerach> topSerachByNames;
        Integer count = 0;
        Integer totalPage = 0;

        Integer pageSize = 6;       //初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1;        //当前页
        }
        //topSerachName为null则是查找全部
        if(!topSerachName.equals("null")){
            if (topSerachName.equals("findAllTopSerach")) {
                topSerachByNames = topSerachService.findAllTopSerachByPage(currentPage, pageSize);
                count = topSerachService.findAllTopSerach().size();//热搜总数
                topSerachName = "null";
            } else {
                topSerachByNames = topSerachService.findTopSerachByPageByName(currentPage, pageSize, topSerachName);
                count = topSerachService.findTopSerachByName(topSerachName).size();//热搜总数
            }
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            model.addAttribute("totalCount", count); //热搜总数
            model.addAttribute("currentCount", topSerachByNames.size()); //热搜当前显示数
            model.addAttribute("topSerachName",topSerachName);
            model.addAttribute("topSerachs", topSerachByNames);
        }else{
            count = topSerachService.topSerachCount();
            totalPage = (int) Math.ceil(count * 1.0 / pageSize);
            List<TopSerach> topSerachsAll = topSerachService.findAllTopSerach();
            List<TopSerach> topSerachs = topSerachService.findAllTopSerachByPage(currentPage, pageSize);
            model.addAttribute("totalCount", topSerachsAll.size()); //热搜总数
            model.addAttribute("currentCount", topSerachs.size()); //热搜当前显示数
            model.addAttribute("topSerachName",topSerachName);
            model.addAttribute("topSerachs", topSerachs);
        }
        model.addAttribute("totalPage", totalPage);          //总页数
        model.addAttribute("currentPage", currentPage);      //当前页
        return "admin_resou_management";
    }

    //ajax查找热搜
    @GetMapping("/ajaxSerach/{topSerachName}/{currentPage}")
    @ResponseBody
    public TSPageBean findTopSerachByName(@PathVariable("topSerachName") String topSerachName, @PathVariable("currentPage") Integer currentPage, Model model) {
        List<TopSerach> topSerachByNames;
        TSPageBean tsPageBean = new TSPageBean();
        Integer count = 0;

        Integer pageSize = 6;//初始化每页显示的记录数
        if (currentPage == null || currentPage == 0) {
            currentPage = 1; //当前页
        }

        if (topSerachName.equals("findAllTopSerach")) {
            topSerachByNames = topSerachService.findAllTopSerachByPage(currentPage, pageSize);
            count = topSerachService.findAllTopSerach().size();//热搜总数
            topSerachName = "null";
        } else {
            topSerachByNames = topSerachService.findTopSerachByPageByName(currentPage, pageSize, topSerachName);
            count = topSerachService.findTopSerachByName(topSerachName).size();//热搜总数
        }
        Integer totalPage = (int) Math.ceil(count * 1.0 / pageSize);
        tsPageBean.setCount(count);
        tsPageBean.setCurrentPage(currentPage);
        tsPageBean.setPageSize(pageSize);
        tsPageBean.setTotalPage(totalPage);
        tsPageBean.setCurrentCount(topSerachByNames.size());//当前页面热搜数量
        tsPageBean.setTopSeraches(topSerachByNames);
        tsPageBean.setTopSerachName(topSerachName);
        return tsPageBean;
    }

    //到修改热搜界面
    @GetMapping("/adminToEditTopSerach/{id}/{topSerachName}/{currentPage}")
    public String toEditTopSerach(@PathVariable("id") Integer id, @PathVariable("topSerachName")String  topSerachName, @PathVariable("currentPage") Integer currentPage, Model model) {
        TopSerach topSerach = topSerachService.findTopSerachById(id);
        model.addAttribute("topSerach", topSerach);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("topSerachName", topSerachName);
        return "admin_resou_edit";
    }

    //修改热搜
    @PutMapping("/topSerach/{topSerachName}/{currentPage}")
    public String updateTopSerach(@PathVariable("topSerachName")String  topSerachName, @PathVariable("currentPage") Integer currentPage, TopSerach topSerach) {
        topSerachService.updateTopSerach(topSerach);
        return "redirect:/findTopSerachByName/"+ topSerachName+"/"+currentPage;
    }

    //跳转到增加热搜界面
    @GetMapping("/toAddTopSerachPage")
    public String toAddTopSerachPage() {
//        System.out.println("toAddTopSerachPage");
        return "admin_resou_edit";
    }

    //增加热搜  currentPage不需要用到
    @PostMapping("/topSerach/{topSerachName}/{currentPage}")
    public String addTopSerach(@PathVariable("topSerachName") String topSerachName, @PathVariable("currentPage") String currentPage, TopSerach topSerach) {
        int i = topSerachService.addTopSerach(topSerach);
        return "redirect:/findTopSerachByName/"+topSerachName+"/1";
    }

    //删除（单个删除或者批量删除）
    @DeleteMapping("/deleteAll/{ids}")
    public String deleteAll(@PathVariable("ids") String ids) {
        String[] sid = ids.split("_");
        for (int i = 0; i < sid.length; i++) {
            topSerachService.deleteTopSerachById(Integer.parseInt(sid[i]));
        }
        return "redirect:/findTopSerachByName/null/1";
    }

    @RequestMapping("/topSearchExport")
    public void export(HttpServletResponse response){
        System.out.println("topSearchExport...............");
        //模拟从数据库获取需要导出的数据
        List<TopSerach> topSerachList = topSerachService.findAllTopSerach();
        //导出操作
        FileUtil.exportExcel(topSerachList,"热搜信息表","草帽一伙",TopSerach.class,"热搜.xls",response);
    }

    @RequestMapping("/topSearchImport")
    public String topSearchImport(){
        String filePath = "D:\\海贼王.xls";
        //解析excel，
        List<TopSerach> topSerachList = FileUtil.importExcel(filePath,1,1,TopSerach.class);
        //也可以使用MultipartFile,使用 FileUtil.importExcel(MultipartFile file, Integer titleRows, Integer headerRows, Class<T> pojoClass)导入
        System.out.println("导入数据一共【"+topSerachList.size()+"】行");
        //TODO 保存数据库
        return "redirect:/findTopSerachByName/null/1";
    }
}
