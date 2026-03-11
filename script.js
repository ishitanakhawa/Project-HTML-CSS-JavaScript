// Job Data
const ALL_JOBS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Razorpay",
    logo: "RZ",
    logoColor: "#6ECFCF",
    major: "CSE",
    location: "Mumbai",
    type: "Remote",
    duration: "2 months",
    stipend: 12000,
    badge: "new",
    cert: true,
  },
  {
    id: 2,
    title: "Backend Engineer Intern",
    company: "Infosys",
    logo: "IN",
    logoColor: "#F5C518",
    major: "CSE",
    location: "Pune",
    type: "Hybrid",
    duration: "3 months",
    stipend: 15000,
    badge: "hot",
    cert: true,
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "Mu Sigma",
    logo: "MS",
    logoColor: "#F5B8B8",
    major: "CSE",
    location: "Bangalore",
    type: "Remote",
    duration: "3 months",
    stipend: 18000,
    badge: "featured",
    cert: true,
  },
  {
    id: 4,
    title: "IoT & Embedded Intern",
    company: "Bosch India",
    logo: "BI",
    logoColor: "#6ECFCF",
    major: "ECE",
    location: "Chennai",
    type: "Onsite",
    duration: "2 months",
    stipend: 10000,
    badge: "new",
    cert: false,
  },
  {
    id: 5,
    title: "VLSI Design Intern",
    company: "Texas Instruments",
    logo: "TI",
    logoColor: "#F5E6A0",
    major: "ECE",
    location: "Hyderabad",
    type: "Onsite",
    duration: "6 months",
    stipend: 20000,
    badge: "featured",
    cert: true,
  },
  {
    id: 6,
    title: "Digital Marketing Intern",
    company: "Dentsu India",
    logo: "DI",
    logoColor: "#F5C518",
    major: "MBA",
    location: "Delhi",
    type: "Remote",
    duration: "2 months",
    stipend: 8000,
    badge: "new",
    cert: true,
  },
  {
    id: 7,
    title: "Business Analyst Intern",
    company: "Deloitte India",
    logo: "DL",
    logoColor: "#F5B8B8",
    major: "MBA",
    location: "Mumbai",
    type: "Hybrid",
    duration: "3 months",
    stipend: 14000,
    badge: "hot",
    cert: true,
  },
  {
    id: 8,
    title: "HR & Talent Intern",
    company: "Randstad India",
    logo: "RI",
    logoColor: "#6ECFCF",
    major: "MBA",
    location: "Pune",
    type: "Remote",
    duration: "2 months",
    stipend: 7000,
    badge: "new",
    cert: false,
  },
  {
    id: 9,
    title: "UI/UX Design Intern",
    company: "Zeta",
    logo: "ZT",
    logoColor: "#F5E6A0",
    major: "Design",
    location: "Bangalore",
    type: "Remote",
    duration: "3 months",
    stipend: 12000,
    badge: "featured",
    cert: true,
  },
  {
    id: 10,
    title: "Brand & Visual Design Intern",
    company: "Elephant Design",
    logo: "ED",
    logoColor: "#F5B8B8",
    major: "Design",
    location: "Mumbai",
    type: "Hybrid",
    duration: "2 months",
    stipend: 10000,
    badge: "hot",
    cert: true,
  },
  {
    id: 11,
    title: "Motion Graphics Intern",
    company: "DreamDen",
    logo: "DD",
    logoColor: "#6ECFCF",
    major: "Design",
    location: "Delhi",
    type: "Remote",
    duration: "3 months",
    stipend: 11000,
    badge: "new",
    cert: false,
  },
  {
    id: 12,
    title: "Full Stack Intern",
    company: "Zepto",
    logo: "ZP",
    logoColor: "#F5C518",
    major: "CSE",
    location: "Remote",
    type: "Remote",
    duration: "6 months",
    stipend: 25000,
    badge: "featured",
    cert: true,
  },
];



let currentFilter = "all";
let currentSearch = "";
const companyListings = [];

//Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  if (!toast) return;
  toastMsg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

