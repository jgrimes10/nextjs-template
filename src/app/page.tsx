import { Card, CardBody } from "@heroui/react";

/**
 * The Home page.
 * @returns {JSX.Element} The Home page.
 */
export default async function Home() {
  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody className="text-center">
        <h1 className="text-5xl">Next.js Starter</h1>
        <p className="text-xl">A simple starter for Next.js</p>
      </CardBody>
    </Card>
  );
}
