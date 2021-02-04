const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

router.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "mail.termoformadosjg.com",
    port: 587,
    secure: false,
    auth: {
      user: "gonzaloortizpennuela@termoformadosjg.com",
      pass: "C)m@iRAUvaub",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const objectInfodata = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    const handler = {
      set(obj, prop, value) {
        if (
          (prop === "name" && !/^[A-Za-zÑñÁáÉeÍíÓóÜü\s]+$/g.test(value)) ||
          (prop === "name" && value.length < 3) ||
          value.length > 40
        ) {
          throw new Error("El nombre es invalido");
        } else if (prop === "email" && !/\w+@\w+\.+[a-z]/.test(value)) {
          throw new Error("El correo es invalido");
        } else if (
          (prop === "phone" && isNaN(value)) ||
          (prop === "phone" && value.length < 7)
        ) {
          throw new Error("El numero es invalido");
        }
        obj[prop] = value;
      },
    };

    const p = new Proxy(objectInfodata, handler);
    p.name = name;
    p.email = email;
    p.phone = phone;
    p.message = message;

    contentHTML = `
        <h1>Informacion de usuario</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Correo: ${email}</li>
            <li>Telefono: ${phone}</li>
        </ul>
        <p>Mensaje: ${message}</p>
    `;

    const info = await transporter.sendMail({
      from: '"Pagina web" <gonzaloortizpennuela@termoformadosjg.com>',
      to: "santiago.dev06@gmail.com",
      subject: "Correo enviado desde el formulario de contacto",
      html: contentHTML,
    });
    res.json({
      state: "success",
      response:
        "¡Gracias por contactar con nosotros, estaremos respondiendo lo antes posible!",
      info: info,
    });
    console.info(p);
  } catch (error) {
    res.json({
      state: "error",
      response: error.message,
    });
    console.error(error.message);
  }
});

module.exports = router;
