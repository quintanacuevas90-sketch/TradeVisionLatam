// Actualización: capa robusta de validación de email en doPost
function doPost(e) {
  var email = e.parameter.email;
  var emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !emailRegex.test(email)) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Email inválido."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  // ... resto de la función doPost ...
}

// ... resto del archivo Code.gs ...