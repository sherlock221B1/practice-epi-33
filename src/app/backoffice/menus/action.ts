"use server";

import { prisma } from "@/libs/prisma";
import { MenusCategoriesAndMenus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function addingMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const menuCatetoryIds = formData.getAll("menuCategoryId");

  const addedMenu = await prisma.menus.create({
    data: { name: name, price: Number(price), isAvailable: isAvailable },
  });
  const data: any = menuCatetoryIds.map((id) => ({
    menuId: addedMenu.id,
    menuCategoryIds: Number(id),
  }));
  await prisma.menusCategoriesAndMenus.createMany({ data: data });
  redirect("/backoffice/menus");
}

export async function updatingMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price");
  const isAvailable = formData.get("isAvailable") ? true : false;
  const updatedMenuCatetoryIds = formData.getAll("menuCategoryId");
  console.log("data are ", name, price, updatedMenuCatetoryIds);
  const menuId = Number(formData.get("menuId"));

  await prisma.menus.update({
    data: { name: name, price: Number(price), isAvailable: isAvailable },
    where: { id: menuId },
  });

  const data: any = updatedMenuCatetoryIds.map((id) => ({
    menuId: menuId,
    menuCategoryIds: Number(id),
  }));

  const previousMenuCategoriesAndMenus =
    await prisma.menusCategoriesAndMenus.findMany({
      where: { menuId: menuId },
    });
  const previousMenuCategoryIds = previousMenuCategoriesAndMenus.map(
    (item) => item.menuCategoryIds
  );

  const isSameMenuCategoryIds =
    updatedMenuCatetoryIds.length === previousMenuCategoriesAndMenus.length &&
    updatedMenuCatetoryIds.map((id) =>
      previousMenuCategoryIds.includes(Number(id))
    );

  if (!isSameMenuCategoryIds) {
    await prisma.menusCategoriesAndMenus.deleteMany({
      where: { menuId: menuId },
    });
    await prisma.menusCategoriesAndMenus.createMany({ data: data });
  }
  redirect("/backoffice/menus");
}

export async function deleteMenu(formData: FormData) {
  const menuId = Number(formData.get("id"));
  await prisma.menusCategoriesAndMenus.deleteMany({
    where: { menuId: menuId },
  });

  await prisma.addonCategoriesAndMenus.deleteMany({ where: { menuId } });
  await prisma.menus.delete({ where: { id: menuId } });
  redirect("/backoffice/menus");
}
