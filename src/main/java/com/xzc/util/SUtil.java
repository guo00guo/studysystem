package com.xzc.util;

//import sun.misc.BASE64Encoder;
import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;
import java.util.UUID;

public class SUtil {
    /**
     * 利用MD5进行加密
     *
     * @param str 原字符串
     * @return 加密后的字符串
     */
    public static String encode(String str) {
        String newStr = str;
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
//            BASE64Encoder base64en = new BASE64Encoder();
//            newStr = base64en.encode(md5.digest(str.getBytes("UTF-8")));
            newStr = Base64.encodeBase64String(md5.digest(str.getBytes("UTF-8")));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return newStr;
    }

    public static String uuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
