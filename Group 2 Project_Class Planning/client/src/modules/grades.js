import {
  inject
} from 'aurelia-framework';

import {
  Course
} from '../resources/data/course-object';

@inject(Course)
export class Courses {
  constructor(course) {
    this.course = course;
    this.studentObj = JSON.parse(sessionStorage.getItem('studentObj'));
    this.statuses = ['Course', 'In Process', 'Completed'];
  }

  async attached() {
    await this.getCourses();
  }

  async getCourses() {
    await this.course.getCourses(this.studentObj._id);
    this.showForm = false;
  }

  updateCourse(course) {
    this.course.selectedCourse = course;
    this.saveCourse();
  }

  editCourse(course) {
    this.course.selectedCourse = course;
    this.showForm = true
  }

  newCourse() {
    this.course.newCourse(this.studentObj._id);
    this.showForm = true;
  }

  async saveCourse() {
    await this.course.saveCourse()
    this.getCourses();
  }

  async deleteCourse(wigdet) {
    await this.course.deleteCourse(wigdet._id)
    this.getCourses();
  }

  Cancel() {
    this.showForm = false;
  }

}
