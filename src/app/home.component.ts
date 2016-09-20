import { Component, OnInit } 		from '@angular/core';
import { Http} 						from '@angular/http';
import { FormGroup, FormControl,
		 Validators, FormBuilder } 	from '@angular/forms';

import { TodoService } 				from './todo.service';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html'
})

export class HomeComponent implements OnInit {

	private todos = [];
	private isLoading = true;

	private todo = {};
	private isEditing = false;

	private addTodoForm: FormGroup;
	private priority = new FormControl("", Validators.required);
	private topic = new FormControl("", Validators.required);
	private summary = new FormControl("", Validators.required);

	private infoMsg = { body: "", type: "info"};

	constructor(private http: Http,
				private todoService: TodoService,
				private formBuilder: FormBuilder) {	}

	ngOnInit() {
		this.getCats();

		this.addTodoForm = this.formBuilder.group({
			priority: this.priority,
			topic: this.topic,
			summary: this.summary
		});
	}

	getCats() {
		this.todoService.getCats().subscribe(
			data => this.todos = data,
			error => console.log(error),
			() => this.isLoading = false
		);
	}

	addCat() {
	    console.log("Inside ts file"+this.addTodoForm.value);
		this.todoService.addCat(this.addTodoForm.value).subscribe(
			res => {
				var newTodo = res.json();
				this.todos.push(newTodo);
				this.addTodoForm.reset();
				this.sendInfoMsg("item added successfully.", "success");
			},
			error => console.log(error)
		);
	}

	enableEditing(todo) {
		this.isEditing = true;
		this.todo = todo;
	}

	cancelEditing() {
		this.isEditing = false;
		this.todo = {};
		this.sendInfoMsg("item editing cancelled.", "warning");
		// reload the cats to reset the editing
		this.getCats();
	}

	editCat(todo) {
		this.todoService.editCat(todo).subscribe(
			res => {
				this.isEditing = false;
				this.todo = todo;
				this.sendInfoMsg("item edited successfully.", "success");
			},
			error => console.log(error)
		);
	}

	deleteCat(todo) {
		if(window.confirm("Are you sure you want to permanently delete this item?")) {
			this.todoService.deleteCat(todo).subscribe(
				res => {
					var pos = this.todos.map(todo => { return todo._id }).indexOf(todo._id);
					this.todos.splice(pos, 1);
					this.sendInfoMsg("item deleted successfully.", "success");
				},
				error => console.log(error)
			);
		}
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}

}