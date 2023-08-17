function Gallery() {
  const lightboxElt = document.getElementById("lightbox");
  const closeElt = document.getElementById("close");
  const idElt = document.getElementById("id");
  const bigElt = document.getElementById("big");
  const prevElt = document.getElementById("prev");
  const nextElt = document.getElementById("next");
  const blindElt = document.getElementById("blind");
  const thumbElt = document.getElementById("thumbnails");
  const thumbsElts = document.querySelectorAll(".thumbs");

  const RBL_COUNT = 36;

  const seq = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let cursor = 0;

  let prevID = 1;
  let nextID = 2;

  function urlForID(id) {
    const x = cursor === seq.length && id > RBL_COUNT ? "0x" : "";
    return `/images/gallery/big/${x}${id}.jpg`;
  }
  function lastID() {
    return cursor === seq.length ? 48 : RBL_COUNT;
  }
  function preloadImg(id) {
    const img = new Image();
    img.src = urlForID(id);
  }
  function rebel(code) {
    if (cursor === seq.length) {
      return;
    }
    if (seq[cursor] === code) {
      cursor = cursor + 1;
      if (cursor === seq.length) {
        ShowLigthbox(RBL_COUNT + 1, true);
      }
      return;
    }
    cursor = 0;
  }

  function preloadLeft() {
    preloadImg(prevID);
    if (prevID - 1 > 1) {
      preloadImg(prevID - 1);
    }
    if (prevID - 2 > 1) {
      preloadImg(prevID - 2);
    }
  }

  function preloadRight() {
    preloadImg(nextID);
    if (nextID + 1 < RBL_COUNT) {
      preloadImg(nextID + 1);
    }
    if (nextID + 2 < RBL_COUNT) {
      preloadImg(nextID + 2);
    }
  }

  function intToHexString(nb) {
    const res = nb.toString(16);
    return `0x${res.length < 2 ? "0" : ""}${res}`;
  }

  function ShowLigthbox(id, zoomEffect) {
    lightboxElt.classList.remove("hide");
    blindElt.classList.remove("hide");
    lightboxElt.classList.remove("hide");
    blindElt.classList.remove("hide");
    if (zoomEffect === true) {
      lightboxElt.classList.add("zoom");
    } else {
      lightboxElt.classList.remove("zoom");
    }
    const rblID = `rbl-${intToHexString(id)}`;
    const URL = urlForID(id);
    const filename = `${rblID}.jpg`;
    bigElt.style.backgroundImage = `url('${URL}')`;
    idElt.innerText = rblID;
    idElt.setAttribute("download", filename);
    idElt.setAttribute("href", URL);
    UpdateArrows(id);
    prevID = Math.max(1, id - 1);
    nextID = Math.min(lastID(), id + 1);
    preloadLeft();
    preloadRight();
  }
  function HideLigthbox() {
    lightboxElt.classList.add("hide");
    lightboxElt.classList.remove("zoom");
    blindElt.classList.add("hide");
  }
  function UpdateArrows(id) {
    prevElt.classList.remove("disabled");
    nextElt.classList.remove("disabled");
    if (id <= 1) {
      prevElt.classList.add("disabled");
    }
    if (id > lastID() - 1) {
      nextElt.classList.add("disabled");
    }
  }

  closeElt.addEventListener("click", HideLigthbox);
  blindElt.addEventListener("click", HideLigthbox);

  prevElt.addEventListener("click", () => {
    ShowLigthbox(prevID);
  });
  nextElt.addEventListener("click", () => {
    ShowLigthbox(nextID);
  });

  prevElt.addEventListener("mouseover", () => {
    preloadImg(prevID);
  });
  nextElt.addEventListener("mouseover", () => {
    preloadImg(nextID);
    if (nextID < lastID()) {
      preloadImg(nextID + 1);
    }
  });

  thumbsElts.forEach((elt) => {
    elt.addEventListener("click", () => {
      ShowLigthbox(+elt.dataset.id);
    });
    elt.addEventListener("mouseover", () => {
      preloadImg(+elt.dataset.id);
    });
  });

  window.addEventListener("keydown", (evt) => {
    rebel(evt.key);
    switch (evt.code) {
      case "ArrowLeft":
        ShowLigthbox(prevID);
        break;
      case "ArrowRight":
        ShowLigthbox(nextID);
        break;
      case "Escape":
        HideLigthbox();
        break;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  Gallery();
});
