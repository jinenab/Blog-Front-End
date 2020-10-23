import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutationVariables,
} from "../generated/graphql";

interface UpdootSectionPorps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionPorps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [{ fetching, operation }, vote] = useVoteMutation();
  return (
    <Flex direction="column" mr="4" alignItems="center" justifyContent="center">
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });

          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={
          fetching &&
          (operation?.variables as VoteMutationVariables)?.value === 1
        }
        aria-label="updoot post"
        icon="chevron-up"
      />
      {post.points}
      <IconButton
        isLoading={
          fetching &&
          (operation?.variables as VoteMutationVariables)?.value === -1
        }
        aria-label="downdoot post"
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        icon="chevron-down"
        variantColor={post.voteStatus === -1 ? "red" : undefined}
      />
    </Flex>
  );
};
