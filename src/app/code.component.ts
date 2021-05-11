import { Component, ElementRef, AfterViewInit, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-code',
    template: `
        <pre [ngClass]="'language-' + lang"><code #code><ng-content></ng-content>
</code></pre>
    `
})
export class CodeComponent implements AfterViewInit {

    @Input() lang = 'markup';

    @ViewChild('code') codeViewChild: ElementRef;

    constructor(public el: ElementRef) { }

    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.codeViewChild.nativeElement);
        }
    }
}
