import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI as string, { dbName: "Company_Db" })
    .then(() => console.log(`Database successfully connected`))
    .catch((err) => console.log(`error while connecting db : ${err}`));
};
