import { Component } from '@angular/core';
import { CountryService} from '../service/country.service';
import { CustomerService} from '../service/customer.service';
import { ProductService} from '../service/product.service';
import { MessageService, MenuItem, Message, ConfirmationService, PrimeIcons } from 'primeng/api';
import { Customer, Product } from '../domain/model';

interface Option {
    name: string,
    code: string
}

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    floatValue: string;

    selectedCountry: any;

    countries: any[];
        
    filteredCountries: any[];

    calendarValue: Date;

    inputNumberValue: number;

    chipsValue: string;

    sliderValue: number;

    ratingValue: number;

    switchValue: boolean;

    radioValue: string;

    checkboxValue: string;

    listboxValue: Option;

    cities: Option[];

    dropdownValue: Option;

    multiselectValue: Option[];

    multiselectOptions: Option[];

    toggleValue: boolean;

    selectButtonValue1: Option;

    selectButtonValue2: Option;

    selectButtonOptions: Option[];

    displayDialog: boolean;

    tieredMenuItems: MenuItem[];

    menuItems: MenuItem[];

    contextMenuItems: MenuItem[];

    msgs: Message[];

    customers: Customer[];

    selectedCustomers: Customer[];

    products: Product[];
    
    selectedProduct: Product;

    events: any[];

    constructor(private countryService: CountryService, private messageService: MessageService, private customerService: CustomerService, private productService: ProductService, private confirmationService: ConfirmationService) {}
    
    ngOnInit() {        
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.productService.getProductsSmall().then(products => this.products = products);
        this.customerService.getCustomersLarge().then(customers => this.customers = customers);

        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.multiselectOptions = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ];

        this.selectButtonOptions = [
            {name: 'Option 1', code: 'O1'},
            {name: 'Option 2', code: 'O2'},
            {name: 'Option 3', code: 'O3'},
        ];

        this.tieredMenuItems = [
            {
                label:'Customers',
                icon:'pi pi-fw pi-table',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-user-plus',
                        items:[
                            {
                                label:'Customer',
                                icon:'pi pi-fw pi-plus'
                            },
                            {
                                label:'Duplicate',
                                icon:'pi pi-fw pi-copy'
                            },

                        ]
                    },
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label:'Orders',
                icon:'pi pi-fw pi-shopping-cart',
                items:[
                    {
                        label:'View',
                        icon:'pi pi-fw pi-list'
                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-search'
                    },

                ]
            },
            {
                label:'Shipments',
                icon:'pi pi-fw pi-envelope',
                items:[
                    {
                        label:'Tracker',
                        icon:'pi pi-fw pi-compass'

                    },
                    {
                        label:'Map',
                        icon:'pi pi-fw pi-map-marker'

                    },
                    {
                        label:'Manage',
                        icon:'pi pi-fw pi-pencil'
                    }
                ]
            },
            {
                label:'Profile',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Settings',
                        icon:'pi pi-fw pi-cog'
                    },
                    {
                        label:'Billing',
                        icon:'pi pi-fw pi-file'
                    }
                ]
            },
            {
                separator:true
            },
            {
                label:'Quit',
                icon:'pi pi-fw pi-sign-out'
            }
        ];

        this.menuItems = [
            {
                label:'Customers',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                    },
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-user-edit'
                    }
                ]
            },
            {
                label:'Orders',
                items:[
                    {
                        label:'View',
                        icon:'pi pi-fw pi-list'
                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-search'
                    },

                ]
            }
        ];

        this.contextMenuItems = [
            {
                label: 'Save',
                icon: 'pi pi-save'
            },
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Options',
                icon: 'pi pi-cog'
            },
        ];

        this.msgs = [
            {severity:'success', summary: 'Success', detail: 'Message Content'},
            {severity:'info', summary: 'Info', detail: 'Message Content'},
            {severity:'warn', summary: 'Warning', detail: 'Message Content'},
            {severity:'error', summary: 'Error', detail: 'Message Content'}
        ];

        this.events = [
            {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
            {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
            {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
            {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
        ];
    }
    
    filterCountry(event) {
        let filtered : any[] = [];
        let query = event.query;
        for(let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        
        this.filteredCountries = filtered;
    }

    onRowSelect(event, op) {
        this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
        op.hide();
    }

    openDialog() {
        this.displayDialog = true;
    }

    closeDialog() {
        this.displayDialog = false;
    }

    showToast(severity) {
        this.messageService.add({severity: severity, summary: 'Message Summary', detail:'Message Detail', life: 3000});
    }

    showConfirmPopup(event: Event) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            },
            reject: () => {
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            },
            key: 'popup'
        });
    }

    showConfirmDialog() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            },
            reject: () => {
                this.messageService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
            },
            key: 'dialog'
        });
    }
}
