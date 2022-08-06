const { faker } = require("@faker-js/faker");
const fs = require("fs");
// Set locale to use Vietnamese
faker.setLocale('vi');
const codeCity = [
   'hn', 'hcm', 'dn', 'qng', 'hue', 'pth', 'bdi', 'dli'
]
const cityList = [
   { code: 'hn', name: 'Hà Nội' },
   { code: 'hcm', name: 'Hồ Chí Minh' },
   { code: 'dn', name: 'Đà Nẵng' },
   { code: 'qng', name: 'Quảng Ngãi' },
   { code: 'hue', name: 'Huế' },
   { code: 'pth', name: 'Phan Thiết' },
   { code: 'bdi', name: 'Bình ĐỊnh' },
   { code: 'dli', name: 'Đà Lạt' },
]
const randomStudentList = (n) => {
   if (n <= 0) return [];
   const studentList = []
   Array.from(new Array(n)).forEach(() => {
      const student = {
         id: faker.datatype.uuid(),
         name: faker.name.findName(),
         age: faker.datatype.number({ min: 10, max: 90 }),
         mark: faker.datatype.number({ min: 1, max: 10, precision: 0.1 }),
         gender: faker.name.gender(true),
         createdAt: Date.now(),
         updatedAt: Date.now(),
         city: cityList[faker.datatype.number({ min: 0, max: 7 })].code
      }
      studentList.push(student)
   })
   return studentList
}


// IFFE
(() => {
   // random data
   const studentList = randomStudentList(100);

   // prepare db object
   const db = {
      cities: cityList,
      students: studentList,
   };

   // write db object to db.json
   fs.writeFile("db.json", JSON.stringify(db), () => {
      console.log("Generate data successfully =))");
   });
})();