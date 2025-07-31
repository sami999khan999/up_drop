"use client";
import { useClerk } from "@clerk/nextjs";

const Page = () => {
  const { signOut } = useClerk();
  // const { userId, isLoaded } = useAuth();

  return (
    <div>
      <button onClick={() => signOut()} className="text-text">
        Logout
      </button>
      {/* <p>Your user ID is: {userId}</p> */}
      {/* <h3 className="text-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
        laboriosam quam quisquam delectus consequatur? Aliquid beatae deleniti
        totam iusto sint aspernatur at deserunt pariatur cupiditate quidem
        laudantium fugit molestias cum cumque necessitatibus quaerat odio
        recusandae molestiae optio quia, dolor non? Illo sed aspernatur autem
        architecto, repudiandae dicta, consequatur officia possimus temporibus
        unde cum magni non dignissimos nesciunt fugiat rem. Dolore accusantium
        maxime minus magni facere? Eaque similique iusto, deserunt, excepturi
        distinctio officia vitae quia recusandae obcaecati mollitia praesentium
        laudantium, exercitationem necessitatibus dignissimos? Possimus maxime
        dolore harum suscipit impedit cum corrupti, sint omnis minima.
        Reprehenderit libero optio iure, esse minima accusantium.
      </h3> */}
    </div>
  );
};

export default Page;
