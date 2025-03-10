import connectionsData from '@/data/connections.json';

export async function generateStaticParams() {
  const slugs = connectionsData.connections.map(connection => ({
    slug: connection.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }));
  return slugs;
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 