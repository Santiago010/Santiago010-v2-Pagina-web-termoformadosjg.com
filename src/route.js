const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();
const responseHandler = require("./responseHandler.js");

const objectMessage = {
  error: [
    "Debes Ingresar todos los datos",
    "La longitud del nombre no es correcta",
    "El correo es invalido",
  ],
  success:
    "¡Gracias por contactar con nosotros, estaremos respondiendo lo antes posible!",
};

router.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;
  let resHandler = responseHandler.responseHandler(
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.message
  );

  contentHTML = `
<h1>Informacion Usuarios</h1>
<ul>
<li>nombre : ${name}</li>
<li>correo : ${email}</li>
<li>telefono : ${phone}</li>
</ul>
<p>${message}</p>   
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

  try {
    if (resHandler === 0) {
      throw new Error(objectMessage.error[resHandler]);
    } else if (resHandler === 1) {
      throw new Error(objectMessage.error[resHandler]);
    } else if (resHandler === 2) {
      throw new Error(objectMessage.error[resHandler]);
    }
    const info = await transporter.sendMail({
      from: "'Pagina Web <gonzaloortiz@termoformadosjg.com>",
      to: "termoformados.jg@hotmail.com",
      subject: "Correo enviado desde el formulario de contacto",
      html: contentHTML,
    });
    console.log(info);
    res.json({ state: "success", response: objectMessage.success });
  } catch (err) {
    res.json({
      state: "error",
      response: objectMessage.error[resHandler],
    });
  }
});
module.exports = router;
