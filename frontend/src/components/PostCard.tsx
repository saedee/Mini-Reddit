import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostsQuery } from "../generated/graphql";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { UpdootSection } from "./UpdootSection";

interface PostCardProps {
  data: PostsQuery;
}

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
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
                <Box ml="auto">
                  <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                </Box>
              </Flex>
            </Box>
          </Flex>
        ),
      )}
    </Stack>
  );
};
