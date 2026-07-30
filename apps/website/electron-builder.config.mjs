export default {
  appId: 'ai.tesle.desktop',
  productName: 'Tesle',
  copyright: 'Copyright © 2026 Tesle',
  directories: {
    output: 'release',
    buildResources: 'build',
  },
  files: [
    'dist/**/*',
    'dist-electron/**/*',
  ],
  mac: {
    category: 'public.app-category.business',
    icon: 'public/pwa-512.png',
    target: [
      { target: 'dmg', arch: ['x64', 'arm64'] },
      { target: 'zip', arch: ['x64', 'arm64'] },
    ],
    darkModeSupport: true,
    hardenedRuntime: true,
    notarize: false,
  },
  dmg: {
    contents: [
      { x: 130, y: 220 },
      { x: 410, y: 220, type: 'link', path: '/Applications' },
    ],
  },
  win: {
    target: [
      { target: 'nsis', arch: ['x64'] },
      { target: 'portable', arch: ['x64'] },
    ],
    icon: 'public/pwa-512.png',
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Tesle',
  },
  linux: {
    target: [
      { target: 'AppImage', arch: ['x64'] },
      { target: 'deb', arch: ['x64'] },
      { target: 'rpm', arch: ['x64'] },
    ],
    icon: 'public/pwa-512.png',
    category: 'Office',
  },
};
