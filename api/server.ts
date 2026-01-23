import { app } from './app';

const port = 3000;
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});