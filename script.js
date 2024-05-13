
// sindi koifan 211657481 alon cohen 319039707

function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirm_password = document.getElementById("confirm_password").value;
  var phone = document.getElementById("phone").value;
  var errorMessage = ""; // קריאה קדימה להגדרת המשתנה

  // בדיקת כל שדות החובה
  if (email === "" || password === "" || confirm_password === ""|| phone === "") {
      errorMessage += "\nיש למלא את כל השדות החובה";
      markFieldInvalid(email === "", "email");
      markFieldInvalid(password === "", "password");
      markFieldInvalid(confirm_password === "", "confirm_password");
      markFieldInvalid(phone === "", "phone");
  }

  // בדיקת אורך הסיסמה
  if (password.length < 8) {
      errorMessage += "\nהסיסמא חייבת להכיל לפחות 8 תווים";
      markFieldInvalid(true, "password");
  }

  // בדיקת התאמה בין סיסמאות
  if (password !== confirm_password) {
      errorMessage += "\nהסיסמאות אינן תואמות";
      markFieldInvalid(true, "password");
      markFieldInvalid(true, "confirm_password");
  }

  // בדיקת טלפון - רק ספרות ובאורך של 9 או 10 תווים
  if (!phone.match(/^\d{9,10}$/)) {
      errorMessage += "\nמספר הטלפון חייב להיות בין 9 ל-10 ספרות";
      markFieldInvalid(true, "phone");
  }

  showAlert(errorMessage); // הצגת הודעת השגיאה ב-Alert
  return errorMessage === ""; // אם אין שגיאות, נחזיר true
}

function markFieldInvalid(isInvalid, fieldId) {
  var field = document.getElementById(fieldId);
  if (isInvalid) {
      field.classList.add("error"); // הוספת המחלקה 'error' לשדה במקרה של בעיה
  } else {
      field.classList.remove("error"); // הסרת המחלקה 'error' מהשדה במקרה של תקינות
      field.style.border = "white"; // מחיקת הצבע  שנוסף בטעות
  }
}

// פונקציה להצגת הודעת השגיאה ב-Alert
function showAlert(errorMessage) {
  if (errorMessage !== "") {
      alert(errorMessage);
  }
}
