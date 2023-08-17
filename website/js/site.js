function Menu() {
  const menu = document.getElementById("menu");
  const items = document.querySelectorAll(".menu > li");
  const menu4Section = {};
  let previous = null;
  let offsetLvl = 1;
  let previousSection = "team";
  items.forEach((elt) => {
    menu4Section[elt.dataset.menu] = {
      current: elt,
      previous: previous || elt,
      offsetLvl,
      previousSection: previousSection,
    };
    previousSection = elt.dataset.menu;
    previous = elt;
    offsetLvl++;
  });
  const clearAll = () => {
    items.forEach((e) => {
      e.classList.remove("active");
    });
    menu.classList.forEach((val) => {
      if (val.startsWith("offset")) {
        menu.classList.remove(val);
      }
    });
  };

  const updateEnter = (el) => {
    clearAll();
    const section = el.dataset.section;
    const ptrs = menu4Section[section];
    const elt = ptrs.current;
    elt.classList.toggle("active");
    menu.classList.add(`offset${ptrs.offsetLvl}`);
    window.history.pushState(null, null, `#${section}`);
  };

  const updateExit = (el) => {
    clearAll();
    const section = el.dataset.section;
    const ptrs = menu4Section[section];
    const elt = ptrs.previous;
    elt.classList.toggle("active");
    menu.classList.add(`offset${ptrs.offsetLvl - 1}`);
    window.history.pushState(null, null, `#${ptrs.previousSection}`);
  };

  enterView({
    selector: ".project [data-section]",
    enter: updateEnter,
    exit: updateExit,
    offset: 0.5,
  });
}

function Hash() {
  const prevSlide = {};
  const slides = document.querySelectorAll("section.slide[data-section]");
  let prev = null;
  slides.forEach((el) => {
    const section = el.dataset.section;
    prevSlide[section] = prev ?? section;
    prev = section;
  });

  const updateHash = (el) => {
    const section = el.dataset.section;
    const URL = section === "rebels" ? "/" : `#${section}`;
    window.history.pushState(null, null, URL);
  };
  const updateHashExit = (el) => {
    const section = el.dataset.section;
    const prev = prevSlide[section];
    const URL = prev === "rebels" ? "/" : `#${prev}`;
    window.history.pushState(null, null, URL);
  };

  enterView({
    selector: "section.slide[data-section]",
    enter: updateHash,
    exit: updateHashExit,
    offset: 0.75,
  });
}

function Pie() {
  const pie = document.querySelector(".project .camembert");
  const slices = document.querySelectorAll(".project .camembert .number");
  slices.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const slice = el.dataset.slice;
      pie.classList.toggle(slice);
    });
    el.addEventListener("mouseleave", () => {
      const slice = el.dataset.slice;
      pie.classList.toggle(slice);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  Menu();
  Hash();
  Pie();
});
