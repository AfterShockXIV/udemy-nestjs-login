import { ISearch } from './../interfaces/app.interface';
export declare class SearchModel implements ISearch {
    searchType?: string;
    searchText?: string;
    startPage: number;
    limitPage: number;
}
