export const spacing = {
  section: "relative scroll-mt-2 py-10 md:py-12 lg:py-20",
  container:
    "relative z-20 w-full max-w-[1720px] mx-auto px-4 gap-10 flex flex-col items-center sm:gap-12 sm:px-8 lg:px-16",
};

const baseHeading = `text-pretty text-balance font-display leading-tight`;
const baseBody = `text-pretty text-balance`;

export const typography = {
  h1: `${baseHeading} font-light text-5xl lg:text-7xl`,
  h2: `${baseHeading} font-light text-4xl lg:text-6xl`,
  h3: `${baseHeading} font-light text-3xl lg:text-5xl`,
  h4: `${baseHeading} text-3xl xl:text-4xl`,
  h5: `${baseHeading} text-2xl md:text-3xl`,
  h6: `${baseHeading} text-2xl`,
  bodyLarge: `${baseBody} text-xl lg:text-2xl`,
  body: `${baseBody} text-base lg:text-xl`,
  captionLarge: `${baseBody} font-medium uppercase text-lg md:text-2xl`,
  caption: `${baseBody} font-medium uppercase text-lg md:text-xl`,
  captionSmall: `${baseBody} font-medium uppercase text-base md:text-lg`,
  link: `underline font-semibold`,
};

const buttonBase =
  "text-xl block w-full text-center py-4 px-10 rounded-full border border-black font-medium transition-all cursor-pointer hover:shadow-lg transform hover:translate-x-[-1px] hover:translate-y-[-1px] sm:w-fit";

export const buttons = {
  primary: `${buttonBase} bg-black text-white hover:bg-brown-800`,
  secondary: `${buttonBase} bg-white text-black hover:bg-brown-100`,
  // link: `${baseBody} uppercase font-bold text-lg hover:underline`,
};

export const forms = {
  input: `${typography.body} rounded-2xl border-2 border-black bg-white p-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-yellow placeholder-black/70 text-base disabled:text-black/20 disabled:cursor-not-allowed hover:shadow-lg transform transition hover:translate-x-[-1px] hover:translate-y-[-1px] focus:shadow-lg focus:translate-x-[-1px] focus:translate-y-[-1px]`,
  label: `px-4 ${typography.caption}`,
  fieldset: "flex flex-col gap-1",
};
