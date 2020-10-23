import { Box, Flex, Link, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";


const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete,setcomplete]=useState(false)
  const [,forgotPassword]=useForgotPasswordMutation()
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
         await forgotPassword(values)
         setcomplete(true)
        }}
      >
        {({ isSubmitting }) => complete? <Box>
          if an account with this email exists, we dent you email
        </Box> :(
          <Form>
            
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>
            <Button
              isLoading={isSubmitting}
              mt={4}
              variantColor="teal"
              type="submit"
            >
              send
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
