import { Box, Flex, Heading, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { PostsQuery, useDeletePostMutation } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";
import NextLink from "next/link";
import { DeleteIcon } from "@chakra-ui/icons";

interface PostCardProps {
  data: PostsQuery;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Stack spacing={8}>
      {data!.posts.posts.map((p) => (
        <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
          <UpdootSection post={p} />
          <Box flex={1}>
            <NextLink href="/post/[id]" as={`/post/${p.id}`}>
              <Link>
                <Heading fontSize="xl"> {p.title}</Heading>
              </Link>
            </NextLink>
            <Text> posted by {p.creator.username} </Text>
            <Flex align="center">
              <Text flex={1} mt={4}>
                {p.textSnippet}
              </Text>
              <IconButton
                colorScheme="red"
                icon={<DeleteIcon />}
                aria-label="Delete Post"
                onClick={() => deletePost({ id: p.id })}
              />
            </Flex>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};
