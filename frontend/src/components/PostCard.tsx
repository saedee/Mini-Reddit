import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostsQuery, useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { UpdootSection } from "./UpdootSection";

interface PostCardProps {
  data: PostsQuery;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  return (
    <Stack spacing={8}>
      {data!.posts.posts.map((p) =>
        !p ? null : (
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
                {meData?.me?.id !== p.creator.id ? null : (
                  <Box ml="auto">
                    <NextLink href="/post/edit/[id]" as={`/post/edit/${p.id}`}>
                      <IconButton mr={4} icon={<EditIcon />} aria-label="Edit Post" />
                    </NextLink>
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete Post"
                      onClick={() => deletePost({ id: p.id })}
                    />
                  </Box>
                )}
              </Flex>
            </Box>
          </Flex>
        ),
      )}
    </Stack>
  );
};
