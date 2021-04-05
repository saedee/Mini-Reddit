import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const EditPost = ({}) => {
  return <a>hello</a>;
};

export default withUrqlClient(createUrqlClient)(EditPost);
