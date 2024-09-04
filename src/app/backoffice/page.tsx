import { Box } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function OrdersPage() {
  const sesson = await getServerSession();
  console.log("sesson is", sesson);
  return (
    <Box>
      <h1>Orders Page</h1>
    </Box>
  );
}
