import { Card, CardBody, User } from "@heroui/react";
import { getServerSession } from "next-auth";

import options from "@/config/auth";
import requireAuth from "@/utils/require-auth";

/**
 * The profile page.
 * @returns {JSX.Element} The profile page.
 */
export default async function Profile() {
  // Make sure the user is authenticated before rendering the page.
  await requireAuth();

  /** Get the user's session from the server. */
  const session = (await getServerSession(options))!;

  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody>
        <User
          name={session.user?.name}
          description={session.user?.email}
          avatarProps={{
            showFallback: !session.user?.image,
            src: session.user?.image || "",
          }}
        />
      </CardBody>
    </Card>
  );
}
