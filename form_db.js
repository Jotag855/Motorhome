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
    else if(nomearquivo == "./formaviao.html"){
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
      let ano_modelo = q.query.ano_modelo;
      let db = new sqlite3.Database('./veiculo.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou com o banco de dados!');
      });
    
      // insere um registro no banco de dados
      db.run(`INSERT INTO aviao (nome, tipo, marca, ano_modelo) VALUES(?,?,?,?)`, [nome,tipo,marca,ano_modelo], function(err) {
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
      res.write("<html><head><meta charset='UTF-8'><title>Veículos</title></head></body></html>");
      res.write("<h1>Veículos Cadastrados</h1>");

      let db = new sqlite3.Database('./veiculo.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou com o banco de dados!');
      });

       db.all(`SELECT * FROM aviao`, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        res.write("<table border='1'>");
        res.write("<tr>");
        res.write("<th>Nome</th>");
        res.write("<th>Tipo</th>");
        res.write("<th>Marca</th>");
        res.write("<th>Ano/modelo</th>");
        res.write("</tr>");
        rows.forEach((row) => {
          res.write("<tr>");
          res.write("<td>"+row.nome+"</td>");
          res.write("<td>"+row.tipo+"</td>");
          res.write("<td>"+row.marca+"</td>");
          res.write("<td>"+row.ano_modelo+"</td>");
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
    else if (nomearquivo.endsWith('.jpeg')) {
      retorno_imagem(res,q.pathname)
    }
    else if (nomearquivo.endsWith('stilo.css')) {
      css(res,q.pathname)
    }
    function serveFile(res, filePath, contentType) {
      fs.readFile(filePath, (err, content) => {
          if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Erro ao carregar o arquivo.');
          } else {
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content, 'utf-8');
          }
      });
    }
    function retorno_imagem(res,nomearquivo){
      serveFile(res,`imagem.jpeg${nomearquivo}`,'image/jpeg',function (_err, data){
        return data
      });
    }
    function css(res,nomearquivo){
      serveFile(res,`stilo.css${nomearquivo}`,'text/css',function (err, data){
        if(err){
          console.log(err)
        }
        return data
      });
    }
    
}).listen(8030, () => {
    console.log("O servidor foi iniciado na porta 8030");
});