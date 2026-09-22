const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

   console.log(authorization);
   console.log("Explanation: Will be used on veifying what am I allowed to access with my key/permission-code/thing")

   console.log(authorization.split(" "));
   console.log("Explanation: Breaks the string into an array, you will get an array with two elements.")

   console.log(authorization.split(" ")[0]);
   console.log("Explanation: Check index 0 from array")

   console.log(authorization.split(" ")[1]);
   console.log("Explanation: Check index 1 from array")

  const token = authorization.split(" ")[1];
  console.log("Explanation: Check index 1 from array :D")

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    console.log("Explanation: We find a user with this id, then store result into req.user")
   
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

/*
◇ injected env (3) from .env
Server is running on http://localhost:4000
MongoDB Connected: localhost
Method: POST
Path:   /api/users/signup
Body:   { name: 'Pekka', email: 'pekka@pekka.com', password: 'R3g5T7#gh' }
---
Method: GET
Path:   /api/tours
Body:   undefined
---
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWIyNjFlNDhmNzZkYWVlNjFlYzIxMTciLCJpYXQiOjE3OTAwNzUzNjQsImV4cCI6MTc5MDMzNDU2NH0._gcT7TKLwkXhzQsUEXocyKlfdbVKPeJS-vDWRE-6eOU
Explanation: Will be used on veifying what am I allowed to access with my key/permission-code/thing
[
  'Bearer',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWIyNjFlNDhmNzZkYWVlNjFlYzIxMTciLCJpYXQiOjE3OTAwNzUzNjQsImV4cCI6MTc5MDMzNDU2NH0._gcT7TKLwkXhzQsUEXocyKlfdbVKPeJS-vDWRE-6eOU'
]
Explanation: Breaks the string into an array, you will get an array with two elements.
Bearer
Explanation: Check index 0 from array
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWIyNjFlNDhmNzZkYWVlNjFlYzIxMTciLCJpYXQiOjE3OTAwNzUzNjQsImV4cCI6MTc5MDMzNDU2NH0._gcT7TKLwkXhzQsUEXocyKlfdbVKPeJS-vDWRE-6eOU
Explanation: Check index 1 from array
Explanation: Check index 1 from array :D
Explanation: We find a user with this id, then store result into req.user

*/