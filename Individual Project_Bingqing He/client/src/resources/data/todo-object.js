import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class Todo {

    constructor(data) {
        this.data = data;
        this.TODO_SERVICE = 'todos';
    }

    newTodo(id) {
        this = {};
        this = "";
        this = "";
        this = new Date();
        this = "Todo";
        this = id;
    }

    async saveTodo() {
        let serverResponse;
        if (this) {
            if (this._id) {
                let url = this.TODO_SERVICE + "/" + this._id;
                serverResponse = await this.data.put(this, url);
            } else {
                serverResponse = await this.data.post(this, this.TODO_SERVICE);
            }
            return serverResponse;
        }
    }

    async deleteATodo(id){
        await this.data.delete(this.TODO_SERVICE + '/' + id);
    }

    async getTodos(userid) {
        let url = this.TODO_SERVICE + '/user/' + userid;
        let response = await this.data.get(url);
        if (!response.error) {
            this.todosArray = response;
        }
        else {
            this.todosArray = [];
        }
    }

   foo(){
       console.log('asdlfjslf')
   }


    async deleteTodo(id) {
        let url = this.TODO_SERVICE + "/" + id;
        await this.data.delete(url);

    }
}