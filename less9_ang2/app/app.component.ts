import {Component} from 'angular2/core';
import {NotesComponent} from './notes.component';
@Component({
    selector: 'my-app',
    directives: [NotesComponent],
    template: `
<h1>Notes Angular 2 App</h1>
<notes></notes>`

})
export class AppComponent {
    name="Vasya";
}


