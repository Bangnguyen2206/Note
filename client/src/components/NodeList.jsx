import { NoteAddOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
// import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import moment from "moment";

export default function NodeList() {
  const folder = { notes: [{ id: 1, content: "<p>This is new note</p>" }] };
  const activeNoteId = 0;
  return (
    <>
      <Grid container height="100%">
        <Grid item sx={4}>
          <List
            subheader={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
                <Tooltip title="Add Note">
                  <IconButton size="small">
                    <NoteAddOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            {folder.notes.map(({ id, content, updatedAt }) => {
              return (
                <Link
                  key={id}
                  to={`note/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      mb: "5px",
                      backgroundColor:
                        id === activeNoteId ? "rgb(255 211 140)" : null,
                    }}
                  >
                    <CardContent
                      sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                    >
                      {/* Rich Text */}
                      <div
                        style={{ fontSize: 14, fontWeight: "bold" }}
                        dangerouslySetInnerHTML={{
                          __html: `${content.substring(0, 30) || "Empty"}`,
                        }}
                      />
                      <Typography sx={{ fontSize: "10px" }}>
                        {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </List>
        </Grid>
        <Grid item sx={6}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
