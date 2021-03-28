import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  return <div>forgot password</div>;
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
