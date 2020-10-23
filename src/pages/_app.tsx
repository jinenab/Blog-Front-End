import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { Provider } from "urql";
import theme from "../theme";
import { createUrqlClient } from "../utils/createUrqlClient";

function MyApp({ Component, pageProps }: any) {
  return (
    // <Provider value={urqlClient}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    // </Provider>
  );
}

// export default withUrqlClient(createUrqlClient)(MyApp);
export default MyApp