import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { Menus, MenusCategories } from "@prisma/client";
import { addingAddonCategory } from "../action";
import { prisma } from "@/libs/prisma";

export default async function addingAddonCategories() {
  const menus = await prisma.menus.findMany();
  return (
    <Box
      component={"form"}
      action={addingAddonCategory}
      sx={{
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
        <Box
          sx={{ bgcolor: "white", width: "100%", borderRadius: "8px", mt: 3 }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Name"
            sx={{ width: "100%" }}
            defaultValue={""}
            name="name"
          />
        </Box>
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
                control={<Checkbox name="id" value={item.id} />}
                label={item.name}
                sx={{ color: "#023047" }}
              />
            );
          })}
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox defaultChecked name="isRequired" />}
            label="Is Required"
            sx={{ color: "#023047" }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#023047",
            ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            mt: "10px",
          }}
          /*           onClick={handleAddingMenuCategory}
           */
        >
          Add Addon Category
        </Button>
      </Box>
    </Box>
  );
}
