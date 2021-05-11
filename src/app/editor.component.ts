import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditorService} from './service/editor.service';
import { MessageService } from 'primeng/api';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html'
})
export class EditorComponent {
    
    @Input() theme: string;
    
    @Input() active: boolean;

    @Input() inputStyle: string;

    @Input() ripple: boolean;

    @Output() inputStyleChange: EventEmitter<any> = new EventEmitter();

    @Output() rippleChange: EventEmitter<any> = new EventEmitter();

    @Output() compiled: EventEmitter<string> = new EventEmitter();

    @Output() restart: EventEmitter<any> = new EventEmitter();

    constructor(private editorService: EditorService, private http: HttpClient, private messageService: MessageService) {}

    restartDialog: boolean;

    downloadDialog: boolean;

    scale: number = 14;
    
    scales: number[] = [12,13,14,15,16];

    categories: any[];

    variables: any = {};

    downloadLink: HTMLAnchorElement;

    ngOnInit() {
        this.editorService.getEditor(this.theme).then(data => {
            this.categories = data;
            this.initVariables();
            this.compile();
        });
    }

    initVariables() {
        if (this.categories) {
            for (let category of this.categories) {
                for (let option of category.options) {
                    this.variables[option.name] = option.value;
                }
            }
        }
    }

    compile() {
        this.http.post<any>(environment.theme_builder_url + '?theme=' + this.theme, this.variables, {responseType: 'text' as 'json'}).subscribe((response) => {
            this.compiled.emit(response);
        },
        error => {
            this.messageService.add({severity: 'Error', summary: 'Something went wrong'});
        });
    }

    downloadTheme() {
        this.http.post<any>(environment.theme_builder_url + '?theme=' + this.theme, this.variables, {responseType: 'text' as 'json'}).subscribe((response) => {
            const url = window.URL.createObjectURL(new Blob([response], {type: "text/css; charset=utf-8"}));
            if (this.downloadLink) {
                document.body.removeChild(this.downloadLink);
           }

           this.downloadLink = document.createElement('a');
           this.downloadLink.href = url;
           this.downloadLink.setAttribute('download', 'theme.css');
           document.body.appendChild(this.downloadLink);
           this.downloadLink.click();
        },
        error => {
            this.messageService.add({severity: 'Error', summary: 'Something went wrong'});
        });
    }

    decrementScale() {
        this.scale--;
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    incrementScale() {
        this.scale++;
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    onInputStyleChange(value: string) {
        this.inputStyleChange.emit(value);
    }

    onRippleChange(event) {
        this.rippleChange.emit(event.checked);
    }

    showRestartDialog(event: Event) {
        this.restartDialog = true;
        event.preventDefault();
    }

    restartEditor() {
        this.restartDialog = false;
        this.restart.emit();
    }

    download(event: Event) {
        if (environment.production)
            this.downloadDialog = true;
        else
            this.downloadTheme();

        event.preventDefault();
    }

    navigateToStore() {
        window.location.href = 'https://www.primefaces.org/store';
    }
    
    navigateToDesigner() {
        window.location.href = 'https://www.primefaces.org/designer/primeng';
    }
}
