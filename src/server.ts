import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source Initialized");
    })
    .catch((err) => {
      console.error("Error during data source initialization", err);
    });

  const port = 3000;

  app.listen(port, () => console.log(`Running at http://localhost:${port}`));
})();
