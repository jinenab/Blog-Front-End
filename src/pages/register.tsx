import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const [, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{email:"", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({options:values});
          console.log(response);
          if (
            response.data?.register?.errors &&
            response.data?.register.errors.length !== 0
          ) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register?.user) {
            //worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
                <InputField
              name="email"
              placeholder="email"
              label="email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              isLoading={isSubmitting}
              mt={4}
              variantColor="teal"
              type="submit"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
