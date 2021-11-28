import { generateStudentsListWithHrefs } from './generateStudentsList';

exports.generateMainPageBody = (app, univerity, author, idx) => {
  return `
      <center>
          <h1>${app}</h1>
          <img height="10%" width="10%" src='https://pcz.pl/fcp/aGBUKOQtTKlQhbx08SlkTUQdKUWRuHQwFDBoIVURNFDgPW1ZpCFghUHcKVigEQR1BXQEsKTwdAQsKJBVYCRlYdxdFDy5IGzpEMEIrMQxBC0EGRUtwf08Q/_users/code_YCFYXIghYYUQ6UhciCQgDI0QRCWY8AQ/kamila/logo/logo_paczka/logo_pl/pcz_logo_piol_pion_kolor.png'>
          <h1 style="color:red"}> ${univerity}</h1>
          <h1>${author} - ${idx}</h1>
          <h2>Zadanie 4</h2>
          <a href="/autor">4.1 Autor</a><br><br>
          <a href="/keys">4.2 Klucze</a><br><br>
          <a href="/tab">4.3 Tablica</a><br><br>
          4.4 Studenci<br>
          ${generateStudentsListWithHrefs()}
          <a href="/wykladowcy_nazwiska">4.5 Nazwiska prowadzących</a><br><br>
          <a href="/lua">4.6 Skrypt LUA</a><br><br>
          4.7 Formularze<br>
          <a href="/new_student"> Dodawanie studenta (GET)</a><br>
          <a href="/add_class">Dodawanie zajęć (POST)</a><br><br>
          <a href="/wykladowcy_przedmioty">
          4.8 Aktywni nauczyciele</a><br><br>
      </center>`;
};
