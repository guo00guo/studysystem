package com.xzc.util;

import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class LoadFile {
    private final static String classpathStatic = "static/";
    public final static String imagePath = "upload/image/";
    public final static String filePath = "upload/file/";
    public final static String videoPath = "upload/video/";
    public final static String[] allFile = {".rar", ".doc", ".docx", ".zip",
            ".pdf", ".txt", ".swf", ".xlsx", ".gif", ".png", ".jpg", ".jpeg",
            ".bmp", ".xls", ".mp4", ".flv", ".ppt", ".avi", ".mpg", ".wmv",
            ".3gp", ".mov", ".asf", ".asx", ".vob", ".wmv9", ".rm", ".rmvb"};
    public final static String[] allowFile = {".doc", ".docx", ".pdf",
            ".txt", ".xls", ".xlsx", ".ppt"};
    public final static String[] allowPhoto = {".png", ".jpg", ".jpeg",
            ".bmp"};
    public final static String[] allowVideo = {".mp4", ".flv", ".avi", ".mpg", ".wmv",
            ".3gp", ".mov"};

    public static String upLoad(String path, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                File root = new File(ResourceUtils.getURL("classpath:").getPath()); //获取根目录
                File upload = new File(root.getAbsolutePath(), classpathStatic + path);//上传目录/static/upload/image/
                if (!upload.exists()) {
                    upload.mkdirs();
                }
                //在开发测试模式时，得到的地址为：{项目根目录}/target/static/upload/image/
                //在打包成jar正式发布时，得到的地址为：{发布jar包目录}/static/upload/image/
//                System.out.println("path>>" + upload);
                String fileName = getName(file);
//                System.out.println("fileName>>" + fileName);
                File dir = new File(upload + "/" + fileName);
                file.transferTo(dir);
                return path + fileName;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private static String getName(MultipartFile file) {
        String prefix = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf(".")).replace(" ", "");
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        return prefix + SUtil.uuid() + suffix;
    }

    public static boolean isAllow(MultipartFile file, String[] doctype) {
        System.out.println("LoadFile.isAllow");
        if (file != null && !file.isEmpty()) {
            String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            System.out.println(suffix);
            for (String allow : doctype) {
                if (allow.equalsIgnoreCase(suffix)) {
                    return true;
                }
            }
        }
        return false;
    }
}