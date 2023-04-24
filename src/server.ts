import "dotenv/config";
import app from "./app";

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
