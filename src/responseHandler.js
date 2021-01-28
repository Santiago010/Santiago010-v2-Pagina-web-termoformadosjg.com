exports.responseHandler = (name, email, phone, message) => {
  let res;

  if (name === "" || email === "" || phone === "" || message === "") {
    res = 0;
  } else {
    if (name.length < 3 || name.length > 40) {
      res = 1;
    } else if (email.includes("@") === false || email.includes(".") === false) {
      res = 2;
    }
  }

  return res;
};
