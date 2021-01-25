const containerImage = document.querySelector(".container-images");
const btnsProduct = document.querySelectorAll(".btns-products");
const containerImagesProducts = document.querySelector(
  ".container-images-products"
);

const reqData = (url = "/src/js/data.json") => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

let data;

const removeChildren = () => {
  containerImagesProducts.childNodes.forEach((children) => {
    containerImagesProducts.removeChild(children);
  });
};

window.addEventListener("load", () => {
  const changeImage = async (quantity = 4) => {
    let random = Math.floor(Math.random() * quantity);
    try {
      data = await reqData();
      containerImage.firstElementChild.textContent =
        data.dataIndex[random].name;
      containerImage.children[1].textContent =
        data.dataIndex[random].description;
      containerImage.lastElementChild.src = data.dataIndex[random].img;
      containerImage.lastElementChild.setAttribute(
        "alt",
        data.dataIndex[random].name
      );
    } catch (error) {
      console.error(error);
    }
  };

  setInterval(changeImage, 2000);
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
      const docFragmentSecundary = document.createDocumentFragment(),
        docFragmentPrimary = document.createDocumentFragment();

      data.dataProducts[index].img.map((img) => {
        removeChildren();
        const boxImage = document.createElement("div");
        boxImage.classList.add("box-image");
        const imageProduct = document.createElement("img");
        imageProduct.classList.add("image-product");
        imageProduct.setAttribute("alt", data.dataProducts[index].name);
        imageProduct.src = img;
        docFragmentPrimary.appendChild(imageProduct);
        boxImage.appendChild(docFragmentPrimary);
        docFragmentSecundary.appendChild(boxImage);
      });
      containerImagesProducts.appendChild(docFragmentSecundary);
      containerImagesProducts.parentElement.lastElementChild.innerHTML =
        data.dataProducts[index].description;
    } catch (error) {
      console.error(error);
    }
  };
});
