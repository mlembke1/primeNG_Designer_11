import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-intro',
    templateUrl: './intro.component.html',
    animations: [
        trigger('icon', [
            transition(':enter', [
                style({opacity: 0}),
                animate('.3s', style({opacity: 1}))
            ])
        ]),
        trigger('status', [
            transition(':enter', [
                style({opacity: 0}),
                animate('.3s', style({opacity: 1}))
            ])
        ])
    ]
})
export class IntroComponent {

    @Output() themeSelect: EventEmitter<any> = new EventEmitter();

    theme: string;

    timeout: number;

    chooseTheme(theme) {
        if (this.timeout) {
            return;
        }

        this.theme = theme;
        this.timeout = setTimeout(() => {
            this.themeSelect.emit(theme);
        }, 1000);
    }
}
