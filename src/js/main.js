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

const removeChildren = () => {
  containerImagesProducts.childNodes.forEach((children) => {
    containerImagesProducts.removeChild(children);
  });
};
let count = 0;

window.addEventListener("load", () => {
  const changeImage = async (quantity = 4) => {
    try {
      data = await reqData();
      if (count === 4) {
        count = 0;
      } else {
        containerImage.firstElementChild.textContent =
          data.dataIndex[count].name;
        containerImage.children[1].textContent =
          data.dataIndex[count].description;
        containerImage.lastElementChild.src = data.dataIndex[count].img;
        containerImage.lastElementChild.setAttribute(
          "alt",
          data.dataIndex[count].name
        );
        count = count + 1;
      }
      console.log(count);
    } catch (error) {
      console.error(error);
    }
  };

  setInterval(changeImage, 2500);
});

btnsProduct.forEach((Element, index) => {
  if (index === 7) return;
  Element.onclick = async () => {
    let observerColorBtn;

    if (btnsProduct[0].classList.contains("select")) {
      observerColorBtn = 0;
    } else if (btnsProduct[1].classList.contains("select")) {
      observerColorBtn = 1;
    } else if (btnsProduct[2].classList.contains("select")) {
      observerColorBtn = 2;
    } else if (btnsProduct[3].classList.contains("select")) {
      observerColorBtn = 3;
    } else if (btnsProduct[4].classList.contains("select")) {
      observerColorBtn = 4;
    } else if (btnsProduct[5].classList.contains("select")) {
      observerColorBtn = 5;
    } else if (btnsProduct[6].classList.contains("select")) {
      observerColorBtn = 6;
    }
    if (observerColorBtn !== undefined) {
      btnsProduct[observerColorBtn].classList.remove("select");
    }
    Element.classList.add("select");
    try {
      data = await reqData();
      const docFragmentContainerBoxImage = document.createDocumentFragment();
      const docFragmentImg = document.createDocumentFragment();
      let arrayImg = [];
      let altImg;

      data.dataProducts[index].img.map((img) => {
        removeChildren();
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

      containerImagesProducts.parentElement.lastElementChild.innerHTML =
        data.dataProducts[index].description;
    } catch (error) {
      console.error(error);
    }
  };
});

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("../../sw.js")
//     .then((ev) => {
//       console.log(ev);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// }
