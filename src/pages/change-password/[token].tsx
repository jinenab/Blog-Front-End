import { Box, Button, Link } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";
const ChangePassword: NextPage = () => {
  const [, ChangePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  console.log(router);
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await ChangePassword({
            newPassword: values.newPassword,
            token:typeof router.query.token==="string"? router.query.token:"",
          });
          //console.log(response);
          if (response.data?.changePassword?.errors.length) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            console.log(errorMap);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword?.user) {
            //worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            {tokenError ? (
              <Box>
                <Box style={{ color: "red" }}>{tokenError}</Box>
                <NextLink href="/forgot-password">go forget it</NextLink>
       </Box>
            ) : null}
            <Button
              isLoading={isSubmitting}
              mt={4}
              variantColor="teal"
              type="submit"
            >
              changePassword
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(ChangePassword);
