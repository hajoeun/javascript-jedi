// 1. 객체에 학생들의 점수 집합을 저장하는 grades 객체를 만드시오. 점수를 추가하는 함수, 학생이 평균 점수를 출력하는 기능을 객체에 추가하시오.
console.log("======================== exapmple 1 ==========================");

var Grades = function() {
  this.students = [];
  this.scoreMath = [];
  this.scoreEnglish = [];
  this.scoreTotal = [this.scoreMath, this.scoreEnglish]
  this.setScore = function(name, ma, en) {
    var idx = 0;
    if (this.students.indexOf(name) > -1) {
      idx = this.students.indexOf(name);
      this.scoreMath[idx] = ma;
      this.scoreEnglish[idx] = en;
    } else {
      this.students.push(name);
      this.scoreMath.push(ma);
      this.scoreEnglish.push(en);
    }
  };
  this.getAverage = function (stu) {
    return true;
  };
  this.getScore = function (type, name) {
    if (name) {
      if (this.students.indexOf(name) < 0) {
        return console.log("Can\'t found " + name + " in student list.");
      }
      var idx = this.students.indexOf(name);
      console.log(this['score' + type][idx], idx);
      return (name + " score: " + this['score' + type][idx]);
    }
    return this['score' + type];
  };
}

var grades = new Grades();

grades.setScore("Joeun", 90, 80);
grades.setScore("Goeun", 70, 90);
grades.setScore("Sieun", 100, 90);

grades.getScore("Total");
console.log(grades.getScore("Math", "Joeun"));