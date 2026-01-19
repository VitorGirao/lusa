// Menu responsivo
const menuButton = document.querySelector("header button");
const menuNav = document.getElementById("menu-nav");

menuButton.addEventListener("click", () => {
  menuNav.classList.toggle("active");
});

//Tira a classe active do menu pra ele sumir (clicando em alguma opçao do menu)
const menuLinks = document.querySelectorAll("#menu-nav ul li a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuNav.classList.remove("active");
  });
});
//Tira a classe active do menu pra ele sumir (clicando fora do menu)
document.addEventListener("click", (e) => {
  if (!menuNav.contains(e.target) && !menuButton.contains(e.target)) {
    menuNav.classList.remove("active");
  }
});

// Popular produtos
const productsContainer = document.getElementById("produtos-container");

async function carregarProdutos() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/VitorGirao/lusa/refs/heads/main/products.json"
    );

    const data = await response.json();

    const products = data;
    const productsList = products.slice(0, 3);

    productsList.forEach((product, index) => {
      const productArticle = document.createElement("article");
      const isOdd = index % 2 !== 0;

      productArticle.classList.add("orga-produtos");

      if (isOdd) {
        productArticle.classList.add("reverse");
      }

      productArticle.innerHTML = `
        <div>
          <h2>${product.name}</h2>
          <p>${product.description1}</p>
        </div>
        <div class="img-produto">
          <img src="${product.image}" alt="${product.name}" />
        </div>
      `;

      productsContainer.appendChild(productArticle);
    });

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);

  } finally {
    const loadingText = document.querySelector(".loading-produtos");
    loadingText.style.display = "none";
  }
}

carregarProdutos();


// Popular ícones
const iconsContainer = document.getElementById("icon-table");
let iconsData = [];

async function carregarIcons() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/VitorGirao/lusa/refs/heads/main/icons.json"
    );

    const data = await response.json();
    iconsData = data;

    const columnsContents = iconsContainer.querySelectorAll(".column > div");

    //popular com as imagens
    columnsContents.forEach((columnContent, index) => {
      const icon = data[index];
      if (!icon) return;

      columnContent.innerHTML = `
        <img src="${icon.image}" alt="${icon.name}" />
      `;
    });

    // Trocar 3 ícones aleatoriamente a cada 2.5 segundos
    setInterval(() => {
      const columnsContents = iconsContainer.querySelectorAll(".column > div");

      if (columnsContents.length < 3) return;

      const index1 = Math.floor(Math.random() * columnsContents.length);

      let index2;
      do {
        index2 = Math.floor(Math.random() * columnsContents.length);
      } while (index2 === index1);

      let index3;
      do {
        index3 = Math.floor(Math.random() * columnsContents.length);
      } while (index3 === index1 || index3 === index2);

      const img1 = columnsContents[index1].querySelector("img");
      const img2 = columnsContents[index2].querySelector("img");
      const img3 = columnsContents[index3].querySelector("img");

      if (!img1 || !img2 || !img3) return;

      img1.style.opacity = "0";
      img1.style.transform = "scale(0.7)";
      img2.style.opacity = "0";
      img2.style.transform = "scale(0.7)";
      img3.style.opacity = "0";
      img3.style.transform = "scale(0.7)";

      setTimeout(() => {
        const tempSrc = img1.src;
        const tempAlt = img1.alt;

        img1.src = img2.src;
        img1.alt = img2.alt;

        img2.src = img3.src;
        img2.alt = img3.alt;

        img3.src = tempSrc;
        img3.alt = tempAlt;

        img1.style.opacity = "1";
        img1.style.transform = "scale(1)";
        img2.style.opacity = "1";
        img2.style.transform = "scale(1)";
        img3.style.opacity = "1";
        img3.style.transform = "scale(1)";
      }, 500);
    }, 2500);

  } catch (error) {
    console.error("Erro ao carregar ícones:", error);
  }
}

carregarIcons();


// Link ativo ao rolar a página
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("#menu-nav ul li a");

const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -50% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;

      navLinks.forEach((link) => {
        link.classList.remove("hover-teste");
      });

      let targetLink;
      if (sectionId === "hero") {
        targetLink = document.querySelector(
          '#menu-nav ul li a[href="#menu-nav"]'
        );
      } else {
        targetLink = document.querySelector(
          `#menu-nav ul li a[href="#${sectionId}"]`
        );
      }

      if (targetLink) {
        targetLink.classList.add("hover-teste");
      }
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// json cards comentários

const container = document.getElementById("comentarios");

const icones = [
  "./imagens/icon1p2.png",
  "./imagens/icon2p2.png",
  "./imagens/icon3p2.png",
  "./imagens/icon4p2.png",
  "./imagens/icon5p2.png",
  "./imagens/icon6p2.png"
];

function iconeAleatorio() {
  return icones[Math.floor(Math.random() * icones.length)];
}

async function carregarComentarios() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/VitorGirao/lusa/refs/heads/main/clientes.json"
    );

    const data = await response.json();

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card-comentario");

      card.innerHTML = `
        <div class="card-topo">
          <img src="${iconeAleatorio()}" alt="Avatar do cliente">
          <h3>${item.nome}</h3>
        </div>
        <p>${item.comentario}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar os comentários:", error);
  }
}

carregarComentarios();
