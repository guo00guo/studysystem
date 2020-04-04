package com.xzc.controller.Cctrl;

import com.xzc.model.*;
import com.xzc.service.Cservice.AccountService;
import com.xzc.service.Cservice.ScrollPictureService;
import com.xzc.util.Result;
import com.xzc.util.UserCF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

public class scrollPictureController {

    @Autowired
    ScrollPictureService scrollPictureService;


    @RequestMapping(value = "/updateScrollById", method = RequestMethod.POST)
    public Result updateScrollById(Integer id) {
        System.out.println("AccountController.updateAccountById");
        System.out.println(id.toString());
        Integer i = scrollPictureService.updateScrollById(id);

        if (i < 1) {
            return Result.error();
        }
        else{
            return Result.success(id);
        }
    }

    public Result removePictureById(User manager, Integer id, Integer picId) {
        System.out.println("AccountController.updateAccountById");
        System.out.println(manager.toString());
        Integer i = scrollPictureService.removePictureById(id, picId);

        if (i < 1) {
            return Result.error();
        }
        else{
            return Result.success(manager);
        }
    }

    public Result addPictureById(User manager, Integer id, MultipartFile file) {
        System.out.println("AccountController.updateAccountById");
        System.out.println(manager.toString());
        Integer i = scrollPictureService.addPictureById(id, file);

        if (i < 1) {
            return Result.error();
        }
        else{
            return Result.success(manager);
        }
    }



}
