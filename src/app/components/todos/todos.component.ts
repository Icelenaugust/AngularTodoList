import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos = this.fireStore.collection('todos')
            .valueChanges({ idField: 'id' }) as Observable<Todo[]>;


  inputTodo:string = "";

  constructor(private fireStore: AngularFirestore) {
  }

  ngOnInit(): void {

    /*
    this.todos = [
      {
        content: 'Learn Angular',
        completed: false
      },
      {
        content: 'Practice HackerRank',
        completed: true
      },
      {
        content: 'Buy groceries',
        completed: false
      },
      {
        content: 'Do interview practices',
        completed: false
      }
    ]
    */
  }

  toggleDone (todo: Todo) {
    /*
    this.todos?.map((v, i) => {
      if (i == id) v.completed = !v.completed;

      return v;
    })
    */

    if (todo.completed) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }
    this.fireStore.collection('todos')
    .doc(todo.id).update(todo);
  }

  deleteTodo (todo: Todo) {
    //this.todos = this.todos?.filter((v, i) => i !== id);
    this.fireStore.collection('todos')
        .doc(todo.id).delete();
  }

  addTodo () {

    this.fireStore.collection('todos').add({
        content: this.inputTodo,
        completed: false  
    });
    this.inputTodo = "";

  }

}
