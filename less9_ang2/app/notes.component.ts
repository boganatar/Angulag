import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'notes',
    viewProviders: [HTTP_PROVIDERS],
    template: `<ul>
<li *ngFor="#note of notes #i=index">
{{note.text}} <button (click)="remove(i)">remove</button>
</li>
</ul>
<textarea [(ngModel)]="text"></textarea>
<button (click)="add()">Add</button>`
})


export class NotesComponent {
    notes: Note[] = [
        {text:"Note one"},
        {text:"Note two"}
    ]
    text: string
    add() {
        let note = { text: this.text }
        this.notes.push(note);
        this.text = "";
    }
    remove(idx) {
        this.notes.splice(idx,1);
    }
    constructor(private http:Http) {
        this.http.get("http://localhost:3003/notes")
            .subscribe(res=>this.notes=res.json());
    }
}