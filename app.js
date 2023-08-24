var mysql = require("mysql2");
var argv = require("yargs")
  .command("create", "Yeni bir kayıt oluşturur", function (yargs) {
    yargs
      .options({
        name: {
          demand: true,
          alias: "n",
          description: "Adınızı giriniz",
          type: "string",
        },
        surname: {
          demand: true,
          alias: "s",
          description: "Soyadınızı giriniz",
          type: "string",
        },
        email: {
          demand: true,
          alias: "e",
          description: "Email adresinizi giriniz",
          type: "string",
        },
      })
      .help("help");
  })
  .command("delete", "Kayıt siler", function (yargs) {
    yargs
      .options({
        id: {
          demand: true,
          alias: "i",
          description: "Silinecek kayıt id",
          type: "number",
        },
      })
      .help("help");
  })
  .command("list", "Kayıtları listeler", function (yargs) {})
  .help("help").argv;

var command = argv._[0];

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "your password",
  database: "nodejs",
});

async function connection() {
    try {
        await con.connect();
        console.log("bağlantı başarılı");

        if (
            command === "create" &&
            typeof argv.name !== "undefined" &&
            typeof argv.surname !== "undefined" &&
            typeof argv.email !== "undefined" 
        ) {
            function insert() {
                var sql =
                    "INSERT INTO personel (ad, soyad, email) VALUES ('" +
                    argv.name +
                    "', '" +
                    argv.surname +
                    "', '" +
                    argv.email +
                    "')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Kayıt eklendi!");
                });
            }
            insert();
            con.end();

        } else if (
            command === "delete" &&
            typeof argv.id !== "undefined" 
        ) {
            function del() {
                var sql = "DELETE FROM personel WHERE id = " + argv.id;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Kayıt silindi!");
                });
            }
            del();
            con.end();
        } else if (command === "list") {
            function list() {
                var sql = "SELECT * FROM personel";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    
                    result.forEach(function (item) {
                        console.log("Ad: " + item.ad);
                        console.log("Soyad: " + item.soyad);
                        console.log("Email: " + item.email);
                        console.log("**********************");
                });
                })
            }
            list();
            con.end();
        }
    } catch (err) {
    console.log(err);
  }
}

connection();
