import { STUDENT_MOCK } from '../config/mock';

exports.generateStudentsListWithHrefs = () => {
  return STUDENT_MOCK.map((s) => {
    return `<a href="/student/${s.id}">Student ${s.id}</a><br></br>`;
  });
};
