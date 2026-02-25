import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{display:"flex", gap:"30px"}}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/services">Services</Link>
    </nav>
  );
}
