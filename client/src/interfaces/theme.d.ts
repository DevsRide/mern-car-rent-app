import '@pankod/refine-mui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomTheme {
  // Add custom variables here like below:
  // status: {
  //   danger: string;
  // };
}

declare module '@pankod/refine-mui' {
  interface Theme extends import('@pankod/refine-mui').Theme, CustomTheme {}
  interface ThemeOptions
    extends import('@pankod/refine-mui').ThemeOptions,
      CustomTheme {}
}
