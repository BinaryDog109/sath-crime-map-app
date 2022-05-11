import { Button, Divider, List, ListItem } from "@mui/material";
import { useState } from "react";
import { CommentFormModal } from "./CommentFormModal";
import { CommentListItem } from "./CommentListItem";

export const CommentList = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <CommentFormModal open={open} setOpen={setOpen} />
    <Button onClick={()=>{setOpen(true)}} sx={{mt: 1}} variant="contained">Add a comment</Button>
    <List sx={{p: 0}}>
      <ListItem className="comment">
        <CommentListItem />
      </ListItem>
      <Divider></Divider>
      <ListItem className="comment">
        <CommentListItem />
      </ListItem>
      <Divider></Divider>
    </List></>
  );
};
