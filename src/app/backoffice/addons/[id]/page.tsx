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
import { deleteAddon, updatingAddon } from "../action";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdatingMenu({ params }: Props) {
  const id = Number(params.id);

  const addonToBeUpdatedOrDeleted = await prisma.addons.findFirst({
    where: { id: id },
  });
  const addonCategories = await prisma.addonCategories.findMany();

  /*   const menuCategoryIds = menuCategories.map((item) => item.id);
   */
  if (!addonToBeUpdatedOrDeleted) {
    return;
  }

  return (
    <>
      <Box
        component={"form"}
        action={deleteAddon}
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
        <h2>Updating Addon</h2>
        <input type="hidden" name="id" value={id} />
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
        action={updatingAddon}
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
              defaultValue={addonToBeUpdatedOrDeleted.name}
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
                addonToBeUpdatedOrDeleted.price === 0
                  ? ""
                  : addonToBeUpdatedOrDeleted.price
              }
            />
          </Box>
          <Typography variant="h6">AddonCategories</Typography>
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
              {addonCategories.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      name="addonCategoryId"
                      value={item.id}
                      defaultChecked={
                        item.id === addonToBeUpdatedOrDeleted.addonCategoryId
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
                    addonToBeUpdatedOrDeleted.isAvailabel ? true : false
                  }
                />
              }
              label="Is Available"
              sx={{ color: "#023047" }}
            />
          </Box>
          <input type="hidden" name="id" value={id} />
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
