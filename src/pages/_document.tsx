// import { Providers } from '@/core/global-redux/provider';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const originalRenderPage = ctx.renderPage;
 
    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App: any) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component: any) => Component,
      });
 
    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
 
    return initialProps;
  }
 
  render() {
    return (
      <Html>
        <Head>
            {/* stylesheet */}
        </Head>
        <body>
          {/* <Providers> */}
            <Main />
            <NextScript />
          {/* </Providers> */}
        </body>
      </Html>
    );
  }
}
 
export default MyDocument;