new Vue({
    el: "#app",
    data: {
        client: {
            name: "",
            lastName: "",
            email: ""
        },
        clients: [],
        editingClient: {}
    },
    mounted() {
        this.getClients();
    },
    methods: {
        async addClient() {
            try {
                let response = await axios.post("http://localhost:8080/clients", this.client);
                this.getClients();
                this.client.name = "";
                this.client.lastName = "";
                this.client.email = "";
            } catch (error) {
                console.log(error);
            }
        },
        async getClients() {
            try {
                let response = await axios.get("http://localhost:8080/clients");
                this.clients = response.data._embedded.clients;
            } catch (error) {
                console.log(error);
            }
        },
        openEditModal(client) {
            this.editingClient = client;
        },
        saveChanges() {
            axios.put('http://localhost:8080/clients' + this.editingClient.id, this.editingClient)
            .then(response => {
                //success
                console.log("Se mando el edit")
            })
            .catch(error => {
                //handle error
            })
        }
    }
});
