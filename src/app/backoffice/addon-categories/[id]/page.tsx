import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { deleteAddonCategory, updatingAddonCategory } from "../action";

interface Props {
  params: {
    id: string;
  };
}
export default async function UpdatingAddonCategories({ params }: Props) {
  const id = Number(params.id);

  const menus = await prisma.menus.findMany();
  const addonCategoryToBeUpdate = await prisma.addonCategories.findFirst({
    where: { id: id },
    include: { addonCategoriesAndMenus: true },
  });

  const selectedMenuIds = addonCategoryToBeUpdate?.addonCategoriesAndMenus.map(
    (item) => item.menuId
  );
  return (
    <Box
      sx={{
        paddingRight: 2,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          component={"form"}
          action={updatingAddonCategory}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Name"
              sx={{ width: "100%" }}
              defaultValue={addonCategoryToBeUpdate?.name}
              name="name"
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mt: 1, color: "#023047" }}>
              Menus
            </Typography>
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
              {menus.map((item) => {
                return (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        defaultChecked={
                          selectedMenuIds?.includes(item.id) ? true : false
                        }
                        name="menuId"
                        value={item.id}
                      />
                    }
                    label={item.name}
                    sx={{ color: "#023047" }}
                  />
                );
              })}
            </Box>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={
                    addonCategoryToBeUpdate?.isRequiered ? true : false
                  }
                  name="isRequired"
                />
              }
              label="Is Required"
              sx={{ color: "#023047" }}
            />
          </Box>

          <input type="hidden" value={id} name="addonCategoryId" />

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "fit-content",
              bgcolor: "#023047",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              mt: "10px",
            }}
          >
            Update
          </Button>
        </Box>
        <Box component={"form"} action={deleteAddonCategory} sx={{ mt: 2 }}>
          <input type="hidden" value={id} name="addonCategoryId" />
          <Button type="submit" variant="contained" color="error">
            DELETE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
