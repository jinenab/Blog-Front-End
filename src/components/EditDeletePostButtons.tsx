import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";

import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}
export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();

  const [, deletePost] = useDeletePostMutation();
  if (meData?.me?.id === creatorId)
    return (
      <Box>
        <NextLink
          href="/post/edit/[id]"
          as={`
        /post/edit/${id}
        `}
        >
          <IconButton
            as={Link}
            //variantColor="red"
            ml="auto"
            aria-label="Edit Post"
            icon="edit"
          ></IconButton>
        </NextLink>
        <IconButton
          //variantColor="red"
          ml="auto"
          onClick={() => {
            deletePost({ id });
          }}
          aria-label="Delete Post"
          icon="delete"
        ></IconButton>
      </Box>
    );
  return null;
};
