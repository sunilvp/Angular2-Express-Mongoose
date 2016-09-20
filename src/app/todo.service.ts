import { Injectable }       from '@angular/core';
import { Http, Headers,
         RequestOptions }   from '@angular/http';

@Injectable()

export class CatService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getCats() {
        return this.http.get('/todos').map(res => res.json());
    }

    addCat(cat) {
        return this.http.post("/todo", JSON.stringify(todo), this.options);
    }

    editCat(cat) {
        return this.http.put(`/todo/${todo._id}`, JSON.stringify(todo), this.options);
    }

    deleteCat(cat) {
        return this.http.delete(`/todo/${todo._id}`, this.options);
    }

}
