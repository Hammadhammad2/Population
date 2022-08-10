import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (context) => {
  try {
    const token = context.req.headers.authorization.split(" ")[1];

    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, secret);

      return decodedData;
    }
  } catch (error) {
    throw new Error("Sorry! You are not authorized to access this page");
  }
};

export default auth;
