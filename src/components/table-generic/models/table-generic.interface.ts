import { IFieldFormDynamic } from "@/components/form-dynamic/models/form-dynamic.interface";

export interface ITableGeneric {
    title: string;
    columns: IColumn[];
    data: any[];
    path: string;
    fields: IFieldFormDynamic[];
    refreshSearch?(search: string): void;
    refresh?(): void;
}

export interface IColumn {
    key: string;
    label: string;
}