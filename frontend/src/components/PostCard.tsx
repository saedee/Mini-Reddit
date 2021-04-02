import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";

interface PostCardProps {
  post: PostSnippetFragment;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
      <UpdootSection post={post} />
      <Box>
        <Heading fontSize="xl"> {post.title}</Heading>
        <Text> posted by {post.creator.username} </Text>
        <Text mt={4}> {post.textSnippet} </Text>
      </Box>
    </Flex>
  );
};
