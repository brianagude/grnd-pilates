export const spacing = {
  section: "relative scroll-mt-2 py-12 md:py-20 lg:py-28",
  container:
    "w-full px-4 space-y-10 relative z-10 sm:px-6 md:px-10 md:space-y-12 lg:px-16",
  outer:
    "relative overflow-hidden my-8 shadow-[-8px_-12px_0_0_rgba(0,0,0,0.25),8px_12px_0_0_rgba(0,0,0,0.25)] rounded-[48px] md:rounded-[80px] md:border-2 md:border-black md:p-10 lg:p-16",
  inner:
    "relative z-10 px-4 py-12 space-y-8 rounded-[48px] border-4 border-black bg-white sm:px-6 md:px-10 md:py-16 md:space-y-12 lg:px-16 lg:py-20 lg:rounded-[56px] lg:border-8",
};

const baseHeading = `text-pretty text-balance font-black uppercase font-display`;
const baseBody = `text-pretty text-balance`;

export const typography = {
  h1: `${baseHeading} text-7xl tracking-wider md:text-9xl lg:text-[168px] lg:tracking-widest`,
  h2: `${baseHeading} text-6xl tracking-wider md:text-7xl lg:text-9xl lg:tracking-widest`,
  h3: `${baseHeading} text-5xl tracking-wider md:text-7xl lg:text-8xl`,
  h4: `${baseHeading} text-4xl tracking-wider md:text-6xl lg:text-7xl`,
  h5: `${baseHeading} text-3xl tracking-wide lg:text-5xl`,
  h6: `${baseHeading} text-2xl tracking-wide sm:text-4xl`,
  bodyLarge: `${baseBody} text-lg md:text-2xl md:tracking-wide`,
  body: `${baseBody} text-base md:text-lg`,
  bodySmall: `${baseBody} text-sm md:text-base`,
  caption: `${baseBody} uppercase font-bold text-lg`,
  captionSmall: `${baseBody} uppercase font-bold text-base`,
  captionLarge: `${baseBody} uppercase font-bold text-lg tracking-wide sm:text-2xl`,
  link: `underline font-bold hover:italic`,
};

const buttonBase = "text-center py-4 px-10 rounded-full border border-black font-semibold";

export const buttons = {
  primary: `${buttonBase} bg-black text-white`,
  secondary: `${buttonBase} bg-white text-black`,
  link: `${baseBody} uppercase font-bold text-lg hover:underline`,
};

export const forms = {
  input: `${typography.body} rounded-2xl border-2 border-black bg-white shadow-md px-6 py-4 mb-6 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-yellow placeholder-black/70 text-base disabled:text-black/20 disabled:cursor-not-allowed hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] transform transition hover:translate-x-[-2px] hover:translate-y-[-2px] focus:shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] focus:translate-x-[-2px] focus:translate-y-[-2px]`,
  label: `px-6 ${typography.caption}`,
  fieldset: "flex flex-col gap-1",
  select: "events-select flex-grow border-black bg-tan px-6 py-4 font-semibold cursor-pointer rounded-full border-2 w-full transform transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]"
};
