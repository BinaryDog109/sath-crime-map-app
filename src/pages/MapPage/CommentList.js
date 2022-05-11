import { Divider, List, ListItem } from "@mui/material";
import { CommentListItem } from "./CommentListItem";

export const CommentList = () => {
  return (
    <List p={0}>
      <ListItem className="comment">
        <CommentListItem />
      </ListItem>
      <Divider></Divider>
      <ListItem className="comment">
        <CommentListItem />
      </ListItem>
      <Divider></Divider>
    </List>
  );
};
