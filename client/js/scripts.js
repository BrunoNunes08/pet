const listaClientes = document.querySelector("#listaClientes");

const getUsers = async () => {
    listaClientes.innerHTML = "";

    const res = await fetch("http://localhost:3001/clients/all");
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao listar usuários");
        console.error(results.error);
        return;
    }

    results.data.forEach((client) => {
        listaClientes.innerHTML += `
            <li>
                ${client.name} - ${client.cellphone} - ${client.cep}
                <button onclick="editClient(${client.id})">Editar</button>
                <button onclick="deleteClient(${client.id})" class="delete">Deletar</button>
            </li>`;
    })
}

if (listaClientes) {
    getUsers();
}

const clienteForm = document.querySelector("#clienteForm");
clienteForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = clienteForm.elements.name.value;
    const cellphone = clienteForm.elements.cellphone.value;
    const cep = clienteForm.elements.cep.value;

    const res = await fetch("http://localhost:3001/clients/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, cellphone, cep })
    });
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao criar usuário");
        console.error(results.error);
        return;
    }

    getUsers();
})

const editClient = async (id) => {
    const name = prompt("Novo nome:");
    const cellphone = prompt("Novo telefone:");
    const cep = prompt("Novo CEP:");

    const res = await fetch("http://localhost:3001/clients/update/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, cellphone, cep })
    });
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao editar usuário");
        console.error(results.error);
        return;
    }

    getUsers();
}

const deleteClient = async (id) => {
    const res = await fetch("http://localhost:3001/clients/delete/" + id, {
        method: "DELETE"
    });
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao excluir usuário");
        console.error(results.error);
        return;
    }

    getUsers();
}

const listaAnimais = document.querySelector("#listaAnimais");

const getAnimais = async () => {
    listaAnimais.innerHTML = "";

    const res = await fetch("http://localhost:3001/pets/all");
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao listar pets");
        console.error(results.error);
        return;
    }

    results.data.forEach((pet) => {
        listaAnimais.innerHTML += `
            <li>
                ${pet.name} - ${pet.specie} - ${pet.client_name} ${pet.age ? `- ${pet.age} anos` : ""}
                <button onclick="editPet(${pet.id})">Editar</button>
                <button onclick="deletePet(${pet.id})" class="delete">Deletar</button>
            </li>`;
    })
}

if (listaAnimais) {
    getAnimais();
}

const clientSelect = document.querySelector("#client");
const fillSelect = async () => {
    const res = await fetch("http://localhost:3001/clients/all");
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao listar clientes");
        console.error(results.error);
        return;
    }

    results.data.forEach((client) => {
        clientSelect.innerHTML += `
            <option value="${client.id}">
                ${client.name} - ${client.cellphone}
            </option>
        `;
    });
}

if (clientSelect) {
    fillSelect();
}

const animalForm = document.querySelector("#animalForm");
animalForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = animalForm.elements.name.value;
    const age = animalForm.elements.age.value || null;
    const specie = animalForm.elements.specie.value;
    const client = animalForm.elements.client.value;

    const res = await fetch("http://localhost:3001/pets/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age, specie, client })
    });
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao criar pet");
        console.error(results.error);
        return;
    }

    getAnimais();
})

const editPet = async (id) => {
    const name = prompt("Novo nome:");
    const specie = prompt("Novo tipo:");
    const age = prompt("Nova idade:");

    const res = await fetch("http://localhost:3001/pets/update/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, specie, age })
    });
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao editar pet");
        console.error(results.error);
        return;
    }

    getAnimais();
}

const deletePet = async (id) => {
    const res = await fetch("http://localhost:3001/pets/delete/" + id, {
        method: "DELETE"
    });
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao excluir pets");
        console.error(results.error);
        return;
    }

    getAnimais();
}