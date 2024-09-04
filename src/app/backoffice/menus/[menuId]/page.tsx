import MultipleSelect from "@/components/multipleSelect";
import config from "@/config";
import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import {
  Menus,
  MenusCategories,
  MenusCategoriesAndMenus,
} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { it } from "node:test";
import { useEffect, useState } from "react";
import { deleteMenu, updatingMenu } from "../action";

interface Props {
  params: {
    menuId: string;
  };
}

export default async function UpdatingMenu({ params }: Props) {
  const menuId = Number(params.menuId);

  const menuToBeUpdatedOrDeleted = await prisma.menus.findFirst({
    where: { id: menuId },
    include: { menusCategoriesAndMenus: true },
  });
  const menuCategories = await prisma.menusCategories.findMany();

  const selectedMenuCategoryIds =
    menuToBeUpdatedOrDeleted?.menusCategoriesAndMenus.map(
      (item) => item.menuCategoryIds
    );

  /*   const menuCategoryIds = menuCategories.map((item) => item.id);
   */
  if (!menuToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <>
      <Box
        component={"form"}
        action={deleteMenu}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2.5,
          paddingRight: 2,
        }}
      >
        {" "}
        <h2>Updating Menu</h2>
        <input type="hidden" name="id" value={menuId} />
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mt: "7px" }}
        >
          Delete
        </Button>
      </Box>

      <Box
        component={"form"}
        action={updatingMenu}
        sx={{
          paddingRight: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              name="name"
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={menuToBeUpdatedOrDeleted.name}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              my: "20px",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <TextField
              name="price"
              id="outlined-basic"
              variant="outlined"
              placeholder="Price"
              type="number"
              sx={{ width: "100%" }}
              defaultValue={
                menuToBeUpdatedOrDeleted.price === 0
                  ? ""
                  : menuToBeUpdatedOrDeleted.price
              }
            />
          </Box>
          <Typography variant="h6">MenuCategories</Typography>
          {
            <Box
              sx={{
                display: "flex",
                px: 1.4,
                py: 0.9,
                bgcolor: "white",
                borderRadius: "5px",
                mb: 1,
              }}
            >
              {menuCategories.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      name="menuCategoryId"
                      value={item.id}
                      defaultChecked={
                        selectedMenuCategoryIds?.includes(item.id)
                          ? true
                          : false
                      }
                    />
                  }
                  label={item.name}
                  sx={{ color: "#023047" }}
                />
              ))}
            </Box>
          }{" "}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="isAvailable"
                  defaultChecked={
                    menuToBeUpdatedOrDeleted.isAvailable ? true : false
                  }
                />
              }
              label="Is Available"
              sx={{ color: "#023047" }}
            />
          </Box>
          <input type="hidden" name="menuId" value={menuId} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#219ebc", color: "#023047" },
              mt: "10px",
            }}
          >
            Update Menu
          </Button>
        </Box>
      </Box>
    </>
  );
}
