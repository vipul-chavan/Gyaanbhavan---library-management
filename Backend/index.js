import express from "express";
import mysql from "mysql";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "system",
  password: "vipz",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM AdminLogin WHERE username=? AND password=?";

  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      return res.json("Login sucessful");
    } else {
      return res.json("Login failed");
    }
  });
});

//sendMail
app.get("/getemail/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const q =
    "SELECT c.emailId FROM Client c INNER JOIN Orders o ON o.idClient = c.idClient WHERE o.orderId = ?";
  db.query(q, [orderId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0].emailId);
  });
});

app.post("/sendmails", (req, res) => {
  const { emailID } = req.body;

  if (!emailID) {
    return res.status(400).json({ error: "Email address is required" });
  }

  if (!isValidEmail(emailID)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: emailID,
      Subject: "Reminder to return books",
      html: "<p>Your issued book due date is tomorrow. Please return the books on time. Please ignore if already returned. Thank You</p>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email Sent" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});

function isValidEmail(emailID) {
  const re = /\S+@\S+\.\S+/;
  return re.test(emailID);
}

app.get("/books", (req, res) => {
  // db.connect(function (err) {
  //   if (err) {
  //     console.error("error connecting: " + err.errno);
  //     return;
  //   }

  //   console.log("connected as id " + db.threadId);
  // });
  const q = "SELECT * FROM Books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/fine", (req, res) => {
  const q = "SELECT * FROM Fine";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/booktitle/:title", (req, res) => {
  const title = req.params.title;
  const q = "SELECT * FROM Books WHERE title=?";
  db.query(q, [title], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/client", (req, res) => {
  const q = "SELECT * FROM Client";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/getClientData/:name", (req, res) => {
  const clientName = req.params.name;
  const q = "SELECT * FROM CLIENT WHERE name =?";

  db.query(q, [clientName], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/getOrderData/:clientId", (req, res) => {
  const clientId = req.params.clientId;
  const q =
    "SELECT o.orderID, o.idClient, b.title FROM Books b INNER JOIN Orders o on b.id = o.id where idCLient = ?";
  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/client/:idClient", (req, res) => {
  const clientId = req.params.idClient;
  const q = "SELECT * FROM CLIENT WHERE idClient =?";

  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Client is there");
  });
});

app.get("/book/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM BOOKS WHERE id =?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("book is there");
  });
});

app.get("/order", (req, res) => {
  const q = "SELECT * FROM Orders";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO Books(`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created sucessfully");
  });
});

app.post("/client", (req, res) => {
  const q =
    "INSERT INTO Client(`name`,`emailId`,`address`,`gender`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.emailId,
    req.body.address,
    req.body.gender,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Client has been created sucessfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id =?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted sucessfully");
  });
});

app.delete("/client/:idClient", (req, res) => {
  const clientId = req.params.idClient;
  const q = "DELETE FROM Client WHERE idClient =?";

  db.query(q, [clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Client has been deleted sucessfully");
  });
});

app.delete("/order/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  const q = "DELETE FROM Orders WHERE orderID =?";

  db.query(q, [orderID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Client has been deleted sucessfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` =? ,`desc`=?,`price`=?,`cover`=?  WHERE id =?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated sucessfully");
  });
});

app.put("/client/:idClient", (req, res) => {
  const clientId = req.params.idClient;
  const q =
    "UPDATE Client SET `name` =? ,`emailId`=?,`address`=?,`gender`=?  WHERE idClient =?";

  const values = [
    req.body.name,
    req.body.emailId,
    req.body.address,
    req.body.gender,
  ];

  db.query(q, [...values, clientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Client has been updated sucessfully");
  });
});

app.put("/return/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  const q = "UPDATE Orders SET `returnDate` =?  WHERE orderID =?";

  const values = [req.body.returnDate];

  db.query(q, [...values, orderID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Return date has been updated sucessfully");
  });
});

app.delete("/finedelete/:idFine", (req, res) => {
  const idFine = req.params.idFine;
  const q = "DELETE FROM Fine WHERE idFine =?";

  db.query(q, [idFine], (err, data) => {
    if (err) return res.json(err);
    return res.json("Fine has been deleted sucessfully");
  });
});

app.post("/order", async (req, res) => {
  const { idClient, id, issueDate, dueDate } = req.body;

  // Check if the client record exists
  await db.query(
    "SELECT idClient FROM Client WHERE idClient = ?",
    [idClient],
    (err, result) => {
      if (err || !result) {
        console.log("no client");
        return res.status(400).json({ error: "Client does not exist" });
      }
    }
  );

  // Check if the book record exists
  await db.query("SELECT id FROM Books WHERE id = ?", [id], (err, result) => {
    if (err || !result) {
      return res.status(400).json({ error: "Book does not exist" });
    }
  });

  // Add the order record
  const q =
    "INSERT INTO Orders(`idClient`,`id`,`issueDate`,`dueDate`) VALUES (?)";
  const values = [idClient, id, issueDate, dueDate];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Order has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
