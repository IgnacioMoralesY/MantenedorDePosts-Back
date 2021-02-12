const app = require('./routes/app');
const port = 3700;

app.listen(port, () => {
	console.log("Servidor corriendo en la url localhost:"+port);
});

