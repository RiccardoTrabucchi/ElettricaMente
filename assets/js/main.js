document.addEventListener("DOMContentLoaded", function() {

    // DATABASE PROGETTI (Immagini Placeholder funzionanti)
    const projectsData = [
        { id: 1, title: "Quadro Subdued", category: "Quadri", desc: "Distribuzione elettrica retail.", img: "https://picsum.photos/seed/elec1/800/600" },
        { id: 2, title: "Villa KNX", category: "Domotica", desc: "Automazione residenziale avanzata.", img: "https://picsum.photos/seed/home1/800/600" },
        { id: 3, title: "PCB Custom", category: "Elettronica", desc: "Scheda controllo valvole.", img: "https://picsum.photos/seed/pcb1/800/600" },
        { id: 4, title: "Revamping Linea", category: "Automazione", desc: "PLC Siemens S7-1200.", img: "https://picsum.photos/seed/plc1/800/600" },
        { id: 5, title: "Quadro Pompe", category: "Quadri", desc: "Gestione idrica industriale.", img: "https://picsum.photos/seed/elec2/800/600" }
    ];

    let filter = "all";
    let expanded = false;

    function render() {
        const container = document.getElementById('projects-container');
        if(!container) return;
        container.innerHTML = "";
        const list = filter === "all" ? projectsData : projectsData.filter(p => p.category === filter);
        const toShow = expanded ? list : list.slice(0, 3);

        toShow.forEach(p => {
            const div = document.createElement('div');
            div.className = "project-card fade-init visible";
            div.innerHTML = `<img src="${p.img}"><div class="project-info"><h4>${p.title}</h4><span>${p.category}</span></div>`;
            div.onclick = () => {
                document.getElementById('modal-title').innerText = p.title;
                document.getElementById('modal-desc').innerText = p.desc;
                document.getElementById('modal-main-img').src = p.img;
                document.getElementById('project-modal').classList.add('show');
            };
            container.appendChild(div);
        });

        document.getElementById('expand-container').style.display = (list.length > 3 && !expanded) ? "block" : "none";
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter = btn.dataset.filter;
            expanded = false;
            render();
        };
    });

    document.getElementById('load-more-btn').onclick = () => { expanded = true; render(); };
    document.querySelector('.close-modal').onclick = () => document.getElementById('project-modal').classList.remove('show');

    // TYPEWRITER
    const words = ["Automazioni", "Ingegneria Elettronica", "Domotica KNX"];
    let i=0, j=0, del=false;
    function typeEffect() {
        const curr = words[i];
        document.getElementById('typing-placeholder').textContent = del ? curr.substring(0, j--) : curr.substring(0, j++);
        if(!del && j > curr.length) { del=true; setTimeout(typeEffect, 2000); }
        else if(del && j < 0) { del=false; i=(i+1)%words.length; setTimeout(typeEffect, 500); }
        else { setTimeout(typeEffect, del ? 50 : 100); }
    }

    // CUBE
    setInterval(() => {
        const cube = document.getElementById('hero-cube');
        if(cube) {
            const states = ['show-front', 'show-right', 'show-back', 'show-left', 'show-top', 'show-bottom'];
            cube.className = 'cube ' + states[Math.floor(Math.random()*states.length)];
        }
    }, 3000);

    // HMI
    let l = 10;
    setInterval(() => {
        l = (l + 1) % 100;
        if(document.getElementById('hmi-liquid')) document.getElementById('hmi-liquid').style.height = l + "%";
        if(document.getElementById('hmi-level')) document.getElementById('hmi-level').innerText = l + "%";
        document.getElementById('sys-led').classList.add('active');
    }, 500);

    // CANVAS (Sfondo)
    const canvas = document.getElementById('circuit-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
        window.onresize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
        function draw() {
            ctx.clearRect(0,0,w,h);
            ctx.fillStyle = "rgba(0, 242, 255, 0.1)";
            for(let i=0; i<30; i++) ctx.fillRect(Math.random()*w, Math.random()*h, 2, 2);
            requestAnimationFrame(draw);
        }
        draw();
    }

    typeEffect();
    render();
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }));
    document.querySelectorAll('.fade-init').forEach(el => obs.observe(el));
});
