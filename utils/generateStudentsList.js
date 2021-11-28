const { STUDENT_MOCK } = require ('../config/mock');

exports.generateStudentsListWithHrefs = () => {
  return STUDENT_MOCK.map((s) => {
    return `<a href="/student/${s.id}" style="color:black; text-decoration: none">Student ${s.id}</a><br></br>`;
  });
};
