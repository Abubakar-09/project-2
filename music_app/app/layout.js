import "./globals.css";


export const metadata = {
  title: "MusicPlayer - Abu Bakar Chohan",
  description: "Music player.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}
