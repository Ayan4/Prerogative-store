export const allUsers = [
  {
    username: "ayan",
    email: "ayanshukla4@gmail.com",
    password: "shukla"
  }
];

const findUserByUsername = email => {
  return allUsers.find(item => item.email === email);
};

export const fakeAuthLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = findUserByUsername(email);
      if (found?.password === password) {
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 2000);
  });
};

export const fakeAuthSignUp = (username, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = findUserByUsername(email);
      console.log(found);
      if (!found) {
        const newUser = { username, email, password };
        allUsers.push(newUser);
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 2000);
  });
};
