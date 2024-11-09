const express = require("express");
const cors = require("cors");
const connection = require("./db/connection");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Server running ${port}`));

app.get("/clients/all", (request, response) => {
    const query =
        "SELECT * FROM clients;";

    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao listar usuários",
                success: false,
                error: err
            });
        }
        response.status(200).json({
            success: true,
            message: "Usuários listados",
            data: results
        });
    });
});

app.post("/clients/create", (request, response) => {
    const params = [request.body.name, request.body.cellphone, request.body.cep];

    const query =
        "INSERT INTO clients(name, cellphone, cep) VALUES (?, ?, ?);";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao criar usuário",
                success: false,
                error: err
            });
        }
        response.status(201).json({
            success: true,
            message: "Usuário criado",
            data: results.insertId
        });
    });
});

app.put("/clients/update/:id", (request, response) => {
    const params = [request.body.name, request.body.cellphone, request.body.cep, request.params.id];

    const query =
        "UPDATE clients SET name = ?, cellphone = ?, cep = ? WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao atualizar usuário",
                success: false,
                error: err
            });
        }
        response.status(200).json({
            success: true,
            message: "Usuário atualizado",
            data: results
        });
    });
});

app.delete("/clients/delete/:id", (request, response) => {
    const params = [request.params.id];

    const query =
        "DELETE FROM clients WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao deletar usuário",
                success: false,
                error: err
            });
        }
        response.status(200).json({
            success: true,
            message: "Usuário deletado",
            data: results
        });
    });
});

app.get("/pets/all", (request, response) => {
    const query =
        "SELECT pets.*, clients.name as client_name FROM pets INNER JOIN clients ON clients.id = pets.client_id;";

    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao listar pets",
                success: false,
                error: err
            });
        }
        response.status(200).json({
            success: true,
            message: "Pets listados",
            data: results
        });
    });
});

app.post("/pets/create", (request, response) => {
    const params = [request.body.name, request.body.age, request.body.specie, request.body.client];

    const query =
        "INSERT INTO pets(name, age, specie, client_id) VALUES (?, ?, ?, ?);";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao criar pet",
                success: false,
                error: err
            });
        }
        response.status(201).json({
            success: true,
            message: "Pet criado",
            data: results.insertId
        });
    });
});

app.put("/pets/update/:id", (request, response) => {
    const params = [request.body.name, request.body.age, request.body.specie, request.params.id];

    const query =
        "UPDATE pets SET name = ?, age = ?, specie = ? WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao atualizar pet",
                success: false,
                error: err
            });
        }
        response.status(200).json({
            success: true,
            message: "Pet atualizado",
            data: results
        });
    });
});

app.delete("/pets/delete/:id", (request, response) => {
    const params = [request.params.id];

    const query =
        "DELETE FROM pets WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                message: "Erro ao deletar pets",
                success: false,
                error: err
            });
        }
        response.status(200).json({
            success: true,
            message: "Pets deletado",
            data: results
        });
    });
});
