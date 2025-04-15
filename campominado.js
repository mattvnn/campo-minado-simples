const rows = 10;
        const cols = 10;
        const numminas = 20;
        let campominado = [];
        let reveladoCount = 0;
        let vitorias = 0;
        let derrotas = 0;
        
        const campominadoElement = document.getElementById('campominado');
        const vitoriasElement = document.getElementById('vitorias');
        const derrotasElement = document.getElementById('derrotas');
        
        function iniciarjogo() {
            campominado = [];
            reveladoCount = 0;
            campominadoElement.innerHTML = '';
            campominadoElement.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
        
            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < cols; j++) {
                    const campo = {
                        ismina: false,
                        revelado: false,
                        bandeiraged: false,
                        element: createcampoElement(i, j)
                    };
                    row.push(campo);
                }
                campominado.push(row);
            } 
            placeminas();
            vitoriasElement.textContent = `Vitórias: ${vitorias}`;
            derrotasElement.textContent = `Derrotas: ${derrotas}`;
        }
        
        function createcampoElement(row, col) {
            const campoElement = document.createElement('div');
            campoElement.classList.add('campo');
            campoElement.addEventListener('click', () => handleLeftClick(row, col));
            campoElement.addEventListener('contextmenu', (e) => handleRightClick(e, row, col));
            campominadoElement.appendChild(campoElement);
            return campoElement;
        }
        
        function placeminas() {
            let minasPlaced = 0;
            while (minasPlaced < numminas) {
                const row = Math.floor(Math.random() * rows);
                const col = Math.floor(Math.random() * cols);
                if (!campominado[row][col].ismina) {
                    campominado[row][col].ismina = true;
                    minasPlaced++;
                }
            }
        }
        
        function handleLeftClick(row, col) {
            const campo = campominado[row][col];
            if (campo.revelado || campo.bandeiraged) return;

            campo.revelado = true;
            campo.element.classList.add('campolivre');
        
            if (campo.ismina) {
                campo.element.classList.add('mina');
                derrotas++;
                alert('Você clicou em uma mina.');
                iniciarjogo();
            } else {
                reveladoCount++;
                const adjacenteminas = countadjacenteminas(row, col);
                if (adjacenteminas > 0) {
                    campo.element.textContent = adjacenteminas;
                }
                // para quando vencer
                if (reveladoCount === rows * cols - numminas) {
                    vitorias++;
                    alert('Você venceu!');
                    iniciarjogo();
                }
            }
        }
        
        // marcar bomba
        function handleRightClick(event, row, col) {
            event.preventDefault();
            const campo = campominado[row][col];
            if (campo.revelado) return;
        
            if (campo.bandeiraged) {
                campo.bandeiraged = false;
                campo.element.classList.remove('bandeira');
            } else {
                campo.bandeiraged = true;
                campo.element.classList.add('bandeira');
            }
        }
        
        // contar mina perto
        function countadjacenteminas(row, col) {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newRow = row + i;
                    const newCol = col + j;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        if (campominado[newRow][newCol].ismina) {
                            count++;
                        }
                    }
                }
            }
            return count;
        }

        iniciarjogo();