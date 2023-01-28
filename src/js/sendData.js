import { formData } from "./elements.js";

export default function sendData() {
  formData.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const dataUSer = new FormData(ev.currentTarget);

    fetch("https://receiver-email-jg.vercel.app/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: dataUSer.get("name"),
        email: dataUSer.get("email"),
        phone: dataUSer.get("phone"),
        message: dataUSer.get("message"),
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.state) {
          case "success":
            swal({
              title: "¡Exito!",
              text: data.response,
              icon: "success",
              button: "OK",
            });
            break;
          case "error":
            swal({
              title: "¡Error!",
              text: data.response,
              icon: "error",
              button: "¡Volver A intentar!",
            });
            break;
        }
      });
  });
}
