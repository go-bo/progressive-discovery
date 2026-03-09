import { initI18nTranslations } from '@rippling/lib-i18n';
import oneUiService from '@rippling/pebble/services';
import { ThemeProvider, THEME_CONFIGS } from '@rippling/pebble/theme';
import resources from '@rippling/pebble/translations/locales/en-US/one-ui.json';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from '@rippling/pebble/GlobalStyle';
// Pages
import IndexPage from './pages/index-page';
import GettingStartedPage from './pages/getting-started-page';
import DocViewerPage from './pages/doc-viewer-page';
import DesignSpecsLayout from './pages/design-specs/DesignSpecsLayout';
import DesignSpecsContent from './pages/design-specs/DesignSpecsContent';
// Scenarios
import TimeDemo from './scenarios/time-demo';
import SpendDemo from './scenarios/spend-demo';
import PlatformPrimerDemo from './scenarios/platform-primer-demo';
// Explorations
import NavHomeSketchDemo from './explorations/nav-home-sketch/NavHomeSketchDemo';
import Offsite2026Demo from './explorations/offsite-2026/Offsite2026Demo';
// Archive
import AppShellTemplate from './archive/app-shell-template';
import CompositionManagerDemo from './archive/composition-manager/composition-manager-demo';
import { CompositionDetail } from './archive/composition-manager/compositions/CompositionDetail';
import HelpCenterSeparateDemo from './archive/help-center-separate-demo';
import HelpCenterRev2Demo from './archive/help-center-rev2-demo';
// Framework
import { UserProvider } from './framework/user-model';
import { ScenarioHUD } from './framework/user-model/ScenarioHUD';

// Initialize @rippling/ui package
oneUiService.init({} as any);

const defaultNameSpace = 'one-ui';
const namespaces = [defaultNameSpace];
const language = 'en-US';
const supportedLanguages = [language];

// Initialize translation (dependency of @rippling/pebble)
function init() {
  return initI18nTranslations({
    resources: {
      [language]: {
        [defaultNameSpace]: resources,
      },
    },
    namespaces,
    supportedLanguages,
    defaultNameSpace,
    fallbackLanguage: language,
    language,
    debug: true,
  });
}

const container = document.getElementById('root') as HTMLElement;

let root = (window as any).__root__;

if (!root) {
  root = ReactDOM.createRoot(container);
  (window as any).__root__ = root;
}

init().then(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider themeConfigs={THEME_CONFIGS} defaultTheme="berry" defaultColorMode="light">
          <GlobalStyle />
          <UserProvider>
          <ScenarioHUD />
          <Routes>
            {/* Pages */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/docs" element={<DocViewerPage />} />
            <Route path="/design-specs" element={<DesignSpecsLayout />}>
              <Route index element={<Navigate to="/design-specs/components/feature-card" replace />} />
              <Route path="components/:item" element={<DesignSpecsContent />} />
              <Route path="patterns/:item" element={<DesignSpecsContent />} />
              <Route path="templates/:item" element={<DesignSpecsContent />} />
            </Route>

            {/* Scenarios */}
            <Route path="/time/:page?" element={<TimeDemo />} />
            <Route path="/spend/:page?" element={<SpendDemo />} />
            <Route path="/platform-primer/:page?" element={<PlatformPrimerDemo />} />

            {/* Explorations */}
            <Route path="/nav-home-sketch" element={<NavHomeSketchDemo />} />
            <Route path="/offsite-2026" element={<Offsite2026Demo />} />

            {/* Archive */}
            <Route path="/app-shell-template" element={<AppShellTemplate />} />
            <Route path="/composition-manager" element={<CompositionManagerDemo />} />
            <Route path="/composition-manager/compositions/:id" element={<CompositionDetail />} />
            <Route path="/help-center-separate" element={<HelpCenterSeparateDemo />} />
            <Route path="/help-center-rev2" element={<HelpCenterRev2Demo />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
