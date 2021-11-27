exports.buildHtml = (req, header, body) => {
  return (
    '<!DOCTYPE html>' +
    '<link rel="stylesheet" type="text/css" href="/styles/main.css" />' +
    '<link rel="stylesheet" type="text/css" href="/public/styles/main.css" />' +
    '<html><head>' +
    header +
    '</head><body>' +
    body +
    '</body></html>'
  );
};
