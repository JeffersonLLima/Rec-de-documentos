document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("document-form");
    const documentList = document.getElementById("document-list");

    // Função para carregar documentos do localStorage
    function loadDocuments() {
        const savedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
        savedDocuments.forEach(doc => addRow(doc));
    }

    // Função para adicionar uma linha na tabela
    function addRow(doc) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${doc.awb}</td>
            <td>${doc.dataRecebimento}</td>
            <td>${doc.horaRecebimento}</td>
            <td>${doc.peso} KG</td>
            <td>${doc.origem}</td>
            <td>${doc.destino}</td>
            <td class="status">${doc.status}</td>
            <td><button class="embarcado-btn">Embarcado</button></td>
            <td><button class="remover-btn">Remover</button></td>
        `;

        const embarcadoBtn = row.querySelector(".embarcado-btn");
        embarcadoBtn.addEventListener("click", function () {
            doc.status = "Embarcado";
            row.querySelector(".status").textContent = "Embarcado";
            updateLocalStorage();
        });

        const removerBtn = row.querySelector(".remover-btn");
        removerBtn.addEventListener("click", function () {
            row.remove();
            updateLocalStorage();
        });

        documentList.appendChild(row);
    }

    // Função para atualizar o localStorage com os dados mais recentes
    function updateLocalStorage() {
        const updatedDocuments = [];
        documentList.querySelectorAll("tr").forEach(row => {
            const cells = row.querySelectorAll("td");
            if (cells.length > 0) {
                updatedDocuments.push({
                    awb: cells[0].textContent,
                    dataRecebimento: cells[1].textContent,
                    horaRecebimento: cells[2].textContent,
                    peso: cells[3].textContent.replace(" KG", ""),
                    origem: cells[4].textContent,
                    destino: cells[5].textContent,
                    status: cells[6].textContent
                });
            }
        });
        localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    }

    // Event listener para o envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const awb = document.getElementById("document-name").value;
        const dataRecebimento = document.getElementById("dataRecebimento").value; // Corrigido o id aqui
        const horaRecebimento = document.getElementById("horaRecebimento").value; // Corrigido o id aqui
        const peso = document.getElementById("pesoDocumento").value; // Corrigido o id aqui
        const origem = document.getElementById("origemDocumento").value; // Corrigido o id aqui
        const destino = document.getElementById("destinoDocumento").value; // Corrigido o id aqui
        const status = document.getElementById("statusDocumento").value; // Corrigido o id aqui

        // Verificação se todos os campos foram preenchidos
        if (!awb || !dataRecebimento || !horaRecebimento || !peso || !origem || !destino || !status) {
            alert("Preencha todos os campos!");
            return;
        }

        const documentData = { awb, dataRecebimento, horaRecebimento, peso, origem, destino, status };
        addRow(documentData);

        let savedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
        savedDocuments.push(documentData);
        localStorage.setItem("documents", JSON.stringify(savedDocuments));

        form.reset();
    });

    // Carregar documentos ao inicializar a página
    loadDocuments();
});
