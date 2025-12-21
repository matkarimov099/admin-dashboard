import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import 'react-photo-view/dist/react-photo-view.css';
import '@/i18n';
import { App } from '@/App.tsx';
import { AppLoader } from '@/components/common/app-loader.tsx';
import { PageTitleProvider } from '@/providers/page-title-provider.tsx';
import { ThemeConfigProvider } from '@/providers/theme-config-provider.tsx';
import { ThemeProvider } from '@/providers/theme-provider.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <ThemeConfigProvider>
        <PageTitleProvider>
          <Suspense fallback={<AppLoader />}>
            <App />
          </Suspense>
        </PageTitleProvider>
      </ThemeConfigProvider>
    </ThemeProvider>
  </StrictMode>
);
