import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';

import { CreditCardV1 } from '../data/version1/CreditCardV1';

export interface ICreditCardsPersistence extends IGetter<CreditCardV1, string>, IWriter<CreditCardV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<CreditCardV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: CreditCardV1) => void): void;

    create(correlationId: string, item: CreditCardV1, 
        callback: (err: any, item: CreditCardV1) => void): void;

    update(correlationId: string, item: CreditCardV1, 
        callback: (err: any, item: CreditCardV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: CreditCardV1) => void): void;
}
