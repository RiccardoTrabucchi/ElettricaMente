document.addEventListener("DOMContentLoaded", function() {
    
    /* --- DATABASE PROGETTI --- */
    const projectsData = [
        { 
            id: 1, 
            title: "Armadio elettrico Subdued", 
            category: "Distribuzione elettrica", 
            desc: "Cablaggio del quadro elettrico generale per un negozio di abbigliamento.", 
            specs: ["Schneider Electric", "Modbus", "Sicurezza elettrica"], 
            images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"] 
        },
        { 
            id: 2, 
            title: "Capannone domotico", 
            category: "Domotica KNX", 
            desc: "Integrazione KNX per la gestione delle luci di un intero capannone.", 
            specs: ["KNX", "Ilevia", "Controllo remoto"], 
            images: ["https://images.unsplash.com/photo-1558002038-1091a1661116?w=800"] 
        },
        { 
            id: 3, 
            title: "PCB personalizzati", 
            category: "PCB", 
            desc: "Progettazione e assemblaggio schede personalizzate per cilindri pneumatici.", 
            specs: ["PCB Design", "Altium Designer"], 
            images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"] 
        },
        { 
            id: 4, 
            title: "Automazione PLC Linea 1", 
            category: "Automazione PLC", 
            desc: "Sviluppo logica di controllo per linea di produzione industriale.", 
            specs: ["Siemens TIA Portal", "HMI", "Safety"], 
            images: ["https://images.unsplash.com/photo-1537462713505-a112611454c1?w=800"] 
        }
    ];

    /* --- RENDER DINAMICO PROGETTI --- */
    let currentFilter = "all";
    let showAll = false;

    function renderProjects() {
        const container = document.getElementById('projects-container');
        if(!container) return;
        container.innerHTML = "";

        const filtered = currentFilter === "all" 
            ? projectsData 
            : projectsData.filter(p => p.category === currentFilter);

        const itemsToShow = showAll ? filtered : filtered.slice(0, 3);

        itemsToShow.forEach(prj => {
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

        // Gestione tasto Vedi Altri
        const expandContainer = document.getElementById('expand-container');
        if(filtered.length > 3 && !showAll) {
            expandContainer.style.display = "block";
        } else {
            expandContainer.style.display = "none";
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

    // Vedi Altri click
    const loadMoreBtn = document.getElementById('load-more-btn');
    if(loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            showAll = true;
            renderProjects();
        };
    }

    /* --- MODAL LOGIC --- */
    const modal = document.getElementById('project-modal');
    function openModal(id) {
        const prj = projectsData.find(p => p.id === id);
        if(prj && modal) {
            document.getElementById('modal-title').innerText = prj.title;
            document.getElementById('modal-desc').innerText = prj.desc;
            document.getElementById('modal-main-img').src = prj.images[0];
            document.getElementById('modal-specs').innerHTML = prj.specs.map(s => `<li>${s}</li>`).join('');
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    }
    document.querySelector('.close-modal').onclick = () => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    };

    /* --- TUTTE LE ALTRE ANIMAZIONI ORIGINALI (TYPEWRITER, CUBE, HMI, CANVAS) --- */
    
    // Typewriter
    const typeText = ["Automazioni", "Impianti tecnologici", "Engineering"];
    let count=0, index=0;
    (function type(){
        let el = document.getElementById('typing-placeholder');
        if(!el) return;
        let current = typeText[count];
        let letter = current.slice(0, ++index);
        el.textContent = letter;
        if(letter.length === current.length){ count = (count+1)%typeText.length; index=0; setTimeout(type, 2000); }
        else { setTimeout(type, 100); }
    })();

    // Cube Sync
    const heroCube = document.getElementById('hero-cube');
    if(heroCube) {
        let cubeIdx = 0;
        const cubeStates = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
        setInterval(() => {
            cubeIdx = (cubeIdx + 1) % cubeStates.length;
            heroCube.className = 'cube ' + cubeStates[cubeIdx];
        }, 3000);
    }

    // Burger Menu
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.mobile-menu');
    if(burger) {
        burger.onclick = () => {
            menu.classList.toggle('active');
            burger.classList.toggle('toggle');
        };
    }

    // Fade Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => observer.observe(el));

    // Inizializzazione galleria
    renderProjects();
});
