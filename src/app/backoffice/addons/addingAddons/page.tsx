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
import { addingAddons } from "../action";

export default async function AddingMenus() {
  const adddonCategories = await prisma.addonCategories.findMany();

  /*   const handleAddingMenu = async () => {
    if (selectedMenuCategoryIds.length === 0) {
      return alert(" you need to add menu category for this menu");
    }
    await fetch(`${config.backofficeApiUrl}/menus`, {
      method: "POST",
      body: JSON.stringify({
        ...menu,
        menuCategoryIds: selectedMenuCategoryIds,
      }),
    });
    router.push("/backoffice/menus");
  };
 */ return (
    <Box
      component={"form"}
      action={addingAddons}
      sx={{
        paddingRight: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ bgcolor: "white", width: "100%", borderRadius: "8px" }}>
          <TextField
            name="name"
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            mt: "20px",
            mb: 1.2,
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
          />
        </Box>

        <Typography variant="h6">AddonCategories</Typography>
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
          {adddonCategories.map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                control={<Checkbox name="addonCategoryId" value={item.id} />}
                label={item.name}
                sx={{ color: "#023047" }}
              />
            );
          })}
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked name="isAvailable" />}
            label="Is Available"
            sx={{ color: "#023047" }}
          />
        </Box>
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
          Add Addon
        </Button>
      </Box>
    </Box>
  );
}
