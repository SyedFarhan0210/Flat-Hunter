export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Flat Hunter</h1>
      <div className="space-x-4">
        <a href="/dashboard">Dashboard</a>
        <a href="/properties">Flats</a>
        <a href="/flatmates">Flatmates</a>
      </div>
    </nav>
  );
}
