const express = require("express");
const cors = require("cors"); // Mover cors aquí, antes de app.use
const app = express();
const port = 4000;

// Middleware de CORS
app.use(cors({
    origin: '*'
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la calculadora
app.post("/api/calcular", (req, res) => {
    const { num1, num2, operacion } = req.body;

    if (num1 === undefined || num2 === undefined || !operacion) {
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    let resultado;

    switch (operacion) {
        case "suma":
            resultado = num1 + num2;
            break;
        case "resta":
            resultado = num1 - num2;
            break;
        case "multiplicacion":
            resultado = num1 * num2;
            break;
        case "division":
            if (num2 === 0) {
                return res.status(400).json({ error: "No se puede dividir por 0" });
            }
            resultado = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: "Operación no válida" });
    }

    res.json({ resultado });
});

// Servidor corriendo
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
