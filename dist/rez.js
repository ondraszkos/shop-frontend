class TestForm {
    get isFormValid() {
        return this.form.checkValidity();
    }

    constructor() {
        this.sendMeButton = document.querySelector('#send-me');
        this.sendMeButton.addEventListener('click', this.formSubmit.bind(this));
        this.url = 'http://localhost:3000/db/mojsklep';
        this.table = document.querySelector('#user-table > tbody');
    }

    inputHandler() {
        this.sendMeButton.disabled = !this.isFormValid;
    }

    async formSubmit() {
        const users = await this.getData();
        this.clearTableBody();
        users.forEach((userData) => {
            const row = this.createRow(userData);
            this.table.appendChild(row);
        });
    }

    getData() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(this.url, {headers, method: 'GET'}).then(response => response.json())
    };

    createCell(value) {
        const td = document.createElement('td');
        td.innerText = value;
        return td;
    }

    clearTableBody() {
        // Array.from(this.table.querySelectorAll('tr')).forEach(row => row.remove());
        this.table.innerHTML = '';
    }

    createRow(userData) {
        const tr = document.createElement('tr');
        ['count', 'name', 'price'].forEach(key => {
            tr.appendChild(this.createCell(userData[key]));
        });
        return tr;
    }
}

const testForm = new TestForm();