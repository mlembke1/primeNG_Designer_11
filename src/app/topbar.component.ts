import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopBarComponent {
    
    constructor(public router: Router) {}

    @Input() codeEditor: boolean;

    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    onMenuButtonClick(event: Event) {
        this.menuButtonClick.emit();
        event.preventDefault();
    }
}