//Build One Job Card
function buildJobCard(
  j,
  {
    showRemoteSticker = false,
    applyButton = false,
    viewAllButton = false,
  } = {},
) {
  const certTag = j.cert
    ? `<span class="job-tag tag-cert">Certificate</span>`
    : "";
  const sticker =
    showRemoteSticker && j.type === "Remote"
      ? `<div class="remote-sticker">Remote</div>`
      : "";
  const actionBtn = applyButton
    ? `<button class="apply-btn" onclick="applyJob(${j.id}, this)">Apply Now</button>`
    : viewAllButton
      ? `<a href="jobs.html" class="apply-btn">View All</a>`
      : "";

  return `
    <div class="job-card">
      ${sticker}
      <div class="job-card-top">
        <div class="company-logo-placeholder" style="background:${j.logoColor}">${j.logo}</div>
        <span class="job-badge badge-${j.badge}">${j.badge}</span>
      </div>
      <div class="job-title">${j.title}</div>
      <div class="job-company">${j.company} · ${j.location}</div>
      <div class="job-meta">
        <span class="job-tag">${j.major}</span>
        <span class="job-tag">${j.type}</span>
        <span class="job-tag">${j.duration}</span>
        ${certTag}
      </div>
      <div class="job-footer">
        <div class="job-stipend">Rs.${j.stipend.toLocaleString()}/mo</div>
        ${actionBtn}
      </div>
    </div>`;
}

//Show Cards on Page
function renderGrid(gridId, jobs, cardOptions = {}) {
  const grid = document.getElementById(gridId);
  const noRes = document.getElementById("noResults");
  const count = document.getElementById("resultCount");
  if (!grid) return;

  if (count)
    count.innerHTML = `Showing <strong>${jobs.length}</strong> internships`;

  if (jobs.length === 0) {
    grid.innerHTML = "";
    if (noRes) noRes.style.display = "block";
    return;
  }

  if (noRes) noRes.style.display = "none";
  grid.innerHTML = jobs.map((j) => buildJobCard(j, cardOptions)).join("");
}

//Homepage (Index Page)
function loadIndexPage() {
  if (!document.getElementById("featuredGrid")) return;
  renderGrid("featuredGrid", ALL_JOBS.slice(0, 6), { viewAllButton: true });

}

function handleMajorClick(e, major) {
  e.preventDefault();
  window.location.href = "jobs.html?major=" + major;
}

//Jobs Page (Browse All Jobs)
function loadJobsPage() {
  if (!document.getElementById("jobsGrid")) return;

  const urlMajor = new URLSearchParams(window.location.search).get("major");
  if (urlMajor) {
    currentFilter = urlMajor;
    document.querySelectorAll(".chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.filter === urlMajor);
    });
  }

  renderFilteredJobs();

  document.getElementById("chipBar").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document
      .querySelectorAll(".chip")
      .forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentFilter = chip.dataset.filter;
    renderFilteredJobs();
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderFilteredJobs();
  });

  document.getElementById("searchClear").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    currentSearch = "";
    renderFilteredJobs();
  });
}
//Filter Logic for Jobs Page
function renderFilteredJobs() {
  const results = ALL_JOBS.filter((j) => {
    const matchFilter =
      currentFilter === "all"
        ? true
        : currentFilter === "Remote"
          ? j.type === "Remote"
          : currentFilter === "Hybrid"
            ? j.type === "Hybrid"
            : currentFilter === "Certificate"
              ? j.cert === true
              : j.major === currentFilter;

    const matchSearch =
      !currentSearch ||
      j.title.toLowerCase().includes(currentSearch) ||
      j.company.toLowerCase().includes(currentSearch);

    return matchFilter && matchSearch;
  });

  renderGrid("jobsGrid", results, {
    showRemoteSticker: true,
    applyButton: true,
  });
}
// Apply Button
function applyJob(id, btn) {
  const job = ALL_JOBS.find((j) => j.id === id);
  btn.textContent = "Applied!";
  btn.disabled = true;
  showToast(`Applied to ${job.title} at ${job.company}!`);
}


