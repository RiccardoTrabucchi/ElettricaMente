document.addEventListener('DOMContentLoaded', () => {
    const contenitoreProgetti = document.getElementById('progetti-grid');
    if (!contenitoreProgetti) return; // Si ferma se non è la pagina dei progetti

    // Elementi per la visualizzazione a tutto schermo delle foto
    const finestraFoto = document.getElementById('modal-galleria');
    const fotoCorrente = document.getElementById('img-corrente');
    const titoloModal = document.getElementById('modal-titolo');
    const descrizioneModal = document.getElementById('modal-descrizione');
    const tastoChiudi = document.querySelector('.close-modal');
    const tastoPrecedente = document.querySelector('.prev-btn');
    const tastoSuccessivo = document.querySelector('.next-btn');

    let galleriaAttuale = [];
    let indiceFoto = 0;

    // Caricamento dei lavori dal file di testo
    fetch('data/lavori.json')
        .then(risposta => {
            if (!risposta.ok) throw new Error("Errore di rete.");
            return risposta.json();
        })
        .then(listaLavori => {
            listaLavori.forEach(lavoro => {
                const riquadro = document.createElement('div');
                riquadro.className = 'progetto-card';
                // Assegna la categoria per permettere il filtraggio
                riquadro.setAttribute('data-category', lavoro.categoria); 
                riquadro.innerHTML = `
                    <div class="progetto-img">
                        <img src="${lavoro.copertina}" alt="${lavoro.titolo}">
                        <div class="progetto-overlay">
                            <i class="fa-solid fa-magnifying-glass-plus"></i>
                        </div>
                    </div>
                    <div class="progetto-info">
                        <span class="badge">${lavoro.categoria}</span>
                        <h3>${lavoro.titolo}</h3>
                    </div>
                `;

                riquadro.addEventListener('click', () => avviaVisualizzazione(lavoro));
                contenitoreProgetti.appendChild(riquadro);
            });

            attivaFiltriCategoria();
        })
        .catch(errore => {
            console.error("Errore Caricamento:", errore);
            contenitoreProgetti.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; border: 1px solid red; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #ff4444; margin-bottom: 10px;">Attenzione</h3>
                    <p style="color: white;">Non riesco a caricare l'archivio lavori. Assicurati che i file siano caricati su uno spazio web (es. GitHub Pages).</p>
                </div>`;
        });

    // Gestione dei bottoni per filtrare i lavori
    function attivaFiltriCategoria() {
        const bottoniFiltro = document.querySelectorAll('.filter-btn');
        const schedeProgetti = document.querySelectorAll('.progetto-card');

        bottoniFiltro.forEach(bottone => {
            bottone.addEventListener('click', () => {
                bottoniFiltro.forEach(b => b.classList.remove('active'));
                bottone.classList.add('active');

                const categoriaScelta = bottone.getAttribute('data-filter');

                schedeProgetti.forEach(scheda => {
                    const categoriaScheda = scheda.getAttribute('data-category');
                    if (categoriaScelta === 'all' || categoriaScheda === categoriaScelta) {
                        scheda.style.display = 'block';
                    } else {
                        scheda.style.display = 'none';
                    }
                });
            });
        });
    }

    // Navigazione tra le immagini
    function avviaVisualizzazione(lavoro) {
        galleriaAttuale = lavoro.galleria;
        indiceFoto = 0;
        titoloModal.innerText = lavoro.titolo;
        descrizioneModal.innerText = lavoro.descrizione;
        mostraImmagine();
        finestraFoto.style.display = 'flex';
    }

    function mostraImmagine() {
        fotoCorrente.src = galleriaAttuale[indiceFoto];
        tastoPrecedente.style.display = galleriaAttuale.length > 1 ? 'block' : 'none';
        tastoSuccessivo.style.display = galleriaAttuale.length > 1 ? 'block' : 'none';
    }

    tastoChiudi.addEventListener('click', () => finestraFoto.style.display = 'none');
    
    tastoPrecedente.addEventListener('click', () => {
        indiceFoto = (indiceFoto > 0) ? indiceFoto - 1 : galleriaAttuale.length - 1;
        mostraImmagine();
    });

    tastoSuccessivo.addEventListener('click', () => {
        indiceFoto = (indiceFoto < galleriaAttuale.length - 1) ? indiceFoto + 1 : 0;
        mostraImmagine();
    });

    finestraFoto.addEventListener('click', (evento) => {
        if (evento.target === finestraFoto) finestraFoto.style.display = 'none';
    });
});
