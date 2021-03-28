import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box> if an account with that email exists, we sent you an email</Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField name="email" type="email" label="Email"></InputField>
              </Box>

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                color="white"
                backgroundColor="teal"
              >
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
