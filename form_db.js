var http = require('http');
var fs = require('fs');
var url = require('url');
const sqlite3 = require('sqlite3').verbose();
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var nomearquivo = "." + q.pathname;
    if(nomearquivo == "./"){
      fs.readFile("paginicial.html", function(err, data) {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Arquivo não encontrado!");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
    }
    else if(nomearquivo == "./formlario.html"){
      fs.readFile(nomearquivo, function(err, data) {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Arquivo não encontrado!");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
    }
    else if(nomearquivo == "./registro"){
      let nome = q.query.nome;
      let tipo = q.query.tipo;
      let marca = q.query.marca;
      let combustivel = q.query.combustivel;
      let db = new sqlite3.Database('./veiculos/veiculo.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou com o banco de dados!');
      });
    
      // insere um registro no banco de dados
      db.run(`INSERT INTO AVIAO(nome, tipo, marca, combustivel) VALUES(?,?,?,?)`, [nome,tipo,marca,combustivel], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // Pega o id do último registro inserido
        console.log(`Registro feito com sucesso no id ${this.lastID}`);
      });
    
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Fechou a conexão com o banco de dados!');
      });
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<p>Registro efetuado com sucesso!</p>");
      res.write("<p><a href='/'>Voltar</a></p>");
      return res.end();
    }
    else if(nomearquivo == "./ver_veiculos"){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<html><head><meta charset='UTF-8'><title>Veículos</title></head><body>");
      res.write("<h1>Veículos Cadastrados</h1>");

      let db = new sqlite3.Database('./veiculos/veiculo.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou com o banco de dados!');
      });

       db.all(`SELECT * FROM AVIAO`, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        res.write("<table border='1'>");
        res.write("<tr>");
        res.write("<th>Nome</th>");
        res.write("<th>Tipo</th>");
        res.write("<th>Marca</th>");
        res.write("<th>Combustível</th>");
        res.write("</tr>");
        rows.forEach((row) => {
          res.write("<tr>");
          res.write("<td>"+row.nome+"</td>");
          res.write("<td>"+row.tipo+"</td>");
          res.write("<td>"+row.marca+"</td>");
          res.write("<td>"+row.combustivel+"</td>");
          res.write("</tr>");
        });
        res.write("</table>");
        res.write("<p><a href='/'>Voltar</a></p>");
        res.write("</body></html>");
        return res.end();
      });

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Fechou a conexão com o banco de dados!');
      });
    }
}).listen(8080, () => {
    console.log("O servidor foi iniciado na porta 8080");
});


