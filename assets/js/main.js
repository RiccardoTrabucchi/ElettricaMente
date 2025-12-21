document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI (JSON-like) --- 
       Qui puoi aggiungere tutti i progetti che vuoi.
       Il sistema gestirà automaticamente filtri e tasto "Vedi Altri".
    */
    const PROJECTS_DATABASE = [
        { 
            id: 1, title: "Quadro Subdued", category: "Distribuzione", 
            desc: "Cablaggio power center per retail moda.", 
            specs: ["Schneider", "Monitoraggio Energia"], 
            img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800" 
        },
        { 
            id: 2, title: "Stabilimento Alimentare", category: "Domotica", 
            desc: "Integrazione KNX per luci e clima industriale.", 
            specs: ["KNX", "DALI"], 
            img: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=800" 
        },
        { 
            id: 3, title: "PCB Cilindri Pneumatici", category: "PCB", 
            desc: "Design elettronico custom per controllo elettrovalvole.", 
            specs: ["Altium", "Assemblaggio SMD"], 
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" 
        },
        { 
            id: 4, title: "Automazione PLC Linea 1", category: "Distribuzione", 
            desc: "Revamping logica di comando con Siemens S7-1200.", 
            specs: ["Siemens TIA Portal", "HMI Comfort"], 
            img: "https://images.unsplash.com/photo-1537462713505-a112611454c1?w=800" 
        },
        { 
            id: 5, title: "Domotica Residenziale", category: "Domotica", 
            desc: "Villa intelligente con gestione remota completa.", 
            specs: ["KNX", "Control4"], 
            img: "https://images.unsplash.com/photo-1560518883-ce09059ee971?w=800" 
        }
    ];

    /* --- LOGICA RENDERING PROGETTI --- */
    let currentFilter = "all";
    let showAll = false;

    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        const loadMoreBtn = document.getElementById('load-more-container');
        if(!grid) return;

        grid.innerHTML = "";

        // Filtro
        const filtered = currentFilter === "all" 
            ? PROJECTS_DATABASE 
            : PROJECTS_DATABASE.filter(p => p.category === currentFilter);

        // Limite visibilità (mostra 3 se non espanso)
        const toDisplay = showAll ? filtered : filtered.slice(0, 3);

        toDisplay.forEach(prj => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible";
            card.setAttribute('data-id', prj.id);
            // Lazy Loading integrato e Alt tag per SEO
            card.innerHTML = `
                <div class="project-img">
                    <img src="${prj.img}" alt="${prj.title} - ElettricaMente" loading="lazy">
                    <div class="overlay-scan"></div>
                </div>
                <div class="project-info">
                    <h4>${prj.title}</h4>
                    <span class="category">${prj.category}</span>
                </div>
            `;
            card.onclick = () => openModal(prj.id);
            grid.appendChild(card);
        });

        // Mostra/Nascondi tasto Carica Altri
        if (filtered.length > 3 && !showAll) {
            loadMoreBtn.style.display = "block";
        } else {
            loadMoreBtn.style.display = "none";
        }
    }

    // Filtri click
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            showAll = false;
            renderProjects();
        };
    });

    // Load More click
    const btnLoad = document.getElementById('load-more-btn');
    if(btnLoad) btnLoad.onclick = () => { showAll = true; renderProjects(); };

    /* --- MODAL LOGIC --- */
    const modal = document.getElementById('project-modal');
    function openModal(id) {
        const prj = PROJECTS_DATABASE.find(p => p.id === id);
        if(prj && modal) {
            document.getElementById('modal-title').innerText = prj.title;
            document.getElementById('modal-desc').innerText = prj.desc;
            document.getElementById('modal-main-img').src = prj.img;
            document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
            modal.style.display = "flex";
            document.body.classList.add('modal-open');
        }
    }
    document.querySelector('.close-modal').onclick = () => {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    };

    /* --- ANIMAZIONI ORIGINALI (Typewriter, Cube, HMI) --- */
    
    // Typewriter
    const typeStrings = ["Automazione PLC", "Impianti KNX", "Engineering Elettronico"];
    let wordIdx = 0, charIdx = 0, isDel = false;
    (function type() {
        const curr = typeStrings[wordIdx];
        const disp = isDel ? curr.substring(0, charIdx--) : curr.substring(0, charIdx++);
        document.getElementById('typing-placeholder').textContent = disp;
        if(!isDel && charIdx > curr.length) { isDel = true; setTimeout(type, 2000); }
        else if(isDel && charIdx < 0) { isDel = false; wordIdx = (wordIdx + 1) % typeStrings.length; setTimeout(type, 500); }
        else { setTimeout(type, isDel ? 50 : 100); }
    })();

    // Cube
    const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    let cubeI = 0;
    setInterval(() => {
        cubeI = (cubeI + 1) % cubeStates.length;
        const c = document.getElementById('hero-cube');
        if(c) c.className = 'cube ' + cubeStates[cubeI];
    }, 3000);

    // HMI Simulation
    let level = 10;
    setInterval(() => {
        level = (level + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = level + "%";
        document.getElementById('hmi-level').innerText = level + "%";
        document.getElementById('sys-led').classList.add('active');
        document.getElementById('hmi-motor-icon').style.animation = "spin 2s linear infinite";
    }, 500);

    // Burger Menu
    const burger = document.querySelector('.burger');
    if(burger) {
        burger.onclick = () => {
            document.querySelector('.mobile-menu').classList.toggle('active');
            burger.classList.toggle('toggle');
        };
    }

    /* --- CANVAS BACKGROUND --- */
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.05)";
            for(let i=0; i<30; i++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    // Initialize Projects
    renderProjects();

    // Fade Observer
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));

    // Cookie Accept
    document.getElementById('accept-cookies').onclick = () => {
        document.getElementById('cookie-banner').style.display = "none";
    };
});
