document.addEventListener("DOMContentLoaded", function() {

    // --- DATABASE PROGETTI AGGIUNTIVI ---
    const extraProjects = [
        { id: 4, title: "Quadro Pompe", category: "Distribuzione", desc: "Automazione pompe industriali.", img: "https://picsum.photos/id/4/800/600" },
        { id: 5, title: "Villa Domotica", category: "Domotica", desc: "Gestione KNX residenziale.", img: "https://picsum.photos/id/5/800/600" },
        { id: 6, title: "PCB Controllo", category: "PCB", desc: "Scheda elettronica personalizzata.", img: "https://picsum.photos/id/6/800/600" }
    ];

    // --- LOGICA ESPANSIONE E FILTRI ---
    const gallery = document.getElementById('main-gallery');
    const loadBtn = document.getElementById('load-more-btn');
    let expanded = false;

    function renderExtra() {
        if(expanded) return;
        extraProjects.forEach(p => {
            const card = document.createElement('div');
            card.className = "project-card fade-init visible"; // Appare subito
            card.setAttribute('data-category', p.category);
            card.setAttribute('data-id', p.id);
            card.innerHTML = `
                <div class="project-img" style="background-image:url('${p.img}'); background-size:cover;"></div>
                <div class="project-info"><h4>${p.title}</h4><span class="category">${p.category}</span></div>
            `;
            card.onclick = () => openModal(p.id);
            gallery.appendChild(card);
        });
        expanded = true;
        loadBtn.style.display = "none";
    }

    if(loadBtn) loadBtn.onclick = renderExtra;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            const filter = btn.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.project-card').forEach(card => {
                const cat = card.dataset.category;
                if(filter === "all" || cat === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        };
    });

    // --- ANIMAZIONE TYPEWRITER ORIGINALE ---
    const typeStrings = ["Impianti Elettrici", "Automazioni", "Tecnologie KNX"];
    let wordI = 0, charI = 0, isDeleting = false;
    function typeEffect() {
        const current = typeStrings[wordI];
        const el = document.getElementById('typing-placeholder');
        if(!el) return;
        el.textContent = isDeleting ? current.substring(0, charI--) : current.substring(0, charI++);
        if(!isDeleting && charI > current.length) { isDeleting = true; setTimeout(typeEffect, 2000); }
        else if(isDeleting && charI < 0) { isDeleting = false; wordI = (wordI + 1) % typeStrings.length; setTimeout(typeEffect, 500); }
        else { setTimeout(typeEffect, isDeleting ? 50 : 100); }
    }
    typeEffect();

    // --- ANIMAZIONE CUBO ORIGINALE ---
    const cube = document.getElementById('hero-cube');
    const states = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
    const bar = document.querySelector('.progress-fill');
    let sI = 0;
    setInterval(() => {
        sI = (sI + 1) % states.length;
        if(cube) cube.className = 'cube ' + states[sI];
    }, 3000);
    // Barra progresso finta
    let prog = 0; setInterval(() => { prog = (prog + 1) % 100; if(bar) bar.style.width = prog + "%"; }, 30);

    // --- SIMULAZIONE HMI ORIGINALE ---
    let level = 10;
    setInterval(() => {
        level = (level + 1) % 100;
        const liq = document.getElementById('hmi-liquid');
        if(liq) liq.style.height = level + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = level + "%";
        const cog = document.getElementById('hmi-motor-icon');
        if(cog) cog.style.animation = "spin 2s linear infinite";
        if(document.getElementById('sys-led')) document.getElementById('sys-led').classList.add('active');
    }, 500);

    // --- CANVAS ORIGINALE ---
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.1)";
            for(let i=0; i<40; i++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    // --- MENU MOBILE ---
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.mobile-menu');
    if(burger) {
        burger.onclick = () => {
            menu.classList.toggle('active');
            burger.classList.toggle('toggle');
        };
    }

    // --- MODAL ---
    function openModal(id) {
        const modal = document.getElementById('project-modal');
        document.getElementById('modal-title').innerText = "Progetto " + id;
        document.getElementById('modal-main-img').src = "https://picsum.photos/seed/"+id+"/800/600";
        modal.classList.add('show');
    }
    document.querySelectorAll('.project-card').forEach(c => c.onclick = () => openModal(c.dataset.id));
    document.querySelector('.close-modal').onclick = () => document.getElementById('project-modal').classList.remove('show');

    // --- FADE OBSERVER ---
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    });
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));
});
