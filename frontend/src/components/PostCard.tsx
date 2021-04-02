import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { PostsQuery } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";

interface PostCardProps {
  data: PostsQuery;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  return (
    <Stack spacing={8}>
      {data!.posts.posts.map((p) => (
        <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
          <UpdootSection post={p} />
          <Box>
            <Heading fontSize="xl"> {p.title}</Heading>
            <Text> posted by {p.creator.username} </Text>
            <Text mt={4}> {p.textSnippet} </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};
