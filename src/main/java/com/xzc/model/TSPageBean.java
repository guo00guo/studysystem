package com.xzc.model;

import java.util.List;

public class TSPageBean {
	private int currentPage;
	private int pageSize;
	private int count;
	private int totalPage;
	private int currentCount;
	private String topSerachName;
	private List<TopSerach> topSeraches;
	private List<Student> studentList;
	private List<Teacher> teacherList;
	private List<CourseExt> courseList;
	private List<CourseSortOne> courseSortOneList;
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public List<TopSerach> getTopSeraches() {
		return topSeraches;
	}

	public void setTopSeraches(List<TopSerach> topSeraches) {
		this.topSeraches = topSeraches;
	}

	public int getCurrentCount() {
		return currentCount;
	}

	public void setCurrentCount(int currentCount) {
		this.currentCount = currentCount;
	}

	public String getTopSerachName() {
		return topSerachName;
	}

	public void setTopSerachName(String topSerachName) {
		this.topSerachName = topSerachName;
	}

	public List<Student> getStudentList() {
		return studentList;
	}

	public void setStudentList(List<Student> studentList) {
		this.studentList = studentList;
	}

	public List<Teacher> getTeacherList() {
		return teacherList;
	}

	public void setTeacherList(List<Teacher> teacherList) {
		this.teacherList = teacherList;
	}

	public List<CourseExt> getCourseList() {
		return courseList;
	}

	public void setCourseList(List<CourseExt> courseList) {
		this.courseList = courseList;
	}

	public List<CourseSortOne> getCourseSortOneList() {
		return courseSortOneList;
	}

	public void setCourseSortOneList(List<CourseSortOne> courseSortOneList) {
		this.courseSortOneList = courseSortOneList;
	}

	@Override
	public String toString() {
		return "TSPageBean{" +
				"currentPage=" + currentPage +
				", pageSize=" + pageSize +
				", count=" + count +
				", totalPage=" + totalPage +
				", topSeraches=" + topSeraches +
				'}';
	}
}
