import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { PostCard } from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div> you got query failed for some reasons </div>
        <div> {error?.message} </div>
      </div>
    );
  }

  return (
    <Layout>
      {!data && loading ? <div> loading... </div> : <PostCard data={data} />}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables!.limit,
                  cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
