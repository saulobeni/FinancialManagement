import { app, port } from './app';

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
});