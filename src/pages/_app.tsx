import Layout from "../components/layout/layout";
import { AppProps } from "next/app";
import './global.scss';
import { wrapper } from "@/core/global-redux/store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default wrapper.withRedux(MyApp);