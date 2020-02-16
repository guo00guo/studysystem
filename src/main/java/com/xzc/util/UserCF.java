package com.xzc.util;

/**
 * @author guochao
 * @date 2019/4/25 15:13
 */

import com.xzc.model.Course;
import com.xzc.model.SelectCourse;
import com.xzc.model.User;
import com.xzc.service.StudentService;
import com.xzc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.Inet4Address;
import java.util.*;
import java.util.Map.Entry;

/**
 * 基于用户的协同过滤推荐算法实现
 * A a b d
 * B a c
 * C b e
 * D c d e
 *
 * @author Administrator
 */
@Service
public class UserCF {
    @Autowired
    StudentService studentService;

    @Autowired
    UserService userService;

    public ArrayList<Integer> getRecommendResult(Integer userId) {
        List<User> allUser = userService.findAllUser();
        //用户总量
        int N = allUser.size();
        int[][] sparseMatrix = new int[N][N];//建立用户稀疏矩阵，用于用户相似度计算【相似度矩阵】
        Map<Integer, Integer> userCourseLength = new HashMap<Integer, Integer>();//存储每一个用户对应的不同课程总数  eg: stu4 cou4
        Map<Integer, Set<Integer>> courseUserCollection = new HashMap<Integer, Set<Integer>>();//建立课程到用户的倒排表 eg: a A B
        Set<Integer> courses = new HashSet<Integer>();//辅助存储课程集合
        Set<Integer> similarUsersId = new HashSet<Integer>();//相似用户集合
        Set<Integer> similarCoursesId = new HashSet<Integer>();//辅助相似课程集合
        Map<Integer, Integer> MapUserId = new HashMap<Integer, Integer>();//辅助存储每一个用户的用户ID映射
        Map<Integer, Integer> MapIdUser = new HashMap<Integer, Integer>();//辅助存储每一个ID对应的用户映射
        Map<Integer, Double> similarCourceScores = new HashMap<Integer, Double>();//存储相似课程的得分
        ArrayList<Integer> similarResult = new ArrayList<Integer>();//存储最终推荐课程的id
        for (int i = 0; i < allUser.size(); i++) {//依次处理N个用户 输入数据  以空格间隔
            Integer currentUserId = allUser.get(i).getUserId();

            //获取每个学习者所选的课程
            List<SelectCourse> selectedCourses = studentService.getAllSelectCourseByUserId(currentUserId);
            ArrayList<Integer> course_course = new ArrayList<Integer>();
            for (int k = 0; k < selectedCourses.size(); k++) {
                Integer selectedCourseId = selectedCourses.get(k).getCourseId();
                course_course.add(selectedCourseId);
            }
            int length = course_course.size();

            userCourseLength.put(currentUserId, length);//eg: A 3

            MapUserId.put(currentUserId, i);//用户ID与稀疏矩阵建立对应关系
            MapIdUser.put(i, currentUserId);

            //建立课程--用户倒排表
            for (int j = 0; j < course_course.size(); j++) {
                if (courses.contains(course_course.get(j))) {//如果已经包含对应的课程--用户映射，直接添加对应的用户
                    courseUserCollection.get(course_course.get(j)).add(currentUserId);//course_course[0] 用户
                } else {//否则创建对应课程--用户集合映射
                    courses.add(course_course.get(j));
                    courseUserCollection.put(course_course.get(j), new HashSet<Integer>());//创建课程--用户倒排关系
                    courseUserCollection.get(course_course.get(j)).add(currentUserId);
                }
            }
        }
        System.out.println(courseUserCollection.toString());

        //计算相似度矩阵【稀疏】
        Set<Entry<Integer, Set<Integer>>> entrySet = courseUserCollection.entrySet();
        Iterator<Entry<Integer, Set<Integer>>> iterator = entrySet.iterator();
        while (iterator.hasNext()) {
            Set<Integer> commonUsers = iterator.next().getValue();
            for (Integer user_u : commonUsers) {
                for (Integer user_v : commonUsers) {
                    if (user_u.equals(user_v)) {
                        continue;
                    }
                    sparseMatrix[MapUserId.get(user_u)][MapUserId.get(user_v)] += 1;
                }
            }
        }
        System.out.println(userCourseLength.toString());

        //输出矩阵
        for (int i = 0; i < sparseMatrix.length; i++) {
            for (int k = 0; k < sparseMatrix.length; k++) {
                System.out.print(sparseMatrix[i][k]);
            }
            System.out.println();
        }

        //计算学习者用户之间的相似度【余弦相似性】
        int recommendUserId = MapUserId.get(userId);
        for (int j = 0; j < sparseMatrix.length; j++) {
            if (j != recommendUserId) {
                double similarUserScore = sparseMatrix[recommendUserId][j] /
                        Math.sqrt(userCourseLength.get(MapIdUser.get(recommendUserId)) *
                                userCourseLength.get(MapIdUser.get(j)));
                if (similarUserScore > 0.0) {
                    similarUsersId.add(MapIdUser.get(j));
                }
            }
        }
        System.out.println("similarUsersId = " + similarUsersId.toString());

        for (Integer similarUser : similarUsersId) {
            List<SelectCourse> allSelectCourseByUserId = studentService.getAllSelectCourseByUserId(similarUser);
            for (SelectCourse courseIdBySimilarUser : allSelectCourseByUserId) {
                similarCoursesId.add(courseIdBySimilarUser.getCourseId());
            }
        }
        System.out.println("similarCoursesId = " + similarCoursesId.toString());

        //计算指定学习者的课程推荐度
        for (Integer courseId : similarCoursesId) {
            Set<Integer> users = courseUserCollection.get(courseId);
            if (!users.contains(userId)) {
                double courseRecommendDegree = 0.0;
                for (Integer user : users) {
                    courseRecommendDegree += sparseMatrix[MapUserId.get(userId)]
                            [MapUserId.get(user)] / Math.sqrt(userCourseLength.get(userId) *
                            userCourseLength.get(user));
                }
                similarCourceScores.put(courseId, courseRecommendDegree);
            }
        }
//        System.out.println("similarCourceScores = " + similarCourceScores.toString());
        List<Map.Entry<Integer, Double>> list = new ArrayList<Entry<Integer, Double>>();
        list.addAll(similarCourceScores.entrySet());
        UserCF.ValueComparator vc = new ValueComparator();
        Collections.sort(list, vc);
        for (Iterator<Map.Entry<Integer, Double>> it = list.iterator(); it.hasNext(); ) {
            similarResult.add(it.next().getKey());
        }
        System.out.println("similarResult = " + similarResult.toString());
        return similarResult;
    }

    private static class ValueComparator implements Comparator<Map.Entry<Integer, Double>> {
        public int compare(Map.Entry<Integer, Double> m, Map.Entry<Integer, Double> n) {
            if (n.getValue() - m.getValue() > 0) {
                return 1;
            } else {
                return -1;
            }
        }
    }
}

