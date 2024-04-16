export class Customer {
    id: number;
    private name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    setName(n: string): void { this.name = n; }
    getName(): string { return this.name; }
    setId(id: number): void { this.id = id }
    getId(): number { return this.id; }
}

