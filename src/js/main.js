import {
  containerImage,
  btnsProduct,
  containerImagesProducts,
  fab,
} from "./elements.js";

import sendData from "./sendData.js";

sendData();

const reqData = (url = "/src/js/data.json") => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

let data;

fab.forEach((Element, index) => {
  Element.addEventListener("click", async () => {
    data = await reqData();
    window.open(data.dataSocialMedia[index]);
  });
});

window.addEventListener("load", async () => {
  try {
    data = await reqData();
    const dataIndex = await data.dataIndex;
    let count = 0;

    const changeImage = () => {
      if (count === 4) {
        count = 0;
      } else {
        containerImage.firstElementChild.textContent = dataIndex[count].name;
        containerImage.children[1].textContent = dataIndex[count].description;
        containerImage.lastElementChild.src = dataIndex[count].img;
        containerImage.lastElementChild.setAttribute(
          "alt",
          dataIndex[count].name
        );
        count++;
      }
    };

    setInterval(changeImage, 3000);
  } catch (error) {
    console.error(error);
  }
});

btnsProduct.forEach((Element, index) => {
  if (index === 7) return;
  Element.onclick = async () => {
    let btnsSelect = Array.prototype.filter.call(btnsProduct, (btn) =>
      btn.classList.contains("select")
    );

    btnsSelect.forEach((btn) => btn.classList.remove("select"));
    Element.classList.add("select");

    try {
      data = await reqData();
      const docFragmentContainerBoxImage = document.createDocumentFragment();
      const docFragmentImg = document.createDocumentFragment();
      let arrayImg = [];
      let altImg;
      for (let i = 0; i < containerImagesProducts.childNodes.length; i++) {
        Array.prototype.forEach.call(
          containerImagesProducts.children,
          (children) => {
            containerImagesProducts.removeChild(children);
          }
        );
      }
      data.dataProducts[index].img.map((img) => {
        const boxImage = document.createElement("div");
        boxImage.classList.add("box-image");
        const imageProduct = document.createElement("img");
        imageProduct.classList.add("image-product");
        arrayImg.push(img);
        altImg = data.dataProducts[index].name;

        docFragmentContainerBoxImage.appendChild(boxImage);
        docFragmentImg.appendChild(imageProduct);
        boxImage.appendChild(docFragmentImg);
      });
      containerImagesProducts.appendChild(docFragmentContainerBoxImage);

      const containerImageProduct = document.querySelectorAll(".image-product");

      containerImageProduct.forEach((img, index) => {
        const observerImg = new IntersectionObserver(
          (entries, observer) => {
            entries
              .filter((entry) => entry.isIntersecting)
              .forEach((entry) => {
                const img = entry.target;
                img.setAttribute("alt", altImg);
                img.src = arrayImg[index];
                observer.disconnect();
              });
          },
          {
            threshold: 0.2,
          }
        );
        observerImg.observe(img);
      });

      containerImagesProducts.parentElement.lastElementChild.innerHTML = `♻${data.dataProducts[index].description} <br />
          <span class="line-color">Todo en Termoformados</span>`;
    } catch (error) {
      console.error(error);
    }
  };
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../../sw.js")
    .then((ev) => {
      console.log(ev.active);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
