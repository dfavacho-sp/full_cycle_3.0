const express = require('express');
const app = express();
const port = 3000;

    const config = {
        host: 'mysql',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    }

    const mysql = require('mysql');
    const connection = mysql.createConnection(config);   

    // Create table
    const sqlCreateTable = `
        CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

        connection.query(sqlCreateTable, function (error, results, fields) {
        if (error){
            console.error('Erro ao tentar criar tabela:', error);
            res.status(500).send('Erro ao tentar criar tabela:');
            return;
        } 
    });

    // Insert register
    const sqlInsertRegister = `INSERT INTO people(name) values('Rocks')`;
    connection.query(sqlInsertRegister, function (error, results, fields) {
    if (error){
        console.error('Erro ao tentar inserir registro:', error);
        res.status(500).send('Erro ao tentar inserir registro:');
        return;
    }
    });   

    app.get('/', (req, res) => {
        const sqlListRegisters = `SELECT * FROM people`;
        connection.query(sqlListRegisters, (err, results) => {
            if (err) {
                console.error('Erro ao tentar listar registros:', err);
                res.status(500).send('Erro ao buscar dados');
                return;
            }
    
            let html = '';
            results.forEach(person => {
                html += `<h1>Full Cycle ${person.name}</h1>`;
            });
    
            res.send(html);
        });
    });   

    app.listen(port, '0.0.0.0', () => {
        console.log(`Servidor Node rodando na porta ${port}`);
    });