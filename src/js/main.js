import {
  containerImages,
  btnsProduct,
  imageProduct,
  containerParagraphDescription,
  iconSocialMedia,
} from "./elements.js";

import {
  arrayUrlsSocialMedia,
  arrayImageIndex,
  arrayDescriptionProduct,
  arrayNameProduct,
  arrayImageProduct,
} from "./data.js";

const imageUrl = arrayImageIndex.map((Array) => Array.image);
const nameImage = arrayImageIndex.map((Array) => Array.name);

iconSocialMedia.forEach((Element, index) => {
  Element.addEventListener("click", () => {
    window.open(arrayUrlsSocialMedia[index]);
  });
});

window.addEventListener("load", () => {
  const changeImage = () => {
    let random = Math.floor(Math.random() * arrayImageIndex.length);
    containerImages.firstElementChild.textContent = nameImage[random];
    containerImages.lastElementChild.src = imageUrl[random];
    containerImages.lastElementChild.setAttribute("alt", nameImage[random]);
  };

  setInterval(changeImage, 3000);
});

btnsProduct.forEach((Element, index) => {
  if (index === 6) {
    return;
  }

  Element.addEventListener("click", () => {
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
    }

    if (observerColorBtn !== undefined) {
      btnsProduct[observerColorBtn].classList.remove("select");
    }

    Element.classList.add("select");
    imageProduct.forEach((Element2, index2) => {
      Element2.setAttribute("src", arrayImageProduct[index][index2]);
      Element2.setAttribute("alt", arrayNameProduct[index]);
      containerParagraphDescription.firstElementChild.textContent =
        arrayDescriptionProduct[index];
    });
  });
});

imageProduct.forEach((Element) => {
  const observerImage = new IntersectionObserver(
    (entries, observer) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          const img = entry.target;
          const src = img.getAttribute("data-lazy");

          img.setAttribute("src", src);
          observer.disconnect();
        });
    },
    {
      threshold: 0.2,
    }
  );
  observerImage.observe(Element);
});
