exports.createForm = (actionURI, ObjectDict, method = 'POST') => {
  const form = `
    <form action="${actionURI}" method=${method}}>
    ${ObjectDict.map((od) => {
      return `<div> ${od.displayName}: <input type="${od.type}" name="${od.name}" /> </div>`;
    })}
        <input type="submit" value="Dodaj" >
    </form>
`;

  return form;
};
