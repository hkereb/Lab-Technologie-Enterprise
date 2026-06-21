// declare strongly-typed variables in the global scope
import { Customer, CustomerInput } from "@/lib/models/customer";

declare global {
    var customers: Customer[] | undefined;
    var maxId: number | undefined;
}
export class CustomerService {
    constructor() {
        if (!globalThis.customers) {
            globalThis.maxId = 0;
            globalThis.customers = [
                {
                    id: ++globalThis.maxId,
                    firstName: "John",
                    lastName: "Smith",
                    email: "john.smith@example.com",
                },
                {
                    id: ++globalThis.maxId,
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jane.doe@example.com",
                },
            ];
        }
    }
    private findIndexById(id: number): number {
        return globalThis.customers!.findIndex((c) => c.id === id);
    }
    async getAll(): Promise<Customer[]> {
        return globalThis.customers!;
    }
    async getById(id: number): Promise<Customer | null> {
        const customer = globalThis.customers!.find((c) => c.id === id);
        return customer ?? null;
    }
    async create(input: CustomerInput): Promise<Customer> {
        const customer: Customer = {
            id: ++globalThis.maxId!,
            ...input
        };
        globalThis.customers!.push(customer);
        return customer;
    }
    async update(id: number, input: CustomerInput): Promise<Customer> {
        const idx = this.findIndexById(id);
        if (idx === -1) {
            throw new Error(`Customer with id "${id}" not found`);
        }
        const customer = globalThis.customers![idx];
        customer.firstName = input.firstName;
        customer.lastName = input.lastName;
        customer.email = input.email;

        return customer;
    }
    async delete(id: number): Promise<void> {
        const idx = this.findIndexById(id);
        if (idx === -1) {
            throw new Error(`Customer with id "${id}" not found`);
        }
        globalThis.customers!.splice(idx, 1);
    }
}
export const customerService = new CustomerService();
