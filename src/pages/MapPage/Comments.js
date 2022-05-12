import { Divider, List, ListItem, Typography } from "@mui/material";
import { useEffect, useMemo, Fragment } from "react";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { CommentListItem } from "./CommentListItem";

export const Comments = ({ selectedCrime }) => {
  const query = useMemo(
    () => ["crimeId", "==", selectedCrime],
    [selectedCrime]
  );
  const {
    docs: comments,
    error,
    isPending,
  } = useGetDocuments("Comments", null, null, query, ["createdAt", "desc"], false);
  console.log(error)
  return (
    <List sx={{ p: 0 }}>{error}
      {comments && (
        <>
            
          <Typography fontWeight={600} mt={2}>
            There are {comments.length} comments
          </Typography>
          {comments.map((comment) => (
            <Fragment key={comment.id}>
              <ListItem>
                <CommentListItem data={comment} />
              </ListItem>
              <Divider></Divider>
            </Fragment>
          ))}
        </>
      )}
    </List>
  );
};
