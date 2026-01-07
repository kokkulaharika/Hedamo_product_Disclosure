/* =================================================
   MOCK DATA (Health products only)
   Producer-declared information
================================================= */
const products = [
  {
    id: 1,
    name: "Reusable Surgical Mask",
    category: "Healthcare Consumables",
    producer: "Meditex Supplies",
    status: "Published",
    updated: "2025-01-02",
    evidenceCount: 2,
    versions: [
      { date: "2024-11-10", status: "Submitted" },
      { date: "2025-01-02", status: "Published" }
    ]
  },
  {
    id: 2,
    name: "Digital Blood Pressure Monitor",
    category: "Medical Devices",
    producer: "CareHealth Instruments",
    status: "Submitted",
    updated: "2024-12-20",
    evidenceCount: 1,
    versions: [
      { date: "2024-12-01", status: "Draft" },
      { date: "2024-12-20", status: "Submitted" }
    ]
  },
  {
    id: 3,
    name: "Herbal Immunity Supplement",
    category: "Wellness & Nutrition",
    producer: "NatureGlow Labs",
    status: "Draft",
    updated: "2024-12-05",
    evidenceCount: 0,
    versions: [
      { date: "2024-11-25", status: "Draft" },
      { date: "2024-12-05", status: "Draft" }
    ]
  }
];


/* =================================================
   DOM REFERENCES
================================================= */
const listView = document.getElementById("listView");
const detailView = document.getElementById("detailView");
const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

/* =================================================
   RENDER PRODUCT LIST
================================================= */
function renderList(data) {
  productGrid.innerHTML = "";

  if (data.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p class="meta">${product.category}</p>
      <p class="meta">Producer: ${product.producer}</p>
      <span class="badge ${product.status}">${product.status}</span>
      <p class="meta">Last updated: ${product.updated}</p>
    `;

    card.addEventListener("click", () => showDetail(product));
    productGrid.appendChild(card);
  });
}

/* =================================================
   SHOW DETAIL VIEW
================================================= */
function showDetail(product) {
  listView.classList.add("hidden");
  detailView.classList.remove("hidden");

  document.getElementById("detailName").textContent = product.name;
  document.getElementById("detailCategory").textContent = product.category;
  document.getElementById("detailProducer").textContent = product.producer;

  document.getElementById("declaredBy").textContent = product.producer;
  document.getElementById("declaredOn").textContent = product.updated;

  document.getElementById("evidenceInfo").textContent =
    product.evidenceCount > 0
      ? `${product.evidenceCount} files attached`
      : "No evidence attached";

  const versionList = document.getElementById("versionList");
  versionList.innerHTML = "";

  product.versions.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.date} — ${v.status}`;
    versionList.appendChild(li);
  });
}
/* adding search and filter,sort logic*/
/* Adding DOM references */
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const sortControl = document.getElementById("sortControl");
/*creating filter function*/
function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedStatus = statusFilter.value;
  const sortBy = sortControl.value;

  let filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.producer.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "" || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  if (sortBy === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else {
    filteredProducts.sort((a, b) =>
      new Date(b.updated) - new Date(a.updated)
    );
  }

  renderList(filteredProducts);
}
/*Attaching Event Listener*/
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
sortControl.addEventListener("change", applyFilters);

/* =================================================
   BACK TO LIST
================================================= */
document.getElementById("backBtn").addEventListener("click", () => {
  detailView.classList.add("hidden");
  listView.classList.remove("hidden");
});

/* =================================================
   INITIAL RENDER
================================================= */
renderList(products);

