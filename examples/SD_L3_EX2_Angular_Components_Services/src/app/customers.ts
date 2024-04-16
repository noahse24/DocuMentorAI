import { Customer } from './customer'

export class Customers {
    id: number;
    private accounts: Customer[];
    constructor() {
        this.id = 0;
        this.accounts = [];
    }
    addCustomer(c: Customer): void {
        console.log(`Adding customer {c.id}`);
        this.accounts.push(c);
    }
    getCustomer(id: number): Customer | null { 
        for (var a of this.accounts) {
            if (a.getId() == id)
                return a;
        }
        return null;
    }
    getCustomerList() : Customer[] {
        return this.accounts;
    }
}
