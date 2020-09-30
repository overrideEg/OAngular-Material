import { TranslateService } from '@ngx-translate/core';
import { FieldType } from '@override/utils/interfaces/FieldType.enum';
import { Validators } from '@angular/forms';
import { EntityData } from '@override/utils/interfaces/entityData';
import { UtilsService } from '@override/utils/utils.service';
import { DatePipe } from '@angular/common';
import { UserType } from './user-type.enum';

export class AllEntities {
    constructor(
        private _translateService: TranslateService,
        private utils: UtilsService,
        private datePipe: DatePipe

    ) { }
    public entities: EntityData[] = [
        {
            name: {
                single: 'User',
                plural: 'Users',
            },
            apiSelector: 'User',
            route: '/generic/User',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name',
                        headerName: this._translateService.instant('name'),
                    },
                    {
                        field: 'email',
                        headerName: this._translateService.instant('email'),
                    },
                    // {
                    //     field: 'password',
                    //     headerName: this._translateService.instant('password'),
                    // },
                    {
                        field: 'mobile',
                        headerName: this._translateService.instant('mobile'),
                    },
                    {
                        field: 'userType',
                        headerName: this._translateService.instant('userType'),
                    },
                    {
                        field: 'isActive',
                        headerName: this._translateService.instant('isActive'),
                    },
                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.text,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.email,
                        name: 'email',
                        label: this._translateService.instant('email'),
                        required: true,
                        validators: [Validators.required, Validators.email],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.password,
                        name: 'password',
                        label: this._translateService.instant('password'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'phoneNumber',
                        label: this._translateService.instant('phoneNumber'),
                        required: true,
                        validators: [Validators.required, Validators.pattern(this.utils.phoneNumberRegExp)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.dropdown,
                        name: 'userType',
                        label: this._translateService.instant('userType'),
                        multiple: false,
                        required: false,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2,
                        options: [
                            {
                                value: 'user',
                                label: this._translateService.instant('user')
                            },
                            {
                                value: 'admin',
                                label: this._translateService.instant('admin')
                            },
                            {
                                value: 'company',
                                label: this._translateService.instant('company')
                            }
                        ]
                    },
                    {
                        type: FieldType.checkbox,
                        name: 'isActive',
                        label: this._translateService.instant('isActive'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 2,
                        rows: 2,
                    }
                ],
                cols: 12,
                localizedAllFields: true
            },
            permissions: {
                add: [UserType.admin],
                edit: [UserType.company],
                view: [UserType.admin]
            }
        },
        {
            name: {
                single: 'Category',
                plural: 'Categorys',
            },
            apiSelector: 'Category',
            route: '/generic/Category',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('name'),
                        // cellRenderer: (param) => {
                        //     console.log(param);

                        //     return this._translateService.instant(param.value[this.utils.currentLang]);
                        // }
                    },


                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },


                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'Hotel',
                plural: 'Hotels',
            },
            apiSelector: 'Hotel',
            route: '/generic/Hotel',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('name'),

                    },
                    {
                        field: 'city.name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('city'),
                        cellRenderer: (param) => {
                            console.log(param);

                            return param.value
                        }

                    },
                    {
                        field: 'phoneNumber',
                        headerName: this._translateService.instant('phoneNumber'),
                    },
                    {
                        field: 'rating',
                        headerName: this._translateService.instant('rating'),
                    },

                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },
                    {
                        type: FieldType.entity,
                        name: 'city',
                        label: this._translateService.instant('city'),
                        required: true,

                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 2,
                        selectOptions: {
                            optionName: 'name',
                            fromSelector: 'City',
                            columns: [
                                { field: 'id', checkboxSelection: true },
                                { field: 'name.' + this.utils.currentLang }
                            ]

                            // exludeView: ['password', 'isActive', 'tempCode']
                        },

                    },
                    {
                        type: FieldType.text,
                        name: 'phoneNumber',
                        label: this._translateService.instant('phoneNumber'),
                        required: true,
                        validators: [Validators.required, Validators.pattern(this.utils.phoneNumberRegExp)],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 3
                    },
                    {
                        type: FieldType.number,
                        name: 'rating',
                        label: this._translateService.instant('rating'),
                        required: true,
                        validators: [Validators.required, Validators.min(0)],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 3
                    },

                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'Company',
                plural: 'Companies',
            },
            apiSelector: 'Company',
            route: '/generic/Company',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('name'),
                        // cellRenderer: (param) => {
                        //     // console.log('param', param)
                        //     return this._translateService.instant(param.value[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'status',
                        headerName: this._translateService.instant('status'),
                        // cellRenderer: (params) => {
                        //     console.log(params);

                        //     return this._translateService.instant(params.value);
                        // }
                    },
                    {
                        field: 'website',
                        headerName: this._translateService.instant('website'),
                    },
                    {
                        field: 'phoneNumber',
                        headerName: this._translateService.instant('phoneNumber'),
                    },
                ]

            },
            form: {
                fields: [

                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('Company Name'),
                        required: true,
                        // validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        multiline: false,
                        cols: 12,
                        rows: 3
                    },
                    {
                        type: FieldType.dropdown,
                        name: 'status',
                        label: this._translateService.instant('status'),
                        multiple: false,
                        required: false,
                        // validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 2,
                        options: [
                            {
                                value: 'pending',
                                label: this._translateService.instant('Pending')
                            },
                            {
                                value: 'approved',
                                label: this._translateService.instant('Approved')
                            },
                            {
                                value: 'suspended',
                                label: this._translateService.instant('Suspended')
                            }
                        ]
                    },
                    {
                        type: FieldType.url,
                        name: 'website',
                        label: this._translateService.instant('website'),
                        required: true,
                        validators: [Validators.required, Validators.pattern(this.utils.websiteRegExp)],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'phoneNumber',
                        label: this._translateService.instant('phoneNumber'),
                        required: true,
                        validators: [Validators.required, Validators.pattern(this.utils.phoneNumberRegExp)],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 2
                    },

                    {
                        type: FieldType.file,
                        name: 'images',
                        label: this._translateService.instant('images'),
                        required: true,
                        // validators: [Validators.required],
                        view: 'image',
                        multiple: true,
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 2
                    },
                    // {
                    //     type : FieldType.group,
                    //     name: 'testGroup',
                    //     label: 'group',
                    //     required: false,
                    //     disabled: false,
                    //     readonly: false,
                    //     cols : 12,
                    //     rows: 10,
                    //     children: [
                    //         {
                    //             type: FieldType.entity,
                    //             name: 'user',
                    //             label: this._translateService.instant('user'),
                    //             required: true,

                    //             // validators: [Validators.required],
                    //             disabled: false,
                    //             readonly: false,
                    //             cols: 12,
                    //             rows: 2,
                    //             selectOptions: {
                    //                 optionName: 'name',

                    //                 fromSelector: 'User',
                    //                 exludeView: ['password', 'isActive', 'tempCode']
                    //             },


                    //         },
                    //         {
                    //             type: FieldType.url,
                    //             name: 'website',
                    //             label: this._translateService.instant('website'),
                    //             required: true,
                    //             // validators: [Validators.required],
                    //             disabled: false,
                    //             readonly: false,
                    //             cols: 4,
                    //             rows: 2
                    //         }
                    //     ]
                    // }
                    // {
                    //     type: FieldType.entity,
                    //     name: 'user',
                    //     label: this._translateService.instant('user'),
                    //     required: true,

                    //     // validators: [Validators.required],
                    //     disabled: false,
                    //     readonly: false,
                    //     cols: 12,
                    //     rows: 2,
                    //     selectOptions: {
                    //         optionName: 'name',

                    //         fromSelector: 'User',
                    //         exludeView: ['password', 'isActive', 'tempCode']
                    //     },

                    // },
                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'Country',
                plural: 'Countries',
            },
            apiSelector: 'Country',
            route: '/generic/Country',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: false,
            export: false,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name',
                        headerName: this._translateService.instant('name'),
                        cellRenderer: (param) => {

                            return param.data.name[this.utils.currentLang];
                        }

                    },


                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },

                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'City',
                plural: 'Cities',
            },
            apiSelector: 'City',
            route: '/generic/City',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('name'),

                    },
                    {
                        field: 'country.name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('Country Name'),

                    }

                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },
                    {
                        type: FieldType.entity,
                        name: 'country',
                        label: this._translateService.instant('country'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 6,
                        rows: 2,
                        selectOptions: {
                            optionName: 'name',
                            fromSelector: 'Country',
                            columns: [
                                { headerName: 'Id', field: 'id', checkboxSelection: true },
                                { headerName: 'Name', field: 'name.' + this.utils.currentLang },
                            ]
                            // exludeView: ['password', 'isActive', 'tempCode']
                        },

                    },

                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'Meal',
                plural: 'Meals',
            },
            apiSelector: 'Meal',
            route: '/generic/Meal',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('name'),
                        // cellRenderer: (param) => {
                        //     console.log(param);

                        //     return this._translateService.instant(param.data.name[this.utils.currentLang]);
                        // }
                    },


                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },

                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'Trip',
                plural: 'Trips',
            },
            apiSelector: 'Trip',
            route: '/generic/Trip',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('name'),
                        // cellRenderer: (param) => {
                        //     console.log(param);

                        //     return this._translateService.instant(param.data.name[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'description.' + this.utils.currentLang,
                        headerName: this._translateService.instant('description'),
                        // cellRenderer: (param) => {

                        //     return this._translateService.instant(param.data.description[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'terms.' + this.utils.currentLang,
                        headerName: this._translateService.instant('terms'),
                        // cellRenderer: (param) => {

                        //     return this._translateService.instant(param.data.terms[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'fromCity.name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('fromCity'),
                        // cellRenderer: (param) => {
                        //     console.log(param);

                        //     return this._translateService.instant(param.value.name[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'toCity.name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('toCity'),
                        // cellRenderer: (param) => {
                        //     // console.log('param', param)
                        //     return this._translateService.instant(param.value.name[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'company.name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('company'),
                        // cellRenderer: (param) => {
                        //     console.log('param', param)
                        //     return this._translateService.instant(param.value.name[this.utils.currentLang]);
                        // }
                    },
                    {
                        field: 'category.name.' + this.utils.currentLang,
                        headerName: this._translateService.instant('category'),
                        // cellRenderer: (param) => {
                        //     console.log('param', param)
                        //     return this._translateService.instant(param.value.name[this.utils.currentLang]);
                        // }
                    },


                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },

                    {
                        type: FieldType.textLocalized,
                        name: 'description',
                        label: this._translateService.instant('description'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        multiline: true,
                        readonly: false,
                        cols: 12,
                        rows: 3
                    },
                    {
                        type: FieldType.textLocalized,
                        name: 'terms',
                        label: this._translateService.instant('terms'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 3,
                        multiline: true,
                    },
                    {
                        type: FieldType.file,
                        name: 'images',
                        label: this._translateService.instant('images'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        multiple: true,
                        cols: 12,
                        rows: 2
                    },
                    {
                        type: FieldType.entity,
                        name: 'fromCity',
                        label: this._translateService.instant('fromCity'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2,
                        selectOptions: {
                            optionName: 'name',
                            fromSelector: 'City',
                            columns: [
                                { field: 'id', headerName: this._translateService.instant('Id'), checkboxSelection: true },
                                { field: 'name.' + this.utils.currentLang, headerName: this._translateService.instant('Name'), checkboxSelection: false },
                            ]
                            // exludeView: ['password', 'isActive', 'tempCode']
                        },

                    },
                    {
                        type: FieldType.autoComplete,
                        name: 'toCity',
                        label: this._translateService.instant('toCity'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2,
                        selectOptions: {
                            fromSelector: 'City',
                            options: ['name',this.utils.currentLang]
                        },

                    },

                    {
                        type: FieldType.entity,
                        name: 'category',
                        label: this._translateService.instant('category'),
                        required: true,
                        validators: [Validators.required, this.utils.validateEntityId.bind(this)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2,
                        selectOptions: {
                            optionName: 'name',
                            fromSelector: 'Category',
                            columns: [
                                { field: 'id', headerName: this._translateService.instant('Id'), checkboxSelection: true },
                                { field: 'name.' + this.utils.currentLang, headerName: this._translateService.instant('Name'), checkboxSelection: false },
                            ]
                            // exludeView: ['password', 'isActive', 'tempCode']
                        },

                    },
                    {
                        type: FieldType.entity,
                        name: 'company',
                        label: this._translateService.instant('company'),
                        required: true,
                        validators: [Validators.required, this.utils.validateEntityId.bind(this)],
                        disabled: false,
                        readonly: false,
                        displayIf: () => {
                            let userTypeStored = atob(sessionStorage.getItem(btoa('userType')))
                            return userTypeStored === 'admin'
                        },
                        cols: 12,
                        rows: 2,
                        selectOptions: {
                            optionName: 'name',
                            fromSelector: 'Company',
                            columns: [
                                { field: 'id', headerName: this._translateService.instant('Id'), checkboxSelection: true },
                                { field: 'name.' + this.utils.currentLang, headerName: this._translateService.instant('Name'), checkboxSelection: false },
                            ]
                            // exludeView: ['password', 'isActive', 'tempCode']
                        },

                    },
                    {
                        type: FieldType.array,
                        name: 'schedule',
                        label: this._translateService.instant('schedule'),
                        required: true,
                        validators: [Validators.required],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 10,
                        children: [

                            {
                                type: FieldType.date,
                                name: 'startDate',
                                label: this._translateService.instant('startDate'),
                                required: true,
                                validators: [Validators.required],
                                disabled: false,
                                readonly: false,
                                cols: 4,
                                rows: 2
                            },

                            {
                                type: FieldType.entity,
                                name: 'meal',
                                label: this._translateService.instant('meal'),
                                required: true,
                                validators: [Validators.required],
                                disabled: false,
                                readonly: false,
                                cols: 4,
                                rows: 2,
                                selectOptions: {
                                    optionName: 'name',
                                    fromSelector: 'Meal',
                                    columns: [
                                        { field: 'id', headerName: this._translateService.instant('Id'), checkboxSelection: true },
                                        { field: 'name.' + this.utils.currentLang, headerName: this._translateService.instant('Name'), checkboxSelection: false },
                                    ]
                                },
                            },
                            {
                                type: FieldType.entity,
                                name: 'hotel',
                                label: this._translateService.instant('hotel'),
                                required: true,
                                validators: [Validators.required],
                                disabled: false,
                                readonly: false,
                                cols: 4,
                                rows: 2,
                                selectOptions: {
                                    optionName: 'name',
                                    fromSelector: 'Hotel',
                                    columns: [
                                        { field: 'id', headerName: this._translateService.instant('Id'), checkboxSelection: true },
                                        { field: 'name.' + this.utils.currentLang, headerName: this._translateService.instant('Name'), checkboxSelection: false },
                                    ]
                                },
                            },

                            {
                                type: FieldType.number,
                                name: 'noOfNights',
                                label: this._translateService.instant('noOfNights'),
                                required: true,
                                validators: [Validators.required, Validators.min(0)],
                                disabled: false,
                                readonly: false,
                                cols: 4,
                                rows: 2
                            },
                            {
                                type: FieldType.number,
                                name: 'pricePerPerson',
                                label: this._translateService.instant('pricePerPerson'),
                                required: true,
                                validators: [Validators.required, Validators.min(0)],
                                disabled: false,
                                readonly: false,
                                cols: 4,
                                rows: 2
                            },
                            {
                                type: FieldType.number,
                                name: 'noOfChairs',
                                label: this._translateService.instant('noOfChairs'),
                                required: true,
                                validators: [Validators.required, Validators.min(0)],
                                disabled: false,
                                readonly: false,
                                cols: 4,
                                rows: 2
                            },
                            {
                                type: FieldType.entity,
                                name: 'roomType',
                                label: this._translateService.instant('roomType'),
                                required: true,
                                validators: [Validators.required],
                                disabled: false,
                                readonly: false,
                                cols: 12,
                                rows: 2,
                                selectOptions: {
                                    optionName: 'name',
                                    fromSelector: 'RoomType',
                                    columns: [
                                        { field: 'id', headerName: this._translateService.instant('Id'), checkboxSelection: true },
                                        { field: 'name.' + this.utils.currentLang, headerName: this._translateService.instant('Name'), checkboxSelection: false },
                                    ]
                                },
                            },
                            {
                                type: FieldType.textLocalized,
                                name: 'program',
                                label: this._translateService.instant('program'),
                                required: true,
                                validators: [Validators.required, Validators.minLength(3)],
                                disabled: false,
                                readonly: false,
                                multiline: true,
                                cols: 12,
                                rows: 4
                            },
                        ]
                    },
                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'ReservationTrip',
                plural: 'ReservationTrips',
            },
            apiSelector: 'ReservationTrip',
            route: '/generic/ReservationTrip',
            add: false,
            edit: false,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'user',
                        headerName: this._translateService.instant('name'),
                        cellRenderer: (param) => {

                            return this._translateService.instant(param.value.name);
                        }
                    },
                    {
                        field: 'user',
                        headerName: this._translateService.instant('email'),
                        cellRenderer: (param) => {

                            return this._translateService.instant(param.value.email);
                        }
                    },
                    {
                        field: 'valueDate',
                        headerName: this._translateService.instant('valueDate'),
                        cellRenderer: (param) => {
                            let date = this.datePipe.transform(param.value, 'yyyy-MM-dd')

                            return this._translateService.instant(date);
                        }
                    },

                    {
                        field: 'numberOfPerson',
                        headerName: this._translateService.instant('Number Of Person'),

                    },
                    {
                        field: 'tripSchedule',
                        headerName: this._translateService.instant('Trip Schedule Date'),
                        cellRenderer: (param) => {
                            let date = this.datePipe.transform(param.value.startDate, 'yyyy-MM-dd')
                            return this._translateService.instant(date);
                        }
                    },
                    {
                        field: 'tripSchedule',
                        headerName: this._translateService.instant('Trip Schedule hotel'),
                        cellRenderer: (param) => {
                            return this._translateService.instant(param.value.hotel.name[this.utils.currentLang]);
                        }
                    },
                    {
                        field: 'tripSchedule.noOfNights',
                        headerName: this._translateService.instant('No Of Nights'),
                        // cellRenderer: (param) => {
                        //     return this._translateService.instant(param.value);
                        // }
                    },
                    {
                        field: 'tripSchedule.pricePerPerson',
                        headerName: this._translateService.instant('Price Per Person'),
                        // cellRenderer: (param) => {
                        //     console.log('param',param)

                        //     return this._translateService.instant(param.value);
                        // }
                    },


                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.text,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'email',
                        label: this._translateService.instant('email'),
                        required: true,
                        validators: [Validators.required, Validators.email],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'mobile',
                        label: this._translateService.instant('mobile'),
                        required: true,
                        validators: [Validators.required, Validators.pattern(this.utils.phoneNumberRegExp)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'message',
                        label: this._translateService.instant('message'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        multiline: true,
                        cols: 12,
                        rows: 3
                    },

                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'RoomType',
                plural: 'RoomTypes',
            },
            apiSelector: 'RoomType',
            route: '/generic/RoomType',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'roomType.' + this.utils.currentLang,
                        headerName: this._translateService.instant('RoomType'),
                        // cellRenderer: (param) => {
                        //     console.log(param);

                        //     return this._translateService.instant(param.value[this.utils.currentLang]);
                        // }
                    },



                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.textLocalized,
                        name: 'roomType',
                        label: this._translateService.instant('RoomType'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 12,
                        rows: 2
                    },



                ],
                cols: 12,
                localizedAllFields: true
            }
        },
        {
            name: {
                single: 'ContactUs',
                plural: 'ContactsUs',
            },
            apiSelector: 'ContactUs',
            route: '/generic/ContactUs',
            add: true,
            edit: true,
            delete: true,
            view: false,
            upload: true,
            export: true,
            table: {
                paginated: true,
                paginationPageSize: 15,
                pivotMode: false,
                columnDefs: [
                    {
                        checkboxSelection: true,
                        headerCheckboxSelection: true,
                        field: 'id',
                        headerName: this._translateService.instant('ID'),
                    },
                    {
                        field: 'name',
                        headerName: this._translateService.instant('name'),
                        cellRenderer: (param) => {

                            return this._translateService.instant(param.data.name);
                        }
                    },
                    {
                        field: 'email',
                        headerName: this._translateService.instant('email'),
                        cellRenderer: (param) => {

                            return this._translateService.instant(param.data.email);
                        }
                    },
                    {
                        field: 'mobile',
                        headerName: this._translateService.instant('mobile'),
                        cellRenderer: (param) => {

                            return this._translateService.instant(param.data.mobile);
                        }
                    },

                    {
                        field: 'message',
                        headerName: this._translateService.instant('message'),
                        cellRenderer: (param) => {

                            return this._translateService.instant(param.data.message);
                        }
                    },


                ]

            },
            form: {
                fields: [
                    {
                        type: FieldType.text,
                        name: 'name',
                        label: this._translateService.instant('name'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'email',
                        label: this._translateService.instant('email'),
                        required: true,
                        validators: [Validators.required, Validators.email],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'mobile',
                        label: this._translateService.instant('mobile'),
                        required: true,
                        validators: [Validators.required, Validators.pattern(this.utils.phoneNumberRegExp)],
                        disabled: false,
                        readonly: false,
                        cols: 4,
                        rows: 2
                    },
                    {
                        type: FieldType.text,
                        name: 'message',
                        label: this._translateService.instant('message'),
                        required: true,
                        validators: [Validators.required, Validators.minLength(3)],
                        disabled: false,
                        readonly: false,
                        multiline: true,
                        cols: 12,
                        rows: 3
                    },

                ],
                cols: 12,
                localizedAllFields: true
            }
        },
    ];
}
