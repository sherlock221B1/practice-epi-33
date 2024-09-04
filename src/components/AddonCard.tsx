import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import Link from "next/link";
import {
  AddonCategories,
  Addons,
  Menus,
  MenusCategories,
} from "@prisma/client";
import EggIcon from "@mui/icons-material/Egg";

interface Props {
  addon: Addons;
}

export default function AddonCard({ addon }: Props) {
  const { name } = addon;
  console.log("menuid is", addon.id);
  return (
    <Link
      href={`/backoffice/addons/${addon.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mr: "8px",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#8ecae6",
            color: "#023047",
            width: "170px",
            height: "170px",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <EggIcon fontSize="large" />
          <h3
            style={{
              padding: "0",
              margin: "0",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {addon.name}
          </h3>
          <span style={{ fontSize: "13px" }}>{addon.price}</span>
          <span style={{ fontSize: "13px" }}>
            {addon.isAvailabel ? "Available" : "Not Available"}
          </span>
        </Box>
      </Box>
    </Link>
  );
}
