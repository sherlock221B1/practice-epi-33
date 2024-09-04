"use server";

import { prisma } from "@/libs/prisma";
import { AddonCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingAddonCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const isRequired = formData.get("isRequired") ? true : false;
  const selectedMenuIds = formData.getAll("id");

  const addedAddonCategory = await prisma.addonCategories.create({
    data: { name: name, isRequiered: isRequired },
  });

  const data = selectedMenuIds.map((id) => ({
    menuId: Number(id),
    addonCategoryId: addedAddonCategory.id,
  }));

  await prisma.addonCategoriesAndMenus.createMany({ data: data });
  redirect("/backoffice/addon-categories");
}

export async function updatingAddonCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const isRequired = formData.get("isRequired");

  const addonCategoryId = Number(formData.get("addonCategoryId"));
  const updatedMenuIds = formData.getAll("menuId");

  await prisma.addonCategories.update({
    data: { name: name, isRequiered: Boolean(isRequired) },
    where: { id: addonCategoryId },
  });

  const previousAddonCategoriesAndMenus =
    await prisma.addonCategoriesAndMenus.findMany({
      where: { addonCategoryId: addonCategoryId },
    });
  const previousMenuIds = previousAddonCategoriesAndMenus.map(
    (item) => item.menuId
  );

  const isSameMenuIds =
    updatedMenuIds.length === previousMenuIds.length &&
    updatedMenuIds.every((id) => previousMenuIds.includes(Number(id)));

  if (!isSameMenuIds) {
    const data = updatedMenuIds.map((id) => ({
      addonCategoryId: addonCategoryId,
      menuId: Number(id),
    }));

    await prisma.addonCategoriesAndMenus.deleteMany({
      where: { addonCategoryId: addonCategoryId },
    });
    await prisma.addonCategoriesAndMenus.createMany({ data: data });
  }
  redirect("/backoffice/addon-categories");
}
export async function deleteAddonCategory(formData: FormData) {
  const id = formData.get("addonCategoryId");

  /*  await prisma.addonCategoriesAndMenus.deleteMany({
    where: { addonCategoryId: Number(id) },
  }); */

  await prisma.addonCategoriesAndMenus.deleteMany({
    where: { addonCategoryId: Number(id) },
  });

  await prisma.addons.deleteMany({ where: { addonCategoryId: Number(id) } });
  await prisma.addonCategories.delete({
    where: { id: Number(id) },
  });
  redirect("/backoffice/addon-categories");
}
