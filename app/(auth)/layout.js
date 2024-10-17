export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-goldenSand">
      {children}
    </div>
  );
}
