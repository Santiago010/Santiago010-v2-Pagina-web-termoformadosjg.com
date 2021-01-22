const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

router.post("/send-email", async (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;

  contentHTML = `
  <h1>Informacion Usuarios</h1>
  <ul>
  <li>nombre : ${nombre}</li>
  <li>correo : ${correo}</li>
  <li>telefono: ${telefono}</li>
  </ul>
  <p>${mensaje}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: "mail.termoformadosjg.com",
    port: 587,
    secure: false,
    auth: {
      user: "gonzaloortiz@termoformadosjg.com",
      pass: "JnPf!'%<G3Ep[NnE",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "'Pagina Web <gonzaloortiz@termoformadosjg.com>",
    to: "santiago.dev06@gmail.com",
    subject: "Correo enviado desde el formulario de contacto",
    html: contentHTML,
  });

  console.log("Info message", info.messageId);

  res.redirect("/src/success.html");
});
module.exports = router;
