import "@/app/globals.css";

import { sb } from "storybook/test";
import { withThemeByClassName } from "@storybook/addon-themes";
import { mswLoader, initialize } from "msw-storybook-addon";

import type { Preview } from "@storybook/nextjs-vite";

sb.mock(import("../data/card-dto.ts"));
sb.mock(import("../data/revenue-dto.ts"));
sb.mock(import("../data/invoices-dto.ts"));

const publicUrl = process.env.PUBLIC_URL ?? "";

initialize({
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: `${publicUrl}/mockServiceWorker.js`,
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
  loaders: [mswLoader],
};

export default preview;
