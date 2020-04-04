package com.xzc.service.Cservice;

import com.xzc.mapper.AdminInforMapper;
import com.xzc.model.Admin;
import com.xzc.model.Course;
import com.xzc.model.User;
import com.xzc.util.LoadFile;
import org.springframework.web.multipart.MultipartFile;

public class ScrollPictureService {
    AdminInforMapper adminInforMapper;

    public Integer updateScrollById(Integer scrollId){
        return scrollId;
    }

    public Integer removePictureById(Integer scrollId, Integer picId){
        return scrollId;
    }

    public Integer addPictureById(Integer scrollId, MultipartFile file){
        String string = LoadFile.upLoad(LoadFile.imagePath, file);
        System.out.println("图片路径>> " + string);
        Course scroll = new Course();
        if (string != null) {
            scroll.setImageUrl(string);
        return scrollId;
    }
}
