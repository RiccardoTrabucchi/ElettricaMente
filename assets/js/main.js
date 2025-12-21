document.addEventListener("DOMContentLoaded", function() {

    /* --- DATABASE PROGETTI --- */
    const projectsData = [
        { 
            id: 1, 
            title: "Armadio Distribuzione Subdued", 
            category: "Quadri Elettrici", 
            desc: "Cablaggio power center per retail moda. Gestione linee forza motrice e illuminazione.", 
            specs: ["Schneider Electric", "Carpenteria Segregata", "Test Collaudo"], 
            images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"] 
        },
        { 
            id: 2, 
            title: "Automazione Capannone Alimentare", 
            category: "Domotica", 
            desc: "Integrazione KNX per il controllo clima e luci DALI in stabilimento produttivo.", 
            specs: ["KNX", "DALI", "Ilevia Server"], 
            images: ["https://images.unsplash.com/photo-1558002038-1091a1661116?w=800"] 
        },
        { 
            id: 3, 
            title: "PCB Controllo Valvole", 
            category: "Elettronica", 
            desc: "Progettazione e assemblaggio di schede elettroniche custom per il pilotaggio di elettrovalvole.", 
            specs: ["Altium Designer", "SMD Assembly", "Microcontrollore AVR"], 
            images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"] 
        },
        { 
            id: 4, 
            title: "Revamping Linea Packaging", 
            category: "Automazione", 
            desc: "Aggiornamento logica di comando con PLC Siemens S7-1200 e pannello touch.", 
            specs: ["Siemens TIA Portal", "HMI Comfort", "Safety PLC"], 
            images: ["https://images.unsplash.com/photo-1537462713505-a112611454c1?w=800"] 
        },
        { 
            id: 5, 
            title: "Quadro Automazione Pompe", 
            category: "Quadri Elettrici", 
            desc: "Realizzazione quadro di comando per centrale idrica con inverter.", 
            specs: ["ABB Inverters", "Telemetria 4G", "PLC Rockwell"], 
            images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"] 
        }
    ];

    /* --- GESTIONE PROGETTI (FILTRI + ESPANSIONE) --- */
    let currentFilter = "all";
    let isExpanded = false;

    function renderProjects() {
        const container = document.getElementById('projects-container');
        const loadMoreBtn = document.getElementById('load-more-btn');
        if(!container) return;

        container.innerHTML = "";

        // Filtro i dati in base alla categoria selezionata
        const filtered = currentFilter === "all" 
            ? projectsData 
            : projectsData.filter(p => p.category === currentFilter);

        // Decido quanti mostrarne: 3 se non è espanso, altrimenti tutti
        const toShow = isExpanded ? filtered : filtered.slice(0, 3);

        toShow.forEach(prj => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible";
            card.innerHTML = `
                <img src="${prj.images[0]}" alt="${prj.title}">
                <div class="project-info">
                    <h4>${prj.title}</h4>
                    <span class="category">${prj.category}</span>
                </div>
            `;
            card.onclick = () => openModal(prj.id);
            container.appendChild(card);
        });

        // Mostro o nascondo il pulsante "Vedi Altri"
        if (filtered.length > 3 && !isExpanded) {
            document.getElementById('expand-container').style.display = "block";
        } else {
            document.getElementById('expand-container').style.display = "none";
        }
    }

    // Listener per i bottoni Filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            isExpanded = false; // Reset dell'espansione al cambio filtro
            renderProjects();
        };
    });

    // Listener per il tasto Carica Altri
    document.getElementById('load-more-btn').onclick = () => {
        isExpanded = true;
        renderProjects();
    };

    /* --- MODAL LOGIC --- */
    function openModal(id) {
        const prj = projectsData.find(p => p.id === id);
        const modal = document.getElementById('project-modal');
        if(prj && modal) {
            document.getElementById('modal-title').innerText = prj.title;
            document.getElementById('modal-desc').innerText = prj.desc;
            document.getElementById('modal-main-img').src = prj.images[0];
            document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
            modal.classList.add('show');
            document.body.style.overflow = "hidden";
        }
    }

    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('project-modal').classList.remove('show');
        document.body.style.overflow = "auto";
    };

    /* --- TYPEWRITER HERO --- */
    const typeWords = ["Automazioni Industriali", "Impianti Tecnologici", "Progettazione Elettronica"];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    function type() {
        const current = typeWords[wordIdx];
        const display = isDeleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
        document.getElementById('typing-placeholder').textContent = display;
        if (!isDeleting && charIdx > current.length) { isDeleting = true; setTimeout(type, 2000); }
        else if (isDeleting && charIdx < 0) { isDeleting = false; wordIdx = (wordIdx + 1) % typeWords.length; setTimeout(type, 500); }
        else { setTimeout(type, isDeleting ? 50 : 100); }
    }

    /* --- CUBE SYNC --- */
    const cubeData = [
        { class: 'show-front', t: "Elettronica", d: "Progettazione PCB" },
        { class: 'show-right', t: "Networking", d: "Infrastrutture IT" },
        { class: 'show-back', t: "Automazione", d: "Sviluppo PLC" }
    ];
    let cubeIdx = 0;
    setInterval(() => {
        cubeIdx = (cubeIdx + 1) % cubeData.length;
        const cube = document.getElementById('hero-cube');
        if(cube) {
            cube.className = 'cube ' + cubeData[cubeIdx].class;
            document.getElementById('cube-title').innerText = cubeData[cubeIdx].t;
            document.getElementById('cube-desc').innerText = cubeData[cubeIdx].d;
        }
    }, 3000);

    /* --- HMI SIMULATION (Basic) --- */
    let level = 10;
    setInterval(() => {
        level = (level + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        const txt = document.getElementById('hmi-level');
        const cog = document.getElementById('hmi-motor-icon');
        if(liq) liq.style.height = level + "%";
        if(txt) txt.innerText = level + "%";
        if(cog) cog.style.animation = "spin 2s linear infinite";
        document.getElementById('sys-led').classList.add('active');
    }, 500);

    /* --- INITIALIZE --- */
    type();
    renderProjects();

    // Intersection Observer per fade-in
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));
});
