import AddonCard from "@/components/AddonCard";
import { prisma } from "@/libs/prisma";
import { Box, Button, Link } from "@mui/material";
import { Addons } from "@prisma/client";

export default async function AddonCategoriesPage() {
  const addons: Addons[] = await prisma.addons.findMany();

  if (addons.length === 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px",
            paddingTop: "0px",
          }}
        >
          <Link href="/backoffice/addons/addingAddons">
            <Button
              sx={{
                bgcolor: "#023047",
                color: "#8ecae6",
                ":hover": { bgcolor: "#8ecae6", color: "#023047" },
              }}
              variant="contained"
            >
              Create New Addon
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            mt: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              backgroundColor: "#023047",
              color: "#8ecae6",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            There is no Addon yet
          </h1>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          paddingTop: "0px",
        }}
      >
        <Link href={"/backoffice/addons/addingAddons"}>
          <Button
            sx={{
              bgcolor: "#023047",
              color: "#8ecae6",
              ":hover": { bgcolor: "#8ecae6", color: "#023047" },
            }}
            variant="contained"
          >
            Create New Addon
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mt: "20px",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {addons.map((addon) => {
          return <AddonCard key={addon.id} addon={addon} />;
        })}
      </Box>
    </>
  );
}
