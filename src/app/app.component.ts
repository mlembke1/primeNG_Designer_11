import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../environments/environment';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('intro', [
            transition(':leave', [
                animate('.3s', style({opacity: 0}))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {

    codeEditor: boolean;

    theme: string;

    ripple: boolean;

    initialized: boolean;

    sidebarActive: boolean;

    inputStyle: string = 'outlined';

    themeStyle: HTMLElement;

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.codeEditor = environment.editor === 'code';
        this.primengConfig.ripple = true;
    }

    onMenuButtonClick() {
        this.sidebarActive = true;
    }

    inputStyleChange(value: string) {
        this.inputStyle = value;
    }

    onCompile(value: string) {
        if (!this.initialized) {
            this.initialized = true;
        }

        let styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(value));
        document.getElementsByTagName("head")[0].appendChild(styleElement);

        if (this.themeStyle) {
            this.themeStyle.remove();
        }

        this.themeStyle = styleElement;
    }

    onThemeSelect(theme: string) {
        this.theme = theme;
    }

    onRestart() {
        this.theme = null;
        this.initialized = false;
    }
}
