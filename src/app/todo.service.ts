import { Injectable }       from '@angular/core';
import { Http, Headers,
         RequestOptions }   from '@angular/http';

@Injectable()

export class TodoService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

    getCats() {
        return this.http.get('/todos').map(res => res.json());
    }

    addCat(todo) {
        return this.http.post("/todoItem", JSON.stringify(todo), this.options);
    }

    editCat(todo) {
        return this.http.put(`/todoItem/${todo._id}`, JSON.stringify(todo), this.options);
    }

    deleteCat(todo) {
        return this.http.delete(`/todoItem/${todo._id}`, this.options);
    }

}