//Advanced Filters Page
function loadFiltersPage() {
  if (!document.getElementById("resultsGrid")) return;

  renderAdvancedFiltered();

  document
    .querySelectorAll(".filter-opt input")
    .forEach((inp) => inp.addEventListener("change", renderAdvancedFiltered));

  const stipendRange = document.getElementById("stipendRange");
  const stipendVal = document.getElementById("stipendVal");

  stipendRange.addEventListener("input", () => {
    const val = parseInt(stipendRange.value);
    stipendVal.textContent =
      val >= 25000 ? "Rs.25,000+" : `Rs.${val.toLocaleString()}`;
    renderAdvancedFiltered();
  });

  document
    .getElementById("sortSelect")
    .addEventListener("change", renderAdvancedFiltered);

  document.getElementById("applyFilters").addEventListener("click", () => {
    renderAdvancedFiltered();
    showToast("Filters applied!");
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    document
      .querySelectorAll(".filter-opt input")
      .forEach((i) => (i.checked = false));
    stipendRange.value = 25000;
    stipendVal.textContent = "Rs.25,000+";
    renderAdvancedFiltered();
    showToast("Filters reset!");
  });
}
// Advanced Filter Logic
function getCheckedValues(sectionId) {
  return [...document.querySelectorAll(`#${sectionId} input:checked`)].map(
    (i) => i.value,
  );
}

function renderAdvancedFiltered() {
  const majors = getCheckedValues("majorFilter");
  const locations = getCheckedValues("locationFilter");
  const durations = getCheckedValues("durationFilter");
  const certOnly = document.querySelector(
    '#extrasFilter input[value="cert"]',
  ).checked;
  const featOnly = document.querySelector(
    '#extrasFilter input[value="featured"]',
  ).checked;
  const maxStipend = parseInt(document.getElementById("stipendRange").value);
  const sortBy = document.getElementById("sortSelect").value;

  let results = ALL_JOBS.filter((j) => {
    if (majors.length && !majors.includes(j.major)) return false;
    if (durations.length && !durations.includes(j.duration)) return false;
    if (certOnly && !j.cert) return false;
    if (featOnly && j.badge !== "featured") return false;
    if (j.stipend > maxStipend) return false;
    if (
      locations.length &&
      !locations.some((l) => l === j.location || l === j.type)
    )
      return false;
    return true;
  });

  const durationOrder = { "2 months": 0, "3 months": 1, "6 months": 2 };
  if (sortBy === "stipend-high") results.sort((a, b) => b.stipend - a.stipend);
  if (sortBy === "stipend-low") results.sort((a, b) => a.stipend - b.stipend);
  if (sortBy === "duration")
    results.sort(
      (a, b) => durationOrder[a.duration] - durationOrder[b.duration],
    );

  renderGrid("resultsGrid", results, { applyButton: true });
}
//Company Page
function loadCompanyPage() {
  const strip = document.getElementById("partnersStrip");
  if (!strip) return;

  const partners = [
    "Razorpay",
    "Infosys",
    "Mu Sigma",
    "Bosch India",
    "Texas Instruments",
    "Dentsu India",
    "Deloitte India",
    "Randstad India",
    "Zeta",
    "Elephant Design",
    "DreamDen",
    "Zepto",
  ];
  strip.innerHTML = partners
    .map((p) => `<div class="partner-logo">${p}</div>`)
    .join("");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
//Post Internship Form (Modal)
function openPostForm(plan) {
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
  if (plan === "featured" || plan === "bundle") {
    document.getElementById("f-featured").checked = true;
  }
}

function closePostForm(e) {
  if (e && e.target !== document.getElementById("modalOverlay")) return;
  closeModal();
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handlePostSubmit(e) {
  e.preventDefault();

  const company = document.getElementById("f-company").value.trim();
  const title = document.getElementById("f-title").value.trim();
  const major = document.getElementById("f-major").value;
  const type = document.getElementById("f-type").value;
  const duration = document.getElementById("f-duration").value;

  if (!company || !title || !major || !type || !duration) {
    showToast("Please fill all required fields!");
    return;
  }

  const listing = {
    company,
    title,
    major,
    type,
    location: document.getElementById("f-location").value.trim(),
    duration,
    stipend: document.getElementById("f-stipend").value,
    cert: document.getElementById("f-cert").checked,
    featured: document.getElementById("f-featured").checked,
  };

 
  companyListings.unshift(listing);

  document.getElementById("postForm").reset();
  closeModal();
  showToast(`${title} posted successfully!`);
}

//Page Load 
window.onload = function () {
  loadIndexPage();
  loadJobsPage();
  loadFiltersPage();
  loadCompanyPage();
};
