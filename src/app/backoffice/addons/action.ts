"use server";

import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingAddons(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") ? true : false;
  const addonCategoryId = Number(formData.get("addonCategoryId"));

  const addedAddon = await prisma.addons.create({
    data: { name, price, isAvailabel: isAvailable, addonCategoryId },
  });
  redirect("/backoffice/addons");
}

export async function updatingAddon(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const addonCategoryId = Number(formData.get("addonCategoryId"));
  const id = Number(formData.get("id"));

  console.log("data are", name, price, isAvailable, addonCategoryId, id);
  await prisma.addons.update({
    data: {
      name: name,
      price: Number(price),
      isAvailabel: isAvailable,
      addonCategoryId: addonCategoryId,
    },
    where: { id: id },
  });

  redirect("/backoffice/addons");
}

export async function deleteAddon(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.addons.delete({ where: { id: id } });
  redirect("/backoffice/addons");
}
