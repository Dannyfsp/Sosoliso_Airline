import "dotenv/config";
import app from "./app";

const port: number = Number(process.env.APP_PORT);
app.listen(port, () => console.log(`Server up and running on port ${port}`));
