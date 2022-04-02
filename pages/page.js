import { useSession, signIn, signOut } from "next-auth/react";

import AccessDenied  from '../components/AccessDenied.js';

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <AccessDenied />
    </>
  );
}