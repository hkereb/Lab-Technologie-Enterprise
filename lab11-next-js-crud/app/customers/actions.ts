"use server";

import { revalidatePath } from "next/cache";
import { customerService } from "@/lib/services/customer-service";
import type { CustomerInput } from "@/lib/models/customer";
import { redirect } from "next/navigation";

export async function createCustomerAction(formData: FormData) {
  const input: CustomerInput = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
  };

  if (!input.firstName || !input.lastName || !input.email) {
    throw new Error("firstName, lastName, email are required");
  }

  await customerService.create(input);
  // Odświeża stronę z klientami, żeby pokazać nowe dane!
  revalidatePath("/customers"); 
}

export async function deleteCustomerAction(formData: FormData) {
  const idRaw = formData.get("id");
  const id = Number(idRaw);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid customer id");
  }

  await customerService.delete(id);
  // Odświeżamy stronę, by usunięty wpis zniknął
  revalidatePath("/customers");
}

export async function updateCustomerAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const input: CustomerInput = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
  };

  if (!input.firstName || !input.lastName || !input.email) {
    throw new Error("firstName, lastName, email are required");
  }

  await customerService.update(id, input);
  revalidatePath("/customers");
  redirect("/customers"); // Przekierowanie po zapisaniu
}