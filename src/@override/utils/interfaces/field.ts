import { FieldType } from "./FieldType.enum";
import { LocalizedText } from "./localized-text";
import { ColDef } from 'ag-grid-community';

export interface AbstractField {
    type: FieldType;
    name: string;
    label: string;
    required: boolean;
    multiline?: boolean;
    disabled: boolean;
    readonly: boolean;
    details?: string;
    initialValue?: string | boolean | LocalizedText;
    validators?: any[];
    view?: 'image';
    multiple?: boolean
    displayIf?: () => boolean;
    options?: { value: any, label: string }[];
    selectOptions?:{
        fromSelector: string;
        entityGetUrl?: string;
        optionName: string;
        options?:string[];
        columns?: ColDef[];
        subObjectName?: string;
        pathParams?: { key: string, value: string }[];
        exludeView?: string[]
        localized?:string []
    },
    children?: AbstractField[],
    min?: number;
    max?: number;
    cols: number;
    rows: number,
    color?: string
    accept?: string
}
