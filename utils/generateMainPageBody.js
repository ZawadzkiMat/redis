const { generateStudentsListWithHrefs }= require ('./generateStudentsList');

exports.generateMainPageBody = (app, univerity, author, idx) => {
  return `
      <center style="background-color:grey">
          <h1>${app}</h1>
          <img height="10%" width="10%" src='https://pcz.pl/fcp/aGBUKOQtTKlQhbx08SlkTUQdKUWRuHQwFDBoIVURNFDgPW1ZpCFghUHcKVigEQR1BXQEsKTwdAQsKJBVYCRlYdxdFDy5IGzpEMEIrMQxBC0EGRUtwf08Q/_users/code_YCFYXIghYYUQ6UhciCQgDI0QRCWY8AQ/kamila/logo/logo_paczka/logo_pl/pcz_logo_piol_pion_kolor.png'>
          <h1 style="color:blue"> ${univerity}</h1>
          <h1>${author} - ${idx}</h1>
          <h2>Prosta aplikacji w Node.js z wykorzytaniem Express.js i bazy Redis</h2>
          <a href="/autor" style="color:black; text-decoration: none">4.1 Autor</a><br><br>
          <a href="/keys" style="color:black; text-decoration: none">4.2 Klucze</a><br><br>
          <a href="/tab" style="color:black; text-decoration: none">4.3 Tablica</a><br><br>
          4.4 Studenci<br><br>
          ${generateStudentsListWithHrefs()}
          <a href="/wykladowcy_nazwiska" style="color:black; text-decoration: none">4.5 Nazwiska prowadzących</a><br><br>
          <a href="/lua" style="color:black; text-decoration: none">4.6 Skrypt LUA</a><br><br>
          4.7 Formularze<br>
          <a href="/new_student" style="color:black; text-decoration: none"> Dodawanie studenta (GET)</a><br>
          <a href="/new_class" style="color:black; text-decoration: none">Dodawanie zajęć (POST)</a><br><br>
          <a href="/wykladowcy_przedmioty" style="color:black; text-decoration: none">4.8 Aktywni nauczyciele</a><br><br>
      </center>`;
};
