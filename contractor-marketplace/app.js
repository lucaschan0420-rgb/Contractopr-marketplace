const contractors = [
  { name: "Ahmad Razali",     initials: "AR", av: "av-teal",   role: "Civil Engineer",        category: "Construction", skills: ["Renovation","Structural","BIM"],       rate: "RM 180/hr", rating: 4.9, reviews: 42, available: true,  tags: ["construction","top rated"] },
  { name: "Siti Norfazlina",  initials: "SN", av: "av-blue",   role: "Full-Stack Developer",  category: "Tech & Dev",   skills: ["React","Node.js","AWS"],              rate: "RM 220/hr", rating: 5.0, reviews: 31, available: true,  tags: ["tech","top rated","available"] },
  { name: "Rajan Pillai",     initials: "RP", av: "av-amber",  role: "Electrical Contractor", category: "Electrical",   skills: ["Wiring","Solar","Inspection"],         rate: "RM 130/hr", rating: 4.7, reviews: 58, available: false, tags: ["electrical"] },
  { name: "Mei Ling Tan",     initials: "MT", av: "av-pink",   role: "UI/UX Designer",        category: "Design",       skills: ["Figma","Branding","Research"],         rate: "RM 160/hr", rating: 4.8, reviews: 27, available: true,  tags: ["design","available"] },
  { name: "Farouk Hassan",    initials: "FH", av: "av-purple", role: "Plumbing Specialist",   category: "Plumbing",     skills: ["Piping","HVAC","Sanitation"],          rate: "RM 110/hr", rating: 4.6, reviews: 74, available: true,  tags: ["available"] },
  { name: "Lim Chee Keong",   initials: "LK", av: "av-coral",  role: "Interior Designer",     category: "Design",       skills: ["3D Render","Space Plan","Fit-out"],    rate: "RM 195/hr", rating: 4.9, reviews: 19, available: false, tags: ["design","top rated"] },
  { name: "Nurul Ain",        initials: "NA", av: "av-teal",   role: "Android Developer",     category: "Tech & Dev",   skills: ["Kotlin","Firebase","APIs"],            rate: "RM 200/hr", rating: 4.7, reviews: 22, available: true,  tags: ["tech","available"] },
  { name: "Vinod Krishnan",   initials: "VK", av: "av-blue",   role: "Structural Engineer",   category: "Construction", skills: ["AutoCAD","Steel","Concrete"],          rate: "RM 165/hr", rating: 4.8, reviews: 36, available: false, tags: ["construction"] },
  { name: "Hafizuddin Omar",  initials: "HO", av: "av-amber",  role: "Network Engineer",      category: "Tech & Dev",   skills: ["Cisco","Networking","Security"],       rate: "RM 185/hr", rating: 4.5, reviews: 44, available: true,  tags: ["tech","available"] },
  { name: "Priya Subramaniam",initials: "PS", av: "av-pink",   role: "Graphic Designer",      category: "Design",       skills: ["Illustrator","Branding","Print"],      rate: "RM 140/hr", rating: 4.6, reviews: 33, available: true,  tags: ["design","available"] },
  { name: "Azrul Hakim",      initials: "AH", av: "av-purple", role: "Renovation Contractor", category: "Construction", skills: ["Tiling","Painting","Carpentry"],       rate: "RM 95/hr",  rating: 4.4, reviews: 91, available: true,  tags: ["construction","available"] },
  { name: "Chen Wei Liang",   initials: "CW", av: "av-coral",  role: "Data Engineer",         category: "Tech & Dev",   skills: ["Python","SQL","Airflow"],             rate: "RM 210/hr", rating: 4.8, reviews: 17, available: false, tags: ["tech","top rated"] },
];

let activeTag = '';

function stars(r) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += `<span class="${i <= Math.round(r) ? 'star-filled' : ''}">★</span>`;
  }
  return s;
}

function renderCard(c) {
  const slug = c.name.toLowerCase().replace(/\s+/g, '-');
  return `
    <a href="profile.html?id=${slug}" class="card">
      <div class="card-top">
        <div class="avatar ${c.av}">${c.initials}</div>
        <div>
          <div class="name">${c.name}</div>
          <div class="role">${c.role}</div>
        </div>
      </div>
      <div class="stars">${stars(c.rating)} <span style="color:#aaa;font-size:11px;">${c.rating.toFixed(1)} (${c.reviews})</span></div>
      <div class="skills">${c.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
      <div class="card-footer">
        <span class="rate">${c.rate}</span>
        <span class="${c.available ? 'avail' : 'avail-busy'}">${c.available ? '● Available' : '○ Busy'}</span>
      </div>
    </a>`;
}

function filterCards() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const cat   = document.getElementById('categoryFilter').value.toLowerCase();

  const filtered = contractors.filter(c => {
    const matchQ   = !query || c.name.toLowerCase().includes(query) || c.role.toLowerCase().includes(query) || c.skills.some(s => s.toLowerCase().includes(query));
    const matchCat = !cat   || c.category.toLowerCase().includes(cat);
    const matchTag = !activeTag
      || c.tags.includes(activeTag)
      || (activeTag === 'available'  && c.available)
      || (activeTag === 'top rated'  && c.rating >= 4.8);
    return matchQ && matchCat && matchTag;
  });

  const grid    = document.getElementById('grid');
  const noRes   = document.getElementById('noResults');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
  } else {
    noRes.style.display = 'none';
    grid.innerHTML = filtered.map(renderCard).join('');
  }
}

function setTag(el, tag) {
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  activeTag = tag;
  filterCards();
}

filterCards();
